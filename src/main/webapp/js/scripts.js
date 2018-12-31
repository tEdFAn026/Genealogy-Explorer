// Empty JS for your own code to be here
$(function() {
	console.log("inject success");

	$("#modalDelete").click(function() {
		var id = $('#modalDelete').attr("personID");
		console.log(id);
		$.ajax({
			type : "GET",
			url : "./delete/" + id,
			success : function(data) {
				console.log(data.result);
				var success = data.result;
				if (success) {
					$("#person_" + id).remove();
					reloadTable();
				} else
					alert("delete fail:" + data.message);
			},
		});
	});

	$("#modalAdd").click(function() {
		var d = {};
		var t = $("#addForm").serializeArray();
		$.each(t, function() {
			if ($.trim(this.value))
				d[this.name] = this.value;
		});
		console.log(d);
		var checkResult = verifyCheck._click();
		if (checkResult) {
			$.ajax({
				type : "POST",
				dataType : "JSON",
				contentType : 'application/json;charset=UTF-8',// 关键是要加上这行
				traditional : true,// 这使json格式的字符不会被转码
				data : JSON.stringify(d),
				url : "./addJSON",
				success : function(data) {
					console.log(data);
					if (data.result) {
						$("#addForm").find('.form-group').addClass("d-none");
						$("#addForm")
								.find('.alert')
								.removeClass("d-none")
								.removeClass("alert-danger")
								.addClass("alert-success");
						$("#addForm")
								.find('.alert')
								.find("#alertMsg")
								.html("Add person success!");
						$("#addForm").find('.alert')
								.find("#alertTitle")
								.html("Success!");

						var g = "N/A";
						if (d.hasOwnProperty("gender")) {
							g = d.gender;
						}

						var insertID = getInsertID(d.key);
						console.log("insertID",insertID);
						var newLine = "<tr class=\"table-info\" id=\"person_"
							+ d.key
							+ "\"><td>"
							+ d.key
							+ "</td><td>q</td><td>"
							+ g
							+ "</td><td><a href=\"./detail/"
							+ d.key
							+ "\" class=\"btn btn-sm btn-info\">Detail</a> <a class=\"btn btn-sm btn-danger\" href=\"#deletePerson\" role=\"button\" data-toggle=\"modal\" onclick=\"setDeletePersonID("
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
			$("#addForm").find('.form-group').removeClass("d-none");
			$("#addForm").find('.alert').addClass("d-none");
			$(':input', '#addForm').not(':button,:submit,:reset') // 将myform表单中input元素type为button、submit、reset排除
			.val('') //将input元素的value设为空值
			.removeAttr('checked'); // 如果任何radio/checkbox/select inputs有checked or selected 属性，将其移除
		}, 200);
	});

})

function setDeletePersonID(ID, name) {
	console.log("delete setting success");
	$('#modalDelete').attr("personID", ID);
	$('#deleteWarning').html("This operation can not be revert, please comfirm delete.<br>key:"
		+ ID + " name:" + name);
}

function getInsertID(id) {
	trs = $("#listpeople").find("tr");
	var currTrID = id;
	$.each(trs, function() {
		var currTr = $(this);
		currTrID = currTr.attr("id").replace("person_", "");
		if (parseInt(currTrID) > parseInt(id)){
			return false;
		}
	});
	
	return currTrID;
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
