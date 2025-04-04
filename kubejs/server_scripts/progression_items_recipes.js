
let blazePowder = 'minecraft:blaze_powder'

// Listen for the recipes server event.
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

    







