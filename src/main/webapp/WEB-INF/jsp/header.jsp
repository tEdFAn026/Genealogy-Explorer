<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page isELIgnored="false" %>
<div class="row">
	<div class="col-md-12">
		<nav class="navbar navbar-expand-lg navbar-light bg-light">

			<button class="navbar-toggler" type="button" data-toggle="collapse"
				data-target="#bs-example-navbar-collapse-1">
				<span class="navbar-toggler-icon"></span>
			</button>
			<a class="navbar-brand" href="/GE/">GE</a>
			<div class="collapse navbar-collapse"
				id="bs-example-navbar-collapse-1">
				<ul class="navbar-nav">
					<c:choose>
						<c:when test="${page.uri == '/person/All'}">
							<li class="nav-item active"><a class="nav-link" href="/GE/person/All">List</a></li>
						</c:when>
						<c:otherwise>
							<li class="nav-item"><a class="nav-link" href="/GE/person/All">List</a></li>
						</c:otherwise>
					</c:choose>
				</ul>
				<form class="form-inline">
					<input class="form-control mr-sm-2" type="text" />
					<button class="btn btn-primary my-2 my-sm-0" type="submit">
						Search</button>
				</form>
			</div>
		</nav>
	</div>
</div>