// construct and ProjectileEntity instance
global.objects.entity.projectile.ProjectileEntity = function(params) {
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

// getters for properties of data dictionary
global.objects.entity.projectile.ProjectileEntity.prototype.getData = function() { return this.data }
global.objects.entity.projectile.ProjectileEntity.prototype.getEntity = function() { return this.data.entity }
global.objects.entity.projectile.ProjectileEntity.prototype.getVelocity = function() { return this.data.velocity }
global.objects.entity.projectile.ProjectileEntity.prototype.getSound = function() { return this.data.sound }
global.objects.entity.projectile.ProjectileEntity.prototype.getNoGravity = function() { return this.data.noGravity }
global.objects.entity.projectile.ProjectileEntity.prototype.getTexture = function() { return this.data.texture }
global.objects.entity.projectile.ProjectileEntity.prototype.getItem = function() { return this.data.item }
global.objects.entity.projectile.ProjectileEntity.prototype.getCustomFunction = function() { return this.data.customFunction }
global.objects.entity.projectile.ProjectileEntity.prototype.getExplosion = function() { return this.data.explosion }


