
// global entity utility functions will use in parts of program
global.utils.entity.entityUtils = {
    addSingleDrop: function(entityItemDrop) {
        const {
            event,
            entity,
            item
        } = entityItemDrop.data
        // drop 1 of item
        event
            .addEntityLootModifier(entity)
            .addLoot(item)
    },
    addCommonDrop: function(entityItemDrop) {
        const {
            event,
            entity,
            item
        } = entityItemDrop.data
        // drop 4-7 of item
        event
            .addEntityLootModifier(entity)
            .addLoot(Item.of(item, 4))
            .randomChance(0.6)
            .addLoot(item)
            .randomChance(0.4)
            .addLoot(item)
            .randomChance(0.2)
            .addLoot(item)
            // // cleaner, but doesnt work (idk why)
            // .addLoot(
            //     LootEntry
            //         .of("kubejs:whale_wind", [4, 7])
            //         .withWeight(1)
            //         .withQuality(2)
            // )
    },
    explodeEntity: function(params) {
        if (!params.explosion) { return }
        const explosion = params.explosion.data
        const {
            entity
        } = params
        const {
            strength,
            causesFire,
            explosionMode
        } = explosion
        const entityData = entity
        // create explosion
        let explosionSummon = entityData.block.createExplosion()
        explosionSummon
            .exploder(entityData)
            .strength(strength)
            .causesFire(causesFire)
            .explosionMode(explosionMode)
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