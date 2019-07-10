import Result from "./result";

export default class RawResult implements Result {
	html: HTMLElement;
	constructor(html: HTMLElement) {
		this.html = html
	}
}
