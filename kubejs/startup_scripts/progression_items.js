StartupEvents.registry('item', event => {
    // eye of air items
    event.create('gravitite_gel')
        .displayName('Gravitite Gel')
        .maxStackSize(16)
        .tooltip('Feels very light')
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
    // CRASHES THE GAME -- MAYBE ADD AS FOOD AN MAKE IT LIKE A DRINK
    event.create('whale_wind', 'basic')
        .tooltip("Strong gust that can blow with force")
        .useAnimation("drink")
        .useDuration((itemstack) => 64)
        .use((level, player, hand) => true)
        .finishUsing((itemstack, level, entity) => {
            let effects = entity.potionEffects;
            effects.add("minecraft:levitation", 1)
            itemstack.itemStack.shrink(1)
            if (entity.player) {
                entity.minecraftPlayer.addItem(Item.of("minecraft:glass_bottle").itemStack)
            }
            return itemstack;
        })
        .releaseUsing((itemstack) => {
            itemstack.itemStack.shrink(1)
        })
    // event.create('whale_wind')
    //     .displayName('Whale Wind')
    //     .maxStackSize(16)
    //     .tooltip('Strong gust that never stops blowing')
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

