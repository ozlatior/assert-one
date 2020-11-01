/*
 * Custom assertion and messages class
 */

const message = require("./message.js");
const evaluator = require("./condition.js");

/*
 * Default messages
 */
const MSG_ASSERT_TYPE =
	"Wrong type for '%varName%', expected %type%, got %_TYPE_%(?funName in %funName%?)";
const MSG_ASSERT_VALUE =
	"Wrong value for '%varName%', expected %expected%, got %value%(?funName in %funName%?)";
const MSG_ASSERT_FIELD_TYPES =
	"Wrong type for field '%field%' of '%varName%', expected %type%, got %actual%(?funName in %funName%?)";
const MSG_ASSERT_FIELD_VALUES =
	"Wrong value for field '%field%' of '%varName%', expected %expected%, got %actual%(?funName in %funName%?)";
const MSG_ASSERT_OPTIONAL_FIELD_TYPES =
	"Wrong type for field '%field%' of '%varName%', expected %type%, got %actual%(?funName in %funName%?)";
const MSG_ASSERT_OPTIONAL_FIELD_VALUES =
	"Wrong value for field '%field%' of '%varName%', expected %expected%, got %actual%(?funName in %funName%?)";
const MSG_ASSERT_ALLOWED_FIELDS =
	"Unexpected field '%field%' in '%varName%'(?funName in %funName%?)";
const MSG_ASSERT_FORBIDDEN_FIELDS =
	"Field '%field%' not allowed in '%varName%'(?funName in %funName%?)";

class Assert {

	constructor () {
		/* Default values to be used in case values are missing from assertion options */
		this.defaultOptions = {
			stackDepth: 2
		};
		this.defaultTokens = {
			varName: "argument"
		};
	}

	/*
	 * Complete object `o` with default values from `defaults` object
	 */
	_applyDefaults (o, defaults) {
		for (let i in defaults) {
			if (o[i] === undefined)
				o[i] = defaults[i];
		}
		return o;
	}

	/*
	 * Apply default options stored in this instance
	 */
	_applyDefaultOptions (o) {
		return this._applyDefaults(o, this.defaultOptions);
	}

	/*
	 * Apply default tokens stored in this instance
	 */
	_applyDefaultTokens (o) {
		return this._applyDefaults(o, this.defaultTokens);
	}

	/*
	 * Check `result` and throw new `errorClass` error if result is false
	 * The `tokens` object contains the token values to be replaced in the message
	 */
	_runAssertion (result, errorClass, options, tokens) {
		if (result)
			return true;
		options = JSON.parse(JSON.stringify(options));
		tokens = JSON.parse(JSON.stringify(tokens));
		this._applyDefaultOptions(options);
		this._applyDefaultTokens(tokens);

		let msg = message.replaceTokens(options.message, tokens);
		let err = new errorClass(msg);

		let stack = err.stack.split("\n");
		stack.splice(1, options.stackDepth);
		err.stack = stack.join("\n");

		throw(err);
	}

	/*
	 * Check that a single value is of the specified type or types
	 * `value`: any type, value to check
	 * `type`: string or array of strings, list of acceptable types
	 * `errorClass`: class, error class to use for thrown error (defaults to Error)
	 * `varName`: string, original variable or argument name that is being asserted (for error message),
	 *            defaults to `argument`
	 * `funName`: string, original function name where this assertion was called (for error message)
	 */
	_assertType (value, type, errorClass, varName, funName) {
		if (errorClass === undefined)
			errorClass = Error;
		if (!(type instanceof Array))
			type = [ type ];
		return this._runAssertion(type.indexOf(typeof(value)) !== -1, errorClass, {
			message: this.assertType.message
		}, {
			value: value,
			type: type.join("/"),
			varName: varName,
			funName: funName
		});
	}

	/*
	 * Check that a single value is valid according to condition
	 * `value`: any type, value to check
	 * `condition`: condition object or array of condition objects describing a valid value
	 * `errorClass`: class, error class to use for thrown error (defaults to Error)
	 * `varName`: string, original variable or argument name that is being asserted (for error message),
	 *            defaults to `argument`
	 * `funName`: string, original function name where this assertion was called (for error message)
	 */
	_assertValue (value, condition, errorClass, varName, funName) {
		if (errorClass === undefined)
			errorClass = Error;
		let res = evaluator.evaluateValueCondition(value, condition);
		return this._runAssertion(res.result, errorClass, {
			message: this.assertValue.message
		}, {
			value: value,
			expected: res.details,
			varName: varName,
			funName: funName
		});
	}

