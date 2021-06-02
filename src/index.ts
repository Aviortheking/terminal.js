import Terminal from './classes/Terminal'

(async () => {
	const terminal = new Terminal()
	await terminal.import('/modules/Builtin', 'Import')
	await terminal.import('/modules/Builtin', 'Help')
	await terminal.import('/modules/Builtin')
	// await terminal.run('import /modules/echo', false)
	// await terminal.run('echo Hello World !', false)
})()

const requireCache: Record<string, any> = {}
// @ts-expect-error
window.require = (url: string) => { // Thanks to https://stackoverflow.com/a/19625245/7335674
	// to allow loading without js suffix
	if (url.toLowerCase().substr(-3) !== '.js') url += '.js'

	//get from cache
	var exports=requireCache[url]

	//not cached
	if (!exports) {
		try {
			exports = {}

			// Make sync request
			var X = new XMLHttpRequest()
			X.open("GET", url, false)
			X.send()

			if (X.status && X.status !== 200) throw new Error(X.statusText)

			var source = X.responseText

			// fix, add comment to show source on Chrome Dev Tools
			source = `//@ sourceURL=${window.location.origin}${url}\n${source}`

			// Load the module
			//according to node.js modules
			var module = { id: url, uri: url, exports }

			//create a Fn with module code, and 3 params: require, exports & module
			var anonFn = new Function("require", "exports", "module", source)

			// @ts-expect-error
			// Execute the module
			anonFn(window.require, exports, module)

			// cache obj exported by module
			requireCache[url] = exports = module.exports
		} catch (err) {
			throw new Error("Error loading module "+url+": "+err);
		}
	}
	return exports; //require returns object exported by module
}
