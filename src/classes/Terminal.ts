import Package, { PackageStatic } from "../interfaces/Package"
import Process from "../classes/Process"
import DOMElement from "@dzeio/dom-manager/dist/DOMElement";
import DOMFleetManager from "@dzeio/dom-manager/dist/DOMFleetManager"

interface MyWindow extends Window {
	exports: {
		__esModule?: true,
		default: PackageStatic
	} | Record<string,PackageStatic> | PackageStatic
	require: (pkg: string) => any
}

declare var window: MyWindow & typeof globalThis;

window.exports = {}

export default class Terminal {
	private outputTemplate: DOMElement
	private actionTemplate: DOMElement
	private terminalObj: DOMElement

	private currentAction: DOMElement

	public debug = false

	public constructor(source?: DOMElement | HTMLElement) {
		this.outputTemplate = DOMElement.get('.template.output', source)
		this.actionTemplate = DOMElement.get('.template.action', source)
		this.terminalObj = DOMElement.get('.terminal', source)

		this.addNewAction()

		window.addEventListener('click', () => {
			DOMElement.get('.text', this.currentAction.item).emit('focus')
		})
	}

	private addNewAction() {
		if (this.currentAction) {
			DOMElement.get('.text', this.currentAction.item)
				.attr('contenteditable', 'false')
		}
		const copy = DOMElement.get(
			this.actionTemplate.item.cloneNode(true) as HTMLElement
		)
			.removeClass('template')
			.place('asChildOf', this.terminalObj)
		const input = DOMElement.get('.text', copy.item)
			.on('keypress', (ev) => {
				if (ev.keyCode === 13) {
					ev.preventDefault()
					this.run(input.text())
				}
			})
			.on('paste', (ev) => {
				ev.preventDefault()
				const text = ev.clipboardData.getData('text/plain').replace('&nbsp;', ' ')
				document.execCommand('insertHTML', false, text)
			})
		input.item.focus()
		this.currentAction = copy
	}

	public print(str: string) {
		const fleet = new DOMFleetManager('.output-line', this.currentAction)
		const item = fleet.last()
		if (!item) {
			this.println(str)
			return
		}
		item.text(item.text() + str)
	}

	public rawPrintln(content: any) {
		DOMElement.get(
			this.outputTemplate.item.cloneNode(true) as HTMLElement
		)
			.removeClass('template')
			.html(content)
			.place('asChildOf', this.currentAction)
		console.log(content)
	}

	public println(str: string) {
		DOMElement.get(
			this.outputTemplate.item.cloneNode(true) as HTMLElement
		)
			.removeClass('template')
			.text(str)
			.place('asChildOf', this.currentAction)
		console.log(str)
	}

	public commandsAvailable: Record<string, Package> = {}

	public import(str: string, exportToLoad?: string) {
		return new Promise((res, rej) => {
			const previousExport = Object.assign({}, window.exports)
			new DOMElement('script')
				.attr('src', `${str}.js`)
				.on('load', (ev) => {
					console.log(ev)
					let exports = window.exports
					console.log(exports === previousExport, previousExport, exports)
					if (exports === previousExport || Object.keys(exports).length === 0) {
						window.exports = {}
						return rej('Already imported or not found')
					}
					let pkgStatic: PackageStatic
					if (exportToLoad) {
						// @ts-expect-error
						pkgStatic = exports[exportToLoad]
					} else {
						// @ts-expect-error
						pkgStatic = exports && exports.__esModule ? exports.default : exports
					}
					if (!pkgStatic) {
						window.exports = {}
						return rej('Package don\'t exist')
					}
					const pkg = new pkgStatic(this)
					for (const alias of pkg.aliases) {
						this.commandsAvailable[alias] = pkg
					}
					console.log(pkg, this.commandsAvailable)
					window.exports = {}
					res()
				})
				.on('error', () => {
					rej()
				})
				.place('asChildOf', document.body)
		})
	}

	public async run(command: string, end: boolean = true) {
		const splitted = command.split(' ')
		const cmd = splitted.shift()
		const process = new Process(cmd, splitted, 0)
		if (cmd in this.commandsAvailable) {
			let exitCode = 1
			try {
				exitCode = await this.commandsAvailable[cmd].process(process)
			} catch (e){
				console.error(e)
			}
				if (end) {
				if (this.debug) {
					this.println(`Exited with code (${exitCode})`)
				}
				this.addNewAction()
			}
			return
		}
		if (cmd) {
			this.println(`Command not found (${cmd})`)
		}

		this.addNewAction()
	}
}
