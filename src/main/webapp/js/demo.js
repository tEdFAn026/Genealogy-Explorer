(function() {

	/**
	 * 淘宝搜索 API 测试
	 */
	$("#search").bsSuggest({
		indexId : 2, //data.value 的第几个数据，作为input输入框的内容
		indexKey : 1, //data.value 的第几个数据，作为input输入框的内容
		allowNoKeyword : false, //是否允许无关键字时请求数据。为 false 则无输入时不执行过滤请求
		multiWord : true, //以分隔符号分割的多关键字支持
		separator : ",", //多关键字支持时的分隔符，默认为空格
		getDataMethod : "url", //获取数据的方式，总是从 URL 获取
		showHeader : true, //显示多个字段的表头
		autoDropup : true, //自动判断菜单向上展开
		pathVariable : true,
		hideOnSelect : true,
		searchingTip : 'searching...',
		effectiveFieldsAlias : {
			Id : "Key",
			Keyword : "name"
		},
		url : '/GE/person/get/', /*优先从url ajax 请求 json 帮助数据，注意最后一个参数为关键字请求参数*/
		//        jsonp: 'callback',               //如果从 url 获取数据，并且需要跨域，则该参数必须设置
		// url 获取数据时，对数据的处理，作为 fnGetData 的回调函数
		fnProcessData : function(json) {
			var index, len, data = {
				value : []
			};

			if (!json) {
				return false;
			}

			if (json.hasOwnProperty("result") && !json.result) {			
				data.value.push({
					"Id" : "",
					"Keyword" : json.message,
					"gender" : ""
				});
			} else if (json.hasOwnProperty("list")) {
				console.log('data');
			} else {
				var g = json.gender;
				if (!g)
					g = "N/A"
				data.value.push({
					"Id" : json.key,
					"Keyword" : json.name,
					"gender" : g
				});
			}
			console.log('data', data);
			return data;
		}
	}).on('onDataRequestSuccess', function(e, result) {
		console.log('onDataRequestSuccess: ', result);
	}).on('onSetSelectValue', function(e, keyword, data) {
		console.log('onSetSelectValue: ', keyword, data);
	}).on('onUnsetSelectValue', function() {
		console.log("onUnsetSelectValue");
	}).on('mousedown',function(){
		console.log("mousedown");
	});

}());
