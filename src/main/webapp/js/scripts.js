// Empty JS for your own code to be here
$(function() {
	console.log("inject success");

	$("#modalDelete").click(function() {
		var id = $('#modalDelete').attr("personID");
		console.log(id);
		$.ajax({
			type : "GET",
			url : "/GE/person/delete/" + id,
			success : function(data) {
				console.log(data.result);
				var success = data.result;
				if (success) {
					$("#person_" + id).remove();
					reloadTable();
					if($("#sample").length)
						init();
				} else
					alert("delete fail:" + data.message);
			},
		});
	});

	$("#modalAdd").click(function() {
		var d = {};
		var t = $("#addForm").serializeArray();
		$.each(t, function() {
			console.log(this.name,this.value,$.trim(this.value));
			if ($.trim(this.value))
				d[this.name] = this.value;
		});
		
		
		if($("#addForm").find("#male").attr('checked')){
			d.gender="male";
		}
		else if($("#addForm").find("#female").attr('checked')){
			d.gender="female";
		}
		
		console.log(d);
		var checkResult = verifyCheck._click();
		if (checkResult) {	
			$.ajax({
				type : "POST",
				dataType : "JSON",
				contentType : 'application/json;charset=UTF-8',// 关键是要加上这行
				traditional : true,// 这使json格式的字符不会被转码
				data : JSON.stringify(d),
				url : "/GE/person/addJSON?update="+$("#modalAdd").attr("update"),
				success : function(data) {
					console.log(data);
					if (data.result) {
						$("#addForm").find('.form-group').addClass("d-none");
						$("#addForm").find('.alert')
								.find("#alertTitle")
								.html("Success!");
						
						$("#modalAdd").addClass("d-none");
						var g = "N/A";
						if (d.hasOwnProperty("gender")) {
							g = d.gender;
						}
						
						if($("#modalAdd").attr("update")=='true'){
							var personID = $("#modalAdd").attr("personID");
							$("#person_"+personID).remove();
							
							$("#addForm")
								.find('.alert')
								.removeClass("d-none")
								.removeClass("alert-danger")
								.addClass("alert-warning");
							$("#addForm")
								.find('.alert')
								.find("#alertMsg")
								.html("Edit person success!");
						} else {
							$("#addForm")
								.find('.alert')
								.removeClass("d-none")
								.removeClass("alert-danger")
								.addClass("alert-success");
							$("#addForm")
								.find('.alert')
								.find("#alertMsg")
								.html("Add person success!");
						}

						var insertID = getInsertID(d.key);
						console.log("insertID",insertID);
						var newLine = "<tr class=\"table-info\" id=\"person_"
							+ d.key
							+ "\"><td>"
							+ d.key
							+ "</td><td>"
							+ d.name
							+"</td><td>"
							+ g
							+ "</td><td><a href=\"./detail/"
							+ d.key
							+ "\" class=\"btn btn-sm btn-info\">Detail</a> <a class=\"btn btn-sm btn-warning\" href=\"#addPerson\" role=\"button\" data-toggle=\"modal\" onclick=\"setEditPersonID("
							+ d.key
							+ ")\">&nbsp;&nbsp;Edit&nbsp;&nbsp;</a> <a class=\"btn btn-sm btn-danger\" href=\"#deletePerson\" role=\"button\" data-toggle=\"modal\" onclick=\"setDeletePersonID("
							+ d.key
							+ ",'q')\">Delete</a></td></tr>";
						
						console.log(insertID === d.key);
						if(insertID === d.key)	
							$("#listpeople").append(newLine);
						else 
							$("#person_"+insertID).before(newLine);
						
						
						 reloadTable();
					} else {
						$("#addForm").find('.alert')
							.removeClass("d-none")
							.removeClass("alert-success")
							.addClass("alert-danger");
						$("#addForm").find('.alert')
							.find("#alertMsg")
							.html(data.message+ "!");
						$("#addForm").find('.alert')
							.find("#alertTitle")
							.html("Warning!");
					}
				},
			});
		}
	});

	$(".modalAddClose").click(function() {
		setTimeout(function() {
			var allinput = $(':input', '#addForm').not(':button,:submit,:reset');// 将myform表单中input元素type为button、submit、reset排除
			$("#addForm").find('.form-group').removeClass("d-none");
			$("#addForm").find('.alert').addClass("d-none");	
			allinput.val('') // 将input元素的value设为空值
			.removeAttr('checked'); // 如果任何radio/checkbox/select inputs有checked
									// or selected 属性，将其移除
			$.each(allinput, function() {
				var currTr = $(this);
				verifyCheck._clearTips(currTr);
			});
			$("#modalAdd").removeClass("d-none");
		}, 200);
	});

})

function setAddPerson(){
	$("#addPerson").find("#myModalLabel").text("Add new person");
	$("#modalAdd").text("Add");
	$("#modalAdd").removeClass("btn-warning").addClass("btn-success");
	$("#modalAdd").attr("update",'false');
}

function setDeletePersonID(ID, name) {
// console.log("delete setting success");
	$('#modalDelete').attr("personID", ID);
	$('#deleteWarning').html("This operation can not be revert, please comfirm delete.<br>key:"
		+ ID + " name:" + name);
}

function setEditPersonID(key){
	$.ajax({
		type : "GET",
		url : "/GE/person/get/" + key,
		success : function(data) {
			if(data.hasOwnProperty("name")){
				$("#modalAdd").attr("update",'true');
				$("#modalAdd").attr("personID",key);
				$("#modalAdd").text("Edit");
				$("#modalAdd").removeClass("btn-success").addClass("btn-warning");
				$("#addPerson").find("#myModalLabel").text("Edit person");
				$("#addForm").find("#key").val(data.key);
				$("#addForm").find("#name").val(data.name);
				$("#addForm").find("#m").val(data.m);
				$("#addForm").find("#f").val(data.f);
				var dob = new Date(data.dob);
				$("#addForm").find("#dob").val(dob.format("yyyy-MM-dd"));
				if(data.gender=="male")
					$("#addForm").find("#male").attr('checked','true');
				else if(data.gender=="female")
					$("#addForm").find("#female").attr('checked','true');
			}
			else {
				$("#modalAdd").addClass("d-none");
				$("#addPerson").find("#myModalLabel").val(data.message);
			}
		},
	});
}

function getInsertID(id) {
	trs = $("#listpeople").find("tr");
	var currTrID = id;
	$.each(trs, function() {
		var currTr = $(this);
		currTrID = currTr.attr("id").replace("person_", "");
//		console.log("currTrID", currTrID);
		if (parseInt(currTrID) > parseInt(id)) {
//			console.log(currTrID, id);
			return false;
		}
	});

	if (parseInt(currTrID) > parseInt(id))
		return currTrID;
	else
		return id;

}

function reloadTable(){
	trs = $("#listpeople").find("tr");
	var count = 0;
	var classes = ["table-active","table-info","table-success","table-warning","table-danger"];
	$.each(trs, function() {
		var currTr = $(this);
		currTr.attr("class",classes[count%5]);
		count++;
	});
}

Date.prototype.format = function(fmt)   
{ // author: meizz
  var o = {   
    "M+" : this.getMonth()+1,                 // 月份
    "d+" : this.getDate(),                    // 日
    "h+" : this.getHours(),                   // 小时
    "m+" : this.getMinutes(),                 // 分
    "s+" : this.getSeconds(),                 // 秒
    "q+" : Math.floor((this.getMonth()+3)/3), // 季度
    "S"  : this.getMilliseconds()             // 毫秒
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}  

