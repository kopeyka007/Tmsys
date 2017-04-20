(function() {
	angular.module("app").factory("print", function() {
		var factory = {};
		factory.render = true;
		factory.canvases = [];
		factory.current = '';
		factory.k = 1;
		factory.place = 'top';

		factory.init = function(width, height, col) {
			this.current = 'canvas_' + this.canvases.length;

			this.k = 1;
			this.scale(width, height);
			this.col = col;
			var style = {'position': 'fixed',
						 'z-index': '1000',
						 'bottom': this.bottom() + 'px',
						 'left': this.left() + 'px',
						 'border': 'solid #333 1px',
						 'background': 'rgba(255, 255, 255, 0.5)',
						 'width': (width / this.k) + 'px',
						 'height': (height / this.k) + 'px'};
			var canvas = '<div id="' + this.current + '" class="canvas" style="' + this.style(style) + '"></div>';
			if (this.render)
			{
				$('body').append(canvas);
				this.canvases.push({'width': (width / this.k), 'height': (height / this.k), 'id': this.current});
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
			if (this.place == 'top')
			{
				for (var k in this.canvases)
				{
					bottom += (this.canvases[k].height + 20)
				}
			}
			return bottom;
		};

		factory.left = function() {
			var left = 20;
			if (this.place == 'right')
			{
				for (var k in this.canvases)
				{
					left += (this.canvases[k].width + 20)
				}
			}
			return left;
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

		factory.board = function(y, type) {
			type = type || 0;
			var color = '0, 0, 0';
			switch (type)
			{
				case 0: color = '0, 255, 0'; break;
				case 1: color = '0, 0, 255'; break;
				case 2: color = '255, 0, 0'; break;
			}
			var style = {'position': 'absolute',
						 'z-index': '0',
						 'bottom': (this.y / this.k) + 'px',
						 'left': ((this.row_number * this.col) / this.k) + 'px',
						 'border': 'solid #333 1px',
						 'background': 'rgba(' + color + ', 0.5)',
						 'width': (this.col / this.k) + 'px',
						 'height': (y / this.k) + 'px'};
			var board = '<div style="' + this.style(style) + '"></div>';
			if (this.render)
			{
				$('#' + this.current).append(board);
			}

			this.y += y;
		};

		factory.scale = function(x, y) {
			var window_x = $(window).outerWidth() - 40;
			if (x > window_x)
			{
				this.k = x / window_x;
				this.place = 'top';
			}

			var window_y = $(window).outerHeight() - 40;
			if (y > window_y)
			{
				this.k = y / window_y;
				this.place = 'right';
			}
		};

		return factory;
	});
})()

;