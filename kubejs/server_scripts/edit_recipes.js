


// partially destructured global enum eyes (shorter reference)
const {
    EYE_OF_SHULKER,
    EYE_OF_CHORUS
} = global.legendaryMonstersEyes


// Listen for the "recipes" server event.
ServerEvents.recipes(event => {
    
    // exclude eyes array for end painting recipe further on
    var excluded_eyes = [EYE_OF_SHULKER, EYE_OF_CHORUS];


    // remove crafting recipes for eyes, will be boss drops instead locked behind dimensions:
    // overworld    - moss (possibly from blueskies NPC where if a villager underground is interacted with will give you book explaining 
    //                      how to get to other dimensions, villager will turn into blueskies NPC, OR can make custom NPC in mushroom 
    //                      underground biome, or something like that)
    // aether       - air
    // nether       - magma/soul
    // twilight     - bones
    // dark         - many_ribs
    // undergarden  - ghost
    // everbright   - frost
    // everdawn     - sandstorm
    Object.values(global.legendaryMonstersEyes).forEach(value => {
        event.remove({ output: value })
    });
    // remove all recipes with specified outputs
    event.remove([{ output: 'tntplusmod:supernova_tnt' }, { output: 'dimpaintings:overworld_painting' }, 
        { output: 'dimpaintings:nether_painting' }, { output: 'dimpaintings:end_painting' }])
    // end painting recipe excludes specified eyes in above array
    event.shapeless(
        Item.of('dimpaintings:end_painting', 1), // output should be end painting
        // returns array of values excluding those specified above, slicing so we dont exceed crafting grid limit of 9
        Object.values(global.legendaryMonstersEyes)
            .filter(value => !excluded_eyes.includes(value))
            .slice(0,9)
    )
    // nether painting
    event.shaped('dimpaintings:nether_painting', [
            'XYX',
            'YZY',
            'XYX'
        ],
        {
            X: "#forge:obsidian",
            Y: "#forge:ores/gold",
            Z: "minecraft:lava_bucket",
        }
    )
    // overworld painting
    event.shaped('dimpaintings:overworld_painting', [
            'XYX',
            'YZY',
            'XYX'
        ],
        {
            X: "#forge:stone",
            Y: "#minecraft:dirt",
            Z: "minecraft:water_bucket",
        }
    )


    
    // event.addRecipe()
    
})

    







