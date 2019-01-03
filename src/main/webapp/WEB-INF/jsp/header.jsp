<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page isELIgnored="false"%>
<!-- <link id="bscss" href="//cdn.bootcss.com/bootstrap/4.0.0-alpha.4/css/bootstrap.min.css" rel="stylesheet"> -->
<!-- <link id="bscss" href="/GE/css/3.3.7/bootstrap.min.css" rel="stylesheet"> -->
<div class="row">
	<div class="col-md-12">
		<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">

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
							<li class="nav-item active"><a class="nav-link"
								href="/GE/person/All">List</a></li>
						</c:when>
						<c:otherwise>
							<li class="nav-item"><a class="nav-link"
								href="/GE/person/All">List</a></li>
						</c:otherwise>
					</c:choose>
				</ul>
				<form class="form-inline">
					<div class="input-group">
						<input type="text" class="form-control  mr-sm-2" id="search"
							placeholder="search key(id) or name">
						<div class="input-group-btn">
<!-- 							<button type="button" class="btn btn-default dropdown-toggle"
								data-toggle="dropdown">
								<span class="caret"></span>
							</button> -->
							<ul class="dropdown-menu dropdown-menu-right" role="menu">
							</ul>
						</div>
					</div>
					<!-- 					<button class="btn btn-primary my-2 my-sm-0" type="submit">
						Search</button> -->
				</form>
			</div>
		</nav>
	</div>
</div>
<script src="/GE/js/bootstrap-suggest.js"></script>
<script src="/GE/js/search.js"></script>