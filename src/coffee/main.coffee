base = "/js/"


require = (file, onload, onerror) ->
	file = file.replace /\.(coffee|js)$/g, ""
	if document.querySelector("script[data-name='" + file + "']")
		if onload isnt undefined then onload
		return
	console.debug "Loading: " + file
	script = document.createElement "script"
	script.src = base + file + ".js"
	script.async = false
	script.dataset.name = file
	if onload isnt undefined then script.addEventListener 'load', onload
	if onerror isnt undefined then script.addEventListener 'error', onerror
	document.querySelector(".scripts").appendChild script
	# TODO: Find a way to stop the processing of the file until file is loaded

require "Events"

require "Packages/Builtin"

@realtime = (timeout, args, func) ->
	setTimeout func, timeout, args
