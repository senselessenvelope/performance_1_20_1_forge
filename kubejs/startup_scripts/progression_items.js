// ---------------------
// -----[ IMPORTS ]-----
// ---------------------

// referencing utility functions defined at startup
const { explodeEntity, removeEntity, createProjectile, verifyProjectile } = global.entityUtils
const { entityHit, setsOnFire } = global.projectileInteractions
const { useItem, usePotion, createPotion } = global.itemUtils
const Explosion = global.objects.entity.Explosion
const CustomFunction = global.objects.meta.CustomFunction
const ProjectileEntity = global.objects.entity.projectile.ProjectileEntity
const Potion = global.objects.item.Potion
const PlayerItem = global.objects.player.PlayerItem


// --------------------------------------
// -----[ CREATING PROJECTILE DATA ]-----
// --------------------------------------

// -- Create custom projectiles  --
StartupEvents.registry('entity_type', event => {
    // creating solar stone projectile
    let entity = 'kubejs:solar_stone_projectile'
    let explosion = new Explosion({ 
        strength: 5, 
        causesFire: true, 
        explosionMode: 'tnt' 
    })
    let projectile = new ProjectileEntity({ 
        item: 'kubejs:solar_stone', 
        entity: entity, 
        texture: 'kubejs:textures/item/solar_stone.png', 
        customFunction: new CustomFunction({ 
            func: global.projectileInteractions.setOnFire, 
            args: { 
                time: 10 
            } 
        }),
        explosion: explosion
    })
    createProjectile({event: event, projectile: projectile})
    // creating fireball projectile
    entity = 'kubejs:fireball'
    explosion = new Explosion({ 
        strength: 2, 
        causesFire: true 
    })
    projectile = new ProjectileEntity({ 
        item: 'minecraft:fire_charge', 
        entity: entity, 
        texture: 'minecraft:textures/item/fire_charge.png', 
        customFunction: new CustomFunction({ 
            func: global.projectileInteractions.setOnFire, 
            args: { 
                time: 10 
            } 
        }),
        explosion: explosion
    })
    createProjectile({event: event, projectile: projectile})
    // creating green goo projectile
    entity = 'kubejs:green_goo_projectile'
    projectile = new ProjectileEntity({ 
        item: 'kubejs:green_goo', 
        entity: entity, 
        texture: 'kubejs:textures/item/green_goo.png', 
        customFunction: new CustomFunction({ 
            func: global.projectileInteractions.setOnWither, 
            args: { 
                time: 10 
            } 
        }),
    })
    createProjectile({event: event, projectile: projectile})
})

// ----------------------------
// -----[ CREATING ITEMS ]-----
// ----------------------------

// -- Create custom items --
StartupEvents.registry('item', event => {
    // eye of air items
    event.create('gravitite_gel')
        .displayName('§1Gravitite Gel')
        .maxStackSize(16)
        .tooltip('Feels very light')
        .food(food => {
            food
                .hunger(1)
                .saturation(1) // real value: min(hunger * saturation * 2 + saturation, foodAmountAfterEating)
                .effect('minecraft:jump_boost', 20 * 60, 2, 1)
                .effect('minecraft:speed', 20 * 60, 1, 1)
                .alwaysEdible()
        })
    // may need tweaks for balancing
    event.create('valkyrean_wing', 'sword')
        .displayName('§cValkyrean Wing')
        .tooltip('Sharp with fierceness')
        .tier('iron')
        .attackDamageBaseline(1.0) 
        .speedBaseline(-2.0)
    event.create('solar_stone')
        .displayName('§6Solar Stone')
        .tooltip('Hot to the touch')
        .burnTime(40000) // can smelt 200 items
        .maxStackSize(8)
    // for some code below explained, see: 
    //      https://wiki.latvian.dev/books/kubejs-legacy/page/custom-items#bkmrk-custom-foods
    // create generic item, then define to be drinkable
    event.create('whale_wind')
        .displayName('§bWhale Wind')
        .tooltip('Strong gust that can blow with force')
        .useAnimation('drink')
        .useDuration(itemstack => 10)
        .maxStackSize(8)
        .use((level, player, hand) => true)
        .finishUsing((itemstack, level, entity) => {
            let effects = entity.potionEffects
            effects.add('minecraft:levitation', 20, 100)
            effects.add('kubejs:falling_immunity', 20 * 20)
            // use potion (also adds glass bottle to inventory if not in creative)
            usePotion(new PlayerItem({ player: entity, item: itemstack }))
            return itemstack
        })
    // eye of bones items
    event.create('green_goo')
        .displayName('§2Green Goo')
        .maxStackSize(16)
        .tooltip('Hurts to hold')
    event.create('stiff_skin')
        .displayName('§3Stiff Skin')
        .maxStackSize(16)
        .tooltip('Hardened for defense')
        .food(food => {
            food
                .hunger(1)
                .saturation(1)
                .effect('minecraft:resistance', 20 * 60, 0, 1)
                .effect('minecraft:absorption', 20 * 60, 0, 1)
                .alwaysEdible()
                .meat()
        })
    event.create('golden_egg')
        .displayName('§aGolden Egg')
        .maxStackSize(1)
        .tooltip('Holds potential for life and riches')
        .useDuration(itemstack => 100) // make it slow because its literally a golden egg
        .food(food => {
            food
                .hunger(1)
                .saturation(1)
                .effect('minecraft:regeneration', 20 * 60, 10, 1)
                .alwaysEdible()
        })
    // eye of magma and soul items 
    // (not used to craft it, but to summon stalwart dungeon bosses that drop it)
    event.create('ghast_key')
        .displayName('§4Ghast Key')
        .maxStackSize(1)
        .tooltip('Unlocks the cage of a ghastly guardian')
    event.create('keeper_key')
        .displayName('§4Keeper Key')
        .maxStackSize(1)
        .tooltip('Unlocks the cage of a cunning keeper')
})

// ----------------------------------
// -----[ CREATING POTION DATA ]-----
// ----------------------------------

StartupEvents.registry('potion', event => {
    event.create('potion_of_hardiness')
        .effect('minecraft:resistance', 20 * 180, 2)
        .effect('minecraft:absorption', 20 * 180, 4)
    event.create('potion_of_floatiness')
        .effect('minecraft:speed', 20 * 180, 2)
        .effect('minecraft:jump_boost', 20 * 180, 4)
    event.create('potion_of_angriness')
        .effect('minecraft:strength', 20 * 180, 1)
        .effect('minecraft:haste', 20 * 180, 3)
    event.create('potion_of_deadliness')
        .effect('minecraft:instant_damage', 1, 1)
        .effect('minecraft:wither', 20 * 30, 2)
})

// -------------------------------------
// -----[ CREATING POTION RECIPES ]-----
// -------------------------------------

MoreJSEvents.registerPotionBrewing((event) => {
    createPotion(new Potion({ event: event, input: "kubejs:stiff_skin", output: "kubejs:potion_of_hardiness" }))
    createPotion(new Potion({ event: event, input: "kubejs:gravitite_gel", output: "kubejs:potion_of_floatiness" }))
    createPotion(new Potion({ event: event, input: "kubejs:valkyrean_wing", output: "kubejs:potion_of_angriness" }))
    createPotion(new Potion({ event: event, input: "kubejs:green_goo", output: "kubejs:potion_of_deadliness" }))
})
