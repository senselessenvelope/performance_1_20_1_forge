// construct and Explosion instance
global.Explosion = function(params) {
    // // requires projectile entity and velocity of projectile
    // if (!params || !params.hasOwnProperty('entity')) {
    //     throw new Error("Explosion requires 'entity' property")
    // }
    this.data = params

    // set default params if not existing
    this.data.strength = this.data.strength ?? 2
    this.data.causesFire = this.data.causesFire ?? false
    this.data.explosionMode = this.data.explosionMode ?? 'mob'
}

// getters for properties of data dictionary
global.Explosion.prototype.getData = function() { return this.data }
global.Explosion.prototype.getEntity = function() { return this.data.entity }
global.Explosion.prototype.getStrength = function() { return this.data.strength }
global.Explosion.prototype.getCausesFire = function() { return this.data.causesFire }
global.Explosion.prototype.getExplosionMode = function() { return this.data.explosionMode }


