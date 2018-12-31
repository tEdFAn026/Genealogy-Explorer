<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page isELIgnored="false" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<link href="/GE/css/bootstrap.min.css" rel="stylesheet">
<link href="/GE/css/style.css" rel="stylesheet">


<script src="/GE/js/jquery.min.js"></script>
<script src="/GE/js/bootstrap.min.js"></script>
<script src="/GE/js/scripts.js"></script>

<title>${page.pageTitle}</title>
</head>

<body>
	<div class="container-fluid">
		<%@ include file="header.jsp"%>
		<div class="row">
			<div class="col-md-12">
				<div class="jumbotron">
				<c:import url="${page.pageName}.jsp" />
				</div>
			</div>
		</div>
		<%@ include file="footer.jsp"%>
	</div>
</body>
</html>
