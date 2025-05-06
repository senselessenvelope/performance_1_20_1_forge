// priority: 0

// Visit the wiki for more info - https://kubejs.com/


LootJS.modifiers((event) => {
    // constants to use in event
    let raw_iron_item = Item.of("minecraft:raw_iron").withChance(50)
    let raw_copper_item = Item.of("minecraft:raw_copper").withChance(20)
    let raw_silver_item = Item.of("galosphere:raw_silver").withChance(20)
    // iron ore can also now drop copper or galosphere silver
    event
        .addBlockLootModifier(["minecraft:iron_ore"])
        .removeLoot("minecraft:raw_iron")
        .addWeightedLoot([
            raw_iron_item,
            raw_copper_item,
            raw_silver_item,
        ])
        .applyOreBonus("minecraft:fortune")
    // adds a copper and silver ingots to loot tables for chests
    let copper_ingot_loot = LootEntry.of("minecraft:copper_ingot")
    event
        .addLootTypeModifier(LootType.CHEST).pool((p) => {
            p.addLoot(
                copper_ingot_loot.when((c) => c.randomChance(0.8))
            )
            p.limitCount([5, 10], [30, 50])
        })
    let silver_ingot_loot = LootEntry.of("galosphere:silver_ingot")
    event
        .addLootTypeModifier(LootType.CHEST).pool((p) => {
            p.addLoot(
                silver_ingot_loot.when((c) => c.randomChance(0.7))
            )
            p.limitCount([5, 10], [35, 64])
        })
})

