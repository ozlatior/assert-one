---
Assertion Library with custom error messages for nodejs
---

This is a light-weight and user-friendly customizable assertion library.
It does not include any third-party packages, making it perfect for
developers who hate to have a thousand packages in the node_modules
directory.

Features:

-   custom error messages (on project level as well as on instance
    level)
-   custom error classes for each call
-   individual value assertions as well as bulk assertions for objects
    and arrays (schema-style)
-   compound conditions, either inclusive or exclusive (`or`
    and `and` logic)
-   condition object calls as well as individual methods for each
    "operator"

# Assert class and instance

To use the main instance of the Assert class, simply require it:

    const assert = require("assert-one");

    assert.equal(myVar, 42);

You can access the class itself from the assert instance
`assert.Assert`, however this is not recommended. The
instances handed to the user are prepared using an internal function,
while instances created with the `new` operator will not
come with the full set of features.

If you must get a separate instance, you can call the
`new()` method on the assert instance:

    const assert = require("assert-one");
    const secondInstance = assert.new();

    secondInstance.assertEqual(myVar, 42); // same as "equal"

# Basic assertion methods

Basic assertion methods compare a value against a reference. The general
arguments are:

    assert.equal(value, reference, [errorClass, varName, funName] )

Where the arguments are:

-   `value`: any type, the value to be checked
-   `reference`: any type, value to be compared with or an array of
    values
-   `errorClass`: class, optional, if this is set thrown errors will
    be instances of this class instead of the default `Error` class
-   `varName`: string, optional, variable name - if this is set, the
    variable name will be included in the error message, otherwise the
    name "argument" will be used instead
-   `funName`: string, optional, function name - if this is set, the
    function name will be included in the error message, defaults to
    `undefined`, which is not displayed in the default error messages

Example:

    const setPrice = function (price) {
        assert.gte(price, 0, PriceError, "price", "setPrice");
        ...
    };
    setPrice(-100);
    // throws PriceError("Wrong value for 'price', expected number greater than or equal to 0, got -100 in setPrice")

    const readDirectionKey = function (direction) {
        assert.eq(direction, [ 'w', 'a', 's', 'd' ], KeyError);
        ...
    }
    readDirectionKey ('z');
    // throws KeyError("Wrong value for 'argument', expected "w", "a", "s" or "d", got "z");

**Available assertion methods**

    Method                 Alias              Passes if ...
    ---------------------- ------------------ -----------------------------------------------------------------------
    assertType()           type()             the variable type equals one of the reference values
    assertEqual()          equal()            the value equals one of the reference values
    assertNotEqual()       notEqual()         the value does not equal any of the reference values
    assertLt()             lt()               the number value is less than the reference value
    assertLte()            lte()              the number value is less than or equal to the reference value
    assertGt()             gt()               the number value is greater than the reference value
    assertGte()            gte()              the number value is greater than or equal to the reference value
    assertInteger()        integer()          the number value is strictly integer (if reference is true)
                                                or strictly not integer (if reference is false)
    assertDivides()        divides()          the number value divides the reference value an integer number of times
    assertMultiple()       multiple()         the number reference value divides the value an integer number of times
    assertContains()       contains()         the string value contains either of the reference strings
    assertBegins()         begins()           the string value begins with any of the reference strings
    assertEnds()           ends()             the string value ends with any of the reference strings
    assertMatches()        matches()          the string value matches either of the reference regular expressions
    assertContainsNot()    containsNot()      the string value contains neither of the reference strings
    assertBeginsNot()      beginsNot()        the string value begins with neither of the reference strings
    assertEndsNot()        endsNot()          the string value ends with neither of the reference strings
    assertMatchesNot()     matchesNot()       the string value matches neither of the reference regular expressions
    assertLength()         length()           the length of the string/array value equals any of the reference values
    assertEach()           each()             each of the array elements equals any of the reference values


# Condition objects

For more complex assertions, a set of methods that accept condition
objects are provided. The general form is:

    assert.value(value, condition, [errorClass, varName, funName] )

Where the arguments are:

-   `value`: any type, the value to be checked
-   `condition`: condition object, a set of conditions for the
    assertion to pass
-   `errorClass`: class, optional, if this is set thrown errors will
    be instances of this class instead of the default `Error` class
-   `varName`: string, optional, variable name - if this is set, the
    variable name will be included in the error message, otherwise the
    name "argument" will be used instead
-   `funName`: string, optional, function name - if this is set, the
    function name will be included in the error message, defaults to
    `undefined`, which is not displayed in the default error messages

The condition object describes a set of conditions that need to be
fulfilled at once (`and` operator), based on the keys and
values. Keys are condition names while values are reference values for
this condition. Values can be arrays, in that case any of the values is
valid (`or` operator). For instance:

    { gte: 10, lte: 20, integer: true } - any integer between 10 and 20 inclusively
    { length: 20, begins: [ "foo", "bar" ] } - any string of length 20 begining with "foo" or "bar"

