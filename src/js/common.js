import stringEffect from "./stringAnimate.js"
import {TweenLite, SlowMo} from "gsap"
import ScrollToPlugin from "gsap/ScrollToPlugin.js"

let $;

// if (process.env.NODE_ENV == "development")
	$ = require("jquery")


window.$ = $;
window.jQuery = $;


window.get$ = (element) => {
	return $(element)

}
document.addEventListener("DOMContentLoaded", function(){
	$(".top-banner__text-title").each((i, el) => {
		new stringEffect({
			selector: el,
		});
	});

	$(".top-banner__scroller").click(function(){
		$("html, body").animate({
			scrollTop: $(".top-banner").height()
		}, 500)
	})
})

const scrollTime = .5;			//Scroll time
const scrollDistance = 170;		//Distance. Use smaller value for shorter scroll and greater value for longer scroll

document.addEventListener("DOMContentLoaded", function(){
	window.addEventListener("mousewheel", (event) => {
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
			overwrite: 5,
		})
	}, {
		passive: false
	})

	window.addEventListener("scroll", imgAnimate);
	window.addEventListener("touchmove", imgAnimate);
})

const imgAnimate = () =>{
	$(".text-container.js__visible").each(function (i, el) {
		const $this = $(this);

		setTimeout(function(){
			$this.find(".text-container__img").css({
				overflow: "visible"
			})
		}, 2000)

		if (window.matchMedia("(max-width: 1200px)").matches)
			return

		// TweenLite.to($this.find(".text-container__img"), scrollTime, {
		// 	transform: !$this.hasClass("text-container--center-text")
		// 		? `translateY(-${window.scrollY / 4 / (i + 3)}px)`
		// 		 : `translateY(calc(-50% - ${window.scrollY / 4 / (i + 4)}px))`,
		// 	ease: SlowMo.easeInOut,
		// 	overwrite: 5,
		// })

		TweenLite.to($this.find(".text-container__img-text"), scrollTime, {
			ease: SlowMo.easeInOut,
			overwrite: 5,
			transform: `translateY(-${window.scrollY / 8}px)`
		})
	});
}
