// entityItem.js

// construct and EntityItem instance
global.EntityItem = function(params) {
    // requires event, but does not specifically require entity and item for construction (though should be passed in to avoid errors)
    if (!params || !params.hasOwnProperty('event')) {
        throw new Error("EntityItem requires 'event' property")
    }
    this.data = params
}

// getters for properties of data dictionary
global.EntityItem.prototype.getData = function() { return this.data }
global.EntityItem.prototype.getEvent = function() { return this.data.event }
global.EntityItem.prototype.getEntity = function() { return this.data.entity }
global.EntityItem.prototype.getItem = function() { return this.data.item }

// update same event with new entity and item
global.EntityItem.prototype.update = function(entity, item) {
    this.data.entity = entity
    this.data.item = item
}
