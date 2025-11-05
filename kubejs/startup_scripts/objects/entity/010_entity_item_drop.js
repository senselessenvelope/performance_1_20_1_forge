// shortening reference to module
const EntityModule = global.objects.entity

// construct and EntityItemDrop instance
// NOTE: if entity does not exist it defaults entity to minecraft:pig within KubeJS events, so be aware of that
EntityModule.EntityItemDrop = function(params) {
    // requires event, but does not specifically require entity and item for construction (though should be passed in to avoid errors)
    if (!params || !params.hasOwnProperty('event')) {
        throw new Error("EntityItemDrop requires 'event' property")
    }
    // add rest of properties
    this.data = global.objectUtils.addObjectData(params)
}

// shortening access to prototype function
const EntityItemDropClass = EntityModule.EntityItemDrop.prototype

// getters for properties of data dictionary
EntityItemDropClass.getData = function() { return this.data }
EntityItemDropClass.getEvent = function() { return this.data.event }
EntityItemDropClass.getEntity = function() { return this.data.entity }
EntityItemDropClass.getItem = function() { return this.data.item }


// update same event with new entity and item
EntityItemDropClass.update = function(entity, item) {
    this.data.entity = entity
    this.data.item = item
}
