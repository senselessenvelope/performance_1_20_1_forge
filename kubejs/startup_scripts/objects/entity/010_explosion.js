// construct and Explosion instance
global.objects.entity.Explosion = function(params) {
    this.data = global.objectUtils.addObjectData(params)

    // set default params if not existing
    this.data.strength = this.data.strength ?? 2
    this.data.causesFire = this.data.causesFire ?? false
    this.data.explosionMode = this.data.explosionMode ?? 'mob'
}

// getters for properties of data dictionary
global.objects.entity.Explosion.prototype.getData = function() { return this.data }
global.objects.entity.Explosion.prototype.getStrength = function() { return this.data.strength }
global.objects.entity.Explosion.prototype.getCausesFire = function() { return this.data.causesFire }
global.objects.entity.Explosion.prototype.getExplosionMode = function() { return this.data.explosionMode }


