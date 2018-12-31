/**
 * 功能说明: 输入验证
 * 
 * @author: vivy <lizhizyan@qq.com>
 * @time: 2015-9-25 16:15:30
 * @version: V1.1.0
 * @使用方法: <input class="required" type="text" data-valid="isNonEmpty||isEmail"
 *        data-error="email不能为空||邮箱格式不正确" id="" /> 1、需要验证的元素都加上【required】样式
 *        2、@data-valid 验证规则，验证多个规则中间用【||】隔开，更多验证规则，看rules和rule，后面遇到可继续增加
 *        3、@data-error 规则对应的提示信息，一一对应
 * 
 * @js调用方法： verifyCheck({ formId:'verifyCheck', <验证formId内class为required的元素
 *          onBlur:null, <被验证元素失去焦点的回调函数> onFocus:null, <被验证元素获得焦点的回调函数>
 *          onChange: null, <被验证元值改变的回调函数> successTip: true, <验证通过是否提示>
 *          resultTips:null, <显示提示的方法，参数obj[当前元素],isRight[是否正确提示],value[提示信息]>
 *          clearTips:null, <清除提示的方法，参数obj[当前元素]> code:true
 *          <是否需要手机号码输入控制验证码及点击验证码倒计时,目前固定手机号码ID为phone,验证码两个标签id分别为time_box，resend,填写验证框id为code>
 *          phone:true <改变手机号时是否控制验证码> }) $("#submit-botton").click(function(){
 *          <点击提交按钮时验证> if(!common.verify.btnClick()) return false; })
 * 
 */
(function ($) {	
	var opt;
	var verifyCheck=function(config){	
		config=$.extend(require.defaults,config||{});		
		opt=config;			
		return (new require())._init(config);		
	};		
	function require(options){
		var rule={// 验证规则
			uname:/^[\u4E00-\u9FA5a-zA-Z][\u4E00-\u9FA5a-zA-Z\s]*$/,
			int:/^[0-9]*$/,				
			s:''	
		};
		this.rules={			
			isNonEmpty: function(value, errorMsg) {// 不能为空
				errorMsg=errorMsg||" ";		 
				if (!value.length) return errorMsg;           
			},	
			minLength: function(value, length, errorMsg) { // 大于
				errorMsg=errorMsg||" ";	          
				if (value.length < length) return errorMsg;            
			},
			maxLength: function(value, length, errorMsg) {// 小于
				errorMsg=errorMsg||" ";			   
				if (value.length > length) return errorMsg;
			},
			isRepeat:function(value, range, errorMsg){ // 重复密码
				errorMsg=errorMsg||" ";		
				if(value!==$("#"+range).val()) return errorMsg;
			},	
			between: function(value, range, errorMsg) {// 大于小于
				errorMsg=errorMsg||" ";           
				var min = parseInt(range.split('-')[0]);
				var max = parseInt(range.split('-')[1]);			
				if (value.length < min || value.length > max) return errorMsg;
			},	
			level:function(value,range,errorMsg){// 密码复杂程度
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
//					console.log("blur",config);
					$this.formValidator($(this));							
					config.onBlur ? config.onBlur($(this)) : '';		
				},
				focus:function(event){	
//					console.log("focus",config.onFocus);
					console.log("this:",$(this).parent().find("label.focus"));
					config.onFocus ? config.onFocus($(this)) : $(this).parent().find("label.focus").not(".valid").removeClass("d-none") && $(this).parent().find("label.valid").addClass("d-none");
				},
				keyup:function(event){
//					console.log("keyup",config);
					config.onKeyup ? config.onKeyup($(this)) : '';
				},			
				change:function(event){
//					console.log("change",config);
					config.onChange ? config.onChange($(this)) : '';	
				}
			},"#"+config.formId+" .required:visible");	
			$('body').on("click",".close",function(){
				var p=$(this).parent(),
					input=p.find("input");
				input.val("").focus();	
			});		
		},
		/**
		 * 功能说明: 分割要验证的规则并整理
		 * 
		 * @author: vivy <lizhizyan@qq.com>
		 * @time: 2015-9-22 17:51:30
		 * @version: V1.1.0
		 * @param: $el<当前被验证的元素>
		 */
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
		/**
		 * 功能说明: 获取验证结果
		 * 
		 * @author: vivy <lizhizyan@qq.com>
		 * @time: 2015-9-22 17:53:30
		 * @version: V1.1.0
		 * @param: dom<当前被验证的元素>
		 * @param: rules<逐一验证的数组>
		 */
		_add:function(dom,rules){// 验证
			var self = this;
			for (var i = 0, rule; rule = rules[i++];) {			
				 var strategyAry = rule.strategy.split(':');				
				 var errorMsg = rule.errorMsg;
				 var strategy = strategyAry.shift(); // 前删匹配方式并赋值
				 strategyAry.unshift(dom.val()); // 前插value值
				 strategyAry.push(errorMsg); // 后插出错提示
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
	
	/***************************************************************************
	 * 外部可调用的公用方法************************ /** 功能说明: 外部触发验证结果，常用于点击提交按钮时调用，返回验证结果
	 * 
	 * @author: vivy <lizhizyan@qq.com>
	 * @time: 2015-9-25 15:37:30
	 * @version: V1.1.0
	 * @update:
	 * @param: formId<被验证的元素包ID>
	 * @return: 验证的结果
	 */
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
	/**
	 * 功能说明: 清空提示
	 * 
	 * @author: vivy <lizhizyan@qq.com>
	 * @time: 2015-9-22 17:55:30
	 * @version: V1.1.0
	 * @param: obj<当前被验证的元素>
	 */
	verifyCheck._clearTips=function(obj){
		console.log("_clearTips:",obj);
		obj.parent().find(".valid").addClass("d-none");
		obj.removeClass("is-invalid").removeClass("is-valid");
	};
	/**
	 * 功能说明: 新增提示
	 * 
	 * @author: vivy <lizhizyan@qq.com>
	 * @time: 2015-9-22 17:57:30
	 * @version: V1.1.0
	 * @param: obj<当前被验证的元素>
	 * @param: isRight<是否是正确的提示>
	 * @param: value<提示信息>
	 */
	verifyCheck._resultTips=function(obj,isRight,value){
//		console.log("_resultTips:",obj,isRight,value);
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
	
	/**
	 * 默认配置
	 */
	require.defaults = {
		formId:'addForm',	// 验证的ID
		onBlur:null,// 被验证元素失去焦点的回调函数
		onFocus:null,// 被验证元素获得焦点的回调函数
		onChange: null,// 被验证元素值改变的回调函数
		successTip: true,// 验证通过是否有提示
		resultTips:null,// 验证提示的回调函数，传回参数obj[当前元素],isRighe[验证是否通过],value[提示的值]
		clearTips:null,// 清空提示的回调函数，传回参数obj[当前元素]
	};	
	window.verifyCheck = $.verifyCheck= verifyCheck;
})(jQuery);

$(function(){
	console.log("check inject");
	verifyCheck();
});



