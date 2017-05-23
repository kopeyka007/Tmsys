(function() {
	angular.module("app").factory("carusel", function() {
		var carusel = {};
		carusel.position = {};
		carusel.items = [];

        carusel.position[1] = '0';
        carusel.position[2] = '1';
        carusel.position[3] = '2';
        carusel.position[4] = '3';


		carusel.getClasses = function(data, figureArr) {
			var caruselClass = {};
			if (figureArr == true)
			{
				this.items = data;
		        for (var index in  this.items)
		        {
		            for (var key in  this.position)
		            {
		                if ((this.position[key] != '' || this.position[key] == 0) && index == this.position[key])
		                {
		                   caruselClass[index] = 'slider' + key;
		                }
		            }
		            if (index < this.position[1])
		            {
		               caruselClass[index] = 'sliderBefore';
		            }

		            if (this.position[4] != '' && index > this.position[4])
		            {
		                caruselClass[index] = 'sliderAfter';
		            }
		        }
		        return caruselClass;
			}
			else
			{
				this.items = data;
		        for (var index in  this.items)
		        {
		            for (var key in  this.position)
		            {
		                if ((this.position[key] != '' || this.position[key] == 0) && index == this.position[key])
		                {
		                    caruselClass[index] = 'slider' + key;
		                }
		            }
		            if (index < this.position[1])
		            {
		               caruselClass[index] = 'sliderBefore';
		            }

		            if (this.position[2] != '' && index > this.position[2])
		            {
		                caruselClass[index] = 'sliderAfter';
		            }
		        }
		        return caruselClass;
			}
	    };   

	    carusel.next = function(data) {
	        if (this.position[1] + 1 <= (carusel.items.length - 2))
	        {
	            for (var key in  this.position)
	            {
	                this.position[key]++;
	            }
	            carusel.getClasses(data, false);
	        }
	    };

	    carusel.prev = function(data) {
	        if (this.position[1] - 1 >= 0)
	        {
	            for (var key in  this.position)
	            {
	                this.position[key]--;
	            }
	            carusel.getClasses(data, false);
	        }
	    };

	    carusel.getPosition = function(key) {
	        var current = 0;
	        this.oldPosition = angular.copy(this.position);
	        for (var index in  this.position)
	        {
	            if (this.position[index] == key)
	            {
	                current = index; 
	            }
	        }
	        carusel.getCurrent(current);
	    };

	    carusel.getCurrent = function(current) {
	        if (current == 2)
	        {
	            caruselClass[this.position[1]] = 'sliderBefore';
	            caruselClass[this.position[2]] = 'slider1';
	        }
	        if (current == 3)
	        {
	            caruselClass[this.position[3]] = 'slider4';
	           	caruselClass[this.position[4]] = 'sliderAfter';
	        }
	    }

	    carusel.init = function(key) {
            this.position[1] = '';
            this.position[2] = '';
        };

        carusel.initFigure = function(key) {
            this.position[1] = '';
            this.position[2] = '';
            this.position[3] = '';
            this.position[4] = '';
        };

	return carusel;
	});
})()
;

