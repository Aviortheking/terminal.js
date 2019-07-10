import Package from "../packages/package";
import Command from "../command";
import Result from "../results/result";
import StringResult from "../results/stringResult";

export default class Echo implements Package {
	getAliases(): string[] {
		return ["echo"]
	}
	public getVersion(): string {
		return "1.0.0"
	}
	public handle(command: Command): Result {
		return new StringResult(command.content.join(" "))
	}
}

(window as any).terminal.addPackage(new Echo)
