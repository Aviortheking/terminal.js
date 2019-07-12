wget = new Package ['wget', 'download', 'dl']
wget.handle = (command) ->
	input = command.content
	if input.length > 0
		console.debug "test"
		a = document.createElement 'a'
		a.download = input[0].substr(input[0].lastIndexOf('/') + 1)
		a.href = "data:text/plain;charset=UTF-8,"+input
		a.style = 'display:none'
		a.target = '_blank'
		document.body.appendChild a
		@println 'Starting downloading...'
		a.click()
		a.remove()
		@end()
	else
		@println 'Please provide a link !'
		@end()
