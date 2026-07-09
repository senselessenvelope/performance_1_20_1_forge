// priority: 0

// testing assert methods to ensure they are correct using verifiably correct assertNotThrows/assertThrows
// wrapping them with a function call so called within assertNotThrows/assertThrows

// assert
test.assertNotThrows(() => test.assert(1 === 1, "1 === 1"), "testing assert method 1 === 1 pass")
test.assertNotThrows(() => test.assert(1 !== 2, "1 !== 2"), "testing assert method 1 !== 2 pass")
test.assertThrows(() => test.assert(1 === 2, "1 === 2"), "testing assert method 1 === 2 fail")
test.assertThrows(() => test.assert(1 !== 1, "1 !== 1"), "testing assert method 1 !== 1 fail")

// assertEquals/assertNotEquals
test.assertNotThrows(() => test.assertEquals(1, 1, "1 === 1"), "testing assertEquals(1, 1) pass")
test.assertNotThrows(() => test.assertNotEquals(1, 2, "1 !== 2"), "testing assertNotEquals(1, 2) pass")
test.assertThrows(() => test.assertEquals(1, 2, "1 === 2"), "testing assertEquals(1, 2) fail")
test.assertThrows(() => test.assertNotEquals(1, 1, "1 !== 1"), "testing assertNotEquals(1, 1) fail")

// assertTrue/assertFalse
test.assertNotThrows(() => test.assertTrue(true, "is true true?"), "testing assertTrue(true) pass")
test.assertNotThrows(() => test.assertFalse(false, "is false false?"), "testing assertFalse(false) pass")
test.assertThrows(() => test.assertTrue(false, "is true false?"), "testing assertTrue(false) fail")
test.assertThrows(() => test.assertFalse(true, "is false true?"), "testing assertFalse(true) fail")

// assertNotNull/assertNull
test.assertNotThrows(() => test.assertNotNull(1, "1 is not null"), "testing assertNotNull(1) pass")
test.assertNotThrows(() => test.assertNull(null, "null is null"), "testing assertNull(null) pass")
test.assertThrows(() => test.assertNotNull(null, "null is not null"), "testing assertNotNull(null) fail")
test.assertThrows(() => test.assertNull(1, "1 is null"), "testing assertNull(1) fail")