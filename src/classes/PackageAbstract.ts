import Package from '../interfaces/Package'
import Terminal from './Terminal'
import Process from './Process'

export default abstract class PackageAbstract implements Package {
	public constructor(
		public terminal: Terminal
	) {}

	public abstract aliases: Array<string>

	public shortDescription = 'No Description'

	public description = ['No Description']



	public abstract process(process: Process): number | Promise<number>
}
