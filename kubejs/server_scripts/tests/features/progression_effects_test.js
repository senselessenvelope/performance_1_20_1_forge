// priority: 0

// ---------------------------------
// -----[ PROGRESSION EFFECTS ]-----
// ---------------------------------


(() => {
    // need to test in server scripts as registry not yet loaded
    // effect registry as found in KubeJS wiki: 
    //      https://kubejs.com/wiki/tutorials/mob-effect-registry
    // can explore other ones like item, block, etc.
    const progression_effects_tests = {
        testFallingImmunity() {
            let effects = Utils.getRegistry('mob_effect')
            let found = false
            effects.forEach(effect => {
                if (effect.getBuilderTranslationKey() === "effect.kubejs.falling_immunity") { found = true }
            })
            test.assertTrue(found, "effect.kubejs.falling_immunity found")
        }
    }

    // run test functions
    progression_effects_tests.testFallingImmunity()
}) ()