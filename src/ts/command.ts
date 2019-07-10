import Argument, { ArgumentType } from "./argument";

// echo -e --pouet=pokemon -go come-on -- --caca=boudin go
export default class Command {
	arguments: Argument[] = [] //see below
	content: string[] = [] // "--caca=boudin", "go"
	name: string = "" // echo
	fulltext: string = "" // echo -e --pouet=pokemon -go come-on -- --caca=boudin go

	public static Generate(text: string): Command {
		let cmd = new Command
		cmd.fulltext = text
		let tmp = text.split(" ")
		cmd.name = tmp.shift()
		let tmp2 = tmp.join(" ").split("-- ")
		// let tmp2 = splitted.shift()
		// let excluded = splitted

		let splitted = tmp2.shift()//text before --
		let excluded:string //text after --

		if (tmp2.length >= 1) excluded = tmp2.join(" ")


		var currentArg: Argument
		splitted.split(" ").forEach( el => {
			if (el === " " || el === "") return
			// console.dir(el)
			if (el.match(/^--?/g)) {
				if (currentArg != undefined) {
					cmd.arguments.push(currentArg)
				}
				if (el.match("=")) {
					let tmp = el.split("=", 1)
					cmd.arguments.push(
						{
							type: tmp[0].match(/^--/g) ? ArgumentType.LONG : ArgumentType.SHORT,
							name: tmp[0],
							value: tmp[1]
						}
					)
					return
				}
				currentArg = {
					type: el.match(/^--/g) ? ArgumentType.LONG : ArgumentType.SHORT,
					name: el.replace(/^--?/g, "")
				}
				return
			}
			if (currentArg !== undefined) {
				currentArg.value = el
				cmd.arguments.push(currentArg)
				currentArg = undefined
				return
			}
			cmd.content.push(el)
		})

		if (excluded !== undefined) cmd.content = cmd.content.concat(excluded.split(" "))
		// console.dir(cmd)
		return cmd
	}
}



/**
 * type = short
 * name = "e"
 * value = undefined
 *
 * type = long
 * name = pouet
 * value = pokemon
 *
 * type = short
 * name = go
 * value = come-on
 */
