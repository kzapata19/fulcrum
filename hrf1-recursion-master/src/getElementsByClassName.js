// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:

// You should use document.body, element.childNodes, element.classList

var getElementsByClassName = function(className){
	var results = [];

	var searchNodes = function(node){
		var nodeParts = node.className.split(" "); 
		if(nodeParts.indexOf(className) >= 0) {
			results.push(node);
		}
		for (var i = 0; i < node.children.length; i++) {
			searchNodes(node.children[i])
		};
	}
	searchNodes(document.body);
	return results;
};



