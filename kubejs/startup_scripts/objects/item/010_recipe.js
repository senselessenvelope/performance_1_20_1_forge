// shortening reference to module
const ItemModule = global.objects.item

// construct a Recipe instance
ItemModule.Recipe = function(params) {
    // requires output, recipe items, and, 
    if (!params || 
        !params.hasOwnProperty('output') || 
        !params.hasOwnProperty('items') || 
        // case 1: shape missing, items must be array (since cannot map key-value for shapeless recipe)
        (!params.hasOwnProperty('shape') && !Array.isArray(params.items)) ||
        // case 2: shape exists, items must NOT be array (since cannot map array to shaped recipe)
        (params.hasOwnProperty('shape') && Array.isArray(params.items))
    ) 
    {
        throw new Error("Recipe requires 'output', 'shape' and 'items' properties")
    }

    // explicitly set data dictionary for properties
    this.data = global.objectUtils.addObjectData(params)
    
    // default values such as item damage (if is a tool used in recipe)
    this.data.damage = params.damage ?? global.constants.DEFAULT_DAMAGE
}

// shortening access to prototype function
const RecipeClass = ItemModule.Recipe.prototype

// getters for properties of data dictionary
RecipeClass.getData = function() { return this.data }
RecipeClass.getOutput = function() { return this.data.output }
RecipeClass.getShape = function() { return this.data.shape }
RecipeClass.getItems = function() { return this.data.items }
RecipeClass.getDamage = function() { return this.data.damage }

RecipeClass.setItems = function(newItems) { this.data.items = newItems }

RecipeClass.getItemsAsList = function() {
    let items = this.getItems()
    var result = []
    if (Array.isArray(items)) {
        // items is an array (list)
        items.forEach(item => {
            // only looking after space
            let gapIndex = item.indexOf(' ')
            if (gapIndex !== -1) { item = item.substring(gapIndex + 1) }
            result.push(item)
        })
    } 
    // otherwise could be dictionary
    else if (items && typeof items === "object") {
        // items is an object
        for (const item in items) {
            // looking for values
            result.push(items[item])
        }
    } 
    // if forgot to specify both
    else {
        console.warn("Recipe items field is neither an array nor an object!")
    }
    // array containing just a list of items
    return result
}
