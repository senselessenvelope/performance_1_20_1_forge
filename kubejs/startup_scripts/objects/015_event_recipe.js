// construct an EventRecipe instance
global.EventRecipe = function(params) {
    // requires event and the recipe to add to event
    if (!params || !params.hasOwnProperty('event') || !params.hasOwnProperty('recipe')) {
        throw new Error("EventRecipe requires 'event' and 'recipe' properties")
    }

    // explicitly set data dictionary for properties
    this.data = global.objectUtils.addObjectData(params)
}

// getters for properties of data dictionary
global.EventRecipe.prototype.getData = function() { return this.data }
global.EventRecipe.prototype.getEvent = function() { return this.data.event }
global.EventRecipe.prototype.getEventRecipe = function() { return this.data.recipe }
