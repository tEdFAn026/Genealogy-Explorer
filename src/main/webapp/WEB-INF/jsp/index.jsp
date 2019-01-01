<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page isELIgnored="false"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
<script src="/GE/js/jquery.min.js"></script>
<script src="/GE/js/go.js"></script>
<script src="/GE/js/genogram.js"></script>
</head>
<body onload="init()">
	<div id="sample">
		<div id="myDiagramDiv"
			style="border: solid 1px black; width: 100%; height: 600px"></div>
	</div>
	<table class="table table-hover table-striped d-none">
		<thead>
			<tr>
				<th id="th0">Key(ID)</th>
				<th id="th1">Name</th>
				<th id="th2">Gender</th>
				<th id="th3">More Operation</th>
			</tr>
		</thead>
		<tbody id="listpeople">
		</tbody>
	</table>
	
	<%@ include file="addPersonPanel.jsp"%>
	<%@ include file="deletePersonPanel.jsp"%>
</body>
</html>
