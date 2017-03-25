(function() {
	angular.module("app").factory("print", function() {
		var factory = {};
		factory.render = true;
		factory.canvases = [];
		factory.current = '';

		factory.init = function(width, height, col) {
			this.current = 'canvas_' + this.canvases.length;

			this.col = col;
			var style = {'position': 'fixed',
						 'z-index': '1000',
						 'bottom': this.bottom() + 'px',
						 'left': '20px',
						 'border': 'solid #333 1px',
						 'background': 'rgba(255, 255, 255, 0.5)',
						 'width': width + 'px',
						 'height': height + 'px'};
			var canvas = '<div id="' + this.current + '" class="canvas" style="' + this.style(style) + '"></div>';
			if (this.render)
			{
				$('body').append(canvas);
				this.canvases.push({'width': width, 'height': height, 'id': this.current});
				$('.canvas').on('click', this.reset);
			}
		};

		factory.reset = function() {
			$('.canvas').remove();
			factory.canvases = [];
			factory.current = '';
		};

		factory.bottom = function() {
			var bottom = 20;
			for (var k in this.canvases)
			{
				bottom += (this.canvases[k].height + 20)
			}
			return bottom;
		};

		factory.style = function(rules) {
			var result = '';
			for (var k in rules)
			{
				result += k + ': ' + rules[k] + ';';
			}
			return result;
		};

		factory.row = function(row) {
			this.row_number = row;
			this.y = 0;
		};

		factory.board = function(y, rest) {
			rest = rest || false;
			var style = {'position': 'absolute',
						 'z-index': '0',
						 'bottom': this.y + 'px',
						 'left': (this.row_number * this.col) + 'px',
						 'border': 'solid #333 1px',
						 'background': (rest ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 255, 0, 0.5)'),
						 'width': this.col + 'px',
						 'height': y + 'px'};
			var board = '<div style="' + this.style(style) + '"></div>';
			if (this.render)
			{
				$('#' + this.current).append(board);
			}

			this.y += y;
		};

		return factory;
	});
})()

;