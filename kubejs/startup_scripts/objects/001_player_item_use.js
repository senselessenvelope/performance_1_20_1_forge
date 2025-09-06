// construct and PlayerItem instance
global.PlayerItem = function(params) {
    // requires player and item
    if (!params || !params.hasOwnProperty('player') || !params.hasOwnProperty('item')) {
        throw new Error("PlayerItem requires 'player' and 'item' properties")
    }
    this.data = params
    // set default params if not existing
    this.data.cooldown = this.data.cooldown ?? 0 // cooldown does not exist unless specified for item
}

// getters for properties of data dictionary
global.PlayerItem.prototype.getData = function() { return this.data }
global.PlayerItem.prototype.getPlayer = function() { return this.data.player }
global.PlayerItem.prototype.getItem = function() { return this.data.item }
global.PlayerItem.prototype.getCooldown = function() { return this.data.cooldown }

