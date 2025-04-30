
// referencing utility functions defined at startup
const { addCommonDrop, addSingleDrop } = global.entityUtils

// partially destructured global enum eyes (shorter reference)
const {
    // EYE_OF_AIR,
    EYE_OF_MAGMA,
    EYE_OF_SOUL,
    // EYE_OF_BONES,
    EYE_OF_MANY_RIBS,
    EYE_OF_GHOST,
    EYE_OF_FROST,
    EYE_OF_SANDSTORM,
    EYE_OF_MOSS
} = global.legendaryMonstersEyes

// removing right click function of legendary monster eyes
ItemEvents.rightClicked((event) => {
    let item = event.item.id
    // removing right click event if item is one of enum values
    if (Object.values(global.legendaryMonstersEyes).includes(item)) {
        console.log("RIGHT CLICKED EYE")
        event.cancel()
    }
})

// SOME OF THESE BOSSES MAY NOT BE USED FOR THESE DROPS, AND MAY BE OTHER BOSSES FOR THEM
LootJS.modifiers((event) => {
    // aether boss drop loot
    addCommonDrop({ event: event, entity: "aether:the_slider", item: "kubejs:gravitite_gel" })
    addSingleDrop({ event: event, entity: "aether:the_valkyrie_queen", item: "kubejs:valkyrean_wing" })
    addCommonDrop({ event: event, entity: "aether:the_sun_god", item: "kubejs:solar_stone" })
    addCommonDrop({ event: event, entity: "lost_aether_content:aerwhale_king", item: "kubejs:whale_wind" })
    // nether boss drop loot
    addSingleDrop({ event: event, entity: "stalwart_dungeons:nether_keeper", item: EYE_OF_MAGMA })
    addSingleDrop({ event: event, entity: "stalwart_dungeons:awful_ghast", item: EYE_OF_SOUL })
    // twilight forest boss drop loot
    addCommonDrop({ event: event, entity: "twilightforest:lich", item: "kubejs:green_goo" })
    addCommonDrop({ event: event, entity: "twilightforest:ur_ghast", item: "kubejs:stiff_skin" })
    addCommonDrop({ event: event, entity: "twilightforest:snow_queen", item: "kubejs:stiff_skin" })
    addCommonDrop({ event: event, entity: "twilightforest:hydra", item: "kubejs:stiff_skin" })
    addSingleDrop({ event: event, entity: "twilightforest:giant", item: "kubejs:golden_egg" })
    // dark dimension boss drop loot
    event
        .addEntityLootModifier("more_zombies2:zombie_god")
        .addLoot(EYE_OF_MANY_RIBS)
    // undergarden boss drop loot
    event
        .addEntityLootModifier("undergarden:forgotten_guardian")
        .addLoot(EYE_OF_GHOST)
    // everbright boss drop loot
    event
        .addEntityLootModifier("blue_skies:summoner")
        .addLoot(EYE_OF_FROST)
    // everdawn boss drop loot
    event
        .addEntityLootModifier("blue_skies:alchemist")
        .addLoot(EYE_OF_SANDSTORM)
    // overworld eye, MAY INSTEAD BE A TRADE FROM BLUE SKIES NPC, 
    // see edit_recipes.json AND progress.txt for more info
    // (could not figure it out, so may just be a drop, INSTEAD of that i may have him buffed once hit)
    event
        .addEntityLootModifier("blue_skies:gatekeeper")
        .addLoot(EYE_OF_MOSS)
})
