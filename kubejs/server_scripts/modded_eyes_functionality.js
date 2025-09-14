
// referencing functions defined at startup
const { addCommonDrop, addSingleDrop } = global.entityUtils
const EntityItemDrop = global.objects.entity.EntityItemDrop

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

// generalised drop processing function, pass in EntityItemDrop object, a key-value of entities and their 
// item to drop, and the function for item drop distribution (whether should drop 1 or multiple)
function processDrops(entityItemDrop, dropTable, dropFunction) {
    for (var entity in dropTable) {
        if (dropTable.hasOwnProperty(entity)) {
            entityItemDrop.update(entity, dropTable[entity])
            dropFunction(entityItemDrop)
        }
    }
}

// process single drop entities
function processSingleDrops(entityItemDrop, dropTable) {
    processDrops(entityItemDrop, dropTable, addSingleDrop)
}

// process common drop entities
function processCommonDrops(entityItemDrop, dropTable) {
    processDrops(entityItemDrop, dropTable, addCommonDrop)
}


// SOME OF THESE BOSSES MAY NOT BE USED FOR THESE DROPS, AND MAY BE OTHER BOSSES FOR THEM
LootJS.modifiers((event) => {
    // ----------------------------
    // -----[ DROP TABLES ]-----
    // ----------------------------

    // entities that use addSingleDrop
    var singleDrops = {
        "aether:valkyrie_queen": "kubejs:valkyrean_wing",
        "stalwart_dungeons:nether_keeper": EYE_OF_MAGMA,
        "stalwart_dungeons:awful_ghast": EYE_OF_SOUL,
        "twilightforest:giant_miner": "kubejs:golden_egg",
        "more_zombies2:zombie_god": EYE_OF_MANY_RIBS,
        "undergarden:forgotten_guardian": EYE_OF_GHOST,
        "blue_skies:summoner": EYE_OF_FROST,
        "blue_skies:alchemist": EYE_OF_SANDSTORM,
        "blue_skies:gatekeeper": EYE_OF_MOSS
    }

    // entities that use addCommonDrop
    var commonDrops = {
        "aether:slider": "kubejs:gravitite_gel",
        "aether:sun_spirit": "kubejs:solar_stone",
        "lost_aether_content:aerwhale_king": "kubejs:whale_wind",
        "twilightforest:lich": "kubejs:green_goo",
        "twilightforest:ur_ghast": "kubejs:stiff_skin",
        "twilightforest:snow_queen": "kubejs:stiff_skin",
        "twilightforest:hydra": "kubejs:stiff_skin"
    }

    // specify event for entity and item drop (which can be added later)
    var entityItemDrop = new EntityItemDrop({ event: event })

    // process all of them
    processSingleDrops(entityItemDrop, singleDrops)
    processCommonDrops(entityItemDrop, commonDrops)
})
