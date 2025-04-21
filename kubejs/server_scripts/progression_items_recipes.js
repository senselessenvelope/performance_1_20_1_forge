// ------------------------------
// -----[ RECIPE CONSTANTS ]-----
// ------------------------------

// common items for some recipes
const blazePowder = 'minecraft:blaze_powder'
// reference enum with eye data
const EYE_OF_MAGMA = global.legendaryMonstersEyes.EYE_OF_MAGMA
const EYE_OF_SOUL = global.legendaryMonstersEyes.EYE_OF_SOUL
const EYE_OF_BONES = global.legendaryMonstersEyes.EYE_OF_BONES
const EYE_OF_AIR = global.legendaryMonstersEyes.EYE_OF_AIR

// ---------------------------------
// -----[ PROGRESSION RECIPES ]-----
// ---------------------------------

// recipes for all the eyes (that need to be crafted)
ServerEvents.recipes(event => {
    event.shaped(EYE_OF_MAGMA, [
            'XYX',
            'YZY',
            'XYX'
        ],
        {
            X: blazePowder,
            Y: 'minecraft:nether_bricks',
            Z: 'minecraft:nether_wart',
        }
    )
    event.shaped(EYE_OF_SOUL, [
            'XYX',
            'YZY',
            'XYX'
        ],
        {
            X: blazePowder,
            Y: 'minecraft:soul_sand',
            Z: 'minecraft:ghast_tear',
        }
    )
    event.shapeless(EYE_OF_AIR, [
            'kubejs:gravitite_gel',
            'kubejs:valkyrean_wing',
            'kubejs:solar_stone',
            'kubejs:whale_wind'
        ]
    )   
    event.shapeless(EYE_OF_BONES, [
            'kubejs:green_goo',
            'kubejs:stiff_skin',
            'kubejs:golden_egg'
        ]
    )
})

    







