
// STUB DATA
var objects = [
    {
        type: 'person',
        name: 'Amy',
        location: 'Oakland'
    },
    {
        type: 'animal',
        name: 'Spike',
        location: 'Africa'
    },
    {
        type: 'car',
        name: 'Batmobile',
        location: 'Classified'
    },
    {
        type: 'person',
        name: 'Joe',
        location: 'Miami'
    }
];

// GIVEN UNDERBAR FUNCTIONS
var _ = {};

_.each = function(collection, iterator) {
    for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
    }
};

_.filter = function(collection, iterator) {
    var results = [];
    _.each(collection, function(elem) {
        if (iterator(elem)) results.push(elem);
    });
    return results;
};

_.map = function(collection, iterator) {
    var results = [];
    _.each(collection, function(elem) {
        results.push(iterator(elem));
    });
    return results;
};

// *************************************** //
//                 Use Each                //
// *************************************** //
//
// Description:
// Log the name of each object and its location on a new line
// in the following format: '$name is in $location'
// 
// Should produce the following output:
// 
// Amy is in Oakland
// Spike is in Africa
// Batmobile is in Classified
// Joe is in Miami

var location = function(array) {

  _.each(array, function(item, index, array) {
    console.log(item["name"] + " is in " + item["location"]);
  })
};
  

// *************************************** //
//                Use Filter               //
// *************************************** //
//
// Description:
// Pt. 1
// Use _.filter to create an array with only objects that have the 
// type 'person' and store the array in variable people
//
// [ { type: 'person', name: 'Amy', location: 'Oakland' },
//  { type: 'person', name: 'Joe', location: 'Miami' } ]

 _.filter(objects, function(item, key) {
   if(item[key] === "person") { return item;}
 });


// *************************************** //
//                  Use Map                //
// *************************************** //
//
// Description:
// Use _.map to create an array of people objects with only
// the name and location properties
// 
// [ { name: 'Amy', location: 'Oakland' },
//   { name: 'Joe', location: 'Miami' } ]

_.map(objects, function(obj, key) {
  var myObj = {}
  if(key === "name") { myObj["name"] = obj[key];}
  else if(key === "location") {myObj["location"] = obj[key];}
  return myObj;
});
