
// eyes from legendary monsters mod, this is like an enum for javascript
global.legendaryMonstersEyes = Object.freeze({
    EYE_OF_AIR:         "legendary_monsters:eye_of_air", 
    EYE_OF_MAGMA:       "legendary_monsters:eye_of_magma", 
    EYE_OF_SOUL:        "legendary_monsters:eye_of_soul",
    EYE_OF_BONES:       "legendary_monsters:eye_of_bones", 
    EYE_OF_MANY_RIBS:   "legendary_monsters:eye_of_many_ribs", 
    EYE_OF_GHOST:       "legendary_monsters:eye_of_ghost",
    EYE_OF_FROST:       "legendary_monsters:eye_of_frost", 
    EYE_OF_SANDSTORM:   "legendary_monsters:eye_of_sandstorm", 
    EYE_OF_MOSS:        "legendary_monsters:eye_of_moss", 
    EYE_OF_SHULKER:     "legendary_monsters:eye_of_shulker", 
    EYE_OF_CHORUS:      "legendary_monsters:eye_of_chorus"
})


// global entity utility functions will use in parts of program
global.entityUtils = {
    // pass in entity to explode, set defaults if other parameters not defined
    explodeEntity: function(params) {
        // parameters that can be passed in
        const {
            entity,
            strength,
            causesFire,
            explosionMode
        } = params 
        // define all parameter defaults if undefined
        const s = strength !== undefined ? strength : 5;
        const fire = causesFire !== undefined ? causesFire : true;
        const mode = explosionMode !== undefined ? explosionMode : 'tnt';
        // create explosion
        let explosion = entity.block.createExplosion()
        explosion
            .exploder(entity)
            .strength(s)
            .causesFire(fire)
            .explosionMode(mode)
            .explode()
    },
    // pass in entity to remove from world
    removeEntity: function(params) {
        // parameters that can be passed in, only need entity
        const {
            entity
        } = params 
        // get rid of entity
        entity.teleportTo(0, -1000, 0)
        entity.kill()
        entity.discard()
    }
}
