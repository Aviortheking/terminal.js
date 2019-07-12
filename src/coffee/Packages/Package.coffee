require('Output')
require('Command')

class Package
	###
	# aliases is an array of commands usable
	###

	# array containing each packages
	@packages: []

	# [name: index(from package)]
	@aliases: []

	@run: (str) ->
		cmd = new Command(str)
		res = Package.packages[Package.aliases[cmd.name]]
		if res == undefined
			new Package().println("Command not found")
			new Package().end()
			return
		Package.packages[Package.aliases[cmd.name]].handle(cmd)


	constructor: (aliases) ->
		Package.packages.push(@)
		if typeof(aliases) == "object"
			aliases.forEach (el) ->
				Package.aliases[el] = Package.packages.length - 1
		else
			Package.aliases[aliases] = Package.packages.length - 1

	handle: (command) ->
		return @end()


	# output is from the Output object
	println: (output) ->
		if typeof(output) == "string" then output = new Output(output)
		outputs = document.getElementsByClassName 'output'
		out = outputs[outputs.length - 1]
		div = document.createElement 'div'
		div.innerText = output.getText()
		if output.getClasses() != [] then for classe in output.getClasses()
			div.classList.add classe
			if classe == "debug"
				div.classList.add 'blue'
				div.classList.add 'light'
		out.appendChild div

	end: ->
		action = document.createElement 'div'
		action.className = 'action'
		action.innerHTML = '<div class="command"><span class="folder green">/' + 'currentFolder' + ' </span><span class="symbol blue">$ </span><span contenteditable="true" class="text active red light"></span></div><div class="output"></div>'
		term = document.querySelector ".terminal"
		term.appendChild action
		term.scrollTop = term.scrollHeight
		term.click()
