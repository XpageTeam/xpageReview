import "./forms"
// import "./xpage/loader"
import "./textPage/text-page"
// import "./xpage/select"

import {domReady, App} from "./xpage/index"
import viewWatcher from "./xpage/viewWatcher";

declare global {
    interface Window {
    	isScrolledIntoView: Function;
    	get$: Function;
    	is: any;
    }
}

domReady(() => {
	viewWatcher(document.querySelector(".top-banner"), function(el: HTMLElement){
		el.classList.add("js__visible")
	})

	App.each(".text-container, .about", (el: HTMLElement, i: number) => {
		viewWatcher(el, function(el: HTMLElement){
			el.classList.add("js__visible")
		})
	})

	App.each(".text-container__text", (el: HTMLElement) => {
		App.each(el.querySelectorAll("p"), (el: HTMLElement, i: number) => {
			el.style.transitionDelay = `${(i+1)*400 + 700}ms`
		})
	})

})