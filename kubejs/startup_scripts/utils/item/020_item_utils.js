
// --------------------------
// -----[ ITEM UTILITY ]-----
// --------------------------

// global item utility functions will use in parts of program
global.utils.item.itemUtils = {
    // pass in player, item used and the cooldown (if no cooldown passed in assumed there is not one)
    useItem: function(params) {
        // parameters that can be passed in, item and its cooldown (in seconds)
        const {
            player,
            item,
            cooldown
        } = params.data
        // item cooldown
        player.addItemCooldown(item, 20 * cooldown)
        // do not reduce stack size if in creative
        if (!player.isCreative()) { item.shrink(1) }
    },
    // pass in event, input ingredient and output potion through a Potion object
    createPotion: function(params) {
        const {
            event,
            input,
            output
        } = params.data
        /*
         * 1: top ingredient of brewing stand
         * 2: bottom ingredient of brewing stand
         * 3: result potion
         */
        event.addCustomBrewing(
            input,
            Ingredient.customNBT("minecraft:potion", (nbt) => {
                // does not work with anything other than minecraft:water as NBT tag, maybe not initialised yet at this point?
                return nbt.contains("Potion") && nbt.Potion == "minecraft:water"
            }),
            Item.of("minecraft:potion", { Potion: output })
        )
    },
    // pass in player, item used and the cooldown (if no cooldown passed in assumed there is not one)
    usePotion: function(params) {
        // general item use function
        global.utils.item.itemUtils.useItem(params)
        // parameters that can be passed in, item and its cooldown (in seconds)
        const {
            player
        } = params.data
        // for potions give back glass bottle if not in creative
        if (!player.isCreative()) { player.give("minecraft:glass_bottle") }
    },
    checkerBoardRecipeWithCenterItem: function(params) {
        const {
            event,
            recipe
        } = params
        const output = recipe.output
        const itemOne = recipe.itemOne
        const itemTwo = recipe.itemTwo
        const centerItem = recipe.centerItem
        // if unspecified, assume center item is not a tool, and is used up in recipe
        const centerItemIsTool = recipe.centerItemIsTool !== undefined ? recipe.centerItemIsTool : false
        // if item should be damaged (for example, a bucket is considered a tool in this context but cannot be damaged, a pickaxe however can be damaged)
        const centerItemIsDamaged = recipe.centerItemIsDamaged !== undefined ? recipe.centerItemIsDamaged : false
        let craftedItem = event.shaped(
                output, 
                [
                    'XYX',
                    'YZY',
                    'XYX'
                ], 
                {
                    X: itemOne,
                    Y: itemTwo,
                    Z: centerItem
                }
            )
        // if item is to be damaged, damage by 1, otherwise do 0 damage (will only be damaged if is a tool)
        const damage = centerItemIsDamaged ? 1 : 0
        // if is a tool, will damage the center item (which can be changed to be a tool)
        if (centerItemIsTool) craftedItem.damageIngredient(centerItem, damage)
    }
}
