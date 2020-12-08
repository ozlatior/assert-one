============
class Assert
============

**Base class:** Object

Custom assertion and message class

Provides methods for asserting for type, value and for object and array assertions

Some methods (assertValue, assertFieldValues, assertOptionalFieldValues) take a condition object as argument. A detailed
description of condition objects is provided in the condition.js file.

To avoid repetition in user code, all methods starting with `assert` have an alias without `assert`, eg

* assertType -> type
* assertValue -> value
* assertEquals -> equals
* etc

To customize error messages, change the `message` field of one of the assertion methods, eg:

::

  assert.assertType.message = "...";

A detailed description of how messages work can be found in the message.js file.

The class is exported as a singleton instance, but in case another instance is needed (for custom error messages,
maybe), the new() method of the instance can be called


Constructor ()
==============

Constructor

The created instance stores default options and default tokens for custom message generation


Member methods
==============

This class defines the following member methods


Assert.prototype._applyDefaults (o, defaults)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Complete object `o` with default values from `defaults` object

* `o`: object, object to copy values to
* `defaults`: object, default values to be copied

This method copies any value from the `defaults` object to object `o`, as long as the corresponding field is missing
from `o`.

Returns: object, `o` with missing values copied from `defaults`


Assert.prototype._applyDefaultOptions (o)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Apply default options stored in this instance

* `o`: object, object to copy default options to

This method completes any missing field from `o` with the default values stored in this Assert instance

Returns: object, `o` with missing values copied from instance default options


Assert.prototype._applyDefaultTokens (o)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Apply default tokens stored in this instance

* `o`: object, object to copy default tokens to

This method completes any missing field from `o` with the default values stored in this Assert instance

Returns: object, `o` with missing values copied from instance default tokens


Assert.prototype._reportAssertion (result, errorClass, options, tokens)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Check `result` and throw new `errorClass` error if result is false

* `result`: boolean, assertion result (the function returns immediatelly if this is true)
* `errorClass`: class, the constructor for the reported error message
* `options`: options object, options to use for this assertion
   * `message`: string, message with tokens, this will be processed and used in the thrown error
   * `stackDepth`: number, how many stack entries to skip in the returned error this is so that the error appears to
     originate where the assertion was called, and not inside the assertion class
* `tokens`: tokens object, any values in this object will be used to replace the tokens and macros in the message string

Throws an error of `errorClass` type with message `options.message` if `result` is false

Returns: `true` if result is true


