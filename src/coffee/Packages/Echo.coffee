
echo = new Package("echo")
echo.handle = (cmd) ->
	console.log(cmd)
	@println cmd.content.join (" ")
	@end()
