define([ 'jquery' ], function( $ ) {
  var Person = function( firstName, lastName ) {
    this.firstName = firstName;
    this.lastName = lastName;
  };

  Person.prototype.introduce = function() {
    return $('<p>', {
      text: 'My name is ' + this.firstName + ' ' + this.lastName
    });
  };

  return Person;
});