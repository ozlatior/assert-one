===================================================
Condition evaluation functions (./src/condition.js)
===================================================


Conditions are in object form

If conditions or values are in an array, either of the conditions have to be fullfilled (`or`)

The object field name specifies the condition operator or type, and the value is the reference value for the condition,
eg `{ gte: 4, lte: 10, integer: true }` - between 4 and 10 inclusively, integer `{ eq: [ 1, 5, 10 ] }` - either of the
values 1, 5 or 10 `[ { eq: false }, { integer: true, gte: 0 } ]` - either `false` or any non-negative integer

Some properties can be subjected to a condition as well `{ length: { gte: 10, lte: 20 } }` - check that string length is
between 10 and 20

Condition list:

* `type`: string, input type equals value
* `eq`: number/string/boolean, equals value
* `neq`: number/string/boolean, does not equal value
* `lt`, `lte`, `gt`, `gte`: number, less/greater than (or equal to) value
* `integer`: boolean, if specified, forces value to be integer or to not be integer
* `divides`: number, true if the value is a natural divisor of specified number
* `multiple`: number, true if the value is a multiple of specified number
* `contains`: string/any, check that the value contains specified string or value
* `begins`: string/any, check that the value begins with specified string or value
* `ends`: string/any, check that the value ends with specified string or value
* `matches`: string or regexp, check that the value matches specified regexp
* `containsNot`: string/any, check that the value does not contain specified string or value
* `beginsNot`: string/any, check that the value does not begin with specified string or value
* `endsNot`: string/any, check that the value does not end with specified string or value
* `matchesNot`: string or regexp, check that the value does not match specified regexp
* `length`: condition object, check that the string or array length validates condition object
* `each`: condition object, run condition object for each element of an array


Exported Functions
==================


condition.evaluateValueCondition (value, condition)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Evaluate if a value validates a condition

* `value`: any type, value to check
* `condition`: object, condition object or array of condition objects

Returns an object:

* `result`: boolean, `true` if condition is validated
* `what`: string, name of the failing condition
* `reference`: any type, in case condition is not satisfied, the reference value for multiple conditions, this will be
  an object with a key for each condition
* `actual`: any type, the actual value
* `details`: string, a short text describing the failure


Internal Functions
==================


convertToString (value, stringify)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Convert a value to string for messages

* `value`: any type, value to convert to string
* `stringify`: boolean, call stringify on elements (defaults to true)

If `stringify` is used, the value is converted using the `JSON.stringify()` function, which results in strings being
placed between quotes

Returns: string, the converted value


joinList (list, options)
~~~~~~~~~~~~~~~~~~~~~~~~

Join an array as if it was a enumeration of values

* `list`: array, array to join
* `option`: object:
   * `stringify`: boolean, call stringify on elements (defaults to true)
   * `last`: string, sequence to use for last element (defaults to " or ")
   * `separator`: string, sequence to use as separator (defaults to ", ")

Returns a formatted string, such as [ 1, 2, 3 ] => "1, 2 or 3"


referenceList (list)
~~~~~~~~~~~~~~~~~~~~

Build a list of reference values from multiple conditions output

* `list`: array of objects, the conditions to merge into the returned object; each field should contain the elements
   * `what`: string, the condition operator name
   * `value`: string, reference value

Returns an object where fields are condition operator names (from `what` fields) and the values are arrays of all
reference values of the input conditions, eg:

::

  [ { what: "eq", reference: [ 10, 11 ] },
  { what: "eq", reference: 12 },           --->   { eq: [ 10, 11, 12 ], integer: true }
  { what: "integer", reference: true } ]


isNestedCondition (condition)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Check that a condition should be treated as a nested condition

* `condition`: string, the condition operator name

Returns boolean, true for conditions that should be treated as nested conditions: `length`, `each`, `none`, false
otherwise


isNegativeCondition (condition)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Check that a condition should be treated as a negative condition

* `condition`: string, the condition operator name

Returns boolean, true for conditions which should be handled in negative logic, such as `neq`, `containsNot`, `endsNot`
..., false otherwise


isInteger (number)
~~~~~~~~~~~~~~~~~~

Check that a number is integer

* `number`: number, value to check

Returns boolean, true for integer number, false otherwise


isDivisor (value, multiple)
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Check that a number is exact divisor of another

* `value`: number, the divisor
* `multiple`: number, the multiple

Returns boolean, true if there is an n so that multiple = n * value and n is integer, false otherwise


evaluateSingle (condition, value, reference)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Evaluate a single condition

* `condition`: string, name of condition to evaluate
* `value`: any type, actual value
* `reference`: any type, value or array of possible reference values

Returns an object:

* `result`: boolean, true if evaluation was positive
* `actual`: any type, the actual value
* `details`: string, a short text explaining the reference value

Generated at Tue Dec 08 2020 22:19:14 GMT+0800 (Central Indonesia Time)