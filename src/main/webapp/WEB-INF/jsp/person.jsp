<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<link href="/GE/css/bootstrap.min.css" rel="stylesheet">
<link href="/GE/css/style.css" rel="stylesheet">

<script src="/GE/js/jquery.min.js"></script>
<script src="/GE/js/bootstrap.min.js"></script>
<script src="/GE/js/scripts.js"></script>

<c:choose>
	<c:when test="${finded == true}">
		<title>GE - ${person.name}</title>
	</c:when>
	<c:otherwise>
		<title>People not find</title>
	</c:otherwise>
</c:choose>

</head>
<body>
	<div class="container-fluid">
		<%@ include file="header.jsp"%>
		<div class="row">
			<div class="col-md-12">
				<c:choose>
					<c:when test="${finded == true}">
						<div class="page-header">
							<h1>
								Personal info! <small>details about a person</small>
							</h1>
						</div>
					</c:when>
					<c:otherwise>
					</c:otherwise>
				</c:choose>
				<div class="jumbotron">
					<c:choose>
						<c:when test="${finded == true}">
							<h3>${person.name}</h3>
							<br>
							<dl>
								<dt>Person ID</dt>
								<dd>${person.key}</dd>
								<dt>Gender</dt>
								<c:choose>
									<c:when test="${not empty person.gender}">
										<dd>${person.gender}</dd>
									</c:when>
									<c:otherwise>
										<dd>N/A</dd>
									</c:otherwise>
								</c:choose>

								<dt>Date of birth</dt>
								<c:choose>
									<c:when test="${not empty person.dateOfBirth}">
										<dd>${person.dateOfBirth}</dd>
									</c:when>
									<c:otherwise>
										<dd>N/A</dd>
									</c:otherwise>
								</c:choose>

								<dt>Parents</dt>
								<dd>
									Father:
									<c:choose>
										<c:when test="${findFather == true}">
											<a class="btn btn-link btn-sm" href="${person.fatherKey}">${father}</a>
										</c:when>
										<c:otherwise>
											N/A
										</c:otherwise>
									</c:choose>
								</dd>
								<dd>
									Mother:
									<c:choose>
										<c:when test="${findMother == true}">
											<a class="btn btn-link btn-sm" href="${person.motherKey}">${mother}</a>
										</c:when>
										<c:otherwise>
											N/A
										</c:otherwise>
									</c:choose>
								</dd>
							</dl>
							<p>
								<a class="btn btn-outline-primary btn-lg" href="../All">Back
									to list</a>
							</p>
						</c:when>
						<c:otherwise>
							<h2>People not find:(</h2>
							<p>${msg}</p>
							<p>
								<a class="btn btn-outline-danger btn-lg" href="/GE/">Back to
									GE</a>
							</p>
						</c:otherwise>
					</c:choose>
				</div>
			</div>
		</div>
		<%@ include file="footer.jsp"%>
	</div>
</body>
</html>