(function() {
	angular.module("app").factory("print", function() {
		var factory = {};
		factory.current = 0;
		factory.currentRow = 0;
		factory.data = [];
		factory.col_number = 0;
		factory.row_number = 0;
		factory.direction = 'col';
		factory.widthStart = 0;
		

		factory.init = function(width, height, type, angle, i) {
			var canvas = {};
			canvas.width = width;
			canvas.height = height;
			canvas.type = type;
			canvas.angle = angle;
			canvas.center = false;
			canvas.terrace = i;	

			this.current = this.data.length;
			this.data.push({'canvas': canvas,
					   		'boards': []});
		};

		factory.reset = function() {
			this.col_number = 0;
			this.row_number = 0;
			this.data = [];
			this.current = 0;
			this.direction = 'col';
			this.y = 0;
			this.x = 0;
			$('.canvas').html('');
		};

		factory.col = function(col, a) {
			this.direction = 'col';
			this.col_number = col;
			this.y = 0;
		};

		factory.row = function(row, key) {
			this.direction = 'row';
			this.row_number = row;
			this.x = 0;
			this.currentRow = key;
		};

		factory.startWidth = function(widthStart) {
			this.widthStart = widthStart;
		};

		factory.board = function(width, height, type) {
			type = type || 0;
			var color = '0, 0, 0';
			switch (type)
			{
				case 0: color = '184, 210, 188'; break;
				case 1: color = '139, 172, 142'; break;
				case 2: color = '184, 195, 210'; break;
			}
			var cols = this.getColsCount(width);
			var rows = this.getColsRow(this.widthStart);
			var position = this.getPosition();
			var remainBoard = this.getRemainBoard(cols, rows, width, this.widthStart);
			var remainBoardCircle = this.getRemainBoardCircle();

			var board = {};
			board.widthStart = this.widthStart;
			board.type = type;
			board.color = color;
			board.width = width;
			board.height = height;
			board.cols = cols;
			board.rows = rows;
			board.position = position;
			board.remainBoard = remainBoard;
			board.remainBoardCircle = remainBoardCircle;

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

		factory.triaglePositionHorisontaly = function(board, width, height) {
			var type = this.data[this.current].canvas.type;
			var terrace = this.data[this.current].canvas.terrace;

			if (type == '2' && terrace == '0' || type <= 1)
			{
				board.width = board.widthStart;
				board.x = this.x - board.remainBoard;
				board.y = this.row_number * height;
				this.x += width;
				this.x = this.x;
			}
			if (type == '2' && terrace == '1')
			{
				board.x = this.x + board.remainBoardCircle;
				board.y = this.row_number * height;
				this.x += width;
				this.x = this.x ;
			}
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
				if (type <= 2 )
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
				else
				{
					height = this.data[key].canvas.height;
					width = Math.max(width, this.data[key].canvas.width);
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
					'height':(c.height / k) + 'px'
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
				else
				{
					
				}

				var id = 'box-' + key;
				$('.canvas').append('<div class="box" id="' + id + '" style="' + this.style(style) + '"></div>');
				for (var i = 0; i < this.data[key].boards.length; i++)
				{
					var board = this.data[key].boards[i];
					var style = {
						'background': 'rgba(' + board.color + ', 1)',
						'width': (board.width / k) + 'px',
						'height': (board.height / k) + 'px',
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

		factory.getColsRow = function(widthStart) {
			return Math.ceil(this.data[this.current].canvas.width / widthStart);
		};
		
		factory.getPair = function(number) {
			if (number % 2 == 0)
			{
				return true
			}
		};

		factory.getPosition = function() {
			var position = {};
			var angle = this.data[this.current].canvas.angle;
			var type = this.data[this.current].canvas.type;
			var terrace = this.data[this.current].canvas.terrace;

			if (type == '0')
			{
				position.positionX = 'left';
				position.positionY = 'bottom';
			}
			if (type == '1' || type =='2')
			{
				this.data[this.current].canvas.center = true;
				if (terrace == '0')
				{
					position.positionX = 'center';
					position.positionY = 'centerTop';
				}
				if (terrace == '1')
				{
					position.positionX = 'center';
					position.positionY = 'centerBottom';
				}
			}
			if (this.data[this.current].canvas.type == 3)
			{
				if (terrace == '0')
				{
					position.positionX = 'center';
					position.positionY = 'centerTop';
				}
				if (terrace == '1')
				{
					position.positionX = 'left';
					position.positionY = 'centerBottom';
				}
			}
			return position;
		};

		factory.getRemainBoard = function(cols, rows, width, widthStart) {
			if (this.data[this.current].canvas.center)
			{
				if (this.direction == 'col')
				{
					return ((cols * width) - this.data[this.current].canvas.width) / 2;
				}
				else
				{
					return ((rows * widthStart) - this.data[this.current].canvas.width) / 2;
				}
			}
		};

		factory.getRemainBoardCircle = function() {
			var type = this.data[this.current].canvas.type;
			var terrace = this.data[this.current].canvas.terrace;
			if (type == '2' && terrace == '1')
			{
				return  (this.data[this.current].canvas.width - this.currentRow) / 2;
			}
		};

		return factory;
	});
})()
;

