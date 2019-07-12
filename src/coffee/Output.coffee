class Output

	text: ""
	classes: []
	style: []

	constructor: (text) ->
		@text = ""
		@classes = []
		@style = []
		if text isnt undefined then @text = text

	setText: (text) ->
		@text = text
		return @

	getText: () ->
		return @text

	addClass: (className) ->
		if @classes.lastIndexOf(className) == -1 then @classes.push className

	getClasses: ->
		return @classes

	removeClass: (className) ->
		index = @classes.lastIndexOf(className)
		if index != -1 then @classes.splice index, 1

	addStyle: (name, value) ->
		@style[name] = value

	getStyle: ->
		return @styles

	removeStyle: (name) ->
		@style[name] = undefined
