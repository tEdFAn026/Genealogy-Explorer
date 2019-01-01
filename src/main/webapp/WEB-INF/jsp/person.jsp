<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page isELIgnored="false"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<link rel="stylesheet" href="/GE/css/font-awesome.min.css">
<link rel="stylesheet" href="/GE/css/jquery.orgchart.css">
<link rel="stylesheet" href="/GE/css/style.css">

<script type="text/javascript" src="/GE/js/jquery.orgchart.js"></script>
<script type="text/javascript" src="/GE/js/treescripts.js"></script>

<c:choose>
	<c:when test="${finded == true}">
		<div class="page-header">
			<h1>
				Personal info! <small>details about a person</small>
			</h1>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="row">
					<div class="col-md-4">
						<h3>${person.name}</h3>
						<br>
						<dl>
							<dt>Person ID</dt>
							<dd id="presonId">${person.key}</dd>
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
							<a class="btn btn-outline-primary btn-lg" href="../All">Back to list</a>
						</p>		
					</div>
					<div class="col-md-4">
						<h5>Descendants</h5>
						<div id="chart-container-descendants"></div>
					</div>
					<div class="col-md-4">
						<h5>Ancestors</h5>
						<div id="chart-container-ancestors"></div>
					</div>
				</div>
			</div>
		</div>	
	</c:when>
	<c:otherwise>
		<h2>People not find:(</h2>
		<p>${msg}</p>
		<p>
			<a class="btn btn-outline-danger btn-lg" href="/GE/">Back to GE</a>
		</p>
	</c:otherwise>
</c:choose>
