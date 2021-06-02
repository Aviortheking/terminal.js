import Process from "../src/classes/Process";
import PackageAbstract from "../src/classes/PackageAbstract";

export default class Echo extends PackageAbstract {
	public aliases = ['echo']

	public process(process: Process) {
		const indexOf = process.argv.indexOf('-e')
		if (indexOf !== -1) {
			process.argv.splice(indexOf, 1)
			process.argv.forEach((el, index) => {
				process.argv[index] = el.replace(/\\n/g, '<br />')
			})
			this.terminal.rawPrintln(process.argv.join(' '))
			return 0
		}
		this.terminal.println(process.argv.join(' '))
		return 0
	}
}


/*
[avior@aptavior ~]$ echo -e pouet\\vpokemon\\vtest
pouet
     pokemon
            test

[avior@aptavior ~]$ echo -e pokemon\\fpouet\\fteeets
pokemon
       pouet
            teeets


[avior@aptavior ~]$ echo -e pouet\\tpokemon
pouet	pokemon

[avior@aptavior ~]$ echo -e pouet\\cpokemon
pouet

[avior@aptavior ~]$ echo -e pokemon\\bpouet
pokemopouet

[avior@aptavior ~]$ echo -e 0123456789\\r987654321\\rteeets
teeets3219
*/
