
// construct and EntityItemDrop instance
// NOTE: if entity does not exist it defaults entity to minecraft:pig within KubeJS events, so be aware of that
global.EntityItemDrop = function(params) {
    // requires event, but does not specifically require entity and item for construction (though should be passed in to avoid errors)
    if (!params || !params.hasOwnProperty('event')) {
        throw new Error("EntityItemDrop requires 'event' property")
    }
    this.data = params
}


// getters for properties of data dictionary
global.EntityItemDrop.prototype.getData = function() { return this.data }
global.EntityItemDrop.prototype.getEvent = function() { return this.data.event }
global.EntityItemDrop.prototype.getEntity = function() { return this.data.entity }
global.EntityItemDrop.prototype.getItem = function() { return this.data.item }


// update same event with new entity and item
global.EntityItemDrop.prototype.update = function(entity, item) {
    this.data.entity = entity
    this.data.item = item
}
