// shortening reference
const PlayerModule = global.objects.player

// construct and PlayerItem instance
PlayerModule.PlayerItem = function(params) {
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

// shortening access to prototype function
const PlayerItemClass = PlayerModule.PlayerItem.prototype

// getters for properties of data dictionary
PlayerItemClass.getData = function() { return this.data }
PlayerItemClass.getPlayer = function() { return this.data.player }
PlayerItemClass.getItem = function() { return this.data.item }
PlayerItemClass.getCooldown = function() { return this.data.cooldown }

