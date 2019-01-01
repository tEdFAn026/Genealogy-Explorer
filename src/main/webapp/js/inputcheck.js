(function ($) {	
	var opt;
	var verifyCheck=function(config){	
		config=$.extend(require.defaults,config||{});		
		opt=config;			
		return (new require())._init(config);		
	};		
	function require(options){
		var rule={
			uname:/^[\u4E00-\u9FA5a-zA-Z][\u4E00-\u9FA5a-zA-Z\s]*$/,
			int:/^[0-9]*$/,				
			s:''	
		};
		this.rules={			
			isNonEmpty: function(value, errorMsg) {
				errorMsg=errorMsg||" ";		 
				if (!value.length) return errorMsg;           
			},	
			minLength: function(value, length, errorMsg) {
				errorMsg=errorMsg||" ";	          
				if (value.length < length) return errorMsg;            
			},
			maxLength: function(value, length, errorMsg) {
				errorMsg=errorMsg||" ";			   
				if (value.length > length) return errorMsg;
			},
			isRepeat:function(value, range, errorMsg){
				errorMsg=errorMsg||" ";		
				if(value!==$("#"+range).val()) return errorMsg;
			},	
			between: function(value, range, errorMsg) {
				errorMsg=errorMsg||" ";           
				var min = parseInt(range.split('-')[0]);
				var max = parseInt(range.split('-')[1]);			
				if (value.length < min || value.length > max) return errorMsg;
			},	
			level:function(value,range,errorMsg){
				errorMsg=errorMsg||" ";
				var r=verifyCheck.pwdStrong(value);						
				if(range>4) range=3;
				if(r<range)  return errorMsg;			
			},
			isInt: function(value, errorMsg) {
				errorMsg=errorMsg||" ";
				if (!rule.int.test(value)) return errorMsg;
			},
			isUname: function(value, errorMsg) {
				errorMsg=errorMsg||" ";
				if (!rule.uname.test(value)) return errorMsg;
			},
			isChecked: function(value, errorMsg, el){
				errorMsg=errorMsg||" ";
				var a=$(el).find('input:checked').length,
					b=$(el).find('.on').length;							
				if(!a && !b) return errorMsg;
			}
		}
	};
	require.prototype={
		_init:function(config){
			this.config=config;				
			this.getInputs = $('#'+config.formId).find('.required:visible');
			var result=false;
			var $this=this;
			$('body').on({
				blur:function(event){	
					$this.formValidator($(this));							
					config.onBlur ? config.onBlur($(this)) : '';		
				},
				focus:function(event){	
					console.log("this:",$(this).parent().find("label.focus"));
					config.onFocus ? config.onFocus($(this)) : $(this).parent().find("label.focus").not(".valid").removeClass("d-none") && $(this).parent().find("label.valid").addClass("d-none");
				},
				keyup:function(event){
					config.onKeyup ? config.onKeyup($(this)) : '';
				},			
				change:function(event){
					config.onChange ? config.onChange($(this)) : '';	
				}
			},"#"+config.formId+" .required:visible");	
			$('body').on("click",".close",function(){
				var p=$(this).parent(),
					input=p.find("input");
				input.val("").focus();	
			});		
		},

		formValidator:function($el){
			var dataValid = $el.attr('data-valid');
			if(dataValid===undefined) return false;
			var validLen = dataValid.split('||');
			var errCollection = $el.attr('data-error');
			if(errCollection===undefined) errCollection="";		
			var errMsgAry = errCollection.split("||");
			var ruleAry = [];
			for (var i = 0; i < validLen.length; i++) {
				ruleAry.push({
					strategy: validLen[i],
					errorMsg: errMsgAry[i]
				});
			};		
			return this._add($el, ruleAry);	
		},

		_add:function(dom,rules){
			var self = this;
			for (var i = 0, rule; rule = rules[i++];) {			
				 var strategyAry = rule.strategy.split(':');				
				 var errorMsg = rule.errorMsg;
				 var strategy = strategyAry.shift(); 
				 strategyAry.unshift(dom.val());
				 strategyAry.push(errorMsg);
				 strategyAry.push(dom);				
				 var c=self.rules[strategy].apply(dom,strategyAry);
				 if(c){					 
					 opt.resultTips ? opt.resultTips(dom,false,c) : verifyCheck._resultTips(dom,false,c);
					 return false;
				}
			}
			opt.successTip ? (
				opt.resultTips ? opt.resultTips(dom,true) : verifyCheck._resultTips(dom,true)
			) : verifyCheck._clearTips(dom);		
			return true;		
		},	
	};
	
	verifyCheck._click=function(formId){		
		formId = formId || opt.formId;
		var obj=$("#"+formId).find('.required:visible'),
			self=this,result=true,t=new require(),r=[];
		$.each(obj, function(index, el){
			result=t.formValidator($(el));
			if(result) r.push(result);	
		});	
		if(obj.length!==r.length) result=false;
		return result;
	};

	verifyCheck._clearTips=function(obj){
		obj.parent().find(".valid").addClass("d-none");
		obj.removeClass("is-invalid").removeClass("is-valid");
	};

	verifyCheck._resultTips=function(obj,isRight,value){
		obj.parent().find("label.focus").not(".valid").addClass("d-none");
		obj.parent().find("label.valid").removeClass("d-none");
		obj.removeClass("is-invalid");		
		value=value||"";
		if(value.length>21) value="<span>"+value+"</span>";
		var o=obj.parent().find("label.valid");
		if(!isRight){
			o.parent().removeClass("valid-feedback").addClass("invalid-feedback");
			obj.addClass("is-invalid");
		}else{
			o.parent().removeClass("invalid-feedback").addClass("valid-feedback");
			if($.trim(obj.val())){				
				obj.addClass("is-valid");
			}else{
				obj.removeClass("is-invalid").removeClass("is-valid");
				obj.parent().find("label.focus").not(".valid").removeClass("d-none");
			}
		}
		o.text("").append(value);	
	};
	
	require.defaults = {
		formId:'addForm',
		onBlur:null,
		onFocus:null,
		onChange: null,
		successTip: true,
		resultTips:null,
		clearTips:null,
	};	
	window.verifyCheck = $.verifyCheck= verifyCheck;
})(jQuery);

$(function(){
	console.log("check inject");
	verifyCheck();
});



