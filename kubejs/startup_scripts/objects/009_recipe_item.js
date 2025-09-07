// construct and RecipeItem instance
global.RecipeItem = function(params) {
    // requires item id, and defaults to not be a tool or be damaged in recipe, but can also be specified
    if (!params || !params.hasOwnProperty('id')) {
        throw new Error("RecipeItem requires 'id' property")
    }

    // explicitly set data dictionary for properties
    this.data = global.objectUtils.addObjectData(params)
    
    // -- Default Values --
    // if item is a tool, for example a pickaxe or bucket
    this.data.isTool = params.isTool ?? false
    // item HAS to be a tool to be damaged, basically:
    //      condition ? valueIfTrue : valueIfFalse
    // if condition true     -->     valueIfTrue
    // if condition false    -->     valueIfFalse
    this.data.isDamaged = params.isTool ? (params.isDamaged ?? false) : false
}

// getters for properties of data dictionary
global.RecipeItem.prototype.getData = function() { return this.data }
global.RecipeItem.prototype.getId = function() { return this.data.id }
global.RecipeItem.prototype.getIsTool = function() { return this.data.isTool }
global.RecipeItem.prototype.getIsDamaged = function() { return this.data.isDamaged }


