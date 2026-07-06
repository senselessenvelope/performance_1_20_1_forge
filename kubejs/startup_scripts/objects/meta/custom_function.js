// priority: 51

// shortening reference to module
const MetaModule = global.objects.meta;

// IIFE (Immediately Invoked Function Expression) to restrict below to local scope
(() => {
    // construct and CustomFunction instance
    MetaModule.CustomFunction = function(params) {
        // no default parameters, because if does not exist then there is no function
        this.data = global.objectUtils.addObjectData(params)
    }

    // shortening access to prototype function
    const CustomFunctionClass = MetaModule.CustomFunction.prototype

    // getters for properties of data dictionary
    CustomFunctionClass.getData = function() { return this.data }
    CustomFunctionClass.getFunc = function() { return this.data.func }
    CustomFunctionClass.getArgs = function() { return this.data.args }
}) ()
