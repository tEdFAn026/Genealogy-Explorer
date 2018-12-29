<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
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
<title>Insert title here</title>
<link type="text/css" href="/css/bootstrap.css" rel="stylesheet" />
</head>
<body>
	<h2>List of Accounts</h2>
	<table class="table table-bordered">
		<tr>
			<th>id</th>
			<th>name</th>
			<th></th>
		</tr>
		<tbody>
			<c:forEach items="${persons}" var="person" varStatus="itr">
				<tr>
					<td>${person.key}</td>
					<td>${person.name}</td>
					<td><%-- <a href="/edit/${person.key}" class="btn btn-info">Edit</a> --%>
						<a href="./delete/${person.key}" class="btn btn-danger">Delete</a>
					</td>
				</tr>
			</c:forEach>
		</tbody>

	</table>
	<a href="./create" class="btn btn-primary">Add new person</a>
	<a href="/GE/" class="btn btn-primary">Back to GE tree</a>


</body>
</html>