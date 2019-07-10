export enum ArgumentType {
	LONG,
	SHORT
}

export default interface Argument {
	type: ArgumentType
	name: string
	value?: string
}
