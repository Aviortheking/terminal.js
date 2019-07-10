import Result from "./result";

export default class StringResult implements Result {
	html: HTMLElement;
	constructor(content: string, classes?: string[], style?: string) {
		this.html = document.createElement("div")
		if (classes !== undefined) this.html.classList.add(...classes)
		if (style !== undefined) this.html.setAttribute("style", style)
		this.html.innerText = content
	}
}
