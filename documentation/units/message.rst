===============================================
Message Processing functions (./src/message.js)
===============================================

**General message syntax**

Messages are strings spiced with variables, macros and conditional expressions

Variables are read from the "tokens" object and are specified in the message string by percent signs, such as `%myvar%`,
which would replace `%myvar%` with the value of `tokens.myvar`

Macros are defined by the library:

* `%_TYPE_%`: `typeof value`
* `%_LEN_%`: `value.length`
* '%_ACTUAL_%`: 'stringified' version of the `actual` field
* '%_VALUE_%`: 'stringified' version of the `value` field

Conditional expressions are parts of the string surrounded by `(?...?)` tokens They begin with a condition which can
either be the name of a token, which translates to `<token> !== undefined`, or an binary operator expression such as
`<token> === <value>` Conditional expressions can be nested


Exported Functions
==================


message.parseCondition (con)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Parse condition string such as `type === "number"`

In case no operator is identified, the condition will be treated as `boolean`

Condition fields:

* `operator`: string, one of `===`, `==`, `!==`, `!=`, `>=`, `>`, `<=`, `<`, `boolean`
* `lho`: string, the name of the field that will be evaluated
* `rho`: any type, the value expected for `lho`

Returns an object containing the operator and the operands


message.evaluateCondition (con, values)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Evaluate a parsed condition object using user values

* `con`: object, describes the condition using the fields:
   * `operator`: string, one of `===`, `==`, `!==`, `!=`, `>=`, `>`, `<=`, `<`, `boolean`
   * `lho`: string, the name of the field that will be evaluated
   * `rho`: any type, the value expected for `lho`
* `values`: object, the field name (lho) will be looked up in the `values` object

Returns `true` if condition is found to be true, false otherwise.


message.runMacro (macro, tokens)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Evaluate a macro based on name and tokens object (should contain `value` field)

* `macro`: string, the macro to evaluate (eg `_ACTUAL_`, `_LEN_` etc)
* `tokens`: object, list of values for this operation; this should contain the fields:
   * `actual` for the _ACTUAL_ macro
   * `value` for the _LEN_, _TYPE_ and _VALUE_ macros

Returns string, the result of the macro with the given tokens.


message.extractSubs (message)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Extract sub expressions (conditionals) from message

* `message`: string, message to extract expressions from

Conditional expressions are parts of the string surrounded by `(?...?)` tokens They begin with a condition which can
either be the name of a token, which translates to `<token> !== undefined`, or an binary operator expression such as
`<token> === <value>`

Conditional expressions can be nested

Returns an object where the keys are the extracted conditionals and the values are the parsed properties:

* `con`: object, condition object
* `msg`: message to replace conditional with if condition is fulfilled


message.replaceTokens (message, tokens)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Entry function for message processing; replaces tokens in message with values in `tokens` object and evaluates
conditional substrings

* `message`: string, input message with tokens to replace
* `tokens`: object, user values for message tokens

Returns string, the message with tokens and conditionals replaced with actual values.


Variable Declarations
=====================


Used to extract conditions from error message syntax
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


const CONDITION_REGEXP
----------------------

Used to extract conditions from error message syntax

* not exported
* initial value: `/^[^ ]+( *(`

Generated at Tue Dec 08 2020 22:19:14 GMT+0800 (Central Indonesia Time)