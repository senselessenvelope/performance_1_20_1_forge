
// -- Summoning Nether Bosses for Nether Eyes --
BlockEvents.rightClicked(event => {
    const { level, block, item } = event
    var mob;
    // // NEED TO ADD A DIMENSION CHECK -- TEST IF CORRECT
    // if (level.getDimension() != 'minecraft:the_nether') {
    //     return
    // }
    // spawn mob based on held item and block
    if (block.id == 'stalwart_dungeons:awful_ghast_altar') {
        if (item.id != 'kubejs:ghast_key') { return }
        mob = block.createEntity('stalwart_dungeons:awful_ghast')
    } else if (block.id == 'stalwart_dungeons:nether_keeper_altar') {
        if (item.id != 'kubejs:keeper_key') { return }
        mob = block.createEntity('stalwart_dungeons:nether_keeper')
    } else { return }
    // spawn, play spawn sound and reduce item held by 1
    mob.spawn()
    level.playSound(null, event.player.x, event.player.y, event.player.z, 'minecraft:entity.wither.spawn', 'master', 1, 0.5)
    item.shrink(1)
})


PlayerEvents.tick(event => {
    const { player, server } = event
    // holding different items will have different effects
    if (player.isHoldingInAnyHand('kubejs:gravitite_gel')) {
        player.potionEffects.add("minecraft:jump_boost", 1, 2)
    }
    if (player.isHoldingInAnyHand('kubejs:solar_stone')) {
        player.setSecondsOnFire(1)
    }
    if (player.isHoldingInAnyHand('kubejs:green_goo')) {
        // alternates between poison and wither (some overlap)
        if (server.tickCount % 160 < 40) {
            player.potionEffects.add("minecraft:poison", 80)
        } else if (server.tickCount % 160 >= 120 && server.tickCount % 160 < 160) {
            player.potionEffects.add("minecraft:wither", 80)
        }
    }
    if (player.isHoldingInAnyHand('kubejs:golden_egg')) {
        player.potionEffects.add("minecraft:luck", 1, 2)
    }
    if (player.isHoldingInAnyHand('kubejs:valkyrean_wing')) {
        player.potionEffects.add("minecraft:strength", 1)
    }
})

BlockEvents.broken(event => {
    const { player, block } = event
    // do not drop items in creative
    if (player.isCreative()) { return }
    if (player.isHoldingInAnyHand('kubejs:golden_egg')) {
        // do not do extra drops to blocks that are not ores
        if (!block.id.includes("_ore")) { return }
        let drops = block.getDrops()
        let max = 4 // count could be [0-4), so chance of no extra item
        for (let i = 0; i < drops.length; i++) {
            let extraItemCount = Math.floor(Math.random() * max)
            // no extra item case
            if (extraItemCount == 0) { return }
            // otherwise get item, set extra count and add it to drop
            let item = drops.get(i)
            item.setCount(extraItemCount)
            block.popItem(item)
        }
    }
})
