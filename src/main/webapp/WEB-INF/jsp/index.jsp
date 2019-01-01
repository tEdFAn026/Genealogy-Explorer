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
	
	<div class="modal fade" id="deletePerson" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="myModalLabel">Delete person</h5>
<!-- 				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">×</span>
				</button> -->
			</div>
			<div class="modal-body">
				<div class="alert alert-danger alert-dismissable">
					<!-- <button type="button" class="close" data-dismiss="alert"
											aria-hidden="true">×</button> -->
					<h4>Alert!</h4>
					<strong>Warning!</strong>
					<p id="deleteWarning"></p>
				</div>


			</div>
			<div class="modal-footer">

				<button type="button" class="btn btn-danger" id="modalDelete"
					data-dismiss="modal">Delete</button>
				<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
			</div>
		</div>
	</div>
</div>
</body>
</html>
