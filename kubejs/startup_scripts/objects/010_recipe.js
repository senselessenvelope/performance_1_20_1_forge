// construct and Recipe instance
global.Recipe = function(params) {
    // requires item id, and defaults to not be a tool or be damaged in recipe, but can also be specified
    if (!params || !params.hasOwnProperty('output') || !params.hasOwnProperty('shape') || !params.hasOwnProperty('items')) {
        throw new Error("Recipe requires 'output', 'shape' and 'items' properties")
    }

    // explicitly set data dictionary for properties
    this.data = global.objectUtils.addObjectData(params)


    // NO NEED FOR THE BELOW, if is a tool will be damaged, otherwise will be consumed
    // for container items, i can return them AFTER the shape, e.g. 
        // event.shaped('minecraft:diamond', [
        //     ' B ',
        //     ' S ',
        //     '   '
        //     ], {
        //     B: 'minecraft:water_bucket',
        //     S: 'minecraft:stick'
        //     }).returnContainer('B')
    // BUT NEED TO TEST OUT IF CORRECT (MAY NOT WORK)
    
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
global.Recipe.prototype.getData = function() { return this.data }
global.Recipe.prototype.getId = function() { return this.data.id }
global.Recipe.prototype.getIsTool = function() { return this.data.isTool }
global.Recipe.prototype.getIsDamaged = function() { return this.data.isDamaged }


