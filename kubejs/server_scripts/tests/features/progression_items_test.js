// // priority: 0


// // --------------------------------------
// // -----[ CREATING PROJECTILE DATA ]-----
// // --------------------------------------

(() => {
    // dict of progression items
    let progression_items = {
        "item.kubejs.solar_stone": false,
        "item.kubejs.gravitite_gel": false,
        "item.kubejs.valkyrean_wing": false,
        "item.kubejs.whale_wind": false,
        "item.kubejs.green_goo": false,
        "item.kubejs.stiff_skin": false,
        "item.kubejs.golden_egg": false,
        "item.kubejs.ghast_key": false,
        "item.kubejs.keeper_key": false
    }
    // same but for potions
    let progression_potions = {
        "potion.kubejs.potion_of_hardiness": false,
        "potion.kubejs.potion_of_floatiness": false,
        "potion.kubejs.potion_of_angriness": false,
        "potion.kubejs.potion_of_deadliness": false
    }
    const progression_items_tests = {
        testProgressionItems(type, item_dict) {
            let items = Utils.getRegistry(type)
            items.forEach(item => {
                item_dict[item.getBuilderTranslationKey()] = true
            })
            // get list of keys for dict for verifying existence for each
            items = Object.keys(item_dict)
            items.forEach(item => {
                test.assertTrue(item_dict[item], `${item} exists`)
            })
        }
    }
    progression_items_tests.testProgressionItems('item', progression_items)
    progression_items_tests.testProgressionItems('potion', progression_potions)
}) ()