	/*
	 * Check that all specified fields are of the specified type or types
	 * Missing fields will trigger an assertion error
	 * `value`: object, object to check
	 * `fields`: object, key value pairs specifying the correct type for each field:
	 *     `<fieldName>`: string or array of strings, list of acceptable types
	 * `errorClass`: class, error class to use for thrown error (defaults to Error)
	 * `varName`: string, original variable or argument name that is being asserted (for error message),
	 *            defaults to `argument`
	 * `funName`: string, original function name where this assertion was called (for error message)
	 */
	_assertFieldTypes (value, fields, errorClass, varName, funName) {
		if (errorClass === undefined)
			errorClass = Error;
		for (let i in fields) {
			let type = fields[i];
			if (!(type instanceof Array))
				type = [ type ];
			this._runAssertion(type.indexOf(typeof(value[i])) !== -1, errorClass, {
				message: this.assertFieldTypes.message
			}, {
				value: value[i],
				type: type.join("/"),
				actual: typeof(value[i]),
				varName: varName,
				field: i,
				funName: funName
			});
		}
		return true;
	}

	/*
	 * Check that all specified fields of object are valid according to individual conditions
	 * Missing fields will trigger an assertion error
	 * `value`: object, object to check
	 * `fields`: object, key value pairs specifying validation condition or conditions for the field:
	 *     `<fieldName>`: object or array of objects, validation condition for field
	 * `errorClass`: class, error class to use for thrown error (defaults to Error)
	 * `varName`: string, original variable or argument name that is being asserted (for error message),
	 *            defaults to `argument`
	 * `funName`: string, original function name where this assertion was called (for error message)
	 */
	_assertFieldValues (value, fields, errorClass, varName, funName) {
		if (errorClass === undefined)
			errorClass = Error;
		for (let i in fields) {
			let res = evaluator.evaluateValueCondition(value[i], fields[i]);
			this._runAssertion(res.result, errorClass, {
				message: this.assertFieldValues.message
			}, {
				value: value[i],
				expected: res.details,
				actual: res.actual === undefined ? "<undefined>" : res.actual,
				varName: varName,
				field: i,
				funName: funName
			});
		}
		return true;
	}

	/*
	 * Check that all present fields are of the specified type or types
	 * Missing fields will be ignored
	 * `value`: object, object to check
	 * `fields`: object, key value pairs specifying the correct type for each field:
	 *     `<fieldName>`: string or array of strings, list of acceptable types
	 * `errorClass`: class, error class to use for thrown error (defaults to Error)
	 * `varName`: string, original variable or argument name that is being asserted (for error message),
	 *            defaults to `argument`
	 * `funName`: string, original function name where this assertion was called (for error message)
	 */
	_assertOptionalFieldTypes (value, fields, errorClass, varName, funName) {
		if (errorClass === undefined)
			errorClass = Error;
		for (let i in fields) {
			if (value[i] === undefined)
				continue;
			let type = fields[i];
			if (!(type instanceof Array))
				type = [ type ];
			this._runAssertion(type.indexOf(typeof(value[i])) !== -1, errorClass, {
				message: this.assertFieldTypes.message
			}, {
				value: value[i],
				type: type.join("/"),
				actual: typeof(value[i]),
				varName: varName,
				field: i,
				funName: funName
			});
		}
		return true;
	}

	/*
	 * Check that all specified fields of object are valid according to individual conditions
	 * Missing fields will be ignored
	 * `value`: object, object to check
	 * `fields`: object, key value pairs specifying validation condition or conditions for the field:
	 *     `<fieldName>`: object or array of objects, validation condition for field
	 * `errorClass`: class, error class to use for thrown error (defaults to Error)
	 * `varName`: string, original variable or argument name that is being asserted (for error message),
	 *            defaults to `argument`
	 * `funName`: string, original function name where this assertion was called (for error message)
	 */
	_assertOptionalFieldValues (value, fields, errorClass, varName, funName) {
		if (errorClass === undefined)
			errorClass = Error;
		for (let i in fields) {
			if (value[i] === undefined)
				continue;
			let res = evaluator.evaluateValueCondition(value[i], fields[i]);
			this._runAssertion(res.result, errorClass, {
				message: this.assertFieldValues.message
			}, {
				value: value[i],
				expected: res.details,
				actual: res.actual === undefined ? "<undefined>" : res.actual,
				varName: varName,
				field: i,
				funName: funName
			});
		}
		return true;
	}

