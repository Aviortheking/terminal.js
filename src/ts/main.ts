import Terminal from "./terminal"

import Echo from "./cmds/echo"

import Events from "./events"


interface Window {
	terminal?: Terminal
}

declare var window: Window

const terminal = Terminal.getInstance()

new Events().reload()


terminal.init()

window.terminal = terminal;

(document.querySelector(".folder") as HTMLElement).onclick = () => {
	let script = document.createElement("script")
script.src = "./echo.js"
document.body.appendChild(script)
script = document.createElement("script")
script.src = "./hello.js"
document.body.appendChild(script)

}


// terminal.addPackage(new Echo)
