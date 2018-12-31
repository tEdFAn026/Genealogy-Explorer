<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
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

<title>GE - All Person List</title>
</head>
<body>
	<div class="container-fluid">
		<%@ include file="header.jsp"%>
		<div class="row">
			<div class="col-md-12">
				<div class="jumbotron">
					<h3>
						List of people <small>Basic info</small>
					</h3>
					<table class="table table-hover table-striped">
						<thead>
							<tr>
								<th id="th0">Key(ID)</th>
								<th id="th1">Name</th>
								<th id="th2">Gender</th>
								<th id="th3">More Operation</th>
							</tr>
						</thead>
						<tbody id="listpeople">
							<c:set var="stylearrayvalue"
								value="table-active,table-info,table-success,table-warning,table-danger" />
							<c:set var="delim" value="," />
							<c:set var="stylearray"
								value="${fn:split(stylearrayvalue, delim)}" />
							<c:set var="countTr" value="0" />
							<c:forEach items="${persons}" var="person" varStatus="itr">
								<tr class="${stylearray[countTr%5]}" id="person_${person.key}">
									<td name="td0">${person.key}</td>
									<td name="td1">${person.name}</td>
									<c:choose>
										<c:when test="${not empty person.gender}">
											<td name="td2">${person.gender}</td>
										</c:when>
										<c:otherwise>
											<td name="td2">N/A</td>
										</c:otherwise>
									</c:choose>
									<td name="td3"><a href="./detail/${person.key}"
										class="btn btn-sm btn-info">Detail</a> <a
										class="btn btn-sm btn-danger" href="#deletePerson"
										role="button" data-toggle="modal"
										onclick="setDeletePersonID(${person.key},'${person.name}')">Delete</a></td>
								</tr>
								<c:set var="countTr" value="${countTr+1}" />
							</c:forEach>
						</tbody>
					</table>
					<a id="modal-330822" href="#addPerson" role="button"
						class="btn btn-primary" data-toggle="modal">Add new person</a> <a
						href="/GE/" class="btn btn-primary">Back to GE tree</a>

					<div class="modal fade" id="addPerson" role="dialog"
						aria-labelledby="myModalLabel" aria-hidden="true">
						<div class="modal-dialog" role="document">
							<div class="modal-content">
								<div class="modal-header">
									<h5 class="modal-title" id="myModalLabel">Add new person</h5>
									<button type="button" class="close modalAddClose"
										data-dismiss="modal">
										<span aria-hidden="true">×</span>
									</button>
								</div>

								<div class="modal-body">

									<form role="form" id="addForm">
										<div class="form-group col-md-12 mb-3">
											<div class="col-md-12">
												<label for="addPersonInput01">Key</label> <input type="text"
													class="form-control required" id="key" name="key"
													placeholder="key(ID)" required 
													data-valid="isNonEmpty||isInt"
													data-error="person's key(ID) can not be empty||person's key(ID) has to be a number">

												<div class="secondary-feedback">
													<label class="focus"><span>An integer number</span></label>
												</div>
												<div>
													<label class="focus valid d-none"></label>
												</div>
											</div>
										</div>

										<div class="form-group col-md-12 mb-3">
											<div class="col-md-12">
												<label for="addPersonInput02">Name</label> <input
													type="text" class="form-control required" id="name"
													name="name" placeholder="name" required 
													data-valid="isNonEmpty||isUname"
													data-error="person's name can not be empty||invailed input">
												<div class="secondary-feedback">
													<label class="focus"><span>Chinese characters or English letters (spaces are allowed)</span></label>
												</div>
												<div>
													<label class="focus valid d-none"></label>
												</div>
											</div>
										</div>

										<div class="form-group col-md-12 mb-3">
											<div class="col-md-12">
												<label for="addPersonInput03">Date of birth</label> <input
													type="date" class="form-control" id="dob"
													name="dob" placeholder="yyyy/mm/dd" required>
												<div class="secondary-feedback">
													<label class="focus"><span>Date</span></label>
												</div>
												<div>
													<label class="focus valid d-none"></label>
												</div>
											</div>
										</div>

										<div class="form-group col-md-12 mb-3">
											<div class="col-md-12">
												<label for="addPersonInput04">Mother key</label> <input
													type="text" class="form-control required" id="m" name="m"
													placeholder="input mother key" required 
													data-valid="isInt"
													data-error="mother's key(ID) has to be a number">
												<div class="secondary-feedback">
													<label class="focus"><span>An integer number</span></label>
												</div>
												<div>
													<label class="focus valid d-none"></label>
												</div>
											</div>
										</div>

										<div class="form-group col-md-12 mb-3">
											<div class="col-md-12">
												<label for="addPersonInput05">Father key</label> <input
													type="text" class="form-control required" id="f" name="f"
													placeholder="input father key" required 
													data-valid="isInt"
													data-error="father's key(ID) has to be a number">
												<div class="secondary-feedback">
													<label class="focus"><span>An integer number</span></label>
												</div>
												<div>
													<label class="focus valid d-none"></label>
												</div>
											</div>
										</div>

										<fieldset class="form-group col-md-12 mb-3">
											<div class="row">
												<div class="col-form-label col-sm-2 pt-0">Radios</div>
												<div class="col-sm-10">
													<div class="form-check">
														<input class="form-check-input" type="radio" name="gender"
															id="gridRadios1" value="male"> <label
															class="form-check-label" for="gridRadios1"> Male
														</label>
													</div>
													<div class="form-check">
														<input class="form-check-input" type="radio" name="gender"
															id="gridRadios2" value="female"> <label
															class="form-check-label" for="gridRadios2">
															Female </label>
													</div>
												</div>
											</div>
										</fieldset>

										<div class="alert alert-success alert-dismissable d-none">
											<button type="button" class="close" data-dismiss="alert"
												aria-hidden="true">×</button>
											<h4>Alert!</h4>
											<strong id="alertTitle">Warning!</strong> <span id="alertMsg">Best check
												yourself, you're not looking too good.</span>
										</div>
									</form>

								</div>
								<div class="modal-footer">

									<button type="button" class="btn btn-success" id="modalAdd">Add</button>
									<button type="button" class="btn btn-secondary modalAddClose"
										data-dismiss="modal" id="modalAddClose">Close</button>
								</div>

								<script src="/GE/js/inputcheck.js"></script>
							</div>
						</div>
					</div>

					<div class="modal fade" id="deletePerson" role="dialog"
						aria-labelledby="myModalLabel" aria-hidden="true">
						<div class="modal-dialog" role="document">
							<div class="modal-content">
								<div class="modal-header">
									<h5 class="modal-title" id="myModalLabel">Delete person</h5>
									<button type="button" class="close" data-dismiss="modal">
										<span aria-hidden="true">×</span>
									</button>
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
									<button type="button" class="btn btn-secondary"
										data-dismiss="modal">Cancel</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<%@ include file="footer.jsp"%>
	</div>
</body>
</html>