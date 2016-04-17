// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:



var stringifyJSON = function (obj) {
	
	var isArray = Array.isArray(obj);
	var objType = typeof obj;

  // use ecursion to go deeper to push non-Array element into output array
  if(isArray) {
  	var newArray = [];
  	obj.forEach(function(value){
  				newArray.push(stringifyJSON(value));
  	});
  	return '[' + newArray.join(',') + ']'
  } 

  else if(obj && objType === "object") { // accounts for typeof null === "object"
  	var newArray = [];
  	for (var key in obj) {
  		if(obj[key] === undefined || typeof (obj[key]) === "function") { 
        continue;
      } 
      newArray.push(stringifyJSON(key) + ":" + stringifyJSON(obj[key]));
  	}
  	return "{" + newArray.join(",") + "}";
  }

  // check for strings
  else if(objType === "string") { 
  	return '"' + obj + '"';
  }
  // use type coersion to strigify obj
  return '' + obj; 
};




	
