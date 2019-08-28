import $ from "jquery"
import is from "is_js"
// import stringEffect from "./stringAnimate.js"
import {TweenLite, SlowMo} from "gsap"
import ScrollToPlugin from "gsap/ScrollToPlugin.js"


window.$ = $;
window.jQuery = $;
window.is = is

window.get$ = (element) => {
	return $(element)
}

require("./jquery.fancybox.js")
require("../css/jquery.fancybox.css")

document.addEventListener("DOMContentLoaded", function(){
	const scrollTime = 1;			//Scroll time
	const scrollDistance = 170;		//Distance. Use smaller value for shorter scroll and greater value for longer scroll

	if (document.body.classList.contains("main")){
		const scroller = document.querySelector(".main__wrapper");

		if (!scroller)
			return

		scroller.addEventListener("mousewheel", (event) => {
			if (!window.state.anyScrollOpened)
				return
			
			event.preventDefault()

			const delta = event.wheelDelta/120 || -event.detail/3;
			const scrollLeft = scroller.scrollLeft;
			const finalScroll = scrollLeft - parseInt((delta*scrollDistance).toString());


			TweenLite.to(scroller, scrollTime, {
				// scrollTo: {
				// 	x: finalScroll,
				// 	y: 0,
				// 	autoKill: true
				// },
				scrollLeft: finalScroll,
				ease: SlowMo.easeInOut,
				// autoKill: true,
				overwrite: 5
			}) 
		})
	}else
		window.addEventListener("mousewheel", (event) => {
			if (!window.state.anyScrollOpened)
				return

			event.preventDefault()

			const delta = event.wheelDelta/120 || -event.detail/3;
			const scrollTop = window.scrollY;
			const finalScroll = scrollTop - parseInt((delta*scrollDistance).toString());

			TweenLite.to(window, scrollTime, {
				scrollTo: {
					x: 0,
					y: finalScroll,
					autoKill: true
				},
				ease: SlowMo.easeInOut,
				autoKill: true,
				overwrite: 5
			}) 
		}, {
			passive: false
		})



})
