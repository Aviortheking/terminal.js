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
		return @

	getClasses: ->
		return @classes

	removeClass: (className) ->
		index = @classes.lastIndexOf(className)
		if index != -1 then @classes.splice index, 1
		return @

	addStyle: (name, value) ->
		@style[name] = value
		return @

	getStyle: ->
		return @styles

	removeStyle: (name) ->
		@style[name] = undefined
		return @
