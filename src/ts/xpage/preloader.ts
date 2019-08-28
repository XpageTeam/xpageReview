;(function(){
	const progressLine = document.querySelector(".l-line__line-progress") as HTMLElement,
		progressCounter = document.querySelector(".l-line__text span") as HTMLElement,
		maxProgress = 20;

	let curStep = 0;

	const preloader = () => {
		curStep++
		progressCounter.innerText = curStep.toString()

		progressLine.style.transform = `scaleX(${curStep / 100})`
	};

	const preloaderTimer = setInterval(function(){
		if (curStep < maxProgress)
			preloader()
	}, 300)

	document.addEventListener("DOMContentLoaded", () => {
		clearInterval(preloaderTimer)
	})
})()