	/*
	 * Check that only the allowed fields are present in object
	 * `value`: object, object to check
	 * `fields`: array of string, names of allowed fields for this object
	 * `errorClass`: class, error class to use for thrown error (defaults to Error)
	 * `varName`: string, original variable or argument name that is being asserted (for error message),
	 *            defaults to `argument`
	 * `funName`: string, original function name where this assertion was called (for error message)
	 */
	_assertAllowedFields (value, fields, errorClass, varName, funName) {
		if (errorClass === undefined)
			errorClass = Error;
		if (typeof(value) !== "object")
			return;
		for (let i in value) {
			this._runAssertion(fields.indexOf(i) !== -1, errorClass, {
				message: this.assertAllowedFields.message
			}, {
				field: i,
				varName: varName,
				funName: funName
			});
		}
	}

	/*
	 * Check that no forbidden fields are present in object
	 * `value`: object, object to check
	 * `fields`: array of string, names of forbidden fields for this object
	 * `errorClass`: class, error class to use for thrown error (defaults to Error)
	 * `varName`: string, original variable or argument name that is being asserted (for error message),
	 *            defaults to `argument`
	 * `funName`: string, original function name where this assertion was called (for error message)
	 */
	_assertForbiddenFields (value, fields, errorClass, varName, funName) {
		if (errorClass === undefined)
			errorClass = Error;
		if (typeof(value) !== "object")
			return;
		for (let i in value) {
			this._runAssertion(fields.indexOf(i) === -1, errorClass, {
				message: this.assertForbiddenFields.message
			}, {
				field: i,
				varName: varName,
				funName: funName
			});
		}
	}

}

const prototypeCall = function(fn, ref) {
	return fn.bind(ref);
};

const getInstance = function() {
	let ret = new Assert();

	// create instance-specific calls so we can assign messages to them
	ret.assertType = prototypeCall(ret._assertType, ret);
	ret.assertValue = prototypeCall(ret._assertValue, ret);
	ret.assertFieldTypes = prototypeCall(ret._assertFieldTypes, ret);
	ret.assertFieldValues = prototypeCall(ret._assertFieldValues, ret);
	ret.assertOptionalFieldTypes = prototypeCall(ret._assertOptionalFieldTypes, ret);
	ret.assertOptionalFieldValues = prototypeCall(ret._assertOptionalFieldValues, ret);
	ret.assertAllowedFields = prototypeCall(ret._assertAllowedFields, ret);
	ret.assertForbiddenFields = prototypeCall(ret._assertForbiddenFields, ret);

	// setup aliases for instance
	ret.type = ret.assertType;
	ret.value = ret.assertValue;
	ret.fieldTypes = ret.assertFieldTypes;
	ret.fieldValues = ret.assertFieldValues;
	ret.optionalTypes = ret.assertOptionalFieldTypes;
	ret.optionalValues = ret.assertOptionalFieldValues;
	ret.allowedFields = ret.assertAllowedFields;
	ret.forbiddenFields = ret.assertForbiddenFields;

	// setup default messages for instance
	ret.assertType.message = MSG_ASSERT_TYPE;
	ret.assertValue.message = MSG_ASSERT_VALUE;
	ret.assertFieldTypes.message = MSG_ASSERT_FIELD_TYPES;
	ret.assertFieldValues.message = MSG_ASSERT_FIELD_VALUES;
	ret.assertOptionalFieldTypes.message = MSG_ASSERT_OPTIONAL_FIELD_TYPES;
	ret.assertOptionalFieldValues.message = MSG_ASSERT_OPTIONAL_FIELD_VALUES;
	ret.assertAllowedFields.message = MSG_ASSERT_ALLOWED_FIELDS;
	ret.assertForbiddenFields.message = MSG_ASSERT_FORBIDDEN_FIELDS;

	return ret;
};

const instance = getInstance();

// although we are using singleton pattern, maybe we want a second instance for
// who knows what specific custom purpose
instance.new = getInstance;

module.exports = instance;
