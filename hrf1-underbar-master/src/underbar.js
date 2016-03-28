(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) { // must be able to handle -nums, -0, 0
      
    var length = array.length
    return n === undefined ? array[length - 1] : array.slice(Math.max(0, (length-n)));
    // array.slice(-n) doesn't pass test because when n = 0, _.last should return [] not all array elements
  };


  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.

  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
        for(var key in collection) {
          iterator(collection[key], key, collection);
        }
      }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  //alternative using reduce 

  // _.indexOf = function(array, target) {
  //   return _.reduce(array, function(accum, currentVal, index){
  //     if (currentVal === target) { return index;}
  //   });
  // }

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var result = [];
    _.each(collection, function(value) {
      if (test(value)) {
        result.push(value);
      }
    });
    return result;
  };

// alternative using reduce

//   _.filter = function(collection, test){
//     return _.reduce(collection, function(accum, current){
//       if(test(current)) { accum.push(current);}
//       return accum;
//     },[]);
// }

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function (value) {
      return !test(value);
    });
  };

// alternative using reduce

// _.reject = function(collection, test){
//     return _.reduce(collection, function(accum, current){
//       if(!test(current)) { accum.push(current);}
//       return accum;
//     }, []);
// };


 // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var obj = {};
    var uniqKeys = [];
    // probably not necessary to use _.each since this method's input is an array not obj
    _.each(array, function(item) {
      obj[item] = item;
    });
    _.each(obj, function(key) {
      uniqKeys.push(obj[key]);
      // note: if passed an array with numerical values that also have stringified-number equivalents (e.g. [1,2,"2",3,4,4]) will not yield BOTH the numerical AND strigified versions (e.g. 2 & "2")
    });
    return uniqKeys;

    /****Use _.each instead of loop version?****/
    // for (var i = 0; i < array.length; i++) {
    //   obj[array[i]] = array[i];
    // }
    // for (var key in obj) {
    //   uniqKeys.push(obj[key]);
    // }

    /****Not the most efficient version****/
    // for (var i = 0; i < array.length; i++) {
    //   if(_.indexOf(uniqKeys, array[i]) === -1) {
    //     uniqKeys.push(array[i]);
    //   }
    // }
  };

// alternative using reduce

// _.unique = function(array){
//   return _.reduce(array, function(accum, current, index){
//     if(current !== array[index+1]) { accum.push(current);}
//     return accum;
//   }, []);
// }


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var results = [];
    _.each(collection, function(item) {
      results.push(iterator(item));
    });
    return results;
  };

// alternative using reduce

// _.map = function(collection, iterator){
//   return _.reduce(collection, function(accum, current){
//     accum.push(iterator(current));
//     return accum;
//   }, []);
// };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // alternative using _.reduce

  // _.pluck = function(collection, key) {
  //   return _.reduce(collection, function(accum, current, index){
  //     if(index === key) { accum.push(current);}
  //     return accum;
  //   }, []);
  // }



  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.

  _.reduce = function(collection, iterator, accumulator) { 
    var noAccumulator = arguments.length === 2
    _.each(collection, function(item) {
      if (noAccumulator) {
        accumulator = item;
        noAccumulator = false;  
      } else {
        accumulator = iterator(accumulator, item);
      }
      
    });

    return accumulator;
  };

    /*** Using for loop:
      var noAccumulator = arguments.length === 2;  
        for (var i = 0; i < collection.length; i++) {
          if(noAccumulator) {
            accumulator = collection[i];
            noAccumulator = false;
          } else {
            accumulator = iterator(accumulator, collection[i]);
          }
        }
    ***/

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) { 
      /* Note to self: wasFound value is a boolean initially set to false then its value 
      value is determined by the value returned of "item === target" */
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    iterator = iterator || _.identity; // iterator is optional; this check can occur outside _.reduce
    return _.reduce(collection, function(accumulator, item) {
        return accumulator && !!iterator(item); // use && because every result should yield true
    }, true); // set initial val/accum to true to compare each result of iterator(item)
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    iterator = iterator || _.identity;
    return _.reduce(collection, function(accumulator, item) {
        return accumulator || !!iterator(item); // use || because one true result is sufficient
      }, false); // set initial/accum to false 
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    
    _.each(arguments, function(accumObj) {
      _.each(accumObj, function(value, key) {
        obj[key] = value;
      });
    });
    
    return obj;
  };

