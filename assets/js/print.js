(function() {
	angular.module("app").factory("print", function() {
		var factory = {};
		factory.current = 0;
		factory.data = [];
		factory.col_number = 0;
		factory.row_number = 0;
		factory.direction = 'col';

		factory.init = function(width, height, type, angle) {
			var canvas = {};
			canvas.width = width;
			canvas.height = height;
			canvas.type = type;
			canvas.angle = angle;

			this.current = this.data.length;
			this.data.push({'canvas': canvas,
					   		'boards': []});
		};

		factory.reset = function() {
			this.col_number = 0;
			this.data = [];
			$('.canvas').html('');
		};

		factory.style = function(rules) {
			var result = '';
			for (var k in rules)
			{
				result += k + ': ' + rules[k] + ';';
			}
			return result;
		};

		factory.col = function(col) {
			this.direction = 'col';
			this.col_number = col;
			this.y = 0;
		};

		factory.row = function(row) {
			this.direction = 'row';
			this.row_number = row;
			this.x = 0;
		};

		factory.board = function(width, height, type) {
			type = type || 0;
			var color = '0, 0, 0';
			switch (type)
			{
				case 0: color = '0, 255, 0'; break;
				case 1: color = '0, 0, 255'; break;
				case 2: color = '255, 0, 0'; break;
			}

			var cols = this.getColsCount(width);
			var rows = this.getColsRow(width);
			var board = {};
			board.type = type;
			board.color = color;
			board.width = width;
			board.height = height;
			if (this.direction == 'col')
			{
				board.x = this.col_number * width;
				board.y = this.y;
				this.y += height;
			}
			else
			{
				board.x = this.x;
				board.y = this.row_number * height;
				this.x += width;
			}
			this.data[this.current].boards.push(board);
		};

		factory.scale = function(x, y) {
			var k = 1;
			var window_x = $('.canvas').outerWidth() - 40;
			if (x > window_x)
			{
				k = x / window_x;
			}

			var window_y = $('.canvas').outerHeight() - 40;
			if (y > window_y)
			{
				k = y / window_y;
			}

			return k;
		};

		factory.style = function(list) {
			var arr = [];
			for (var i in list)
			{ 
			    arr.push(i + ': ' + list[i] + ';');
			}
			return list = arr.join(' ');
		};

		factory.drawCanvas = function() {
			var width = 0;
			var height = 0;

			for (var key in this.data)
			{
				var type = this.data[key].canvas.type;
				var	angle = this.data[key].canvas.angle;
				if (type <=2 )
				{
					if (angle == '0' || angle == '180')
					{
						height += this.data[key].canvas.height;
						width = Math.max(width, this.data[key].canvas.width);
					}

					if (angle == '90' || angle == '270')
					{
						width += this.data[key].canvas.width;
						height = Math.max(height, this.data[key].canvas.height);
					}
				}
			}
			var canvasWidth = $('.canvas').outerWidth();
			var k = width / canvasWidth;
			var canvasHeight = height / k;
			$('.canvas').height(canvasHeight);
			return k;
		};

		factory.render = function() {
			var k = this.drawCanvas();
			var offsetX = 0;
			var offsetY = 0;
			for (var key in this.data)
			{
				var c = this.data[key].canvas;

				var style = {
					'width': (c.width / k) + 'px',
					'height':(c.height / k) + 'px',
				};
				var type = this.data[key].canvas.type;
				var	angle = this.data[key].canvas.angle;
				if (type <= 2)
				{
					if (angle == '0' || angle == '90')
					{
						if (key > 0)
						{
							if (angle == '0')
							{
								offsetX = (offsetX - (c.width / k)) / 2;
							}

							if (angle == '90')
							{
								offsetY = (offsetY - (c.height / k)) / 2;
							}
						}

						style.left = offsetX + 'px';
						style.bottom = offsetY + 'px';
					}

					if (angle == '180' || angle == '270')
					{
						if (key > 0)
						{
							if (angle == '180')
							{
								offsetX = (offsetX - (c.width / k)) / 2;
							}

							if (angle == '270')
							{
								offsetY = (offsetY - (c.height / k)) / 2;
							}
						}

						style.right = offsetX + 'px';
						style.top = offsetY + 'px';
					}

					if (angle == '0' || angle == '180')
					{
						offsetX = (c.width / k);
						offsetY += (c.height / k);
					}

					if (angle == '90' || angle == '270')
					{
						offsetX += (c.width / k);
						offsetY = (c.height / k);
					}
				}

				var id = 'box-' + key;
				$('.canvas').append('<div class="box" id="' + id + '" style="' + this.style(style) + '"></div>');
				for (var i = 0; i < this.data[key].boards.length; i++)
				{
					var board = this.data[key].boards[i];
					var style = {
						'background': 'rgba(' + board.color + ', 0.5)',
						'width': (board.width / k) + 'px',
						'height':(board.height / k) + 'px',
						'left': (board.x / k) + 'px',
						'bottom': (board.y / k) + 'px'
					};

					$('#' + id).append('<div class="board" style="' + this.style(style) + '"></div>');
				}
			}
		};

		factory.getColsCount = function(width) {
			return Math.ceil(this.data[this.current].canvas.width / width);
		};

		factory.getColsRow = function(width) {
			return Math.ceil(this.data[this.current].canvas.height / width);
		};
		
		factory.getPair = function(number) {
			if(number % 2 == 0)
			{
				return true
			}
		};

		return factory;
	});
})()

;