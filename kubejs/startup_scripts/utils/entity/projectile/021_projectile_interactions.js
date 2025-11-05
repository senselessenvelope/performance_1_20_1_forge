
// functions relating to when projectile collides with something
global.utils.entity.projectile.projectileInteractions = {
    entityHit: function(params) {
        const {
            entity,
            customFunction
        } = params
        const {
            func,
            args
        } = customFunction.data
        func(entity, args)
    },
    // ensures arguments exist for consecutive functions that may need to access arguments, if not sets empty dictionary of arguments (no args)
    verifyArgs: function(args) {
        if (!args) { args = {} }
        return args
    },
    // get time in seconds for function to apply effects (if not defaults time to global constant)
    getTime: function(args) {
        const {
            time
        } = args
        return time ?? global.constants.DEFAULT_TIME
    },
    setOnFire: function(entity, args) {
        args = global.utils.entity.projectile.projectileInteractions.verifyArgs(args)
        const seconds = global.utils.entity.projectile.projectileInteractions.getTime(args)
        entity.setSecondsOnFire(seconds)
    },
    setOnWither: function(entity, args) {
        args = global.utils.entity.projectile.projectileInteractions.verifyArgs(args)
        const seconds = global.utils.entity.projectile.projectileInteractions.getTime(args)
        entity.potionEffects.add("minecraft:wither", 20 * seconds) // wither for X seconds
        entity.potionEffects.add("minecraft:instant_damage", 1, 1) // damage instantly
    }
}