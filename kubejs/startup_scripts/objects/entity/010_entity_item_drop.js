
// construct and EntityItemDrop instance
// NOTE: if entity does not exist it defaults entity to minecraft:pig within KubeJS events, so be aware of that
global.objects.entity.EntityItemDrop = function(params) {
    // requires event, but does not specifically require entity and item for construction (though should be passed in to avoid errors)
    if (!params || !params.hasOwnProperty('event')) {
        throw new Error("EntityItemDrop requires 'event' property")
    }
    // add rest of properties
    this.data = global.objectUtils.addObjectData(params)
}


// getters for properties of data dictionary
global.objects.entity.EntityItemDrop.prototype.getData = function() { return this.data }
global.objects.entity.EntityItemDrop.prototype.getEvent = function() { return this.data.event }
global.objects.entity.EntityItemDrop.prototype.getEntity = function() { return this.data.entity }
global.objects.entity.EntityItemDrop.prototype.getItem = function() { return this.data.item }


// update same event with new entity and item
global.objects.entity.EntityItemDrop.prototype.update = function(entity, item) {
    this.data.entity = entity
    this.data.item = item
}
