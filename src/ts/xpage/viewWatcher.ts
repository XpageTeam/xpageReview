import isScrolledIntoView from "./scrolledIntoView"

function viewWatcher(el: Element, callback: Function){
	let prevComparison = performance.now();

	const runCallback = (isFirstLaunch?: boolean) => {
		const now = performance.now();

		if (now - prevComparison < 100 && !isFirstLaunch)
			return

		prevComparison = now

		if (isScrolledIntoView(el))
			callback(el)
	}

	runCallback(true)

	// document.addEventListener("DOMContentLoaded", runCallback)
	document.addEventListener("scroll", runCallback)
	document.addEventListener("touchmove", runCallback)
	window.addEventListener("resize", runCallback)
}

export default viewWatcher