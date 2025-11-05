// shortening reference to module
const ProjectileModule = global.objects.entity.projectile

// construct and ProjectileEntity instance
ProjectileModule.ProjectileEntity = function(params) {
    // requires projectile entity and velocity of projectile
    if (!params || !params.hasOwnProperty('entity')) {
        throw new Error("ProjectileEntity requires projectile 'entity' property")
    }
    this.data = global.objectUtils.addObjectData(params)

    // set default params if not existing
    this.data.velocity = this.data.velocity ?? 0
    this.data.sound = this.data.sound ?? 'minecraft:entity.ghast.shoot'
    this.data.noGravity = this.data.noGravity ?? true
    this.data.texture = this.data.texture ?? 'kubejs:textures/item/example_item.png'
    this.data.item = this.data.item ?? 'minecraft:air'
}

// shortening access to prototype function
const ProjectileEntityClass = ProjectileModule.ProjectileEntity.prototype

// getters for properties of data dictionary
ProjectileEntityClass.getData = function() { return this.data }
ProjectileEntityClass.getEntity = function() { return this.data.entity }
ProjectileEntityClass.getVelocity = function() { return this.data.velocity }
ProjectileEntityClass.getSound = function() { return this.data.sound }
ProjectileEntityClass.getNoGravity = function() { return this.data.noGravity }
ProjectileEntityClass.getTexture = function() { return this.data.texture }
ProjectileEntityClass.getItem = function() { return this.data.item }
ProjectileEntityClass.getCustomFunction = function() { return this.data.customFunction }
ProjectileEntityClass.getExplosion = function() { return this.data.explosion }


