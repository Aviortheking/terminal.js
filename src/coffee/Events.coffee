
container = document.querySelector(".terminal")

# container.addEventListener 'keypress', test

container.addEventListener 'click', () ->
	document.querySelector('[contenteditable]').focus()
	# document.querySelector('.text.active').addEventListener 'paste', paste


container.addEventListener "keypress", (ev) ->
	val = document.querySelector("[contenteditable]")
	regex = /(<[^<>]+>)+?/g
	if val.innerHTML.match regex
		val.innerHTML = val.innerHTML.replace regex, ""
		el = document.getElementById("editable");
		range = document.createRange();
		sel = window.getSelection();
		console.debug(val.childNodes[0]);
		range.setStart(val.childNodes[0], val.childNodes[0].length);
		range.collapse(true);
		sel.removeAllRanges();
		sel.addRange(range);
		val.focus();
	if ev.key == "Enter"
		ev.preventDefault()
		# console.debug("ENTER")
		val = document.querySelector("[contenteditable]")
		val.removeAttribute "contenteditable"
		Package.run val.innerText
		# console.dir(Terminal.getInstance())
		# Terminal.getInstance().handleString(val.innerText)
