// the default node js assertion library used for testing
const assert = require("assert");

const message = require("../src/message.js");

describe ("Message processing functions", () => {

	describe ("parseCondition", () => {

		it ("parses boolean conditions", () => {
			assert.deepEqual(message.parseCondition("value"), { operator: "boolean", lho: "value" });
			assert.deepEqual(message.parseCondition("  value   "), { operator: "boolean", lho: "value" });
		});

		it ("parses equality conditions", () => {
			assert.deepEqual(message.parseCondition("  value   ==  42  "), { operator: "==", lho: "value", rho: 42 });
			assert.deepEqual(message.parseCondition("  value  ===  '42'  "), { operator: "===", lho: "value", rho: "42" });
			assert.deepEqual(message.parseCondition("  value   !=  false  "), { operator: "!=", lho: "value", rho: false });
			assert.deepEqual(message.parseCondition("  value  !==  'true'  "), { operator: "!==", lho: "value", rho: "true" });
		});

		it ("parses string right hands with spaces", () => {
			assert.deepEqual(message.parseCondition("  value  !==  'a b c'  "), { operator: "!==", lho: "value", rho: "a b c" });
		});

		it ("parses inequality conditions", () => {
			assert.deepEqual(message.parseCondition("  value   >  -42  "), { operator: ">", lho: "value", rho: -42 });
			assert.deepEqual(message.parseCondition("  value   >=  42  "), { operator: ">=", lho: "value", rho: +42 });
			assert.deepEqual(message.parseCondition("  value   <  -42  "), { operator: "<", lho: "value", rho: -42 });
			assert.deepEqual(message.parseCondition("  value   <=  42  "), { operator: "<=", lho: "value", rho: +42 });
		});

	});

	describe ("evaluateCondition", () => {

		it ("evaluates boolean conditions", () => {
			let con = { operator: "boolean", lho: "value" };
			assert.equal(message.evaluateCondition(con, { value: true }), true);
			assert.equal(message.evaluateCondition(con, { value: false }), true);
			assert.equal(message.evaluateCondition(con, { value: null }), true);
			assert.equal(message.evaluateCondition(con, { value: 42 }), true);
			assert.equal(message.evaluateCondition(con, { otherValue: true }), false);
		});

		it ("evaluates binary conditions", () => {
			let con = { operator: "===", lho: "value", rho: 42 };
			assert.equal(message.evaluateCondition(con, { value: 42 }), true);
			assert.equal(message.evaluateCondition(con, { value: "42" }), false);
		});

	});

	describe ("runMacro", () => {

		it ("evaluates _TYPE_ macro", () => {
			assert.equal(message.runMacro("_TYPE_", { value: null }), "object");
			assert.equal(message.runMacro("_TYPE_", { value: 1234 }), "number");
			assert.equal(message.runMacro("_TYPE_", { value: "42" }), "string");
		});

		it ("evaluates _LEN_ macro", () => {
			assert.equal(message.runMacro("_LEN_", { value: "1234" }), 4);
			assert.equal(message.runMacro("_LEN_", { value: [ 1, 2 ] }), 2);
		});

		it ("evaluates _ACTUAL_ macro", () => {
			assert.equal(message.runMacro("_ACTUAL_", { actual: 1234 }), "1234");
			assert.equal(message.runMacro("_ACTUAL_", { actual: "1234" }), "\"1234\"");
			assert.equal(message.runMacro("_ACTUAL_", { actual: [ 1, 2 ] }), "[1,2]");
		});

		it ("evaluates _VALUE_ macro", () => {
			assert.equal(message.runMacro("_VALUE_", { value: 1234 }), "1234");
			assert.equal(message.runMacro("_VALUE_", { value: "1234" }), "\"1234\"");
			assert.equal(message.runMacro("_VALUE_", { value: [ 1, 2 ] }), "[1,2]");
		});

	});

	describe ("extractSubs", () => {

		it ("returns empty object for no subs", () => {
			assert.deepEqual(message.extractSubs("This message has no subs"), {});
		});

		it ("returns list of subs", () => {
			assert.deepEqual(message.extractSubs(
				"Some (?subs in this message?), even with binary condtions (? value ==  43 like this  ?)"), {
					"(?subs in this message?)": { con: { operator: "boolean", lho: "subs" }, msg: " in this message" },
					"(? value ==  43 like this  ?)": { con: { operator: "==", lho: "value", rho: 43 }, msg: " like this" }
				});
		});

		it ("returns list of subs with nesting", () => {
			assert.deepEqual(message.extractSubs("There (?are nested (?subs in this?) message?)"), {
				"(?are nested (?subs in this?) message?)":
					{ con: { operator: "boolean", lho: "are" }, msg: " nested (?subs in this?) message" }
			});
		});

	});

	describe ("replaceTokens (entry function)", () => {

		it ("returns message with no tokens untouched", () => {
			assert.equal(message.replaceTokens(""), "");
			assert.equal(message.replaceTokens("This message has no tokens"), "This message has no tokens");
		});

		it ("replaces token variables", () => {
			let tokens = { value: "there it is", var1: 25, var2: false };
			assert.equal(message.replaceTokens("%value%, the value specified alongside %var1% and %var2%", tokens),
				"there it is, the value specified alongside 25 and false");
		});

		it ("replaces token macros for strings", () => {
			let tokens = { value: "123456" };
			assert.equal(message.replaceTokens("type is %_TYPE_%, length is %_LEN_%", tokens),
				"type is string, length is 6");
		});

		it ("replaces token macros for arrays", () => {
			let tokens = { value: [ 1, 2, 3, 4, 5 ] };
			assert.equal(message.replaceTokens("type is %_TYPE_%, length is %_LEN_%", tokens),
				"type is object, length is 5");
		});

		it ("includes conditionals only if condition is fulfilled", () => {
			let tokens = { value: "there it is", var1: 25, var2: false };
			assert.equal(message.replaceTokens("Tokens: (?value == 'there it is' this should show?)" +
				"(?var1 >= 25 this as well?)(?var2 this too?)(?value=='somethingelse' this shouldn't show?)" +
				"(?var3 and neither should this?)(?var2 > 25 nor this?)", tokens),
				"Tokens:  this should show this as well this too");
		});

		it ("replaces variables and macros in conditionals", () => {
			let tokens = { value: "123456", var1: false, var2: 43 };
			assert.equal(message.replaceTokens("Tokens:(?value %_TYPE_% %_LEN_% %var1% %var2%?)", tokens),
				"Tokens: string 6 false 43");
		});

		it ("replaces nested conditionals recursively", () => {
			let tokens = { value: "1234", var1: false, var2: 42 };
			assert.equal(message.replaceTokens(
				"Tokens:(?value %value%(?var1 === false %_TYPE_% %_LEN_%(?var2 > 40 %var2%?)?)?)", tokens),
				"Tokens: 1234 string 4 42");
			assert.equal(message.replaceTokens(
				"Tokens:(?value %value%(?var1 === true %_TYPE_% %_LEN_%(?var2 > 40 %var2%?)?)?)", tokens),
				"Tokens: 1234");
		});

	});

});
