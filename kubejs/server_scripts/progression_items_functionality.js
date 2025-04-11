
// -- Summoning Nether Bosses for Nether Eyes --
BlockEvents.rightClicked(event => {
    const { level, block, item } = event
    var mob;
    // NEED TO ADD A DIMENSION CHECK -- TEST IF CORRECT
    if (level.getDimension() != 'minecraft:the_nether') {
        return
    }
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
ServerEvents.loaded(event => {
    Utils.server.scheduleInTicks(1, () => {
        let dummy = level.createEntity('kubejs:your_projectile')
        dummy.setPos(0, -200, 0)
        dummy.spawn()
        dummy.kill()
    })
})

// -- Entity Hurting Based On Item In Inventory --
EntityEvents.hurt(event => {
    const { entity, source } = event
    // if entity is not a player, return
    if (!entity.player) return
    // check source of damage being another entity
    const attacker = source.actual
    if (!attacker) return
    // does not do if entity attacking is too far away (wouldnt make sense if it was ranged entity unless close)
    if (entity.distanceToEntity(attacker) > 3) return
    // info on inventory object:
    //      https://hunter19823.github.io/kubejsoffline/1.20.1/forge/#net.minecraft.world.entity.player.Inventory?focus=methods-header&methods-expanded=false&methods-page=0&methods-page-size=25
    const inventory = entity.getInventory()
    // create items to look for using ItemStack objects
    const ItemStack = Java.loadClass('net.minecraft.world.item.ItemStack');
    const greenGoo = new ItemStack("kubejs:green_goo")
    const solarStone = new ItemStack("kubejs:solar_stone")
    // give wither if green goo
    if (inventory.contains(greenGoo)) {
        attacker.potionEffects.add("minecraft:wither", 20 * 5) // wither for 5 seconds
    }
    // set on fire for 5 seconds if solar stone
    if (inventory.contains(solarStone)) {
        attacker.remainingFireTicks = 20 * 3
    }
});

ServerEvents.tick(event => {
    // Get the world where the event is running
    // const world = event.server.level;
    // console.log(event.server)
    // console.log(world)
    // const entities = event.server.level.getEntities();
    const entities = event.server.entities
    // if (!world) { return }
    // if (world.entities === null) { return }
    if (!entities) return
    // Loop through all entities currently in the world
    entities.forEach(entity => {

        // // Example: Apply a condition for a specific entity type (e.g., 'kubejs:solar_stone_projectile')
        // if (entity.type === 'kubejs:solar_stone_projectile') {
            
        //     // You can modify the entity here or check specific properties
        //     console.log(`Found solar_stone_projectile at (${entity.x}, ${entity.y}, ${entity.z})`);

        //     // // DONT WORK
        //     // const data = entity.persistentData
        //     // if (data.has('motion')) {
        //     //     const motion = data.get('motion')
        //     //     entity.setDeltaMovement(motion)
        //     // }
        // }
    });
});

ItemEvents.rightClicked("kubejs:solar_stone", event => {
    const { player, item } = event;
    const vel = 1.5
    // angle player looking at
    const playerAngle = {
        x: player.lookAngle.x(),
        y: player.lookAngle.y(),
        z: player.lookAngle.z()
    }
    // create entity to shoot
    const entity = player.level.createEntity('kubejs:solar_stone_projectile')
    // spawn entity
    entity.spawn()
    Utils.server.schedule(5, () => {
        // entity spawn position
        entity.pos = new Vec3d(player.x + (1.5 * playerAngle.x), player.y + (player.getEyeHeight() + playerAngle.y), player.z + (1.5 * playerAngle.z))
        // not affected by gravity
        entity.setNoGravity(true)
        const motion = new Vec3d(playerAngle.x * vel, playerAngle.y * vel,  playerAngle.z * vel)
        // entity.persistentData.put('motion', motion)
        // entity movement
        entity.setDeltaMovement(motion)
    })
    // do not reduce stack size if in creative
    if (!player.isCreative()) { item.shrink(1) }
    // cooldown in seconds
    let cooldown = 2
    player.addItemCooldown(item, 20 * cooldown)
    // player.level.playSound(null, player.x, player.y, player.z, 'minecraft:entity.ghast.shoot', 'players', 1, 1)
    player.level.playSound(null, player.x, player.y, player.z, 'minecraft:entity.wither.shoot', 'players', 1, 1) // scarier
    // seconds entity will exist for
    let entityLife = 30
    // after number of ticks, entity will be killed
    Utils.server.scheduleInTicks(20 * entityLife, ctx => {
            entity.kill()
            entity.discard()
    })
})


PlayerEvents.tick(event => {
    const { player, server } = event
    // holding different items will have different effects
    if (player.isHoldingInAnyHand('kubejs:gravitite_gel')) {
        player.potionEffects.add("minecraft:jump_boost", 1, 1)
    }
    if (player.isHoldingInAnyHand('kubejs:solar_stone')) {
        // no need to check if in water, already handled by game
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
        player.potionEffects.add("minecraft:luck", 1, 1)
    }
    if (player.isHoldingInAnyHand('kubejs:valkyrean_wing')) {
        player.potionEffects.add("minecraft:strength", 1)
    }
    if (player.isHoldingInAnyHand('kubejs:stiff_skin')) {
        player.potionEffects.add("minecraft:resistance", 1)
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
        let max = 1 // count could be [0-1), so chance of no extra item
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
