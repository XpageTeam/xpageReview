export default class stringEffect{

	set settings(settings) {

		const defaultSettings = {
			options: {
				timeStep: .3,
				timeOffset: .3,
				transformStep: -30,
				transformStepOffset: 0,
			}, 
			beforeStart(){

			}, 
			afterFinish(){

			},
		};

		this._settings = $.extend( true, {}, defaultSettings, settings);
	}
	get settings(){
		return this._settings;
	}
	set $el(selector){
		this._el = selector
	}
	get $el(){
		return $(this._el)
	}

	afterFinish(){
		// console.log(this.settings.afterFinish);
		this.settings.afterFinish(this.$el, this.stringCounter, this.settings.options)
	}

	beforeStart(){
		this.settings.beforeStart(this.$el, this.stringCounter, this.settings.options)
	}


	constructor(settings = {}){
		this.settings = settings;

		this.$el = this.settings.selector;

		this.init()
	}

	init(){
		this.wrapWords();
		this.createStrings();
		this.afterFinish();

		this.whatch();
	}

	rebuild(){
		this.destroyStrings();
		this.createStrings();
	}

	wrapWords(){
		this.beforeStart();

		let textArr = this.$el.html().split(/\s+(?![^<>]*>)/g);

		this.$el.html("");

		for (var text of textArr)
			this.$el.append(" <span>"+text+"</span>");

	}

	destroyStrings(){
		this.$el.children("div").children("span").unwrap();
	}

	createStrings(){
		let $text = this.$el.children("span"),
			stringsDesc= [];

		$text.each((i, el) => {
			let $this = $(el);

			// console.log(parseInt($this.position().top);

			stringsDesc.push({
				id: i,
				top: parseInt($this.position().top.toString()),
			});
		});

		this.wrapStrings(stringsDesc);
	}

	wrapStrings(stringsDesc = []){
		this.stringCounter = 0;

		let {
			timeStep: delay, 
			timeOffset: tmOffset, 
			transformStep: transStep,
			transformStepOffset: transStepOffset,
		} = this.settings.options;

		for (var word of stringsDesc){


			let time = tmOffset + this.stringCounter * delay,
				transform = transStepOffset + this.stringCounter * transStep;

			if (!this.$el.find(".string--"+word.top).length){
				this.$el.append("<div class=\"string string--"+word.top+"\">\
					 <span>"
						+this.$el.children("span:eq("+word.id+")").html()+
					"</span>\
				</div>");

				this.stringCounter++;

				this.$el.find(".string--"+word.top).css({
					"transition-delay": time+"s",
					transform: "translate3d(0, "+transform+"%, 0)"
				});
			}else
				this.$el.find(".string--"+word.top)
					.append(" <span>"
						+this.$el.children("span:eq("+word.id+")").html()+
					"</span>");
		}

		this.$el.children("span").remove();
	}


	whatch(){
		$(window).on("resize", e => {
			clearTimeout(this.updateTimeout);

			this.updateTimeout = setTimeout(e => {
				this.rebuild();
			}, 100)
		});
	}
}