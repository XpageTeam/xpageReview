import isScrolledIntoView from "./scrolledIntoView"
import {App} from "index"

function viewWatcher(el: Element, callback: Function){
	let prevComparison = performance.now();

	const runCallback = () => {
		const now = performance.now();

		if (now - prevComparison < 100)
			return

		prevComparison = now

		if (isScrolledIntoView(el))
			callback(el)
	}

	document.addEventListener("DOMContentLoaded", runCallback)
	document.addEventListener("scroll", runCallback)
	document.addEventListener("touchmove", runCallback)
	window.addEventListener("resize", runCallback)
}

export default viewWatcher