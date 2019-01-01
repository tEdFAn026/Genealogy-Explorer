'use strict';

(function($) { 

	$(function() {
		$.ajax({
			type : "GET",
			url : "/GE/person/descendants/" + $("#presonId").text(),
			success : function(data) {
				if(data.hasOwnProperty("name")){
					data = setClass(data, 0);
					$('#chart-container-descendants').orgchart({
					      'data' : data,
					      'nodeContent': 'gender'
					    });
				}
			},
		});
		
		$.ajax({
			type : "GET",
			url : "/GE/person/ancestors/" + $("#presonId").text(),
			success : function(data) {
				if(data.hasOwnProperty("name")){
					data = setClass(data, 0);
					$('#chart-container').orgchart({
					      'data' : data,
					      'nodeContent': 'gender',
					      'direction': 'b2t',
					    });
				}
			},
		});
  });
	
	function setClass(json, level) {
		var classes = ["","middle-level","rd-dept","product-dept","frontend1","pipeline1"];
		json.className = classes[level % classes.length];
		var children = json.children;
		if(children){
			$.each(children, function() {
				var child = this;
				setClass(child, level+1);
			});
		}
		
		var parents = json.parents;
		if(parents){
			var m = parents.m;
			var f = parents.f;
			var a = [];
			if (m)
				a.push(setClass(m, level + 1));
			if (f)
				a.push(setClass(f, level + 1));
			
			delete json.parents;
			json.children = a;
		}
		return json;
	}
	
	
	

})(jQuery);