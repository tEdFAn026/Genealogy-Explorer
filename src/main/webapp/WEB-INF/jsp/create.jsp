<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet"
	href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.cs
s">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script
	src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<title>Create a Person</title>
<link type="text/css" href="/css/bootstrap.css" rel="stylesheet" />
</head>
<body>
<h2>Create new Person</h2>

<!-- <form action="./add" method="get"> -->
<form action="./addJSON" method="post" id="aa">
    <table class="table table-bordered">
        <tbody>
            <tr><th>key</th><td><input type="text" name="list[0].key" required="required"></td></tr>
            <tr><th>name</th><td><input type="text" name="list[0].name" required="required"></td></tr>
            <tr><th>m</th><td><input type="text" name="list[0].m"></td></tr>
            <tr><th>key</th><td><input type="text" name="list[1].key" required="required"></td></tr>
            <tr><th>name</th><td><input type="text" name="list[1].name" required="required"></td></tr>
            <tr><th>m</th><td><input type="text" name="list[1].m"></td></tr>
            <tr><th>key</th><td><input type="text" name="list[2].key" required="required"></td></tr>
            <tr><th>name</th><td><input type="text" name="list[2].name" required="required"></td></tr>
            <tr><th>m</th><td><input type="text" name="list[2].m"></td></tr>
           <tr><td colspan="2"><a href="./" class="btn btn-primary">Back</a> <input type="submit" value="Add" class="btn btn-success"></tr>
        </tbody>
    </table>
    
</form>

<button id="a">se</button>
</body>
<script type="text/javascript">
$(function() {
	$("#a").on('click',function() {
		var str = '{"key":2,"name":"q","m":null,"f":null,"dob":null,"g":null}';
		//var str ='{"list":[{"key":1,"name":"q","m":null,"f":null,"dob":null,"g":null},{"key":2,"name":"qq","m":null,"f":null,"dob":null,"g":null}]}';
		var obj = JSON.parse(str); 
		console.log(obj);
		console.log(JSON.stringify(obj));
		
 		$.ajax({
			type : "POST",
			url : "./addJSON",
			data:obj, 
			success : function(data) {
				console.log(JSON.stringify(data));
			},
		}); 
	});
});
</script>
</html>