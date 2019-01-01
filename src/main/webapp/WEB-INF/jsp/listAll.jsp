<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ page isELIgnored="false" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
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
		<c:set var="stylearray" value="${fn:split(stylearrayvalue, delim)}" />
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
				<td name="td3">
					<a href="./detail/${person.key}"
					class="btn btn-sm btn-info">Detail</a>
					
					<a class="btn btn-sm btn-warning" href="#addPerson" role="button"
					data-toggle="modal"
					onclick="setEditPersonID(${person.key})">&nbsp;&nbsp;Edit&nbsp;&nbsp;</a>
	
					<a class="btn btn-sm btn-danger" href="#deletePerson" role="button"
					data-toggle="modal"
					onclick="setDeletePersonID(${person.key},'${person.name}')">Delete</a>
					
				</td>
			</tr>
			<c:set var="countTr" value="${countTr+1}" />
		</c:forEach>
	</tbody>
</table>
<a id="modal-330822" href="#addPerson" role="button"
	class="btn btn-primary" data-toggle="modal" onclick="setAddPerson()">Add new person</a>
<a href="/GE/" class="btn btn-primary">Back to GE tree</a>

<%@ include file="addPersonPanel.jsp"%>
<%@ include file="deletePersonPanel.jsp"%>

