/**
 * 
 */
var reqCount = 0;
function createCanvanDIV(){
	var newMyDiagramDiv = document.createElement("div");
	
	var myDiagramDivID = document.createAttribute("id");
	myDiagramDivID.value = "myDiagramDiv";
	var myDiagramDivStyle = document.createAttribute("style");
	myDiagramDivStyle.value = "border: solid 1px black; width:100%; height:600px";
	
	newMyDiagramDiv.setAttributeNode(myDiagramDivID);
	newMyDiagramDiv.setAttributeNode(myDiagramDivStyle);
	console.log(myDiagramDiv);
	
	var sampleDiv = document.getElementById("sample");
	sampleDiv.innerHTML="";
	sampleDiv.appendChild(newMyDiagramDiv);
// $("#sample").find("#myDiagramDiv").remove();
// $("#sample").append($myDiagram);
	
}

function init() {
	  createCanvanDIV();
	
      if (window.goSamples) goSamples();  // init for these samples -- you
											// don't need to call this
      var $ = go.GraphObject.make;
      myDiagram =
        $(go.Diagram, "myDiagramDiv",
          {
            initialAutoScale: go.Diagram.Uniform,
            initialContentAlignment: go.Spot.Center,
            "undoManager.isEnabled": true,
            // when a node is selected, draw a big yellow circle behind it
            nodeSelectionAdornmentTemplate:
              $(go.Adornment, "Auto",
                { layerName: "Grid" },  // the predefined layer that is behind
										// everything else
                $(go.Shape, "Circle", { fill: "yellow", stroke: null }),
                $(go.Placeholder)
              ),
            layout:  // use a custom layout, defined below
              $(GenogramLayout, { direction: 90, layerSpacing: 30, columnSpacing: 10 })
          });

      // determine the color for each attribute shape
      function attrFill(a) {
        switch (a) {
          case "A": return "green";
          case "B": return "orange";
          case "C": return "red";
          case "D": return "cyan";
          case "E": return "gold";
          case "F": return "pink";
          case "G": return "blue";
          case "H": return "brown";
          case "I": return "purple";
          case "J": return "chartreuse";
          case "K": return "lightgray";
          case "L": return "magenta";
          case "S": return "red";
          default: return "transparent";
        }
      }

      // determine the geometry for each attribute shape in a male;
      // except for the slash these are all squares at each of the four
		// corners of the overall square
      var tlsq = go.Geometry.parse("F M1 1 l19 0 0 19 -19 0z");
      var trsq = go.Geometry.parse("F M20 1 l19 0 0 19 -19 0z");
      var brsq = go.Geometry.parse("F M20 20 l19 0 0 19 -19 0z");
      var blsq = go.Geometry.parse("F M1 20 l19 0 0 19 -19 0z");
      var slash = go.Geometry.parse("F M38 0 L40 0 40 2 2 40 0 40 0 38z");
      function maleGeometry(a) {
        switch (a) {
          case "A": return tlsq;
          case "B": return tlsq;
          case "C": return tlsq;
          case "D": return trsq;
          case "E": return trsq;
          case "F": return trsq;
          case "G": return brsq;
          case "H": return brsq;
          case "I": return brsq;
          case "J": return blsq;
          case "K": return blsq;
          case "L": return blsq;
          case "S": return slash;
          default: return tlsq;
        }
      }

      // determine the geometry for each attribute shape in a female;
      // except for the slash these are all pie shapes at each of the four
		// quadrants of the overall circle
      var tlarc = go.Geometry.parse("F M20 20 B 180 90 20 20 19 19 z");
      var trarc = go.Geometry.parse("F M20 20 B 270 90 20 20 19 19 z");
      var brarc = go.Geometry.parse("F M20 20 B 0 90 20 20 19 19 z");
      var blarc = go.Geometry.parse("F M20 20 B 90 90 20 20 19 19 z");
      function femaleGeometry(a) {
        switch (a) {
          case "A": return tlarc;
          case "B": return tlarc;
          case "C": return tlarc;
          case "D": return trarc;
          case "E": return trarc;
          case "F": return trarc;
          case "G": return brarc;
          case "H": return brarc;
          case "I": return brarc;
          case "J": return blarc;
          case "K": return blarc;
          case "L": return blarc;
          case "S": return slash;
          default: return tlarc;
        }
      }
      
      var tltri = go.Geometry.parse("F M20 2 L20 39 11 20z");
      var trtri = go.Geometry.parse("F M20 2 L20 39 29 20z");
      var brtri = go.Geometry.parse("F M20 39 L11 20 1.5 39z");
      var bltri = go.Geometry.parse("F M20 39 L29 20 38.5 39z");
      function nogenderGeometry(a) {
    	 switch (a) {
          case "A": return tltri;
          case "B": return tltri;
          case "C": return tltri;
          case "D": return trtri;
          case "E": return trtri;
          case "F": return trtri;
          case "G": return brtri;
          case "H": return brtri;
          case "I": return brtri;
          case "J": return bltri;
          case "K": return bltri;
          case "L": return bltri;
          case "S": return slash;
          default: return tltri;
        }
      }
      
      // nogender
      myDiagram.nodeTemplateMap.add("nogender", 
    	        $(go.Node, "Vertical",
    	          { locationSpot: go.Spot.Center, locationObjectName: "ICON" },
    	          $(go.Panel,
    	            { name: "ICON" },
    	            $(go.Shape, "Triangle",
    	              { width: 40, height: 40, strokeWidth: 2, fill: "white", portId: "" }),
    	            $(go.Panel,
    	              { // for each attribute show a Shape at a particular place
						// in the
    					// overall square
    	                itemTemplate:
    	                  $(go.Panel,
    	                    $(go.Shape,
    	                      { stroke: null, strokeWidth: 0 },
    	                      new go.Binding("fill", "", attrFill),
    	                      new go.Binding("geometry", "", nogenderGeometry))
    	                  ),
    	                margin: 1
    	              },
    	              new go.Binding("itemArray", "a")
    	            )
    	          ),
    	          $(go.TextBlock,
    	            { textAlign: "center", maxSize: new go.Size(80, NaN) },
    	            new go.Binding("text", "name")),
    	            "Auto", {selectionChanged: function(node) {
    	        		  if(node.isSelected) {
    	        			  selectedNode(node.key);
    	        		  } else {
    	        			  unSelectedNode(node.key);
    	        		  }
    	        	  }
    	          	}
    	        ));


      // two different node templates, one for each sex,
      // named by the category value in the node data object
      myDiagram.nodeTemplateMap.add("male",  // male
        $(go.Node, "Vertical",
          { locationSpot: go.Spot.Center, locationObjectName: "ICON" },
          $(go.Panel,
            { name: "ICON" },
            $(go.Shape, "Square",
              { width: 40, height: 40, strokeWidth: 2, fill: "white", portId: "" }),
            $(go.Panel,
              { // for each attribute show a Shape at a particular place in the
				// overall square
                itemTemplate:
                  $(go.Panel,
                    $(go.Shape,
                      { stroke: null, strokeWidth: 0 },
                      new go.Binding("fill", "", attrFill),
                      new go.Binding("geometry", "", maleGeometry))
                  ),
                margin: 1
              },
              new go.Binding("itemArray", "a")
            )
          ),
          $(go.TextBlock,
            { textAlign: "center", maxSize: new go.Size(80, NaN) },
            new go.Binding("text", "name")),
            "Auto", {selectionChanged: function(node) {
      		  if(node.isSelected) {
    			  selectedNode(node.key);
    		  } else {
    			  unSelectedNode(node.key);
    		  }
      	  	}
        }
        ));

      myDiagram.nodeTemplateMap.add("female",  // female
        $(go.Node, "Vertical",
          { locationSpot: go.Spot.Center, locationObjectName: "ICON" },
          $(go.Panel,
            { name: "ICON" },
            $(go.Shape, "Circle",
              { width: 40, height: 40, strokeWidth: 2, fill: "white", portId: "" }),
            $(go.Panel,
              { // for each attribute show a Shape at a particular place in the
				// overall circle
                itemTemplate:
                  $(go.Panel,
                    $(go.Shape,
                      { stroke: null, strokeWidth: 0 },
                      new go.Binding("fill", "", attrFill),
                      new go.Binding("geometry", "", femaleGeometry))
                  ),
                margin: 1
              },
              new go.Binding("itemArray", "a")
            )
          ),
          $(go.TextBlock,
            { textAlign: "center", maxSize: new go.Size(80, NaN) },
            new go.Binding("text", "name")),
            "Auto", {selectionChanged: function(node) {
        		  if(node.isSelected) {
        			  selectedNode(node.key);
        		  } else {
        			  unSelectedNode(node.key);
        		  }
        	  }
          }
        ));


      // the representation of each label node -- nothing shows on a Marriage
		// Link
      myDiagram.nodeTemplateMap.add("LinkLabel",
        $(go.Node, { selectable: false, width: 1, height: 1, fromEndSegmentLength: 20 }));


      myDiagram.linkTemplate =  // for parent-child relationships
        $(go.Link,
          {
            routing: go.Link.Orthogonal, curviness: 15,
            layerName: "Background", selectable: false,
            fromSpot: go.Spot.Bottom, toSpot: go.Spot.Top
          },
          $(go.Shape, { strokeWidth: 2 })
        );

      myDiagram.linkTemplateMap.add("Marriage",  // for marriage
													// relationships
        $(go.Link,
          { selectable: false },
          $(go.Shape, { strokeWidth: 2, stroke: "blue" })
      ));

      getPeopleArray();
      // n: name, s: sex, m: mother, f: father, ux: wife, vir: husband, a:
		// attributes/markers
// setupDiagram(myDiagram,[ { key: 0, n: "Aaron", gender: "male", ux: 1, a:
// ["C", "F", "K"] },
// { key: 1, n: "Alice", gender: "female", a: ["B", "H", "K"] }],0 /* focus on
// this person */);
      
    }

	function selectedNode(id){
		console.log("xuanzhong",reqCount);
		reqCount = reqCount + 1;
		var thisReq = reqCount;
		console.log("thisReq",thisReq);
		$.ajax({
			type : "GET",
			url : "/GE/person/get/"+id,
			success : function(data) {
				console.log(data);
				if(thisReq === reqCount && data.key){
					var listpeopleDiv = document.getElementById("listpeople");
					var g = "N/A";
					if (data.gender) {
						g = data.gender;
					}					
					var str = "<tr class=\"table-warning\" id=\"person_"
							+ data.key
							+ "\"><td name=\"td0\">"
							+ data.key
							+ "</td><td name=\"td1\">"
							+ data.name
							+ "</td><td name=\"td2\">"
							+ g
							+ "</td><td name=\"td3\"><a href=\"/GE/person/detail/"
							+ data.key
							+ "\" class=\"btn btn-sm btn-info\">Detail</a> <a class=\"btn btn-sm btn-warning\" href=\"#addPerson\" role=\"button\" data-toggle=\"modal\" onclick=\"setEditPersonID("
							+ data.key
							+ ")\">&nbsp;&nbsp;Edit&nbsp;&nbsp;</a> <a class=\"btn btn-sm btn-danger\" href=\"#deletePerson\" role=\"button\" data-toggle=\"modal\" onclick=\"setDeletePersonID("
							+ data.key
							+ ",\'q\')\">Delete</a></td></tr>";				
					listpeopleDiv.innerHTML = str;
					listpeopleDiv.parentNode.classList.remove("d-none");
				}
			},
		});
	}
	
	function unSelectedNode(id){
		console.log("meixuanzhong",reqCount);
		reqCount = reqCount + 1;
		var thisReq = reqCount;
		console.log("thisReq",thisReq);
		
		var listpeopleDiv = document.getElementById("listpeople");
		listpeopleDiv.innerHTML = "";
		listpeopleDiv.parentNode.classList.add("d-none");
//		console.log(myDiagram.selection);
//		console.log(myDiagram.model.toJson());
	}

	function getPeopleArray(){
		$.ajax({
			type : "POST",
			url : "/GE/person/getAll",
			success : function(data) {
				if(data.length){	  
					$.each(data, function() {
						if(!this.gender)
							this.gender = "nogender";
						this.a = ['A'];
					});
//					console.log(data);
					setupDiagram(myDiagram,data,data[data.length-1].key /*focus on this person*/);
				}
			},
		});
	}

    // create and initialize the Diagram.model given an array of node data
	// representing people
    function setupDiagram(diagram, array, focusId) {
      diagram.model =
        go.GraphObject.make(go.GraphLinksModel,
          { // declare support for link label nodes
            linkLabelKeysProperty: "labelKeys",
            // this property determines which template is used
            nodeCategoryProperty: "gender",
            // create all of the nodes for people
            nodeDataArray: array
          });
      
// setupMarriages(diagram);
      setupParents(diagram);

      var node = diagram.findNodeForKey(focusId);
      if (node !== null) {
        diagram.select(node);
        // remove any spouse for the person under focus:
        // node.linksConnected.each(function(l) {
        // if (!l.isLabeledLink) return;
        // l.opacity = 0;
        // var spouse = l.getOtherNode(node);
        // spouse.opacity = 0;
        // spouse.pickable = false;
        // });
      }
    }

    function findMarriage(diagram, a, b) {  // A and B are node keys
      var nodeA = diagram.findNodeForKey(a);
      var nodeB = diagram.findNodeForKey(b);
      if (nodeA !== null && nodeB !== null) {
        var it = nodeA.findLinksBetween(nodeB);  // in either direction
        while (it.next()) {
          var link = it.value;
          // Link.data.category === "Marriage" means it's a marriage
			// relationship
          if (link.data !== null && link.data.category === "Marriage") return link;
        }
      }
      return null;
    }

    // now process the node data to determine marriages
    function setupMarriages(diagram) {
      var model = diagram.model;
      var nodeDataArray = model.nodeDataArray;
      for (var i = 0; i < nodeDataArray.length; i++) {
        var data = nodeDataArray[i];
        var key = data.key;
        var uxs = data.ux;
        if (uxs !== undefined) {
          if (typeof uxs === "number") uxs = [ uxs ];
          for (var j = 0; j < uxs.length; j++) {
            var wife = uxs[j];
            if (key === wife) {
              // or warn no reflexive marriages
              continue;
            }
            var link = findMarriage(diagram, key, wife);
            if (link === null) {
              // add a label node for the marriage link
              var mlab = { s: "LinkLabel" };
              model.addNodeData(mlab);
              console.log("mlab",mlab);
              // add the marriage link itself, also referring to the label
				// node
              var mdata = { from: key, to: wife, labelKeys: [mlab.key], category: "Marriage" };
              model.addLinkData(mdata);
            }
          }
        }
        var virs = data.vir;
        if (virs !== undefined) {
          if (typeof virs === "number") virs = [ virs ];
          for (var j = 0; j < virs.length; j++) {
            var husband = virs[j];
            if (key === husband) {
              // or warn no reflexive marriages
              continue;
            }
            var link = findMarriage(diagram, key, husband);
            if (link === null) {
              // add a label node for the marriage link
              var mlab = { s: "LinkLabel" };
              model.addNodeData(mlab);
              // add the marriage link itself, also referring to the label
				// node
              var mdata = { from: key, to: husband, labelKeys: [mlab.key], category: "Marriage" };
              model.addLinkData(mdata);
            }
          }
        }
      }
    }

    // process parent-child relationships once all marriages are known
    function setupParents(diagram) {
      var model = diagram.model;
      var nodeDataArray = model.nodeDataArray;
      for (var i = 0; i < nodeDataArray.length; i++) {
        var data = nodeDataArray[i];
        var key = data.key;
        var mother = data.m;
        var father = data.f;
        if (mother/* !== undefined */ && father/* !== undefined */) {
          var link = findMarriage(diagram, mother, father);
          
          if (link === null) {
// // or warn no known mother or no known father or no known marriage
// // between them
// if (window.console) window.console.log("unknown marriage: " + mother + " & "
// + father);
// continue;
        	  
        	  var model = diagram.model;
              // add a label node for the marriage link
              var mlab = { s: "LinkLabel" };
              model.addNodeData(mlab);
              // add the marriage link itself, also referring to the label
  				// node
              var mdata = { from: mother, to: father, labelKeys: [mlab.key], category: "Marriage" };
              model.addLinkData(mdata);
              link = findMarriage(diagram, mother, father);
          }
          var mdata = link.data;
          var mlabkey = mdata.labelKeys[0];
          var cdata = { from: mlabkey, to: key };
          myDiagram.model.addLinkData(cdata);
        }
      }
    }


    // A custom layout that shows the two families related to a person's parents
    function GenogramLayout() {
      go.LayeredDigraphLayout.call(this);
      this.initializeOption = go.LayeredDigraphLayout.InitDepthFirstIn;
      this.spouseSpacing = 30;  // minimum space between spouses
    }
    go.Diagram.inherit(GenogramLayout, go.LayeredDigraphLayout);

    /** @override */
    GenogramLayout.prototype.makeNetwork = function(coll) {
      // generate LayoutEdges for each parent-child Link
      var net = this.createNetwork();
      if (coll instanceof go.Diagram) {
        this.add(net, coll.nodes, true);
        this.add(net, coll.links, true);
      } else if (coll instanceof go.Group) {
        this.add(net, coll.memberParts, false);
      } else if (coll.iterator) {
        this.add(net, coll.iterator, false);
      }
      return net;
    };

    // internal method for creating LayeredDigraphNetwork where husband/wife
	// pairs are represented
    // by a single LayeredDigraphVertex corresponding to the label Node on the
	// marriage Link
    GenogramLayout.prototype.add = function(net, coll, nonmemberonly) {
      var multiSpousePeople = new go.Set();
      // consider all Nodes in the given collection
      var it = coll.iterator;
      while (it.next()) {
        var node = it.value;
        if (!(node instanceof go.Node)) continue;
        if (!node.isLayoutPositioned || !node.isVisible()) continue;
        if (nonmemberonly && node.containingGroup !== null) continue;
        // if it's an unmarried Node, or if it's a Link Label Node, create a
		// LayoutVertex for it
        if (node.isLinkLabel) {
          // get marriage Link
          var link = node.labeledLink;
          var spouseA = link.fromNode;
          var spouseB = link.toNode;
          // create vertex representing both husband and wife
          var vertex = net.addNode(node);
          // now define the vertex size to be big enough to hold both spouses
          vertex.width = spouseA.actualBounds.width + this.spouseSpacing + spouseB.actualBounds.width;
          vertex.height = Math.max(spouseA.actualBounds.height, spouseB.actualBounds.height);
          vertex.focus = new go.Point(spouseA.actualBounds.width + this.spouseSpacing / 2, vertex.height / 2);
        } else {
          // don't add a vertex for any married person!
          // instead, code above adds label node for marriage link
          // assume a marriage Link has a label Node
          var marriages = 0;
          node.linksConnected.each(function(l) { if (l.isLabeledLink) marriages++; });
          if (marriages === 0) {
            var vertex = net.addNode(node);
          } else if (marriages > 1) {
            multiSpousePeople.add(node);
          }
        }
      }
      // now do all Links
      it.reset();
      while (it.next()) {
        var link = it.value;
        if (!(link instanceof go.Link)) continue;
        if (!link.isLayoutPositioned || !link.isVisible()) continue;
        if (nonmemberonly && link.containingGroup !== null) continue;
        // if it's a parent-child link, add a LayoutEdge for it
        if (!link.isLabeledLink) {
          var parent = net.findVertex(link.fromNode);  // should be a label
														// node
          var child = net.findVertex(link.toNode);
          if (child !== null) {  // an unmarried child
            net.linkVertexes(parent, child, link);
          } else {  // a married child
            link.toNode.linksConnected.each(function(l) {
              if (!l.isLabeledLink) return;  // if it has no label node, it's
												// a parent-child link
              // found the Marriage Link, now get its label Node
              var mlab = l.labelNodes.first();
              // parent-child link should connect with the label node,
              // so the LayoutEdge should connect with the LayoutVertex
				// representing the label node
              var mlabvert = net.findVertex(mlab);
              if (mlabvert !== null) {
                net.linkVertexes(parent, mlabvert, link);
              }
            });
          }
        }
      }

      while (multiSpousePeople.count > 0) {
        // find all collections of people that are indirectly married to each
		// other
        var node = multiSpousePeople.first();
        var cohort = new go.Set();
        this.extendCohort(cohort, node);
        // then encourage them all to be the same generation by connecting them
		// all with a common vertex
        var dummyvert = net.createVertex();
        net.addVertex(dummyvert);
        var marriages = new go.Set();
        cohort.each(function(n) {
          n.linksConnected.each(function(l) {
            marriages.add(l);
          })
        });
        marriages.each(function(link) {
          // find the vertex for the marriage link (i.e. for the label node)
          var mlab = link.labelNodes.first()
          var v = net.findVertex(mlab);
          if (v !== null) {
            net.linkVertexes(dummyvert, v, null);
          }
        });
        // done with these people, now see if there are any other
		// multiple-married people
        multiSpousePeople.removeAll(cohort);
      }
    };

    // collect all of the people indirectly married with a person
    GenogramLayout.prototype.extendCohort = function(coll, node) {
      if (coll.contains(node)) return;
      coll.add(node);
      var lay = this;
      node.linksConnected.each(function(l) {
        if (l.isLabeledLink) {  // if it's a marriage link, continue with both
								// spouses
          lay.extendCohort(coll, l.fromNode);
          lay.extendCohort(coll, l.toNode);
        }
      });
    };

    /** @override */
    GenogramLayout.prototype.assignLayers = function() {
      go.LayeredDigraphLayout.prototype.assignLayers.call(this);
      var horiz = this.direction == 0.0 || this.direction == 180.0;
      // for every vertex, record the maximum vertex width or height for the
		// vertex's layer
      var maxsizes = [];
      this.network.vertexes.each(function(v) {
        var lay = v.layer;
        var max = maxsizes[lay];
        if (max === undefined) max = 0;
        var sz = (horiz ? v.width : v.height);
        if (sz > max) maxsizes[lay] = sz;
      });
      // now make sure every vertex has the maximum width or height according
		// to which layer it is in,
      // and aligned on the left (if horizontal) or the top (if vertical)
      this.network.vertexes.each(function(v) {
        var lay = v.layer;
        var max = maxsizes[lay];
        if (horiz) {
          v.focus = new go.Point(0, v.height / 2);
          v.width = max;
        } else {
          v.focus = new go.Point(v.width / 2, 0);
          v.height = max;
        }
      });
      // from now on, the LayeredDigraphLayout will think that the Node is
		// bigger than it really is
      // (other than the ones that are the widest or tallest in their
		// respective layer).
    };

    /** @override */
    GenogramLayout.prototype.commitNodes = function() {
      go.LayeredDigraphLayout.prototype.commitNodes.call(this);
      // position regular nodes
      this.network.vertexes.each(function(v) {
        if (v.node !== null && !v.node.isLinkLabel) {
          v.node.position = new go.Point(v.x, v.y);
        }
      });
      // position the spouses of each marriage vertex
      var layout = this;
      this.network.vertexes.each(function(v) {
        if (v.node === null) return;
        if (!v.node.isLinkLabel) return;
        var labnode = v.node;
        var lablink = labnode.labeledLink;
        // In case the spouses are not actually moved, we need to have the
		// marriage link
        // position the label node, because LayoutVertex.commit() was called
		// above on these vertexes.
        // Alternatively we could override LayoutVetex.commit to be a no-op for
		// label node vertexes.
        lablink.invalidateRoute();
        var spouseA = lablink.fromNode;
        var spouseB = lablink.toNode;
        // prefer fathers on the left, mothers on the right
        if (spouseA.data.s === "F") {  // sex is female
          var temp = spouseA;
          spouseA = spouseB;
          spouseB = temp;
        }
        // see if the parents are on the desired sides, to avoid a link crossing
        var aParentsNode = layout.findParentsMarriageLabelNode(spouseA);
        var bParentsNode = layout.findParentsMarriageLabelNode(spouseB);
        if (aParentsNode !== null && bParentsNode !== null && aParentsNode.position.x > bParentsNode.position.x) {
          // swap the spouses
          var temp = spouseA;
          spouseA = spouseB;
          spouseB = temp;
        }
        spouseA.position = new go.Point(v.x, v.y);
        spouseB.position = new go.Point(v.x + spouseA.actualBounds.width + layout.spouseSpacing, v.y);
        if (spouseA.opacity === 0) {
          var pos = new go.Point(v.centerX - spouseA.actualBounds.width / 2, v.y);
          spouseA.position = pos;
          spouseB.position = pos;
        } else if (spouseB.opacity === 0) {
          var pos = new go.Point(v.centerX - spouseB.actualBounds.width / 2, v.y);
          spouseA.position = pos;
          spouseB.position = pos;
        }
      });
      // position only-child nodes to be under the marriage label node
      this.network.vertexes.each(function(v) {
        if (v.node === null || v.node.linksConnected.count > 1) return;
        var mnode = layout.findParentsMarriageLabelNode(v.node);
        if (mnode !== null && mnode.linksConnected.count === 1) {  // if only
																	// one child
          var mvert = layout.network.findVertex(mnode);
          var newbnds = v.node.actualBounds.copy();
          newbnds.x = mvert.centerX - v.node.actualBounds.width / 2;
          // see if there's any empty space at the horizontal mid-point in
			// that layer
          var overlaps = layout.diagram.findObjectsIn(newbnds, function(x) { return x.part; }, function(p) { return p !== v.node; }, true);
          if (overlaps.count === 0) {
            v.node.move(newbnds.position);
          }
        }
      });
    };

    GenogramLayout.prototype.findParentsMarriageLabelNode = function(node) {
      var it = node.findNodesInto();
      while (it.next()) {
        var n = it.value;
        if (n.isLinkLabel) return n;
      }
      return null;
    };
    // end GenogramLayout class
