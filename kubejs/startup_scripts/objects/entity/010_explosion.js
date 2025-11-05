// shortening reference to module
const ExplosionModule = global.objects.entity

// construct and Explosion instance
ExplosionModule.Explosion = function(params) {
    this.data = global.objectUtils.addObjectData(params)

    // set default params if not existing
    this.data.strength = this.data.strength ?? 2
    this.data.causesFire = this.data.causesFire ?? false
    this.data.explosionMode = this.data.explosionMode ?? 'mob'
}

// shortening access to prototype function
const ExplosionClass = ExplosionModule.Explosion.prototype

// getters for properties of data dictionary
ExplosionClass.getData = function() { return this.data }
ExplosionClass.getStrength = function() { return this.data.strength }
ExplosionClass.getCausesFire = function() { return this.data.causesFire }
ExplosionClass.getExplosionMode = function() { return this.data.explosionMode }


