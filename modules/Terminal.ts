import PackageAbstract from "../src/classes/PackageAbstract";
import Process from "../src/classes/Process";

export default class Terminal extends PackageAbstract {
	public aliases = ['terminal']

	shortDescription = ""

	description = ['']

	public process(process: Process) {
		if (process.argv[0] === 'debug') {
			const val = process.argv[1]
			if (val) {
				this.terminal.debug = val === 'true'
			}
		} else if (process.argv[0] === 'commandsAvailable') {
			let first = true
			for (const alias in this.terminal.commandsAvailable) {
				if (Object.prototype.hasOwnProperty.call(this.terminal.commandsAvailable, alias)) {
					this.terminal.print((first ? '' : ', ') + alias)
				}
				first = false
			}
		} else {
			this.terminal.println(this.terminal[process.argv[0] as 'debug'] + '')
		}
		return 0
	}
}
