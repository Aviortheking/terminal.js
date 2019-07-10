import Command from "../command";
import Result from "../results/result";

export default interface Package {

	getVersion(): string

	getAliases(): string[]

	handle(command: Command): Result
}
