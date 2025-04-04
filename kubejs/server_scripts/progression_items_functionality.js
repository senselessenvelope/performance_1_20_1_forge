

BlockEvents.rightClicked(event => {
    const { level, block, item } = event
    var mob
    if (block.id == 'stalwart_dungeons:awful_ghast_altar') {
        if (item.id != 'kubejs:ghast_key') {
            return
        }
        mob = block.createEntity('stalwart_dungeons:awful_ghast')
    } else if (block.id == 'stalwart_dungeons:nether_keeper_altar') {
        if (item.id != 'kubejs:keeper_key') {
            return
        }
        mob = block.createEntity('stalwart_dungeons:nether_keeper')
    } else {
        return
    }
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
        player.potionEffects.add("minecraft:luck", 100, 2)
    }
})

BlockEvents.broken(event => {
    const { player, block } = event
    if (player.isHoldingInAnyHand('kubejs:golden_egg')) {
        if (!block.id.includes("_ore")) {
            return
        }
        let drops = block.getDrops()
        // give approximate fortune to event
        drops.forEach(drop => {
            let extra = Math.floor(Math.random() * 3) // Fortune III can give up to 3 extra
            // drop.count += extra
            // BELOW DOES NOT WORK -- DOES NOTHING
            // MAYBE use LootJS to modify drops
            drop.setCount(drop.getCount() + extra)
        })
    }
})

