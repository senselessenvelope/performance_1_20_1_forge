
// global utility functions for objects
global.objectUtils = {
    // copies all own properties from source to target
    addObjectData: function(source) {
        let target = {}
        for (const key of Object.keys(source)) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
        return target
    }
}
