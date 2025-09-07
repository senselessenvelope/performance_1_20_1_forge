// ---------------------
// -----[ IMPORTS ]-----
// ---------------------

// loading java class
const ItemStack = Java.loadClass('net.minecraft.world.item.ItemStack')
// referencing utility functions defined at startup
const { explodeEntity, removeEntity, summonProjectile, verifyProjectile } = global.entityUtils
const { useItem } = global.itemUtils

// -------------------
// -----[ SETUP ]-----
// -------------------

// shoot fireball from given item
function shootFireball(player, item) {
    // cooldown of 0.5 seconds
    useItem(new global.PlayerItem({ player: player, item: item, cooldown: 0.5 }))
    const entity = 'kubejs:fireball'
    const projectile = { entity: entity, velocity: 1.5 }
    // no need to specify explosion unless you want it to explode upon entity life terminating
    summonProjectile({ player: player, projectile: projectile })
}
// firing test projectile first time on loading server to ensure it works
ServerEvents.loaded(event => {
    // projectiles we want to remove on loading world/server (otherwise they will persist)
    const customProjectiles = [
        "kubejs:fireball",
        "kubejs:solar_stone_projectile",
        "kubejs:green_goo_projectile"
    ]
    // schedule these after 1 tick (to make sure all other server stuff is loaded/initialised)
    Utils.server.scheduleInTicks(1, () => {
        // get all entities in server (ArrayList)
        const entities = event.server.entities
        // if null exit
        if (!entities) return
        // loop through all
        entities.forEach(entity => {
            // if is one we want to remove then remove it
            if (customProjectiles.includes(entity.type.toString())) {
                console.log(`Removed leftover projectile ${entity.type}`)
                removeEntity({ entity: entity })
            }
        })
        // log will complain about createEntity below but it works, ignore it
        let dummy = event.level.createEntity('kubejs:solar_stone_projectile')
        dummy.setPos(0, -1000, 0)
        dummy.spawn()
        dummy.kill()
    })
})

// --------------------------
// -----[ BLOCK EVENTS ]-----
// --------------------------

// -- Summoning nether bosses for nether eyes --
BlockEvents.rightClicked(event => {
    const { level, block, item } = event
    var mob
    // do not summon if not in nether
    if (level.getDimension() != 'minecraft:the_nether') { return }
    // define mob based on held item and block, otherwise stop
    if (block.id == 'stalwart_dungeons:awful_ghast_altar') {
        if (item.id != 'kubejs:ghast_key') { return }
        mob = block.createEntity('stalwart_dungeons:awful_ghast')
    } else if (block.id == 'stalwart_dungeons:nether_keeper_altar') {
        if (item.id != 'kubejs:keeper_key') { return }
        mob = block.createEntity('stalwart_dungeons:nether_keeper')
    } else { return }
    // spawn, play spawn sound and use item (reduces stack by 1 if not in creative)
    mob.spawn()
    level.playSound(null, event.player.x, event.player.y, event.player.z, 'minecraft:entity.wither.spawn', 'master', 1, 0.5)
    useItem(new global.PlayerItem({ player: event.player, item: item }))
})
// -- Append custom fire charge functionality to existing vanilla --
BlockEvents.rightClicked(event => {
    const { player, item } = event
    if (item.id == 'minecraft:fire_charge') { 
        shootFireball(player, item)
    }
})
// -- Golden egg fortune enchantment while holding --
BlockEvents.broken(event => {
    const { player, block } = event
    // do not drop items in creative
    if (player.isCreative()) { return }
    if (player.isHoldingInAnyHand('kubejs:golden_egg')) {
        // do not do extra drops to blocks that are not ores
        if (!block.id.includes("_ore")) { return }
        let drops = block.getDrops()
        console.log(drops)
        let max = 4 // count could be [0-max), so chance of no extra item
        for (let i = 0; i < drops.length; i++) {
            let extraItemCount = Math.floor(Math.random() * max)
            console.log(extraItemCount)
            // no extra item case
            if (extraItemCount == 0) { return }
            // otherwise get item, add extra count to drop
            let item = drops.get(i)
            item.setCount(item.getCount() + extraItemCount)
            block.popItem(item)
        }
    }
})

