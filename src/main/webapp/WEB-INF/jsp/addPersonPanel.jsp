<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page isELIgnored="false" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
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
								placeholder="key(ID)" required data-valid="isNonEmpty||isInt"
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
							<label for="addPersonInput02">Name</label> <input type="text"
								class="form-control required" id="name" name="name"
								placeholder="name" required data-valid="isNonEmpty||isUname"
								data-error="person's name can not be empty||invailed input">
							<div class="secondary-feedback">
								<label class="focus"><span>Chinese characters or
										English letters (spaces are allowed)</span></label>
							</div>
							<div>
								<label class="focus valid d-none"></label>
							</div>
						</div>
					</div>

					<div class="form-group col-md-12 mb-3">
						<div class="col-md-12">
							<label for="addPersonInput03">Date of birth</label> <input
								type="date" class="form-control" id="dob" name="dob"
								placeholder="yyyy/mm/dd" required>
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
								placeholder="input mother key" required data-valid="isInt"
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
								placeholder="input father key" required data-valid="isInt"
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
										id="male" value="male"> <label
										class="form-check-label" for="gridRadios1"> Male </label>
								</div>
								<div class="form-check">
									<input class="form-check-input" type="radio" name="gender"
										id="female" value="female"> <label
										class="form-check-label" for="gridRadios2"> Female </label>
								</div>
							</div>
						</div>
					</fieldset>

					<div class="alert alert-success alert-dismissable d-none">
<!-- 						<button type="button" class="close" data-dismiss="alert"
							aria-hidden="true">×</button> -->
						<h4>Alert!</h4>
						<strong id="alertTitle"></strong>
						<span id="alertMsg"></span>
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