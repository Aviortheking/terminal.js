import Package from "./packages/package"
import Command from "./command";

export default class Terminal {

	private pkgs: pkgsList = {}

	private constructor() {}

	/**
	 * getInstance
	 */
	private static instance: Terminal

	public static getInstance(): Terminal {
		if (Terminal.instance === undefined) {
			Terminal.instance = new Terminal;
		}
		return Terminal.instance;
	}

	/**
	 * init the terminal
	 */
	public init() {}

	public addPackage(pkg: Package) {
		pkg.getAliases().forEach(el => {
			this.pkgs[el] = pkg
		})
	}

	private realTime(timeout: number, args: any[], func: Function) {
		setTimeout(func, timeout, args);
	}

	public handleString(content: string) {
		let pkg = this.pkgs[content.split(" ")[0]]
		if ( pkg !== undefined) {


			this.realTime(0, [], () => {
				let multiSel = document.getElementsByClassName("output")
				let sel = multiSel[multiSel.length - 1]
				sel.appendChild(pkg.handle(Command.Generate(content)).html)
				let term = document.querySelector('.terminal')
				let action = document.createElement('div')
				action.className = 'action'
				action.innerHTML = '<div class="command"><span class="folder green">/' + 'currentFolder' + ' </span><span class="symbol blue">$ </span><span contenteditable="true" class="text active red light"></span></div><div class="output"></div>'
				document.querySelector("[contenteditable]").removeAttribute("contenteditable")
				term.appendChild(action)
				term.scrollTop = term.scrollHeight
				document.body.click()
			})
			return
		}
		this.handleString("echo Command not found")
	}
}

interface pkgsList {
	[key: string]: Package
}
