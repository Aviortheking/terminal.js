require 'String'
require 'Packages/Package', ->
	help = new Package ['help', 'cmds']
	help.handle = (cmd) ->
		cmds = []
		out = new Output("test")
		out.addClass("debug")
		@println out
		for index of Package.aliases
			console.debug index
			if Package.aliases[index] is "undefined" || Package.aliases[index] is undefined then continue
			if cmds[Package.aliases[index]] == undefined then cmds[Package.aliases[index]] = index
			else cmds[Package.aliases[index]] += ', ' + index
		console.debug cmds
		for cmd in cmds
			@println cmd
		@end()

	tmpLoader = []
	aptitude = new Package ['load', 'l']
	aptitude.handle = (input) ->
		input = input.content
		list = ['downloader', 'echo']
		input = list if input[0] is '*'
		for url, index in input
			url = url.capitalize()
			tmpLoader[url] = false
			@println 'Loading: ' + url
			script = document.createElement 'script'
			# TODO: Handle external files
			selfPrint = @println
			realtime 0, [url, @], (pouet)->
				require "Packages/" + pouet[0], ->
					pouet[1].println 'Loaded: ' + pouet[0]
					tmpLoader[pouet[0]] = true
					check pouet[1]
				, ->
					pouet[1].println pouet[0] + ' couldn\'t be found'
					tmpLoader[pouet[0]] = true
					@remove()
					check pouet[1]

	# check the end of download
	check = (elee) ->
		console.log tmpLoader
		if tmpLoader.indexOf(false) is -1
			elee.end()
			tmpLoader = []
