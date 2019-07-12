# this Package is an Example package

echo = new Package('echo') # see src/coffee/Packages/Package.coffee for more possibilities
echo.handle = (cmd) -> # see src/coffee/Command.coffee for the cmd Object
	console.debug(cmd) # We recommend using debug instead of log and activating in our brwser the option for it
	@println cmd.content.join (' ') # @println print on the terminal with a newline at the end
	@println new Output('it is a debug output').addClass 'debug' # adding the debug class change the output (see the src/sass/main.sass for all the styling)
@end() # to end the script (some script work async so it's needed to let the package choose when to end)
