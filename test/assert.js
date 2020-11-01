// the default node js assertion library used for testing
const assert = require("assert");

// the assertion instance we're testing
const instance = require("../index.js");

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

/*
 * Custom error class
 */
class TestError extends Error {

	constructor (msg) {
		super(msg);
		this.name = "TestError";
	}

}

describe ("Assertion object instance", () => {

	describe ("new() functionality (works like a factory)", () => {

		it ("creates new instance", () => {
			let newInstance = instance.new();
			assert.equal(newInstance.constructor.name, "Assert");
			assert.notEqual(instance, newInstance);
		});

	});

	describe ("Error messages", () => {

		it ("comes with default error messages", () => {
			assert.equal(instance.assertType.message, MSG_ASSERT_TYPE);
			assert.equal(instance.assertValue.message, MSG_ASSERT_VALUE);
			assert.equal(instance.assertFieldTypes.message, MSG_ASSERT_FIELD_TYPES);
			assert.equal(instance.assertFieldValues.message, MSG_ASSERT_FIELD_VALUES);
			assert.equal(instance.assertOptionalFieldTypes.message, MSG_ASSERT_OPTIONAL_FIELD_TYPES);
			assert.equal(instance.assertOptionalFieldValues.message, MSG_ASSERT_OPTIONAL_FIELD_VALUES);
			assert.equal(instance.assertAllowedFields.message, MSG_ASSERT_ALLOWED_FIELDS);
			assert.equal(instance.assertForbiddenFields.message, MSG_ASSERT_FORBIDDEN_FIELDS);
		});

		it ("allows for custom error messages", () => {
			let testInstance = instance.new();
			let newMessage = "This is a new message, value is %value%";
			assert.equal(testInstance.assertType.message, MSG_ASSERT_TYPE);
			testInstance.assertType.message = newMessage;
			try {
				testInstance.assertType(123, "string", TestError);
			}
			catch (e) {
				assert.equal(e.message, newMessage.replace("%value%", "123"));
			}
		});

	});

	describe ("assertType - single type assertion", () => {

		it ("passes for matching single type", () => {
			instance.assertType(123, "number");
			instance.assertType(null, "object");
			instance.assertType(false, "boolean");
		});

		it ("passes for matching one of multiple types", () => {
			instance.assertType(123, [ "number", "string" ]);
			instance.assertType(null, [ "number", "object", "boolean" ]);
			instance.assertType(false, [ "string", "object", "boolean" ]);
		});

		it ("fails for type mismatch against single type", () => {
			try {
				instance.assertType(123, "string");
			}
			catch (e) {
				assert.equal(e.message, "Wrong type for 'argument', expected string, got number");
				return;
			}
			throw new Error("Shouldn't be here");
		});

		it ("fails for type mismatch against multiple types", () => {
			try {
				instance.assertType(123, [ "string", "boolean" ]);
			}
			catch (e) {
				assert.equal(e.message, "Wrong type for 'argument', expected string/boolean, got number");
				return;
			}
			throw new Error("Shouldn't be here");
		});

	});

	describe ("assertValue - single value assertion", () => {

		it ("passes for matching values", () => {
			instance.assertValue(123, 123);
			instance.assertValue(100, { gte: 100 });
			instance.assertValue(100, [ { eq: 0 }, { gte: 100 } ]);
			instance.assertValue(100, { integer: true, gte: 100 });
			instance.assertValue("blabla", { begins: "bla" });
			instance.assertValue("123456", { length: { gt: 4 } });
		});

		it ("fails for mismatch, single condition", () => {
			try {
				instance.assertValue(123, { gte: 200 });
			}
			catch (e) {
				assert.equal(e.message, "Wrong value for 'argument', expected greater than or equal to 200, got 123");
				return;
			}
			throw new Error("Shouldn't be here");
		});

		it ("fails for mismatch, multiple condition 1", () => {
			try {
				instance.assertValue(255.5, { integer: true, gte: 200 });
			}
			catch (e) {
				assert.equal(e.message, "Wrong value for 'argument', expected integer number, got 255.5");
				return;
			}
			throw new Error("Shouldn't be here");
		});

		it ("fails for mismatch, multiple condition 2", () => {
			try {
				instance.assertValue(123, { integer: true, gte: 200 });
			}
			catch (e) {
				assert.equal(e.message, "Wrong value for 'argument', expected greater than or equal to 200, got 123");
				return;
			}
			throw new Error("Shouldn't be here");
		});

		it ("fails for mismatch, multiple blocks", () => {
			try {
				instance.assertValue(50, [ { eq: 0 }, { gte: 100 } ]);
			}
			catch (e) {
				assert.equal(e.message, "Wrong value for 'argument', expected 0 or greater than or equal to 100, got 50");
				return;
			}
			throw new Error("Shouldn't be here");
		});

	});

	describe ("assertFieldTypes - fields type assertion", () => {

		it ("passes for matching field types", () => {
			instance.assertFieldTypes(
				{ a: 1, b: "bla", c: false, d: { a: 1 }},
				{ a: "number", b: "string", c: "boolean", d: "object" }
			);
			instance.assertFieldTypes(
				{ a: 1, b: "bla", c: false, d: { a: 1 }},
				{ a: [ "number", "string" ], b: [ "number", "string", "boolean" ], c: "boolean", d: "object" }
			);
		});

		it ("fails for mismatch, missing field", () => {
			try {
				instance.assertFieldTypes(
					{ a: 1, b: "bla", d: { a: 1 }},
					{ a: "number", b: "string", c: "boolean", d: "object" }
				);
			}
			catch (e) {
				assert.equal(e.message, "Wrong type for field 'c' of 'argument', expected boolean, got undefined");
				return;
			}
			throw new Error("Shouldn't be here");
		});

		it ("fails for mismatch, single condition", () => {
			try {
				instance.assertFieldTypes(
					{ a: 1, b: "bla", c: "false", d: { a: 1 }},
					{ a: "number", b: "string", c: "boolean", d: "object" }
				);
			}
			catch (e) {
				assert.equal(e.message, "Wrong type for field 'c' of 'argument', expected boolean, got string");
				return;
			}
			throw new Error("Shouldn't be here");
		});

		it ("fails for mismatch, multiple condition", () => {
			try {
				instance.assertFieldTypes(
					{ a: 1, b: [ "bla" ], c: false, d: { a: 1 }},
					{ a: [ "number", "string" ], b: [ "number", "string", "boolean" ], c: "boolean", d: "object" }
				);
			}
			catch (e) {
				assert.equal(e.message,
					"Wrong type for field 'b' of 'argument', expected number/string/boolean, got object");
				return;
			}
			throw new Error("Shouldn't be here");
		});

	});

	describe ("assertOptionalFieldTypes - optional fields type assertion", () => {

		it ("passes for matching field types", () => {
			instance.assertOptionalFieldTypes(
				{ a: 1, b: "bla", c: false, d: { a: 1 }},
				{ a: "number", b: "string", c: "boolean", d: "object" }
			);
			instance.assertOptionalFieldTypes(
				{ a: 1, b: "bla", c: false, d: { a: 1 }},
				{ a: [ "number", "string" ], b: [ "number", "string", "boolean" ], c: "boolean", d: "object" }
			);
		});

		it ("passes for matching field types with missing field", () => {
			instance.assertOptionalFieldTypes(
				{ a: 1, b: "bla", d: { a: 1 }},
				{ a: "number", b: "string", c: "boolean", d: "object" }
			);
			instance.assertOptionalFieldTypes(
				{ c: false, d: { a: 1 }},
				{ a: [ "number", "string" ], b: [ "number", "string", "boolean" ], c: "boolean", d: "object" }
			);
		});

		it ("fails for mismatch, single condition", () => {
			try {
				instance.assertOptionalFieldTypes(
					{ a: 1, b: "bla", c: "false", d: { a: 1 }},
					{ a: "number", b: "string", c: "boolean", d: "object" }
				);
			}
			catch (e) {
				assert.equal(e.message, "Wrong type for field 'c' of 'argument', expected boolean, got string");
				return;
			}
			throw new Error("Shouldn't be here");
		});

		it ("fails for mismatch, multiple condition", () => {
			try {
				instance.assertOptionalFieldTypes(
					{ a: 1, b: [ "bla" ], c: false, d: { a: 1 }},
					{ a: [ "number", "string" ], b: [ "number", "string", "boolean" ], c: "boolean", d: "object" }
				);
			}
			catch (e) {
				assert.equal(e.message,
					"Wrong type for field 'b' of 'argument', expected number/string/boolean, got object");
				return;
			}
			throw new Error("Shouldn't be here");
		});

	});

	describe ("assertFieldValues - field value assertion", () => {

		it ("passes for matching field values", () => {
			instance.assertFieldValues(
				{ a: 20, b: 12, c: "bla", d: "123456" },
				{ a: 20, b: [ { eq: 12 }, { lte: 6 } ], c: { begins: "bla" }, d: { length: { lte: 6 } } }
			);
			instance.assertFieldValues(
				{ a: 20, b: 5, c: "blabla", d: "1234" },
				{ a: 20, b: [ { eq: 12 }, { lte: 6 } ], c: { begins: "bla" }, d: { length: { lte: 6 } } }
			);
		});

		it ("fails for missing fields", () => {
			try {
				instance.assertFieldValues(
					{ a: 20, b: 12, d: "123456" },
					{ a: 20, b: [ { eq: 12 }, { lte: 6 } ], c: { begins: "bla" }, d: { length: { lte: 6 } } }
				);
			}
			catch (e) {
				assert.equal(e.message,
					"Wrong value for field 'c' of 'argument', expected string beginning with \"bla\", got <undefined>");
				return;
			}
			throw new Error("Shouldn't be here");
		});

		it ("fails for mismatch, short equality condition", () => {
			try {
				instance.assertFieldValues(
					{ a: 21, b: 12, c: "bla", d: "123456" },
					{ a: 20, b: [ { eq: 12 }, { lte: 6 } ], c: { begins: "bla" }, d: { length: { lte: 6 } } }
				);
			}
			catch (e) {
				assert.equal(e.message,
					"Wrong value for field 'a' of 'argument', expected 20, got 21");
				return;
			}
			throw new Error("Shouldn't be here");
		});

		it ("fails for mismatch, single condition", () => {
			try {
				instance.assertFieldValues(
					{ a: 20, b: 12, c: "bla", d: "1234567" },
					{ a: 20, b: [ { eq: 12 }, { lte: 6 } ], c: { begins: "bla" }, d: { length: { lte: 6 } } }
				);
			}
			catch (e) {
				assert.equal(e.message,
					"Wrong value for field 'd' of 'argument', expected length less than or equal to 6, got 7");
				return;
			}
			throw new Error("Shouldn't be here");
		});

		it ("fails for mismatch, multiple condition", () => {
			try {
				instance.assertFieldValues(
					{ a: 20, b: 3.5, c: "bla", d: "123456" },
					{ a: 20, b: [ { eq: 12 }, { lte: 6, integer: true } ], c: { begins: "bla" }, d: { length: { lte: 6 } } }
				);
			}
			catch (e) {
				assert.equal(e.message,
					"Wrong value for field 'b' of 'argument', expected 12 or integer number, got 3.5");
				return;
			}
			throw new Error("Shouldn't be here");
		});

	});

	describe ("assertOptionalFieldValues - optional field value assertion", () => {

		it ("passes for matching field values", () => {
			instance.assertOptionalFieldValues(
				{ a: 20, b: 12, c: "bla", d: "123456" },
				{ a: 20, b: [ { eq: 12 }, { lte: 6 } ], c: { begins: "bla" }, d: { length: { lte: 6 } } }
			);
			instance.assertOptionalFieldValues(
				{ a: 20, b: 5, c: "blabla", d: "1234" },
				{ a: 20, b: [ { eq: 12 }, { lte: 6 } ], c: { begins: "bla" }, d: { length: { lte: 6 } } }
			);
		});

		it ("passes for missing fields", () => {
			instance.assertOptionalFieldValues(
				{ a: 20, b: 12, d: "123456" },
				{ a: 20, b: [ { eq: 12 }, { lte: 6 } ], c: { begins: "bla" }, d: { length: { lte: 6 } } }
			);
			instance.assertOptionalFieldValues(
				{ b: 5, c: "blabla", d: "1234" },
				{ a: 20, b: [ { eq: 12 }, { lte: 6 } ], c: { begins: "bla" }, d: { length: { lte: 6 } } }
			);
		});

		it ("fails for mismatch, short equality condition", () => {
			try {
				instance.assertOptionalFieldValues(
					{ a: 21, b: 12, c: "bla", d: "123456" },
					{ a: 20, b: [ { eq: 12 }, { lte: 6 } ], c: { begins: "bla" }, d: { length: { lte: 6 } } }
				);
			}
			catch (e) {
				assert.equal(e.message,
					"Wrong value for field 'a' of 'argument', expected 20, got 21");
				return;
			}
			throw new Error("Shouldn't be here");
		});

		it ("fails for mismatch, single condition", () => {
			try {
				instance.assertOptionalFieldValues(
					{ a: 20, b: 12, c: "bla", d: "1234567" },
					{ a: 20, b: [ { eq: 12 }, { lte: 6 } ], c: { begins: "bla" }, d: { length: { lte: 6 } } }
				);
			}
			catch (e) {
				assert.equal(e.message,
					"Wrong value for field 'd' of 'argument', expected length less than or equal to 6, got 7");
				return;
			}
			throw new Error("Shouldn't be here");
		});

		it ("fails for mismatch, multiple condition", () => {
			try {
				instance.assertOptionalFieldValues(
					{ a: 20, b: 3.5, c: "bla", d: "123456" },
					{ a: 20, b: [ { eq: 12 }, { lte: 6, integer: true } ], c: { begins: "bla" }, d: { length: { lte: 6 } } }
				);
			}
			catch (e) {
				assert.equal(e.message,
					"Wrong value for field 'b' of 'argument', expected 12 or integer number, got 3.5");
				return;
			}
			throw new Error("Shouldn't be here");
		});

	});

	describe ("assertAllowedFields - allowed fields assertion", () => {

		it ("passes for object containing only listed fields", () => {
			instance.assertAllowedFields({}, [ "a", "b", "c", "d" ]);
			instance.assertAllowedFields({ a: 10, b: { x: 12, y: 33 }, c: null }, [ "a", "b", "c", "d" ]);
			instance.assertAllowedFields({ a: 10, b: "bla", c: false, d: undefined }, [ "a", "b", "c", "d" ]);
		});

		it ("fails for field not in allowed list", () => {
			try {
				instance.assertAllowedFields({ a: 10, b: { x: 12, y: 33 }, c: null, foo: 42 }, [ "a", "b", "c", "d" ]);
			}
			catch (e) {
				assert.equal(e.message, "Unexpected field 'foo' in 'argument'");
				return;
			}
			throw new Error("Shouldn't be here");
		});

		it ("fails for undefined field not in allowed list", () => {
			try {
				instance.assertAllowedFields({ a: 10, b: { x: 12, y: 33 }, c: null, foo: undefined }, [ "a", "b", "c", "d" ]);
			}
			catch (e) {
				assert.equal(e.message, "Unexpected field 'foo' in 'argument'");
				return;
			}
			throw new Error("Shouldn't be here");
		});

	});

	describe ("assertForbiddenFields - forbidden fields assertion", () => {

		it ("passes for object not containing any forbidden field", () => {
			instance.assertForbiddenFields({}, [ "x", "y", "z" ]);
			instance.assertForbiddenFields({ a: 10, b: { x: 12, y: 33 }, c: null }, [ "x", "y", "z" ]);
			instance.assertForbiddenFields({ a: 10, b: "bla", c: false, d: undefined }, [ "x", "y", "z" ]);
		});

		it ("fails for object containing forbidden fields", () => {
			try {
				instance.assertForbiddenFields({ a: 10, b: { x: 12, y: 33 }, c: null, z: 42 }, [ "x", "y", "z" ]);
			}
			catch (e) {
				assert.equal(e.message, "Field 'z' not allowed in 'argument'");
				return;
			}
			throw new Error("Shouldn't be here");
		});

		it ("fails for object containing undefined forbidden fields", () => {
			try {
				instance.assertForbiddenFields({ a: 10, b: { x: 12, y: 33 }, c: null, z: undefined }, [ "x", "y", "z" ]);
			}
			catch (e) {
				assert.equal(e.message, "Field 'z' not allowed in 'argument'");
				return;
			}
			throw new Error("Shouldn't be here");
		});

	});

});