// alternative using reduce

//   _.extend = function(obj){
//     var args = [].slice.call(arguments, 1);

//     returh _.reduce(args, function(obj, current){
//       _.each(current, function(elem, key){
//         if(_.isObject(current)) { obj[key] = elem;}
//       });
//       return obj;
//     }, obj);
//   };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    _.each(arguments, function(accumObj) {
      _.each(accumObj, function(value, key) {
        if (obj[key] === undefined) {
          obj[key] = value;
        }
      });
    });
    return obj;
  };

// alternative using reduce

// _.defaults = function(obj){
//   var args = [].slice.call(arguments, 1);
//   return _.reduce(args, function(obj, currentArg){
//     _.each(currentArg, function(value, key){
//       if(_.isObject(currentArg) && obj[key] === undefined) { obj[key] = value;}
//     });
//     return obj
//   }, obj)
// };

  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var result = {};

    return function(arg) {
      
        if (result[arg] === undefined) {
          result[arg] = func.apply(this, arguments); 
          // use apply since arguments holds all args in an array
        }
      return result[arg];
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments, 2); 
    // calling slice (2) on arguments object to capture only func and wait arguments in args variable
    return setTimeout(function(){
      return func.apply(null, args); 
      // null is used as object because func is defined in global scope? 
      //applying func (args) on window object 
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  
  _.shuffle = function(array) {
    var length = array.length;
    var shuffledCopy = array.slice(0, length);
    // uses slice to create a shallow copy of the array & "length" as end parameter to capture the entire array
    var x, random;
    while(length) {
      // starts with length and decreases until 1 (excludes 0)
      random = Math.floor(Math.random() * length--);
      // generates random nums from 0 to length - 1; decreases length before swapping begins
      x = shuffledCopy[length];
      // note: current length has decreased 
      //captures the value at current index ("length") position in shuffledCopy array;
      shuffledCopy[length] = shuffledCopy[random];
      // places the value of shuffledCopy[random] in the current shuffleCopy[length] position (part 1 of the swap)
      shuffledCopy[random] = x;
      // places x in the shuffledCopy[random] position (part 2 of the swap)
    }
    return shuffledCopy;
    // returns shuffledCopy without altering the original array
  };  

  /**
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.

  _.invoke = function(list, methodName, args) {
    var argArray = Array.prototype.slice.call(arguments, 2);
    var isFunction = typeof(methodName) === "function";
                    //_.isFunction(methodName);
      return _.map(list, function(item) {
        var setMethod = isFunction ? methodName: item[methodName];
        return  setMethod.apply(item, argArray); 
      });
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
    _.sortBy = function(collection, iterator){
      if(typeof(iterator) === "string" || typeof(iterator) === "object") {
        return collection.sort(function(a,b){return a[iterator]-b[iterator]});
      } else {
        return collection.sort(function(a,b){return iterator(a)-iterator(b)});
      }
    };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
      var outputArray = [];
      var arrayList = Array.prototype.slice.call(arguments);
      var outputArrayLength = _.reduce(arrayList,function(a,b){
        return Math.max(a,b.length);
      },0);
      var counter = 0;
      while(counter < outputArrayLength){
        outputArray.push([]);
      for(var i = 0; i < arrayList.length; i++){
        outputArray[counter].push(arrayList[i][counter]);
      }
      counter++;
      }
      return outputArray;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, shallow) {
    var results = [];
    function recursion(nestedArray){
      _.each(nestedArray, function(item) {     
        if(!Array.isArray(item)){ results.push(item)}
        else { recursion(item)}
      });
    }  
    if(shallow === true) {
      for(var i = 0; i < nestedArray.length; i++) { // recreate this part with _.each
        if(Array.isArray(nestedArray[i])){ 
          return results.concat(nestedArray[i]);} 
        else {results.push(nestedArray[i]);}
      }
    }
    else { recursion(nestedArray);}
    return results;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var args = Array.prototype.slice.call(arguments, 0);
    
    

  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {

  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
