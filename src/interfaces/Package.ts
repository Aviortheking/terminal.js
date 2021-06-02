import Terminal from '../classes/Terminal'
import Process from '../classes/Process';

export default interface Package {
	terminal: Terminal

	aliases: Array<string>

	shortDescription: string

	description: Array<string>

	process(process: Process): number | Promise<number>
}

export interface PackageStatic {
	new (terminal: Terminal): Package
}
