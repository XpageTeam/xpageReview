import {settings} from "./index"
import partitionNumber from "../functions/partNumber"
import {TweenLite} from "gsap"

/** Функция запустит счётчик на выбранном элементе
 * @param el: HTMLElement - на в нём будет счётчик
 * @param time: number - время, за которое счётчик завершится
 * @param onComlete: Function - коллбек
 */
function Counter(el: HTMLElement, time: number, count?: number, onComplete?: Function): void {
	// if (!window.matchMedia(settings.adaptiveMedia).matches){
		let counter = {count: parseInt(el.innerText.replace(" ", ""))};

		el.style.width = getComputedStyle(el).width

		// TweenLite.to(el, 2, {
		// 	opacity: 1
		// })		

		TweenLite.to(counter, time, {
			count: count,
			onUpdate(){
				el.innerText = partitionNumber(Math.ceil(counter.count))
			},
			onComplete(){
				if (onComplete)
					onComplete()
				el.style.width = "auto"
			}
		})
	// }else
	// 	TweenLite.set(el, {
	// 		opacity: 1
	// 	})
}

export default Counter