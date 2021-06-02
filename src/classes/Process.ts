export default class Process {
	public constructor(
		public command: string,
		public argv: Array<string>,
		public pid: number
	) {}
}