Some conditions can be nested, namely `length` and `each`:

    { length: { gt: 0 }, each: { begins: [ "foo", "bar" ], containsNot: [ "-", " " ] } }
    - any array with length greater than one where all elements are string beginning with "foo" or "bar"
      and not containing any dashes or spaces

If conditions are placed in an array, any of the conditions can be
fulfilled for a valid assertion:

    [ { eq: 20 }, { gte: 32 } ] - either 20 or any number greater or equal to 32
    { length: [ 16, 32, 64, { gte: 128 } ] } - any string/array of length either 16, 32 or 64 or any
                                               length greater than 128

Using a string or number value directly (instead of a condition object)
is equivalent to an "equal" condition.

**Available conditions**

    Condition              Passes if ...
    ---------------------- ------------------------------------------------------------------------------------------
    type                   the variable type equals one of the reference values
    eq                     the value equals one of the reference values
    neq                    the value does not equal any of the reference values
    lt                     the number value is less than the reference value
    lte                    the number value is less than or equal to the reference value
    gt                     the number value is greater than the reference value
    gte                    the number value is greater than or equal to the reference value
    integer                the number value is strictly integer (if reference is true)
                             or strictly not integer (if reference is false)
    divides                the number value divides the reference value an integer number of times
    multiple               the number reference value divides the value an integer number of times
    contains               the string value contains either of the reference strings
    begins                 the string value begins with any of the reference strings
    ends                   the string value ends with any of the reference strings
    matches                the string value matches either of the reference regular expressions
    containsNot            the string value contains neither of the reference strings
    beginsNot              the string value begins with neither of the reference strings
    endsNot                the string value ends with neither of the reference strings
    matchesNot             the string value matches neither of the reference regular expressions
    length                 the length of the string/array value equals any of the reference values
    each                   each of the array elements equals any of the reference values


# Methods with condition objects

Besides the `value` / `assertValue` methods,
there are other methods designed for asserting entire objects at once.
This way the assertion code is minimized and it's possible to use
pre-defined objects for validation in similar methods.

All methods come in long and short forms (eg `assertValue()` /
`value()`), for aestethic reasons they are presented in this file on
different (`instance` / `assert`) objects, but
they are members of the same exported `Assert` class. The
reason for the aliases is simply syntactic sugar, to avoid expressions
such as `assert.assertValue()` or `instance.equal()`:

    const assert = require("assert-one");
    const instance = require("assert-one");

The last three arguments are common to all these methods:

-   `errorClass`: class, optional, if this is set thrown errors will
    be instances of this class instead of the default `Error` class
-   `varName`: string, optional, variable name - if this is set, the
    variable name will be included in the error message, otherwise the
    name "argument" will be used instead
-   `funName`: string, optional, function name - if this is set, the
    function name will be included in the error message, defaults to
    `undefined` which is not displayed in the default error messages

## instance.assertValue() / assert.value()

    assert.value(value, condition, [ errorClass, varName, funName ] )

Checks a single value against the condition object (or array of
condition objects), eg:

    assert.value(42, { gte: 16 }); // passes, since 42 is greater than or equal to 16
    assert.value("foo", { type: "string", length: { gt: 1 } }); // passes, since "foo" is a string of length more than 1
    assert.value(42, [ 10, 20, 30 ]); // fails, since 42 does not equal any of the allowed values

## instance.assertFieldTypes() / assert.fieldTypes()

    assert.fieldTypes(object, fields, errorClass, varName, funName)

