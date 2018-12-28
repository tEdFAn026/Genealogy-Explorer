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
src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js">
</script>
    <title>Edit account</title>
    <link type="text/css" href="/css/bootstrap.css" rel="stylesheet" />
</head>
<body>
<h2>Edit account</h2>
<form action="/update" method="post">
    <table class="table table-bordered">
        <tbody>
        <tr><th>id</th><td><input type="text" name="id" value="${person.key}" required="required" readonly="true"></td></tr>
            <tr><th>name</th><td><input type="text" name="name" value="${person.name}" required="required"></td></tr>
            <tr><th>gender</th><td><input type="text" name="gender" value="${person.gender}"  required="required"></td></tr>
           <tr><td colspan="2"><a href="../" class="btn btn-primary">Back</a> <input type="submit" value="OK" class="btn btn-info"></tr>  
        </tbody>
    </table>
</form>

</body>
</html>