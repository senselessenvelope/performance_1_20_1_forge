// entity registry for getting all valid entities in the game
const entityRegistry = Utils.getRegistry('entity_type')
const EntityType = Java.loadClass('net.minecraft.world.entity.EntityType')

// construct and EntityItemDrop instance
global.EntityItemDrop = function(params) {
    // requires event, but does not specifically require entity and item for construction (though should be passed in to avoid errors)
    if (!params || !params.hasOwnProperty('event')) {
        throw new Error("EntityItemDrop requires 'event' property")
    }
    this.data = params
    // throw error if you try to add an invalid entity (does not exist in-game, this prevents it defaulting to add item drop to minecraft:pig)
    if (this.data.entity && !this.validateEntity(this.data.entity)) {
        throw new Error(`[Loot] Invalid or non-existing entity used in constructor: ${this.data.entity}`)
    }
}

// getters for properties of data dictionary
global.EntityItemDrop.prototype.getData = function() { return this.data }
global.EntityItemDrop.prototype.getEvent = function() { return this.data.event }
global.EntityItemDrop.prototype.getEntity = function() { return this.data.entity }
global.EntityItemDrop.prototype.getItem = function() { return this.data.item }

// update same event with new entity and item
global.EntityItemDrop.prototype.validateEntity = function(entity) {
    // // need to figure this out, right now this commented code causes an error that results in consecutive valid entities being ignored
    // try {
    //     // Attempt to get the entity type from the registry
    //     const entityType = EntityType.byString(entity)
    //     return entityType !== null
    // } catch (e) {
    //     // If an error occurs (e.g., class not found), return false
    //     return false;
    // }
    return true
}

// update same event with new entity and item
global.EntityItemDrop.prototype.update = function(entity, item) {
    if (this.validateEntity(entity)) {
        this.data.entity = entity
        this.data.item = item
    }
}
