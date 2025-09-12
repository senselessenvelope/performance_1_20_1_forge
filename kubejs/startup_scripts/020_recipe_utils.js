let ItemStack = Java.loadClass('net.minecraft.world.item.ItemStack')


// global utility functions for recipes
global.recipeUtils = {
    // container replacer, will replace given container with empty variant (will have bugs with other mods since uses substring matching, not strict)
    // expects Event, String objects (first one is KubeJS event, second is the Java String)
    // if no matching container found, returns nothing
    emptyContainer: function(event, item) {
        // various cases for various containers
        
        // WORKS BUT FOR SOME REASON DOESNT WHEN STRING SUBSTITUTED, MAYBE UNDERLYING TYPE??? WTF?!
        let sampleStr = "minecraft:water_bucket"
        console.log(`${sampleStr}: ${typeof(sampleStr)}`)
        console.log(`${item}: ${typeof(item)}`)
        console.warn(`${sampleStr} === ${item} = ${sampleStr === item}`)
        event.replaceIngredient(sampleStr, "minecraft:bucket")
        
        // // console.warn(`${itemId}`)
        // if (item.includes("bucket")) {
        //     console.warn(`FOUND ITEM`)
        //     event.replaceIngredient("minecraft:water_bucket", "minecraft:bucket")
        //     // event.replaceIngredient(item, "minecraft:bucket")
        //     // return
        // }
    },
    // consume items in recipes or, if they are tools, damage them, if they are containers (like a water bucket) return empty container (bucket)
    damageTool: function(event, items) {
        // for each item that was in recipe
        for (const item of items) {
            // convert to ItemStack Java object (to check if is tool)
            let itemStack = new ItemStack(item)
            if (itemStack.maxDamage > 0) {
                // damage desired damage specified in recipe (in Recipe class constructor if not specified defaults to global constant)
                event.damageIngredient(item, 1)
            }
        }
    },
    createRecipe: function(params) {
        const {
            event,
            recipe
        } = params
        var addedRecipe
        // shaped or shapeless cases
        if (recipe.getShape()) {
            addedRecipe = event.shaped(
                recipe.getOutput(),
                recipe.getShape(),
                recipe.getItems()
            )
        } else {
            addedRecipe = event.shapeless(
                recipe.getOutput(),
                recipe.getItems()
            )
        }
        // function to damage tool (containers are updated automatically it seems)
        global.recipeUtils.damageTool(addedRecipe, recipe.getItemsAsList())

    }

}