// ---------------------------
// -----[ ENTITY EVENTS ]-----
// ---------------------------

// -- Entity hurting player affected based on item in inventory --
EntityEvents.hurt(event => {
    const { entity, source } = event
    // if entity is not a player, return
    if (!entity.player) return
    // check source of damage being another entity
    const attacker = source.actual
    if (!attacker) return
    console.log(attacker)
    if (attacker.id === 'kubejs:green_goo_projectile') {
        attacker.potionEffects.add("minecraft:wither", 20 * 10) // wither for longer time (since directly hit by goo)
        return
    }
    // only continue if melee (doesnt make sense to have ranged enemies get contact damage)
    if (source.isProjectile() || source.isMagic() || source.isExplosion()) return
    // info on inventory object (also available through kubejsoffline command in-game):
    //      https://hunter19823.github.io/kubejsoffline/1.20.1/forge/#net.minecraft.world.entity.player.Inventory?focus=methods-header&methods-expanded=false&methods-page=0&methods-page-size=25
    const inventory = entity.getInventory()
    // create items to look for using ItemStack objects
    const greenGoo = new ItemStack("kubejs:green_goo")
    const solarStone = new ItemStack("kubejs:solar_stone")
    // give wither if green goo
    if (inventory.contains(greenGoo)) {
        attacker.potionEffects.add("minecraft:wither", 20 * 5) // wither for 5 seconds
    }
    // set on fire for 3 seconds if solar stone
    if (inventory.contains(solarStone)) {
        attacker.remainingFireTicks = 20 * 3
    }
})

// ---------------------------
// -----[ PLAYER EVENTS ]-----
// ---------------------------

// -- Effect based on items held --
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

// -------------------------
// -----[ ITEM EVENTS ]-----
// -------------------------

// -- Shoot solar stone projectile --
ItemEvents.rightClicked("kubejs:solar_stone", event => {
    // get player and item
    const { player, item } = event
    // use item with cooldown of 2 seconds
    useItem(new global.PlayerItem({ player: player, item: item, cooldown: 2 }))
    let entity = 'kubejs:solar_stone_projectile'
    // specify projectile, velocity and sound when shot (by default uses ghast shoot)
    const explosion = new global.Explosion({ strength: 5, causesFire: true, explosionMode: 'tnt' })
    const projectile = new global.ProjectileEntity({ entity: entity, velocity: 1.5, sound: 'minecraft:entity.wither.shoot', explosion: explosion })
    summonProjectile({ player: player, projectile: projectile})
})
// -- Shoot fireball projectile --
ItemEvents.rightClicked("minecraft:fire_charge", event => {
    const { player, item } = event
    shootFireball(player, item)
})
// -- Shoot fireball projectile --
ItemEvents.rightClicked("kubejs:green_goo", event => {
    // get player and item
    const { player, item } = event
    // use item with cooldown of 2 seconds
    useItem(new global.PlayerItem({ player: player, item: item }))
    let entity = 'kubejs:green_goo_projectile'
    // specify projectile, velocity and sound when shot (by default uses ghast shoot)
    const projectile = new global.ProjectileEntity({ entity: entity, velocity: 1, sound: 'minecraft:entity.slime.jump', noGravity: false })
    summonProjectile({ player: player, projectile: projectile })
})


// ---------------------------
// -----[ MOREJS EVENTS ]-----
// ---------------------------

MoreJSEvents.villagerTrades((event) => {
    // here is how this method works:
    //      event.addTrade(profession, level, [...input], output);
    // add each trade, then transform into an offer (that may or may not be offered)
    event
        .addTrade(
            "minecraft:mason", 
            3, 
            [
                "blue_skies:zeal_lighter", 
                TradeItem.of("minecraft:emerald", 5, 8)
            ], 
            Item.of("blue_skies:lunar_stonebrick", 8)
        )
        .transform((offer, entity, random) => {
            offer.maxUses = 10
        })
    event
        .addTrade(
            "minecraft:mason", 
            3, 
            [
                "blue_skies:zeal_lighter", 
                TradeItem.of("minecraft:emerald", 5, 8)
            ], 
            Item.of("blue_skies:turquoise_stonebrick", 8)
        )
        .transform((offer, entity, random) => {
            offer.maxUses = 10
        })
})