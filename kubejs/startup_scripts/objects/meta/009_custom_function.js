// construct and CustomFunction instance
global.objects.meta.CustomFunction = function(params) {
    // no default parameters, because if does not exist then there is no function
    this.data = global.objectUtils.addObjectData(params)
}

// getters for properties of data dictionary
global.objects.meta.CustomFunction.prototype.getData = function() { return this.data }
global.objects.meta.CustomFunction.prototype.getFunc = function() { return this.data.func }
global.objects.meta.CustomFunction.prototype.getArgs = function() { return this.data.args }


