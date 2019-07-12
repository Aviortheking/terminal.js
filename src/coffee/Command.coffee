class Command

	arguments: []
	content: []
	name: ""
	fulltext: ""


	constructor: (text) ->
		text = text.replace "&nbsp;", " "
		@fulltext = text
		@content = []

		tmp = text.split(" ")
		@name = tmp.shift()
		tmp2 = tmp.join(" ").split("-- ")

		splitted = tmp2.shift() #text before --
		# excluded #text after --

		if tmp2.length >= 1 then excluded = tmp2.join(" ")


		# currentArg

		for el in splitted.split(" ")
			if el == " " || el == "" then return
			# // console.dir(el)
			if el.match(/^--?/g)
				if currentArg != undefined
					@arguments.push(currentArg)

				if el.match("=")
					tmp = el.split("=", 1)
					@arguments.push(
						{
							type: if tmp[0].match(/^--/g) then ArgumentType.LONG else ArgumentType.SHORT,
							name: tmp[0],
							value: tmp[1]
						}
					)
					return
				currentArg = {
					type: if el.match(/^--/g) then ArgumentType.LONG else ArgumentType.SHORT,
					name: el.replace(/^--?/g, "")
				}
				return
			if currentArg != undefined
				currentArg.value = el
				@arguments.push(currentArg)
				currentArg = undefined
				return
			@content.push(el)
		if excluded != undefined then @content = @content.concat(excluded.split(" "))

ArgumentType =
	LONG: 1
	SHORT: 0
