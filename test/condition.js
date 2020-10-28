/*
 * Tests of the condition validation features
 */

const assert = require("assert");

const condition = require("./../src/condition.js");

describe("Condition validation", () => {

	describe("type validation", () => {

		it ("validates single type condition", () => {
			let ret;
			ret = condition.evaluateValueCondition(42, { type: "number" });
			assert.deepEqual(ret, { result: true });
			ret = condition.evaluateValueCondition({}, { type: "object" });
			assert.deepEqual(ret, { result: true });
		});

		it ("validates multiple type condition", () => {
			let ret;
			ret = condition.evaluateValueCondition(42, { type: [ "number", "string" ] });
			assert.deepEqual(ret, { result: true });
			ret = condition.evaluateValueCondition({}, { type: [ "number", "object" ] });
			assert.deepEqual(ret, { result: true });
		});

		it ("detects single type mismatch", () => {
			let ret;
			ret = condition.evaluateValueCondition("42", { type: "number" });
			assert.deepEqual(ret, {
				result: false,
				what: "type",
				reference: "number",
				actual: "string",
				details: "type \"number\""
			});
			ret = condition.evaluateValueCondition(42, { type: "object" });
			assert.deepEqual(ret, {
				result: false,
				what: "type",
				reference: "object",
				actual: "number",
				details: "type \"object\""
			});
		});

		it ("detects multiple type mismatch", () => {
			let ret;
			ret = condition.evaluateValueCondition("42", { type: [ "number", "boolean", "object" ] });
			assert.deepEqual(ret, {
				result: false,
				what: "type",
				reference: [ "number", "boolean", "object" ],
				actual: "string",
				details: "type \"number\", \"boolean\" or \"object\""
			});
			ret = condition.evaluateValueCondition(42, { type: [ "string", "object" ] });
			assert.deepEqual(ret, {
				result: false,
				what: "type",
				reference: [ "string", "object" ],
				actual: "number",
				details: "type \"string\" or \"object\""
			});
		});

	});

	describe("equality validation", () => {

		it ("validates single equality condition", () => {
			let ret;
			ret = condition.evaluateValueCondition(42, { eq: 42 });
			assert.deepEqual(ret, { result: true });
			ret = condition.evaluateValueCondition("bla", { eq: "bla" });
			assert.deepEqual(ret, { result: true });
		});

		it ("validates multiple equality condition", () => {
			let ret;
			ret = condition.evaluateValueCondition(42, { eq: [ 42, 43 ] });
			assert.deepEqual(ret, { result: true });
			ret = condition.evaluateValueCondition("bla", { eq: [ 42, "bla" ] });
			assert.deepEqual(ret, { result: true });
		});

		it ("detects single equality mismatch", () => {
			let ret;
			ret = condition.evaluateValueCondition("42", { eq: 42 });
			assert.deepEqual(ret, {
				result: false,
				what: "eq",
				reference: 42,
				actual: "42",
				details: "42"
			});
			ret = condition.evaluateValueCondition(42, { eq: 43 });
			assert.deepEqual(ret, {
				result: false,
				what: "eq",
				reference: 43,
				actual: 42,
				details: "43"
			});
		});

		it ("detects multiple equality mismatch", () => {
			let ret;
			ret = condition.evaluateValueCondition("42", { eq: [ "bla", "43", 42 ] });
			assert.deepEqual(ret, {
				result: false,
				what: "eq",
				reference: [ "bla", "43", 42 ],
				actual: "42",
				details: "\"bla\", \"43\" or 42"
			});
			ret = condition.evaluateValueCondition(42, { eq: [ 41, 43 ] });
			assert.deepEqual(ret, {
				result: false,
				what: "eq",
				reference: [ 41, 43 ],
				actual: 42,
				details: "41 or 43"
			});
		});

		it ("validates single equality condition specified directly as value (without eq:)", () => {
			let ret;
			ret = condition.evaluateValueCondition(42, 42);
			assert.deepEqual(ret, { result: true });
			ret = condition.evaluateValueCondition("bla", "bla");
			assert.deepEqual(ret, { result: true });
		});

		it ("validates multiple equality condition specified directly as value (without eq:)", () => {
			let ret;
			ret = condition.evaluateValueCondition(42, [ 42, 43 ]);
			assert.deepEqual(ret, { result: true });
			ret = condition.evaluateValueCondition("bla", [ 42, "bla" ]);
			assert.deepEqual(ret, { result: true });
		});

		it ("detects single equality mismatch specified directly as value (without eq:)", () => {
			let ret;
			ret = condition.evaluateValueCondition("42", 42);
			assert.deepEqual(ret, {
				result: false,
				what: "eq",
				reference: 42,
				actual: "42",
				details: "42"
			});
			ret = condition.evaluateValueCondition(42, 43);
			assert.deepEqual(ret, {
				result: false,
				what: "eq",
				reference: 43,
				actual: 42,
				details: "43"
			});
		});

	});

	describe("non-equality validation", () => {

		it ("validates single non-equality condition", () => {
			let ret;
			ret = condition.evaluateValueCondition(42, { neq: 43 });
			assert.deepEqual(ret, { result: true });
			ret = condition.evaluateValueCondition("bla", { neq: "blaa" });
			assert.deepEqual(ret, { result: true });
		});

		it ("validates multiple non-equality condition", () => {
			let ret;
			ret = condition.evaluateValueCondition(42, { neq: [ 41, 43 ] });
			assert.deepEqual(ret, { result: true });
			ret = condition.evaluateValueCondition("bla", { neq: [ "bl", "blaa" ] });
			assert.deepEqual(ret, { result: true });
		});

		it ("detects single non-equality mismatch", () => {
			let ret;
			ret = condition.evaluateValueCondition("42", { neq: "42" });
			assert.deepEqual(ret, {
				result: false,
				what: "neq",
				reference: "42",
				actual: "42",
				details: "not \"42\""
			});
			ret = condition.evaluateValueCondition(42, { neq: 42 });
			assert.deepEqual(ret, {
				result: false,
				what: "neq",
				reference: 42,
				actual: 42,
				details: "not 42"
			});
		});

		it ("detects multiple non-equality mismatch", () => {
			let ret;
			ret = condition.evaluateValueCondition("42", { neq: [ "bla", "43", "42" ] });
			assert.deepEqual(ret, {
				result: false,
				what: "neq",
				reference: [ "bla", "43", "42" ],
				actual: "42",
				details: "not \"bla\", \"43\" or \"42\""
			});
			ret = condition.evaluateValueCondition(false, { neq: [ 41, false ] });
			assert.deepEqual(ret, {
				result: false,
				what: "neq",
				reference: [ 41, false ],
				actual: false,
				details: "not 41 or false"
			});
		});

	});

	describe("inequality validation for numbers", () => {

		it ("validates single 'less than' condition", () => {
			let ret = condition.evaluateValueCondition(42, { lt: 43 });
			assert.deepEqual(ret, { result: true });
		});

		it ("detects single 'less than' mismatch", () => {
			let ret = condition.evaluateValueCondition(42, { lt: 42 });
			assert.deepEqual(ret, {
				result: false,
				what: "lt",
				reference: 42,
				actual: 42,
				details: "less than 42"
			});
		});

		it ("validates single 'less than or equal' condition", () => {
			let ret = condition.evaluateValueCondition(42, { lte: 42 });
			assert.deepEqual(ret, { result: true });
		});

		it ("detects single 'less than or equal' mismatch", () => {
			let ret = condition.evaluateValueCondition(42, { lte: 41 });
			assert.deepEqual(ret, {
				result: false,
				what: "lte",
				reference: 41,
				actual: 42,
				details: "less than or equal to 41"
			});
		});

		it ("validates single 'greater than' condition", () => {
			let ret = condition.evaluateValueCondition(42, { gt: 41 });
			assert.deepEqual(ret, { result: true });
		});

		it ("detects single 'greater than' mismatch", () => {
			let ret = condition.evaluateValueCondition(42, { gt: 42 });
			assert.deepEqual(ret, {
				result: false,
				what: "gt",
				reference: 42,
				actual: 42,
				details: "greater than 42"
			});
		});

		it ("validates single 'greater than or equal' condition", () => {
			let ret = condition.evaluateValueCondition(42, { gte: 42 });
			assert.deepEqual(ret, { result: true });
		});

		it ("detects single 'greater than or equal' mismatch", () => {
			let ret = condition.evaluateValueCondition(42, { gte: 43 });
			assert.deepEqual(ret, {
				result: false,
				what: "gte",
				reference: 43,
				actual: 42,
				details: "greater than or equal to 43"
			});
		});

	});

	describe("inequality validation for strings", () => {

		it ("validates single 'less than' condition", () => {
			let ret = condition.evaluateValueCondition("abc", { lt: "bc" });
			assert.deepEqual(ret, { result: true });
		});

		it ("detects single 'less than' mismatch", () => {
			let ret = condition.evaluateValueCondition("abc", { lt: "abc" });
			assert.deepEqual(ret, {
				result: false,
				what: "lt",
				reference: "abc",
				actual: "abc",
				details: "less than \"abc\""
			});
		});

		it ("validates single 'less than or equal' condition", () => {
			let ret = condition.evaluateValueCondition("abc", { lte: "abc" });
			assert.deepEqual(ret, { result: true });
		});

		it ("detects single 'less than or equal' mismatch", () => {
			let ret = condition.evaluateValueCondition("bc", { lte: "abc" });
			assert.deepEqual(ret, {
				result: false,
				what: "lte",
				reference: "abc",
				actual: "bc",
				details: "less than or equal to \"abc\""
			});
		});

		it ("validates single 'greater than' condition", () => {
			let ret = condition.evaluateValueCondition("bc", { gt: "abc" });
			assert.deepEqual(ret, { result: true });
		});

		it ("detects single 'greater than' mismatch", () => {
			let ret = condition.evaluateValueCondition("abc", { gt: "abc" });
			assert.deepEqual(ret, {
				result: false,
				what: "gt",
				reference: "abc",
				actual: "abc",
				details: "greater than \"abc\""
			});
		});

		it ("validates single 'greater than or equal' condition", () => {
			let ret = condition.evaluateValueCondition("abc", { gte: "abc" });
			assert.deepEqual(ret, { result: true });
		});

		it ("detects single 'greater than or equal' mismatch", () => {
			let ret = condition.evaluateValueCondition("abc", { gte: "bc" });
			assert.deepEqual(ret, {
				result: false,
				what: "gte",
				reference: "bc",
				actual: "abc",
				details: "greater than or equal to \"bc\""
			});
		});

	});

	describe("strictly integer validation", () => {

		it ("validates single integer condition", () => {
			let ret = condition.evaluateValueCondition(42, { integer: true });
			assert.deepEqual(ret, { result: true });
		});

		it ("validates single non-integer condition", () => {
			let ret = condition.evaluateValueCondition(42.42, { integer: false });
			assert.deepEqual(ret, { result: true });
		});

		it ("detects single integer mismatch", () => {
			let ret = condition.evaluateValueCondition(42.42, { integer: true });
			assert.deepEqual(ret, {
				result: false,
				what: "integer",
				reference: true,
				actual: 42.42,
				details: "integer number"
			});
		});

		it ("detects single non-integer mismatch", () => {
			let ret = condition.evaluateValueCondition(42, { integer: false });
			assert.deepEqual(ret, {
				result: false,
				what: "integer",
				reference: false,
				actual: 42,
				details: "non-integer number"
			});
		});

		it ("detects single integer mismatch caused by non-number input", () => {
			let ret = condition.evaluateValueCondition("42", { integer: true });
			assert.deepEqual(ret, {
				result: false,
				what: "integer",
				reference: true,
				actual: "42",
				details: "integer number"
			});
		});

		it ("detects single non-integer mismatch caused by non-number input", () => {
			let ret = condition.evaluateValueCondition("42.42", { integer: false });
			assert.deepEqual(ret, {
				result: false,
				what: "integer",
				reference: false,
				actual: "42.42",
				details: "non-integer number"
			});
		});

	});

	describe("exact division validation", () => {

		it ("validates exact divider condition", () => {
			let ret = condition.evaluateValueCondition(7, { divides: 42 });
			assert.deepEqual(ret, { result: true });
		});

		it ("validates exact divider condition for floats", () => {
			let ret = condition.evaluateValueCondition(7.07, { divides: 42.42 });
			assert.deepEqual(ret, { result: true });
		});

		it ("detects exact divider mismatch", () => {
			let ret = condition.evaluateValueCondition(8, { divides: 42 });
			assert.deepEqual(ret, {
				result: false,
				what: "divides",
				reference: 42,
				actual: 8,
				details: "exact divider of 42"
			});
		});

		it ("detects exact divider mismatch for floats", () => {
			let ret = condition.evaluateValueCondition(7, { divides: 42.42 });
			assert.deepEqual(ret, {
				result: false,
				what: "divides",
				reference: 42.42,
				actual: 7,
				details: "exact divider of 42.42"
			});
		});

		it ("detects exact divider mismatch", () => {
			let ret = condition.evaluateValueCondition("7", { divides: 42 });
			assert.deepEqual(ret, {
				result: false,
				what: "divides",
				reference: 42,
				actual: "7",
				details: "exact divider of 42"
			});
		});

		it ("detects exact divider mismatch for floats", () => {
			let ret = condition.evaluateValueCondition("7.07", { divides: 42.42 });
			assert.deepEqual(ret, {
				result: false,
				what: "divides",
				reference: 42.42,
				actual: "7.07",
				details: "exact divider of 42.42"
			});
		});

	});

	describe("exact multiple validation", () => {

		it ("validates exact mutiple condition", () => {
			let ret = condition.evaluateValueCondition(42, { multiple: 7 });
			assert.deepEqual(ret, { result: true });
		});

		it ("validates exact multiple condition for floats", () => {
			let ret = condition.evaluateValueCondition(42.42, { multiple: 7.07 });
			assert.deepEqual(ret, { result: true });
		});

		it ("detects exact multiple mismatch", () => {
			let ret = condition.evaluateValueCondition(42, { multiple: 8 });
			assert.deepEqual(ret, {
				result: false,
				what: "multiple",
				reference: 8,
				actual: 42,
				details: "exact multiple of 8"
			});
		});

		it ("detects exact multiple mismatch for floats", () => {
			let ret = condition.evaluateValueCondition(42.42, { multiple: 7 });
			assert.deepEqual(ret, {
				result: false,
				what: "multiple",
				reference: 7,
				actual: 42.42,
				details: "exact multiple of 7"
			});
		});

		it ("detects exact multiple mismatch", () => {
			let ret = condition.evaluateValueCondition("42", { multiple: 7 });
			assert.deepEqual(ret, {
				result: false,
				what: "multiple",
				reference: 7,
				actual: "42",
				details: "exact multiple of 7"
			});
		});

		it ("detects exact multiple mismatch for floats", () => {
			let ret = condition.evaluateValueCondition("42.42", { multiple: 7.07 });
			assert.deepEqual(ret, {
				result: false,
				what: "multiple",
				reference: 7.07,
				actual: "42.42",
				details: "exact multiple of 7.07"
			});
		});

	});

	describe("string contains validation", () => {

		it ("validates string containing substring", () => {
			let ret = condition.evaluateValueCondition("abcdef", { contains: "bcd" });
			assert.deepEqual(ret, { result: true });
		});

		it ("validates string beginning with substring", () => {
			let ret = condition.evaluateValueCondition("abcdef", { contains: "abc" });
			assert.deepEqual(ret, { result: true });
		});

		it ("validates string ending with substring", () => {
			let ret = condition.evaluateValueCondition("abcdef", { contains: "def" });
			assert.deepEqual(ret, { result: true });
		});

		it ("validates string containing one of many substrings", () => {
			let ret = condition.evaluateValueCondition("abcdef", { contains: [ "bcd", "bla", "123" ] });
			assert.deepEqual(ret, { result: true });
		});

		it ("detects string not containing substring", () => {
			let ret = condition.evaluateValueCondition("abcdef", { contains: "abd" });
			assert.deepEqual(ret, {
				result: false,
				what: "contains",
				reference: "abd",
				actual: "abcdef",
				details: "string containing \"abd\""
			});
		});

		it ("detects string not containing any of more substrings", () => {
			let ret = condition.evaluateValueCondition("abcdef", { contains: [ "abd", "bec", "bla" ] });
			assert.deepEqual(ret, {
				result: false,
				what: "contains",
				reference: [ "abd", "bec", "bla" ],
				actual: "abcdef",
				details: "string containing \"abd\", \"bec\" or \"bla\""
			});
		});

	});

	describe("string begins with validation", () => {

		it ("validates string beginning with substring", () => {
			let ret = condition.evaluateValueCondition("abcdef", { begins: "abc" });
			assert.deepEqual(ret, { result: true });
		});

		it ("validates string beginning with one of more substrings", () => {
			let ret = condition.evaluateValueCondition("abcdef", { begins: [ "bla", "bce", "abc" ] });
			assert.deepEqual(ret, { result: true });
		});

		it ("detects string not beginning wtih substring", () => {
			let ret = condition.evaluateValueCondition("abcdef", { begins: "bcd" });
			assert.deepEqual(ret, {
				result: false,
				what: "begins",
				reference: "bcd",
				actual: "abcdef",
				details: "string beginning with \"bcd\""
			});
		});

		it ("detects string not beginning wtih either of more substrings", () => {
			let ret = condition.evaluateValueCondition("abcdef", { begins: [ "bcd", "bla" ] });
			assert.deepEqual(ret, {
				result: false,
				what: "begins",
				reference: [ "bcd", "bla" ],
				actual: "abcdef",
				details: "string beginning with \"bcd\" or \"bla\""
			});
		});

	});

	describe("string ends with validation", () => {

		it ("validates string ending with substring", () => {
			let ret = condition.evaluateValueCondition("abcdef", { ends: "def" });
			assert.deepEqual(ret, { result: true });
		});

		it ("validates string ending with one of more substrings", () => {
			let ret = condition.evaluateValueCondition("abcdef", { ends:  [ "abc", "bla", "def" ] });
			assert.deepEqual(ret, { result: true });
		});

		it ("detects string not ending with substring", () => {
			let ret = condition.evaluateValueCondition("abcdef", { ends: "cde" });
			assert.deepEqual(ret, {
				result: false,
				what: "ends",
				reference: "cde",
				actual: "abcdef",
				details: "string ending with \"cde\""
			});
		});

		it ("detects string not ending with either of more substrings", () => {
			let ret = condition.evaluateValueCondition("abcdef", { ends: [ "cde", "abc", "bla" ] });
			assert.deepEqual(ret, {
				result: false,
				what: "ends",
				reference: [ "cde", "abc", "bla" ],
				actual: "abcdef",
				details: "string ending with \"cde\", \"abc\" or \"bla\""
			});
		});

	});

	describe("string matches validation", () => {

		it ("validates string matching string regexp validation", () => {
			let ret = condition.evaluateValueCondition("abcdef", { matches: "^[a-f]+$" });
			assert.deepEqual(ret, { result: true });
		});

		it ("validates string matching regexp validation", () => {
			let ret = condition.evaluateValueCondition("abcdef", { matches: /^[a-f]+$/ });
			assert.deepEqual(ret, { result: true });
		});

		it ("validates string matching string regexp partial validation", () => {
			let ret = condition.evaluateValueCondition("abcdef123", { matches: "[a-f]+" });
			assert.deepEqual(ret, { result: true });
		});

		it ("validates string matching regexp partial validation", () => {
			let ret = condition.evaluateValueCondition("abcdef123", { matches: /[a-f]+/ });
			assert.deepEqual(ret, { result: true });
		});

		it ("validates string matching on of many regexp partial validation", () => {
			let ret = condition.evaluateValueCondition("abcdef123", { matches: [ /[a-f]+/, /[1-4]+/ ] });
			assert.deepEqual(ret, { result: true });
		});

		it ("detects string not matching string regexp validation", () => {
			let ret = condition.evaluateValueCondition("abcdef12", { matches: "^[a-f]+$" });
			assert.deepEqual(ret, {
				result: false,
				what: "matches",
				reference: "^[a-f]+$",
				actual: "abcdef12",
				details: "string matching \"^[a-f]+$\""
			});
		});

		it ("detects string not matching regexp validation", () => {
			let ret = condition.evaluateValueCondition("abcdef12", { matches: /^[a-f]+$/g });
			assert.deepEqual(ret, {
				result: false,
				what: "matches",
				reference: /^[a-f]+$/g,
				actual: "abcdef12",
				details: "string matching /^[a-f]+$/g"
			});
		});

		it ("detects string not matching regexp partial validation", () => {
			let ret = condition.evaluateValueCondition("123456", { matches: /[a-f]+/g });
			assert.deepEqual(ret, {
				result: false,
				what: "matches",
				reference: /[a-f]+/g,
				actual: "123456",
				details: "string matching /[a-f]+/g"
			});
		});

		it ("detects string not matching either of more regexp partial validation", () => {
			let ret = condition.evaluateValueCondition("123456", { matches: [ /[a-f]+/g, /[xyz]+/g ] });
			assert.deepEqual(ret, {
				result: false,
				what: "matches",
				reference: [ /[a-f]+/g, /[xyz]+/g ],
				actual: "123456",
				details: "string matching /[a-f]+/g or /[xyz]+/g"
			});
		});

	});

	describe("string does not contain validation", () => {

		it ("validates string not containing substring", () => {
			let ret = condition.evaluateValueCondition("abcdef", { containsNot: "bce" });
			assert.deepEqual(ret, { result: true });
		});

		it ("validates string not containing either of more substrings", () => {
			let ret = condition.evaluateValueCondition("abcdef", { containsNot: [ "bce", "bla", "bec" ] });
			assert.deepEqual(ret, { result: true });
		});

		it ("detects string containing substring", () => {
			let ret = condition.evaluateValueCondition("abcdef", { containsNot: "bcd" });
			assert.deepEqual(ret, {
				result: false,
				what: "containsNot",
				reference: "bcd",
				actual: "abcdef",
				details: "string not containing \"bcd\""
			});
		});

		it ("detects string beginning with substring", () => {
			let ret = condition.evaluateValueCondition("abcdef", { containsNot: "abc" });
			assert.deepEqual(ret, {
				result: false,
				what: "containsNot",
				reference: "abc",
				actual: "abcdef",
				details: "string not containing \"abc\""
			});
		});

		it ("detects string ending with substring", () => {
			let ret = condition.evaluateValueCondition("abcdef", { containsNot: "def" });
			assert.deepEqual(ret, {
				result: false,
				what: "containsNot",
				reference: "def",
				actual: "abcdef",
				details: "string not containing \"def\""
			});
		});

		it ("detects string containing one of more substrings", () => {
			let ret = condition.evaluateValueCondition("abcdef", { containsNot: [ "bla", "bcd", "ace" ] });
			assert.deepEqual(ret, {
				result: false,
				what: "containsNot",
				reference: [ "bla", "bcd", "ace" ],
				actual: "abcdef",
				details: "string not containing \"bla\", \"bcd\" or \"ace\""
			});
		});

	});

	describe("string does not begin with validation", () => {

		it ("validates string not beginning with substring", () => {
			let ret = condition.evaluateValueCondition("abcdef", { beginsNot: "bcd" });
			assert.deepEqual(ret, { result: true });
		});

		it ("validates string not beginning with one of more substrings", () => {
			let ret = condition.evaluateValueCondition("abcdef", { beginsNot: [ "bcd", "bla" ] });
			assert.deepEqual(ret, { result: true });
		});

		it ("detects string beginning wtih substring", () => {
			let ret = condition.evaluateValueCondition("abcdef", { beginsNot: "abc" });
			assert.deepEqual(ret, {
				result: false,
				what: "beginsNot",
				reference: "abc",
				actual: "abcdef",
				details: "string not beginning with \"abc\""
			});
		});

		it ("detects string beginning wtih one of more substrings", () => {
			let ret = condition.evaluateValueCondition("abcdef", { beginsNot: [ "bla", "abc", "aaa" ] });
			assert.deepEqual(ret, {
				result: false,
				what: "beginsNot",
				reference: [ "bla", "abc", "aaa" ],
				actual: "abcdef",
				details: "string not beginning with \"bla\", \"abc\" or \"aaa\""
			});
		});

	});

	describe("string does not end with validation", () => {

		it ("validates string not ending with substring", () => {
			let ret = condition.evaluateValueCondition("abcdef", { endsNot: "cde" });
			assert.deepEqual(ret, { result: true });
		});

		it ("validates string not ending with one of more substrings", () => {
			let ret = condition.evaluateValueCondition("abcdef", { endsNot: [ "bla", "abc", "cde" ] });
			assert.deepEqual(ret, { result: true });
		});

		it ("detects string ending with substring", () => {
			let ret = condition.evaluateValueCondition("abcdef", { endsNot: "def" });
			assert.deepEqual(ret, {
				result: false,
				what: "endsNot",
				reference: "def",
				actual: "abcdef",
				details: "string not ending with \"def\""
			});
		});

		it ("detects string ending with one of more substrings", () => {
			let ret = condition.evaluateValueCondition("abcdef", { endsNot: [ "abc", "bla", "def" ] });
			assert.deepEqual(ret, {
				result: false,
				what: "endsNot",
				reference: [ "abc", "bla", "def" ],
				actual: "abcdef",
				details: "string not ending with \"abc\", \"bla\" or \"def\""
			});
		});

	});

	describe("string does not match validation", () => {

		it ("validates string not matching string regexp validation", () => {
			let ret = condition.evaluateValueCondition("abcdef12", { matchesNot: "^[a-f]+$" });
			assert.deepEqual(ret, { result: true });
		});

		it ("validates string not matching regexp validation", () => {
			let ret = condition.evaluateValueCondition("abcdef23", { matchesNot: /^[a-f]+$/ });
			assert.deepEqual(ret, { result: true });
		});

		it ("validates string not matching string regexp partial validation", () => {
			let ret = condition.evaluateValueCondition("123456", { matchesNot: "[a-f]+" });
			assert.deepEqual(ret, { result: true });
		});

		it ("validates string not matching regexp partial validation", () => {
			let ret = condition.evaluateValueCondition("123456", { matchesNot: /[a-f]+/ });
			assert.deepEqual(ret, { result: true });
		});

		it ("validates string not matching either of more regexp validation", () => {
			let ret = condition.evaluateValueCondition("123456", { matchesNot: [ /[a-f]+/, /^[1-5]+$/ ] });
			assert.deepEqual(ret, { result: true });
		});

		it ("detects string matching string regexp validation", () => {
			let ret = condition.evaluateValueCondition("abcdef", { matchesNot: "^[a-f]+$" });
			assert.deepEqual(ret, {
				result: false,
				what: "matchesNot",
				reference: "^[a-f]+$",
				actual: "abcdef",
				details: "string not matching \"^[a-f]+$\""
			});
		});

		it ("detects string matching regexp validation", () => {
			let ret = condition.evaluateValueCondition("abcdef", { matchesNot: /^[a-f]+$/g });
			assert.deepEqual(ret, {
				result: false,
				what: "matchesNot",
				reference: /^[a-f]+$/g,
				actual: "abcdef",
				details: "string not matching /^[a-f]+$/g"
			});
		});

		it ("detects string matching regexp partial validation", () => {
			let ret = condition.evaluateValueCondition("123abc456", { matchesNot: /[a-f]+/g });
			assert.deepEqual(ret, {
				result: false,
				what: "matchesNot",
				reference: /[a-f]+/g,
				actual: "123abc456",
				details: "string not matching /[a-f]+/g"
			});
		});

		it ("detects string matching one of more regexp partial validation", () => {
			let ret = condition.evaluateValueCondition("123abc456", { matchesNot: [ /[a-f]+/g, /123/g ] });
			assert.deepEqual(ret, {
				result: false,
				what: "matchesNot",
				reference: [ /[a-f]+/g, /123/g ],
				actual: "123abc456",
				details: "string not matching /[a-f]+/g or /123/g"
			});
		});

	});

	describe("string or array length validation", () => {

		it ("validates string/array length with various conditions", () => {
			let ret;
			ret = condition.evaluateValueCondition("abcdef", { length: 6 });
			assert.deepEqual(ret, { result: true });
			ret = condition.evaluateValueCondition("abcdef", { length: { eq: 6 } });
			assert.deepEqual(ret, { result: true });
			ret = condition.evaluateValueCondition("abcdef", { length: { eq: [ 4, 6, 12 ] } });
			assert.deepEqual(ret, { result: true });
			ret = condition.evaluateValueCondition("abcdef", { length: { neq: [ 4, 5, 12 ] } });
			assert.deepEqual(ret, { result: true });
			ret = condition.evaluateValueCondition("abcdef", { length: [ { eq: 12 }, { lte: 6 } ] });
			assert.deepEqual(ret, { result: true });
			ret = condition.evaluateValueCondition("abcdef123456", { length: [ { eq: 12 }, { lte: 6 } ] });
			assert.deepEqual(ret, { result: true });
		});

		it ("detects string/array length mismatch", () => {
			let ret;
			ret = condition.evaluateValueCondition("abcdef", { length: 5 });
			assert.deepEqual(ret, {
				result: false,
				what: "length/eq",
				reference: 5,
				actual: 6,
				details: "length 5"
			});
			ret = condition.evaluateValueCondition("abcdef", { length: { eq: [ 5, 7 ] } });
			assert.deepEqual(ret, {
				result: false,
				what: "length/eq",
				reference: [ 5, 7 ],
				actual: 6,
				details: "length 5 or 7"
			});
			ret = condition.evaluateValueCondition("abcdef", { length: [ { eq: [ 12, 24 ] }, { lte: 5 } ] });
			assert.equal(ret.result, false);
			assert.equal(ret.what, "length/compound");
			assert.equal(ret.details, "length 12 or 24 or less than or equal to 5");
		});

	});

	describe("array elements positive validation (each)", () => {

		it ("validates each array elements", () => {
			let ret;
			ret = condition.evaluateValueCondition([ 0, 0, 0 ], { each: 0 });
			assert.deepEqual(ret, { result: true });
			ret = condition.evaluateValueCondition([ 0, 1, 4 ], { each: { integer: true } });
			assert.deepEqual(ret, { result: true });
			ret = condition.evaluateValueCondition([ 12, 1, 4 ], { each: [ { eq: 12 }, { lte: 6 } ] });
			assert.deepEqual(ret, { result: true });
		});

		it ("detects a single element mismatch", () => {
			let ret;
			ret = condition.evaluateValueCondition([ 0, 0, 1 ], { each: 0 });
			assert.deepEqual(ret, {
				result: false,
				what: "each/eq",
				reference: 0,
				actual: 1,
				index: 2,
				details: "0"
			});
			ret = condition.evaluateValueCondition([ 12, 1, 7 ], { each: [ { eq: [ 12, 24 ] }, { lte: 6 } ] });
			assert.equal(ret.result, false);
			assert.equal(ret.what, "each/compound");
			assert.equal(ret.index, 2);
			assert.equal(ret.details, "12 or 24 or less than or equal to 6");
		});

	});

	describe("multiple condition negative results", () => {

		it ("fails if all conditions fail and gives a comprehensive results object", () => {
			let ret = condition.evaluateValueCondition(13, [ { type: "string" }, { integer: false },
				{ eq: 12 }, { eq: 24 }, { lte: 6 }, { multiple: 3 }, { divides: [ 100, 125 ] } ]);
			assert.deepEqual(ret, {
				result: false,
				what: "compound",
				reference: {
					type: "string",
					integer: false,
					eq: [ 12, 24 ],
					lte: 6,
					multiple: 3,
					divides: [ 100, 125 ]
				},
				actual: 13,
				details: "type \"string\", non-integer number, 12, 24, less than or equal to 6, " +
					"exact multiple of 3 or exact divider of 100 or 125"
			});
		});

	});

});
