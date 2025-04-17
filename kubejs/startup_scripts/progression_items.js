// referencing utility functions defined at startup
const { explodeEntity, removeEntity, createProjectile, verifyProjectile } = global.entityUtils;
// -- Create custom projectiles  --
StartupEvents.registry('entity_type', event => {
    // creating solar stone projectile
    let entity = 'kubejs:solar_stone_projectile'
    let explosion = { strength: 5, causesFire: true, explosionMode: 'tnt' }
    let projectile = { item: 'kubejs:solar_stone', entity: entity, texture: 'kubejs:textures/item/solar_stone.png' }
    createProjectile({event: event, projectile: projectile, explosion: explosion})
    // creating fireball projectile
    entity = 'kubejs:fireball'
    explosion = { strength: 2, causesFire: true }
    projectile = { item: 'minecraft:fire_charge', entity: entity, texture: 'minecraft:textures/item/fire_charge.png' }
    createProjectile({event: event, projectile: projectile, explosion: explosion})
    
})
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
                .effect('minecraft:speed', 20 * 60, 2, 1)
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
        .maxStackSize(8)
        .tooltip('Hot to the touch')
    // for some code below explained, see: 
    //      https://wiki.latvian.dev/books/kubejs-legacy/page/custom-items#bkmrk-custom-foods
    // create generic item, then define to be drinkable
    event.create('whale_wind')
        .displayName('§bWhale Wind')
        .tooltip('Strong gust that can blow with force')
        .useAnimation('drink')
        .useDuration(itemstack => 30)
        .maxStackSize(8)
        .use((level, player, hand) => true)
        .finishUsing((itemstack, level, entity) => {
            let effects = entity.potionEffects
            effects.add('minecraft:levitation', 20, 100)
            effects.add('kubejs:falling_immunity', 20 * 20 )
            if (entity.isPlayer() && !entity.isCreative()) {
                itemstack.shrink(1) // reduce item
                entity.give("minecraft:glass_bottle")
            }
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
    event.create('golden_egg')
        .displayName('§aGolden Egg')
        .maxStackSize(1)
        .tooltip('Holds potential for life and riches')
    // eye of magma and soul items 
    // (not used to craft it, but to summon stalwart dungeon bosses that drop it)
    event.create('ghast_key')
        .displayName('§4Ghast Key')
        .maxStackSize(16)
        .tooltip('Unlocks the cage of a ghastly guardian')
    event.create('keeper_key')
        .displayName('§4Keeper Key')
        .maxStackSize(16)
        .tooltip('Unlocks the cage of a cunning keeper')
})

