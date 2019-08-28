import "./forms"
// import "./xpage/loader"
import "./textPage/text-page"
// import "./xpage/select"

import {domReady, App, settings} from "./xpage/index"

interface state {
	anyScrollOpened?: boolean
}

declare global {
    interface Window {
    	animateScroll: Function; 
    	isScrolledIntoView: Function;
    	get$: Function;
    	preloaderTimer: NodeJS.Timeout;
    	is: any;
    	state: state;
    }
}

domReady(() => {
	// 
})