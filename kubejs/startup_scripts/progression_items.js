
StartupEvents.registry('entity_type', event => {
    event.create('kubejs:solar_stone_projectile', 'entityjs:projectile')
        /**
         * One-Off values set at the startup of the game.
         */
        .sized(0.4, 0.4)
        .renderScale(1, 1, 1)
        .item(item => {
            item.canThrow(true)
        })
        ////Setting .noItem() here will result in the builder skipping the item build altogether
        ////Since the builder registers the item automatically this is the only way to prevent an item from being created here.
        // .noItem()
        ////uncomment if you want it to auto create item (if you havent already)
        /**
         * All methods below return void meaning they don't require a set return value to function.
         * These mostly are similar to KubeJS' normal events where you may do things on certain events your entities call!
         */
        .onHitBlock(context => {
            const { entity, result } = context;
            // construct explosion
            let explosion = entity.block.createExplosion()
            explosion
                .exploder(entity)
                .strength(5)
                .causesFire(true)
                .explosionMode('tnt') // 'none','block','mob','tnt'
                .explode()
            entity.discard()
        })
        .onHitEntity(context => {
            const { entity, result } = context;
            // custom effect upon hitting entity
            if (result.entity.living) {
                result.entity.setSecondsOnFire(10)
            }
            let explosion = entity.block.createExplosion()
            explosion
                .exploder(entity)
                .strength(5)
                .causesFire(true)
                .explosionMode('tnt')
                .explode()
            entity.discard()
            entity.kill()
        })
        .tick(entity => {
            // if in water, kill entity
            if (entity.getLevel().getBlockState(entity.blockPosition()).getBlock().id == "minecraft:water") {
                Utils.server.runCommandSilent(`particle minecraft:angry_villager ${entity.x} ${entity.y} ${entity.z} 0.125 0.125 0.125 1 50 force`)
                entity.getLevel().playSound(null, entity.x, entity.y, entity.z, 'minecraft:block.fire.extinguish', 'players', 1, 1) // scarier
                entity.discard()
            }
        })
})

StartupEvents.registry('item', event => {
    // eye of air items
    event.create('gravitite_gel')
        .displayName('Gravitite Gel')
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
        .displayName('Valkyrean Wing')
        .tooltip('Sharp with fierceness')
        .tier('diamond')
        .attackDamageBaseline(1.0) 
        .speedBaseline(-2.0)
    event.create('solar_stone')
        .displayName('Solar Stone')
        .maxStackSize(16)
        .tooltip('Hot to the touch')
    // for some code below explained, see: 
    //      https://wiki.latvian.dev/books/kubejs-legacy/page/custom-items#bkmrk-custom-foods
    // create generic item, then define to be drinkable
    event.create('whale_wind')
        .displayName('Whale Wind')
        .tooltip('Strong gust that can blow with force')
        .useAnimation('drink')
        .useDuration(itemstack => 30)
        .use((level, player, hand) => true)
        .finishUsing((itemstack, level, entity) => {
            let effects = entity.potionEffects
            effects.add('minecraft:levitation', 20, 100)
            effects.add('kubejs:falling_immunity', 20 * 20 )
            itemstack.shrink(1) // reduce item
            return itemstack
        })
    // eye of bones items
    event.create('green_goo')
        .displayName('Green Goo')
        .maxStackSize(16)
        .tooltip('Hurts to hold')
    event.create('stiff_skin')
        .displayName('Stiff Skin')
        .maxStackSize(16)
        .tooltip('Hardened almost to stone')
    event.create('golden_egg')
        .displayName('Golden Egg')
        .maxStackSize(16)
        .tooltip('Holds potential for life and riches')
    // eye of magma and soul items 
    // (not used to craft it, but to summon stalwart dungeon bosses that drop it)
    event.create('ghast_key')
        .displayName('Ghast Key')
        .maxStackSize(16)
        .tooltip('Unlocks the cage of a ghastly guardian')
    event.create('keeper_key')
        .displayName('Keeper Key')
        .maxStackSize(16)
        .tooltip('Unlocks the cage of a cunning keeper')
})