Checks that all the object fields are of the respective field types, eg:

    assert.fieldTypes( { foo: 42, bar: "baz" }, { foo: "number", bar: "string" } ); // passes
    assert.fieldTypes( { foo: 42, bar: 15 }, { foo: "number", bar: [ "boolean", "string" ]); // fails because of "bar"

## instance.assertFieldValues() / assert.fieldValues()

    assert.fieldValues(object, fields, [ errorClass, varName, funName ] )

Checks that all object fields validate their respective conditions, eg:

    assert.fieldValues( { foo: 42, bar: "baz" }, { foo: { gt: 20 }, bar: { contains: "a" } ); // passes
    assert.fieldValues( { foo: 42, bar: "baz" }, { foo: { gt: 50 }, bar: { contains: "a" } ); // fails because of "foo"

## instance.assertOptionalFieldTypes() / assert.optionalFieldTypes()

    assert.optionalFieldTypes(object, fields, errorClass, varName, funName)

Checks that all the object fields are of the respective field types and
ignores missing fields, eg:

    assert.optionalFieldTypes( { foo: 42 }, { foo: "number", bar: "string" } ); // passes
    assert.optionalFieldTypes( { bar: 15 }, { foo: "number", bar: "boolean" } ); // fails because of "bar" but ignores "foo"

## instance.assertOptionalFieldValues() / assert.optionalFieldValues()

    assert.optionalFieldValues(object, fields, [ errorClass, varName, funName ] )

Checks that all object fields validate their respective conditions and
ignores missing fields, eg:

    assert.optionalFieldValues( { foo: 42 }, { foo: { gt: 20 }, bar: { contains: "a" } ); // passes
    assert.optionalFieldValues( { bar: "baz" }, { foo: { gt: 50 }, bar: { contains: "a" } ); // passes

## instance.assertAllowedFields() / assert.allowedFields()

    assert.allowedFields(object, fields, [ errorClass, varName, funName ] )

Checks that only the allowed fields are present in the object, eg:

    assert.allowedFields( { foo: 42, bar: "baz" }, [ "foo", "bar" ] ); // passes
    assert.allowedFields( { foo: 42, baz: "baz" }, [ "foo", "bar" ] ); // fails, "baz" is not in the allowed list

## instance.assertForbiddenFields() / assert.forbiddenFields()

    assert.forbiddenFields(object, fields, [ errorClass, varName, funName ] )

Checks that none of the forbidden fields are present in the object, eg:

    assert.forbiddenFields( { foo: 42, bar: true }, [ "baz" ] ); // passes
    assert.forbiddenFields( { foo: 42, bar: true }, [ "bar", "baz" ] ); // fails, "bar" is in the forbidden list


# Custom messages

The Assert class uses custom messages that are attached to the instance.
These messages are defined as templates and will be generated for each
error, depending on the condition, value and arguments.

The messages are attached to individual instances rather than the
prototype object, which means each instance can have different messages.
This can be useful if you want specific messages for parts of the code.

To change the messages, simply change the [message]{.title-ref} field of
the situation you want a new message for. There are currently eight
situations defined, and messages reside in the most generic functions
for these situations:

    assert.fieldValues.message = "<new message>"

Messages can contain tokens which will be replaced when used, as well as
macros. These are:

-   `%varName%`: variable name used to call the assertion method, or
        "argument" if not provided
-   `%type%`: expected type (for type assertions)
-   `%expected%`: expected value string (this will be replaced with a literal
        description of the expected value, for instance "greater than or equal
        to 42" or "value equal to 10, 20 or 30"
-   `%field%`: field name (for methods where multiple fields are being
    evaluated)
-   `%actual%`: actual value or actual type (depending on method)
-   `%funName%`: function name, if provided (or undefined if not)
-   `%_TYPE_%`: actual type
-   `%_ACTUAL_%`: actual value, stringified like JSON.stringify
    (strings will be quoted)
-   `%_LEN_%`: actual length of the value
-   `%_VALUE_%`: value, stringified like JSON.stringify (strings
    will be quoted)

Messages can contain conditional expressions. The section of the message
in a conditional will only be displayed if the condition is true, for
example the last part of this message will only be dispalyed if funName
has a true-ish value:

    "Wrong type for '%varName%', expected %type%, got %_TYPE_%(?funName in %funName%?)"

Conditionals are expressed by sequences of the type `(?\<condition\>\<string\>?)`.
Conditions can be boolean like in the example above, or expressed with
operators `==`, `===`, `!=`, `!==`, `>=`, `>`, `<=`, `<`.

The left side operand of a condition is always evaluated as a token:

    "(?value > 5 value is greater than five?)"

Available messages are:

## instance.assertType.message

Default value: `"Wrong type for '%varName%', expected %type%, got
%_TYPE_%(?funName in %funName%?)"`

Used when the type of a single asserted value is wrong. Used by the
`assertType` method and its alias `type`.

## instance.assertValue.message

Default value: `"Wrong value for '%varName%', expected %expected%,
got %_ACTUAL_%(?funName in %funName%?)"`

Used when the a single asserted value is wrong. Used by all basic
functions, as well as `assertValue` and `value`.

## instance.assertFieldTypes.message

Default value: `"Wrong type for field '%field%' of '%varName%',
expected %type%, got %actual%(?funName in %funName%?)"`

Used when a field type in an object is wrong. Used by
`assertFieldTypes` and the alias `fieldTypes`.

## instance.assertFieldValues.message

Default value: `"Wrong value for field '%field%' of '%varName%',
expected %expected%, got %\_ACTUAL\_%(?funName in
%funName%?)"`

Used when a field in an object is wrong. Used by
`assertFieldValues` and the alias `fieldValues`.

## instance.assertOptionalFieldTypes.message

Default value: `"Wrong type for field '%field%' of '%varName%',
expected %type%, got %actual%(?funName in %funName%?)"`

Used when an optional field type in an object is wrong. Used by
`assertOptionalFieldTypes` and the alias `optionalFieldTypes`.

## instance.assertOptionalFieldValues.message

Default value: `"Wrong value for field '%field%' of '%varName%',
expected %expected%, got %_ACTUAL_%(?funName in
%funName%?)"`

Used when an optional field in an object is wrong. Used by
`assertOptionalFieldValues` and the alias `optionalFieldValues`.

## instance.assertAllowedFields.message

Default value: `"Unexpected field '%field%' in '%varName%'(?funName
in %funName%?)"`

Used when a field is not in the allowed list for an object. Used by
`assertAllowedFields` and the alias `allowedFields`.

## instance.assertForbiddenFields.message

Default value: `"Field '%field%' not allowed in
'%varName%'(?funName in %funName%?)"`

Used when a field is forbidden for an object. Used by
`assertForbiddenFields` and the alias `forbiddenFields`.
