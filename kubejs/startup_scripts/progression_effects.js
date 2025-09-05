// ---------------------------------
// -----[ PROGRESSION EFFECTS ]-----
// ---------------------------------

// -- Custom effect to prevent fall damage --
StartupEvents.registry('mob_effect', event => {
    event.create('kubejs:falling_immunity')
        .color(0x91CAFF)
        .beneficial()
        .effectTick((entity) => { // while entity under effect
            // if entity falling reset fall distance to prevent fall damage
            if (entity.fallDistance > 0) { entity.fallDistance = 0 }
        })
})
