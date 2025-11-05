// shortening reference to module
const PotionModule = global.objects.item

// construct and Potion instance
PotionModule.Potion = function(params) {
    // requires event, potion input and output properties
    if (!params || !params.hasOwnProperty('event') || !params.hasOwnProperty('input') || !params.hasOwnProperty('output')) {
        throw new Error("Potion requires 'event', 'input' ingredient and 'output' effect properties")
    }
    this.data = global.objectUtils.addObjectData(params)
}

// shortening access to prototype function
const PotionClass = PotionModule.Potion.prototype

// getters for properties of data dictionary
PotionClass.getData = function() { return this.data }
PotionClass.getEvent = function() { return this.data.event }
PotionClass.getInput = function() { return this.data.input }
PotionClass.getOutput = function() { return this.data.output }


