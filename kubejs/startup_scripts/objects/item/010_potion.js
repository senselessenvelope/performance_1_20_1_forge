// construct and Potion instance
global.objects.item.Potion = function(params) {
    // requires event, potion input and output properties
    if (!params || !params.hasOwnProperty('event') || !params.hasOwnProperty('input') || !params.hasOwnProperty('output')) {
        throw new Error("Potion requires 'event', 'input' ingredient and 'output' effect properties")
    }
    this.data = global.objectUtils.addObjectData(params)
}

// getters for properties of data dictionary
global.objects.item.Potion.prototype.getData = function() { return this.data }
global.objects.item.Potion.prototype.getEvent = function() { return this.data.event }
global.objects.item.Potion.prototype.getInput = function() { return this.data.input }
global.objects.item.Potion.prototype.getOutput = function() { return this.data.output }


