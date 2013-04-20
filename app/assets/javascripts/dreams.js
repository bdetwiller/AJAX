var D = (function() {
	
	function Dream(id, text) {
		this.id = id;
		this.text = text;
	}

	Dream.all = [];
	Dream.callbacks = [];

	Dream.prototype.save = function() {
		var that = this


		$.post('/dreamlogs.json', { 
			dreamlog: {
			id: that.id,
			text: that.text
			}},

			function(response) {
				that.id = response.id;
				Dream.all.push(that);

				for(i = 0; i < Dream.callbacks.length; i++){
					var callback = Dream.callbacks[i]
					callback();	
				}
			}
		);
	};

	Dream.refresh = function() {
		$.getJSON('/dreamlogs.json',
			function (data) {
				Dream.all = []
				for(i = 0; i < data.length; i++){
					Dream.all.push(new Dream(data[i].id, data[i].text));
				}
				for(i = 0; i < Dream.callbacks.length; i++){
					var callback = Dream.callbacks[i]; //can i define this var twice?
					callback();
				}
			}
		);
	};
	
	function DreamIndexView() {
		var that = this;
		Dream.callbacks.push(function() {
			that.render();
		});
	};

	DreamIndexView.prototype.render = function() {
		var that = this;

		var dreamlist = $("#dreamlist");
		dreamlist.empty();

		for(i = 0; i < Dream.all.length; i++){
			DreamView(Dream.all[i], dreamlist);
		};
	}

	function DreamView(dream, domEl) {
		domEl.append($("<li></li>").text(dream.text)); 
	}

	function DreamFormView(textField, button, callback) {
		this.$textField = textField;
		this.$button = button;
		this.callback = callback;
	}

	DreamFormView.prototype.clickButton = function() {
		var that = this;

		that.$button.click(that.submit.bind(that));
	};
	
	DreamFormView.prototype.submit = function (){
		var that = this;

		var newDream = new Dream();
		newDream.text = that.$textField.val();
		that.$textField.val("");

		that.callback(newDream);
	};	



	return {
		Dream: Dream,
		DreamIndexView: DreamIndexView,
		DreamView: DreamView,
		DreamFormView: DreamFormView
	};

})();