<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js">
	
</script>
<style>
* {
	margin: 0;
	padding: 0;
}

.tree ul {
	padding-top: 20px;
	position: relative;
	transition: all 0.5s;
	-webkit-transition: all 0.5s;
	-moz-transition: all 0.5s;
}

.tree li {
	float: left;
	text-align: center;
	list-style-type: none;
	position: relative;
	padding: 20px 5px 0 5px;
	transition: all 0.5s;
	-webkit-transition: all 0.5s;
	-moz-transition: all 0.5s;
}
/*We will use ::before and ::after to draw the connectors*/
.tree li::before, .tree li::after {
	content: '';
	position: absolute;
	top: 0;
	right: 50%;
	border-top: 1px solid #ccc;
	width: 50%;
	height: 20px;
}

.tree li::after {
	right: auto;
	left: 50%;
	border-left: 1px solid #ccc;
}
/*We need to remove left-right connectors from elements without 
any siblings*/
.tree li:only-child::after, .tree li:only-child::before {
	display: none;
}
/*Remove space from the top of single children*/
.tree li:only-child {
	padding-top: 0;
}
/*Remove left connector from first child and 
right connector from last child*/
.tree li:first-child::before, .tree li:last-child::after {
	border: 0 none;
}
/*Adding back the vertical connector to the last nodes*/
.tree li:last-child::before {
	border-right: 1px solid #ccc;
	border-radius: 0 5px 0 0;
	-webkit-border-radius: 0 5px 0 0;
	-moz-border-radius: 0 5px 0 0;
}

.tree li:first-child::after {
	border-radius: 5px 0 0 0;
	-webkit-border-radius: 5px 0 0 0;
	-moz-border-radius: 5px 0 0 0;
}
/*Time to add downward connectors from parents*/
.tree ul ul::before {
	content: '';
	position: absolute;
	top: 0;
	left: 50%;
	border-left: 1px solid #ccc;
	width: 0;
	height: 20px;
}

.tree li a {
	border: 1px solid #ccc;
	padding: 5px 10px;
	text-decoration: none;
	color: #666;
	font-family: arial, verdana, tahoma;
	font-size: 11px;
	display: inline-block;
	border-radius: 5px;
	-webkit-border-radius: 5px;
	-moz-border-radius: 5px;
	transition: all 0.5s;
	-webkit-transition: all 0.5s;
	-moz-transition: all 0.5s;
}
/*Time for some hover effects*/
/*We will apply the hover effect the the lineage of the element also*/
.tree li a:hover, .tree li a:hover ~ul li a {
	background: #ffe787;
	color: #000;
	border: 2px solid #94a0b4;
}

.tree li a[gender=female]:hover, .tree li a:hover ~ul li [gender=female] {
	background: #ffe4f8;
}

.tree li a[gender=male]:hover, .tree li a:hover ~ul li a[gender=male] {
	background: #c8e4f8;
}

/* I UPDATED FROM HERE */
/*Connector styles on hover*/
.tree li:hover ul li::after, .tree li:hover ul li::before, .tree li:hover ul::before,
	.tree li:hover ul ul::before {
	border-color: #94a0b4;
}

a {
	position: relative;
}

.tree>ul>li a+a::before {
	content: '';
	display: inline-block;
	width: 0.5em;
	border-bottom: 1px solid #94a0b4;
	vertical-align: middle;
	position: absolute;
	top: 50%;
	right: 100%;
}
</style>
<title>Insert title here</title>
</head>
<body>
	<c:forEach items="${GE}" var="GE" varStatus="itr">
		<a href="#" id="${GE.key}" m="${GE.motherKey}" f="${GE.fatherKey}" gender="${GE.gender}">${GE.name}</a>
	</c:forEach>
	<div class="tree">
		<ul id="tree"></ul>
	</div>
</body>
<script type="text/javascript">
	$(document).ready(function() {
		$.each($("a"), function() {
			var currTr = $(this);
			var m = currTr.attr("m");
			var f = currTr.attr("f");
			if (m || f) {
				var li = findParents(m, f);
				if (li === null){
					var p = createParents(m, f);
					li = p.li;
					if(p.newli)
						$("#tree").append(li);
				} 	
				
				addChild(li.find("ul").first(),currTr);
			}

		});
		
		$("ul:empty").remove();
		
		function addChild(parentUl, child){
			var li = $("<li></li>");
			if (child && parentUl) {
//				if(child.parent("li").length){
//					child.parent("li").first().append(li.children());
//					li = child.parent("li").first();
//				}
//				else{
					li.append(child);
//				}	
				
				parentUl.append(li);
			}
		}

		function findParents(m, f) {
			
			var attr = "";
			if (m) {
				attr = attr + "[m='" + m + "']";
			}

			if (f) {
				attr = attr + "[f='" + f + "']";
			}

			if ($("li" + attr).length) {
				return $("li" + attr).first();		
			} else {
				return null;
			}
		}

		function createParents(m, f) {
			var li = $("<li></li>");
			var ul = $("<ul></ul>");
			var newli = true;
			var attr = [];
			if (m) {
				
				if($("#"+m).parent("li").length){
					$("#"+m).parent("li").first().append(li.children());
					li = $("#"+m).parent("li").first();
					newli = false;
				}
				else{
					li.append($("#"+m));
				}
				attr.push({"name":"m","value":m});
			}

			if (f) {
				if($("#"+f).parent("li").length){
					$("#"+f).parent("li").first().append(li.children());
					li = $("#"+f).parent("li").first();
					newli = false;
				}
				else{
					li.append($("#"+f));
				}		
				attr.push({"name":"f","value":f});
			}
			
			for (x in attr)
			{
			  console.log(attr[x]);
			  li.attr(attr[x].name,attr[x].value);
			}
			li.append(ul);
			return {"newli":newli,"li":li};
		}
	});
</script>
</html>