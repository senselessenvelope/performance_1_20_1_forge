// construct and EntityInteractionFunction instance
global.EntityInteractionFunction = function(params) {
    // no default parameters, because if does not exist then there is no function
    this.data = params
}

// getters for properties of data dictionary
global.EntityInteractionFunction.prototype.getData = function() { return this.data }
global.EntityInteractionFunction.prototype.getFunc = function() { return this.data.func }
global.EntityInteractionFunction.prototype.getArgs = function() { return this.data.args }


