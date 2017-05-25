(function() {
	angular.module("app").service("connect", function() {
		this.caruselClass = {};
		this.items = [0, 1, 2, 3];
		var self = this;
		var positionDefolt = {};

		positionDefolt[1] = '0';
       	positionDefolt[2] = '1';
       	positionDefolt[3] = '2';
       	positionDefolt[4] = '3';

		this.getPositionClasses = function(data, position) {
			this.items = data || self.items;
			if (position == undefined)
			{
				this.position = positionDefolt;
			}
			else
			{
				this.position = position;
			}
			for (var index in  this.items)
	        {
	        	for (var key in  this.position)
	            {	
	                if ((this.position[key] != '' || this.position[key] == 0) && index == this.position[key])
	                {
	                   this.caruselClass[index] =  key;
	                }
	            }
	            if (index < this.position[1])
	            {
	               this.caruselClass[index] = 'before';
	            }
	            if (index > this.position[key])
	            {
	               this.caruselClass[index] = 'after';
	            }
	        }
	       	return this.caruselClass;
		};

		this.next = function(data, position) {
			this.items = data || self.items;
			if (position == undefined)
			{
				this.position = positionDefolt;
			}
			else
			{
				this.position = position;
			}
			var a = Object.keys(this.position).length;
			var b = this.items.length;
			if (this.position[1]  <= ((b - a) - 1))
	        {
	            for (var key in  this.position)
	            {
	                this.position[key]++;
	            }
	         	return self.getPositionClasses(data, position);
	        }
		};

		this.prev = function(data, position) {
			this.items = data || self.items;
			if (position == undefined)
			{
				this.position = positionDefolt;
			}
			else
			{
				this.position = position;
			}
			if (this.position[1] - 1 >= 0)
	        {
	            for (var key in  this.position)
	            {
	                this.position[key]--;
	            }
	            return  self.getPositionClasses(data, position);
	        }
		};
	});
})()
;