Assert.prototype.assertType (value, type, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Check that a single value is of the specified type or types

* `value`: any type, value to check
* `type`: string or array of strings, list of acceptable types
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertType.message` if assertion fails

Returns: `true` if assertion passes

**Aliases:** `type`


Assert.prototype.type (value, type, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Alias of `Assert.prototype.assertType`

Check that a single value is of the specified type or types

* `value`: any type, value to check
* `type`: string or array of strings, list of acceptable types
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertType.message` if assertion fails

Returns: `true` if assertion passes


Assert.prototype.assertValue (value, condition, errorClass, varName, funName, stackDepth)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Check that a single value is valid according to condition

* `value`: any type, value to check
* `condition`: condition object or array of condition objects describing a valid value
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message
* `stackDepth`: number, extra stack depth to add on top of the default stack depth (defaults to zero)

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes

**Aliases:** `value`


Assert.prototype.value (value, condition, errorClass, varName, funName, stackDepth)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Alias of `Assert.prototype.assertValue`

Check that a single value is valid according to condition

* `value`: any type, value to check
* `condition`: condition object or array of condition objects describing a valid value
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message
* `stackDepth`: number, extra stack depth to add on top of the default stack depth (defaults to zero)

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes


Assert.prototype.assertFieldTypes (value, fields, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Check that all specified fields are of the specified type or types Missing fields will trigger an assertion error

* `value`: object, object to check
* `fields`: object, key value pairs specifying the correct type for each field:
   * `<fieldName>`: string or array of strings, list of acceptable types
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertFieldTypes.message` if assertion fails

Returns: `true` if assertion passes

**Aliases:** `fieldTypes`


Assert.prototype.fieldTypes (value, fields, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Alias of `Assert.prototype.assertFieldTypes`

Check that all specified fields are of the specified type or types Missing fields will trigger an assertion error

* `value`: object, object to check
* `fields`: object, key value pairs specifying the correct type for each field:
   * `<fieldName>`: string or array of strings, list of acceptable types
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertFieldTypes.message` if assertion fails

Returns: `true` if assertion passes


Assert.prototype.assertFieldValues (value, fields, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Check that all specified fields of object are valid according to individual conditions Missing fields will trigger an
assertion error

* `value`: object, object to check
* `fields`: object, key value pairs specifying validation condition or conditions for the field:
   * `<fieldName>`: object or array of objects, validation condition for field
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertFieldValues.message` if assertion fails

Returns: `true` if assertion passes

**Aliases:** `fieldValues`


Assert.prototype.fieldValues (value, fields, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Alias of `Assert.prototype.assertFieldValues`

Check that all specified fields of object are valid according to individual conditions Missing fields will trigger an
assertion error

* `value`: object, object to check
* `fields`: object, key value pairs specifying validation condition or conditions for the field:
   * `<fieldName>`: object or array of objects, validation condition for field
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertFieldValues.message` if assertion fails

Returns: `true` if assertion passes


Assert.prototype.assertOptionalFieldTypes (value, fields, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Check that all present fields are of the specified type or types Missing fields will be ignored

* `value`: object, object to check
* `fields`: object, key value pairs specifying the correct type for each field:
   * `<fieldName>`: string or array of strings, list of acceptable types
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertOptionalFieldTypes.message` if assertion fails

Returns: `true` if assertion passes

**Aliases:** `optionalTypes`


Assert.prototype.optionalTypes (value, fields, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Alias of `Assert.prototype.assertOptionalFieldTypes`

Check that all present fields are of the specified type or types Missing fields will be ignored

* `value`: object, object to check
* `fields`: object, key value pairs specifying the correct type for each field:
   * `<fieldName>`: string or array of strings, list of acceptable types
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertOptionalFieldTypes.message` if assertion fails

Returns: `true` if assertion passes


Assert.prototype.assertOptionalFieldValues (value, fields, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Check that all specified fields of object are valid according to individual conditions Missing fields will be ignored

* `value`: object, object to check
* `fields`: object, key value pairs specifying validation condition or conditions for the field:
   * `<fieldName>`: object or array of objects, validation condition for field
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertOptionalFieldValues.message` if assertion fails

Returns: `true` if assertion passes

**Aliases:** `optionalValues`


Assert.prototype.optionalValues (value, fields, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Alias of `Assert.prototype.assertOptionalFieldValues`

Check that all specified fields of object are valid according to individual conditions Missing fields will be ignored

* `value`: object, object to check
* `fields`: object, key value pairs specifying validation condition or conditions for the field:
   * `<fieldName>`: object or array of objects, validation condition for field
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertOptionalFieldValues.message` if assertion fails

Returns: `true` if assertion passes


Assert.prototype.assertAllowedFields (value, fields, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Check that only the allowed fields are present in object

* `value`: object, object to check
* `fields`: array of string, names of allowed fields for this object
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertAllowedFields.message` if assertion fails

Returns: `true` if assertion passes

**Aliases:** `allowedFields`


Assert.prototype.allowedFields (value, fields, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Alias of `Assert.prototype.assertAllowedFields`

Check that only the allowed fields are present in object

* `value`: object, object to check
* `fields`: array of string, names of allowed fields for this object
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertAllowedFields.message` if assertion fails

Returns: `true` if assertion passes


Assert.prototype.assertForbiddenFields (value, fields, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Check that no forbidden fields are present in object

* `value`: object, object to check
* `fields`: array of string, names of forbidden fields for this object
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertForbiddenFields.message` if assertion fails

Returns: `true` if assertion passes

**Aliases:** `forbiddenFields`


Assert.prototype.forbiddenFields (value, fields, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Alias of `Assert.prototype.assertForbiddenFields`

Check that no forbidden fields are present in object

* `value`: object, object to check
* `fields`: array of string, names of forbidden fields for this object
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertForbiddenFields.message` if assertion fails

Returns: `true` if assertion passes


Assert.prototype.assertEqual (value, reference, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Check that value equals reference value

* `value`: any type, value to check
* `reference`: any type, reference value
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes

**Aliases:** `eq`, `equal`


Assert.prototype.eq (value, reference, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Alias of `Assert.prototype.assertEqual`

Check that value equals reference value

* `value`: any type, value to check
* `reference`: any type, reference value
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes

**Other aliases:** `equal`


Assert.prototype.equal (value, reference, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Alias of `Assert.prototype.assertEqual`

Check that value equals reference value

* `value`: any type, value to check
* `reference`: any type, reference value
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes

**Other aliases:** `eq`


Assert.prototype.assertNotEqual (value, reference, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Check that value does not equal reference value

* `value`: any type, value to check
* `reference`: any type, reference value
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes

**Aliases:** `neq`, `notEqual`


Assert.prototype.neq (value, reference, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Alias of `Assert.prototype.assertNotEqual`

Check that value does not equal reference value

* `value`: any type, value to check
* `reference`: any type, reference value
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes

**Other aliases:** `notEqual`


Assert.prototype.notEqual (value, reference, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Alias of `Assert.prototype.assertNotEqual`

Check that value does not equal reference value

* `value`: any type, value to check
* `reference`: any type, reference value
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes

**Other aliases:** `neq`


Assert.prototype.assertLt (value, reference, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Check that value is strictly less than reference value

* `value`: string or number, value to check
* `reference`: string or number, reference value
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes

**Aliases:** `lt`


Assert.prototype.lt (value, reference, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Alias of `Assert.prototype.assertLt`

Check that value is strictly less than reference value

* `value`: string or number, value to check
* `reference`: string or number, reference value
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes


Assert.prototype.assertLte (value, reference, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Check that value is less than or equal to reference value

* `value`: any type, value to check
* `reference`: any type, reference value
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes

**Aliases:** `lte`


Assert.prototype.lte (value, reference, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Alias of `Assert.prototype.assertLte`

Check that value is less than or equal to reference value

* `value`: any type, value to check
* `reference`: any type, reference value
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes


Assert.prototype.assertGt (value, reference, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Check that value is strictly greater than reference value

* `value`: string or number, value to check
* `reference`: string or number, reference value
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes

**Aliases:** `gt`


Assert.prototype.gt (value, reference, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Alias of `Assert.prototype.assertGt`

Check that value is strictly greater than reference value

* `value`: string or number, value to check
* `reference`: string or number, reference value
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes


Assert.prototype.assertGte (value, reference, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Check that value is greater than or equal to reference value

* `value`: string or number, value to check
* `reference`: string or number, reference value
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes

**Aliases:** `gte`


Assert.prototype.gte (value, reference, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Alias of `Assert.prototype.assertGte`

Check that value is greater than or equal to reference value

* `value`: string or number, value to check
* `reference`: string or number, reference value
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes


Assert.prototype.assertInteger (value, reference, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Check that value is strictly integer or float

* `value`: number, value to check
* `reference`: boolean, `true` for integer, `false` for float, defaults to `true`
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes

**Aliases:** `integer`


Assert.prototype.integer (value, reference, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Alias of `Assert.prototype.assertInteger`

Check that value is strictly integer or float

* `value`: number, value to check
* `reference`: boolean, `true` for integer, `false` for float, defaults to `true`
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes


Assert.prototype.assertDivides (value, reference, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Check that value divides a reference value exactly

* `value`: number, value to check
* `reference`: number, reference number
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes

**Aliases:** `divides`


Assert.prototype.divides (value, reference, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Alias of `Assert.prototype.assertDivides`

Check that value divides a reference value exactly

* `value`: number, value to check
* `reference`: number, reference number
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes


Assert.prototype.assertMultiple (value, reference, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Check that value is an exact multiple of the reference value

* `value`: number, value to check
* `reference`: number, reference number
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes

**Aliases:** `multiple`


Assert.prototype.multiple (value, reference, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Alias of `Assert.prototype.assertMultiple`

Check that value is an exact multiple of the reference value

* `value`: number, value to check
* `reference`: number, reference number
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes


Assert.prototype.assertContains (value, reference, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Check that a string contains a substring

* `value`: string, string to check
* `reference`: string, reference substring
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes

**Aliases:** `contains`


Assert.prototype.contains (value, reference, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Alias of `Assert.prototype.assertContains`

Check that a string contains a substring

* `value`: string, string to check
* `reference`: string, reference substring
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes


Assert.prototype.assertBegins (value, reference, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Check that a string begins with a substring

* `value`: string, string to check
* `reference`: string, reference substring
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes

**Aliases:** `begins`


Assert.prototype.begins (value, reference, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Alias of `Assert.prototype.assertBegins`

Check that a string begins with a substring

* `value`: string, string to check
* `reference`: string, reference substring
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes


Assert.prototype.assertEnds (value, reference, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Check that a string ends with a substring

* `value`: string, string to check
* `reference`: string, reference substring
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes

**Aliases:** `ends`


Assert.prototype.ends (value, reference, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Alias of `Assert.prototype.assertEnds`

Check that a string ends with a substring

* `value`: string, string to check
* `reference`: string, reference substring
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes


Assert.prototype.assertMatches (value, reference, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Check that string matches regexp

* `value`: string, string to check
* `reference`: string or RegExp object, regexp to match
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes

**Aliases:** `matches`


Assert.prototype.matches (value, reference, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Alias of `Assert.prototype.assertMatches`

Check that string matches regexp

* `value`: string, string to check
* `reference`: string or RegExp object, regexp to match
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes


Assert.prototype.assertContainsNot (value, reference, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Check that a string does not contain reference substring

* `value`: string, string to check
* `reference`: string, reference substring
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes

**Aliases:** `containsNot`


Assert.prototype.containsNot (value, reference, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Alias of `Assert.prototype.assertContainsNot`

Check that a string does not contain reference substring

* `value`: string, string to check
* `reference`: string, reference substring
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes


Assert.prototype.assertBeginsNot (value, reference, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Check that a string does not begin with reference substring

* `value`: string, string to check
* `reference`: string, reference substring
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes

**Aliases:** `beginsNot`


Assert.prototype.beginsNot (value, reference, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Alias of `Assert.prototype.assertBeginsNot`

Check that a string does not begin with reference substring

* `value`: string, string to check
* `reference`: string, reference substring
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes


Assert.prototype.assertEndsNot (value, reference, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Check that a string does not end with reference substring

* `value`: string, string to check
* `reference`: string, reference substring
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes

**Aliases:** `endsNot`


Assert.prototype.endsNot (value, reference, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Alias of `Assert.prototype.assertEndsNot`

Check that a string does not end with reference substring

* `value`: string, string to check
* `reference`: string, reference substring
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes


Assert.prototype.assertMatchesNot (value, reference, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Check that string does not match regexp

* `value`: string, string to check
* `reference`: string or RegExp object, regexp the string shouldn't match
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes

**Aliases:** `matchesNot`


Assert.prototype.matchesNot (value, reference, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Alias of `Assert.prototype.assertMatchesNot`

Check that string does not match regexp

* `value`: string, string to check
* `reference`: string or RegExp object, regexp the string shouldn't match
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes


Assert.prototype.assertLength (value, reference, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Check that length of string or array matches condition

* `value`: string or array, the item to check the length of
* `reference`: condition object or number, length should match this condition
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes

**Aliases:** `length`


Assert.prototype.length (value, reference, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Alias of `Assert.prototype.assertLength`

Check that length of string or array matches condition

* `value`: string or array, the item to check the length of
* `reference`: condition object or number, length should match this condition
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes


Assert.prototype.assertEach (value, reference, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Check that each element of an array matches condition

* `value`: array, the array to check the elements of
* `reference`: condition object, condition all elements should match
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes

**Aliases:** `each`


Assert.prototype.each (value, reference, errorClass, varName, funName)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Alias of `Assert.prototype.assertEach`

Check that each element of an array matches condition

* `value`: array, the array to check the elements of
* `reference`: condition object, condition all elements should match
* `errorClass`: class, error class to use for thrown error (defaults to Error)
* `varName`: string, original variable or argument name that is being asserted (for error message), defaults to
  `argument`
* `funName`: string, original function name where this assertion was called (for error message) defaults to `undefined`,
  which does not appear in the default error message

Throws an error of `errorClass` type with message `assertValue.message` if assertion fails

Returns: `true` if assertion passes


Fields and Properties
=====================


Assert.prototype.assertType.message
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Type assertion error message (Default messages)

* declared as `const MSG_ASSERT_TYPE`
* initial value: `"Wrong type for '%varName%', expected %type%, got %_TYPE_%(?funName in %funName%?)"`


Assert.prototype.assertValue.message
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Value assertion error message (Default messages)

* declared as `const MSG_ASSERT_VALUE`
* initial value: `"Wrong value for '%varName%', expected %expected%, got %_ACTUAL_%(?funName in %funName%?)"`


Assert.prototype.assertFieldTypes.message
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Field type assertion error message (Default messages)

* declared as `const MSG_ASSERT_FIELD_TYPES`
* initial value: `"Wrong type for field '%field%' of '%varName%', expected %type%, got %actual%(?funName in
  %funName%?)"`


Assert.prototype.assertFieldValues.message
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Field value assertion error message (Default messages)

* declared as `const MSG_ASSERT_FIELD_VALUES`
* initial value: `"Wrong value for field '%field%' of '%varName%', expected %expected%, got %_ACTUAL_%(?funName in
  %funName%?)"`


Assert.prototype.assertOptionalFieldTypes.message
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Optional field type assertion error message (Default messages)

* declared as `const MSG_ASSERT_OPTIONAL_FIELD_TYPES`
* initial value: `"Wrong type for field '%field%' of '%varName%', expected %type%, got %actual%(?funName in
  %funName%?)"`


Assert.prototype.assertOptionalFieldValues.message
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Optional field value assertion error message (Default messages)

* declared as `const MSG_ASSERT_OPTIONAL_FIELD_VALUES`
* initial value: `"Wrong value for field '%field%' of '%varName%', expected %expected%, got %_ACTUAL_%(?funName in
  %funName%?)"`


Assert.prototype.assertAllowedFields.message
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Allowed field assertion error message (Default messages)

* declared as `const MSG_ASSERT_ALLOWED_FIELDS`
* initial value: `"Unexpected field '%field%' in '%varName%'(?funName in %funName%?)"`


Assert.prototype.assertForbiddenFields.message
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Forbidden field assertion error message (Default messages)

* declared as `const MSG_ASSERT_FORBIDDEN_FIELDS`
* initial value: `"Field '%field%' not allowed in '%varName%'(?funName in %funName%?)"`