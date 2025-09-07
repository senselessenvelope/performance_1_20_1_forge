

// construct and PlayerItem instance
global.PlayerItem = function(params) {
    // requires player and item
    if (!params || !params.hasOwnProperty('player') || !params.hasOwnProperty('item')) {
        throw new Error("PlayerItem requires 'player' and 'item' properties")
    }
    // explicitly set data dictionary (to avoid issues with some objects having a nested field being same name as one of the main fields)
    // for example, potion effects have cooldown, and by default that was overwriting our cooldown field in data dictionary
    this.data = global.objectUtils.addObjectData(params)

    // default values such as item use cooldown
    this.data.cooldown = params.cooldown ?? global.constants.DEFAULT_COOLDOWN
}

// getters for properties of data dictionary
global.PlayerItem.prototype.getData = function() { return this.data }
global.PlayerItem.prototype.getPlayer = function() { return this.data.player }
global.PlayerItem.prototype.getItem = function() { return this.data.item }
global.PlayerItem.prototype.getCooldown = function() { return this.data.cooldown }

