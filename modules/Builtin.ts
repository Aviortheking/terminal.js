import PackageAbstract from '../src/classes/PackageAbstract'
import Process from '../src/classes/Process'
import Package from '../src/interfaces/Package'

export class Import extends PackageAbstract {
	public aliases = ['import']

	public shortDescription = 'import {package} [sub-package]'

	public description = [
		'Import packages',
		this.shortDescription,
		'{package} is mandatory',
		'it tell what file to go fetch',
		'[sub-package]',
		'If the package is not the default one exported you have to tell it here'
	]

	public async process(process: Process) {
		let toImport = process.argv[0]
		if (!toImport.startsWith('http')) {
			toImport = '/modules/' + toImport
		}
		try {
			this.terminal.println(`Importing ${process.argv[0]}`)
			await this.terminal.import(toImport, process.argv[1])
			this.terminal.println(`Successfully imported ${process.argv[0]}`)
			return 0
		} catch {
			this.terminal.println(`Could not import ${process.argv[0]}`)
			return 1
		}
	}
}

export class Help extends PackageAbstract {

	aliases = ['help']

	shortDescription = 'help [package]'

	description = ['Shows help for packages', 'ex: help import', 'will show an help on how tu use the command']

	public async process(process: Process) {
		if (process.argv[0]) {
			const item = this.terminal.commandsAvailable[process.argv[0]]
			if (!item) {
				this.terminal.println(`the command "${process.argv[0]}" don't exist`)
				return 1
			}
			this.terminal.println(`Help for ${process.argv[0]}:`)
			for (const line of item.description) {
				this.terminal.println(line)
			}
			return 0
		}
		let previousItem: Package | undefined = undefined
		for (const alias in this.terminal.commandsAvailable) {
			if (Object.prototype.hasOwnProperty.call(this.terminal.commandsAvailable, alias)) {
				const currentItem = this.terminal.commandsAvailable[alias]
				if (previousItem !== currentItem) {
					if (previousItem !== undefined) {
						this.terminal.println(previousItem.shortDescription)
					}
					previousItem = currentItem
				}
				this.terminal.println(alias)
			}
		}
		if (previousItem !== undefined) {
			this.terminal.println(previousItem.shortDescription)
		}
		return 0
	}
}
