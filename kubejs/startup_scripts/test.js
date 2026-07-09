// priority: 1000

// ---------------------------
// ---[ TESTING FUNCTIONS ]---
// ---------------------------


// TESTING
//      use by doing: 
// 
//      global.test.assert(
//          thing1 === thing2,
//          "test name"
//      )
const test = {
    // pass or fail methods
    pass(message) {
        console.log("[TEST PASSED] " + message)
    },
    fail(message) {
        throw new Error("[TEST FAILED] " + message)
    },

    // assert method
    assert(condition, message) {
        if (!condition) {
            this.fail(message)
        }
        this.pass(message)
    },

    // various assert methods
    assertEquals(actual, expected, message) {
        this.assert(actual === expected, message)
    },
    assertNotEquals(actual, expected, message) {
        this.assert(actual !== expected, message)
    },
    assertTrue(value, message) {
        this.assert(value === true, message)
    },
    assertFalse(value, message) {
        this.assert(value === false, message)
    },
    assertNotNull(value, message) {
        this.assert(value != null, message)
    },
    assertNull(value, message) {
        this.assert(value == null, message)
    }
}