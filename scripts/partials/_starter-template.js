Engine.ui.functionNameHere = function(){

	var app = {

			init: function(){
				this.cacheDOM();
				this.customFunction();
			},
			cacheDOM: function(){
				this.$parent = $(".parent-selector");
			},
			cssSelectors: {
				someCoolSelector: "html-class-name"
			},
			customFunction: function(){
				console.log("meow");
			}

		};

		app.init();

};
