import Terminal from "./terminal";

export default class Events {

	public reload() {
		document.addEventListener("keydown", this.keydown)
		document.addEventListener("click", this.click)
	}

	private keydown(ev: KeyboardEvent) {

		if (ev.key === "Enter") {
			ev.preventDefault()
			console.dir("ENTER")
			let val: HTMLElement = document.querySelector("[contenteditable]")
			console.dir(Terminal.getInstance())
			Terminal.getInstance().handleString(val.innerText)
		}
	}

	private click(ev: MouseEvent) {
		let focus: HTMLInputElement = document.querySelector("[contenteditable]")
		focus.focus()
		//TODO: find a way to put cursor at the end
	}
}
