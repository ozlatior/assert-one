=====================================================
Custom assertion and messages class (./src/assert.js)
=====================================================



Internal Functions
==================


prototypeCall (fn, ref)
~~~~~~~~~~~~~~~~~~~~~~~

**Arguments**

* `fn`

* `ref`


getInstance ()
~~~~~~~~~~~~~~

Get a new, independent instance of the Assert class The new instance can have custom messages assigned to it


Variable Declarations
=====================


Default messages
~~~~~~~~~~~~~~~~


const MSG_ASSERT_TYPE
---------------------

Type assertion error message

* not exported
* initial value: `"Wrong type for '%varName%', expected %type%, got %_TYPE_%(?funName in %funName%?)"`


const MSG_ASSERT_VALUE
----------------------

Value assertion error message

* not exported
* initial value: `"Wrong value for '%varName%', expected %expected%, got %_ACTUAL_%(?funName in %funName%?)"`


const MSG_ASSERT_FIELD_TYPES
----------------------------

Field type assertion error message

* not exported
* initial value: `"Wrong type for field '%field%' of '%varName%', expected %type%, got %actual%(?funName in
  %funName%?)"`


const MSG_ASSERT_FIELD_VALUES
-----------------------------

Field value assertion error message

* not exported
* initial value: `"Wrong value for field '%field%' of '%varName%', expected %expected%, got %_ACTUAL_%(?funName in
  %funName%?)"`


const MSG_ASSERT_OPTIONAL_FIELD_TYPES
-------------------------------------

Optional field type assertion error message

* not exported
* initial value: `"Wrong type for field '%field%' of '%varName%', expected %type%, got %actual%(?funName in
  %funName%?)"`


const MSG_ASSERT_OPTIONAL_FIELD_VALUES
--------------------------------------

Optional field value assertion error message

* not exported
* initial value: `"Wrong value for field '%field%' of '%varName%', expected %expected%, got %_ACTUAL_%(?funName in
  %funName%?)"`


const MSG_ASSERT_ALLOWED_FIELDS
-------------------------------

Allowed field assertion error message

* not exported
* initial value: `"Unexpected field '%field%' in '%varName%'(?funName in %funName%?)"`


const MSG_ASSERT_FORBIDDEN_FIELDS
---------------------------------

Forbidden field assertion error message

* not exported
* initial value: `"Field '%field%' not allowed in '%varName%'(?funName in %funName%?)"`


Singleton pattern instance of the Assert class
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


const instance
--------------

Singleton pattern instance of the Assert class

* not exported
* initial value: `getInstance()`

Generated at Tue Dec 08 2020 22:19:14 GMT+0800 (Central Indonesia Time)