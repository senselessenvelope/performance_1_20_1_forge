// construct and ProjectileEntity instance
global.ProjectileEntity = function(params) {
    // requires projectile entity and velocity of projectile
    if (!params || !params.hasOwnProperty('entity')) {
        throw new Error("ProjectileEntity requires projectile 'entity' property")
    }
    this.data = params

    // set default params if not existing
    this.data.velocity = this.data.velocity ?? 0
    this.data.sound = this.data.sound ?? 'minecraft:entity.ghast.shoot'
    this.data.noGravity = this.data.noGravity ?? true
    this.data.texture = this.data.texture ?? 'kubejs:textures/item/example_item.png'
    this.data.item = this.data.item ?? 'minecraft:air'
}

// getters for properties of data dictionary
global.ProjectileEntity.prototype.getData = function() { return this.data }
global.ProjectileEntity.prototype.getEntity = function() { return this.data.entity }
global.ProjectileEntity.prototype.getVelocity = function() { return this.data.velocity }
global.ProjectileEntity.prototype.getSound = function() { return this.data.sound }
global.ProjectileEntity.prototype.getNoGravity = function() { return this.data.noGravity }
global.ProjectileEntity.prototype.getTexture = function() { return this.data.texture }
global.ProjectileEntity.prototype.getItem = function() { return this.data.item }
global.ProjectileEntity.prototype.getEntityInteractionFunction = function() { return this.data.entityInteractionFunction }
global.ProjectileEntity.prototype.getExplosion = function() { return this.data.explosion }


