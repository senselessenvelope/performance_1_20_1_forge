

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
    },
    verifyProjectile: function(params) {
        const {
            projectile
        } = params
        console.log(`Projectile object from verifyProjectile: ${projectile}`)
        const entity = projectile.entity
        const velocity = projectile.velocity !== undefined ? projectile.velocity : 1.5;
        const sound = projectile.sound !== undefined ? projectile.sound : 'minecraft:entity.ghast.shoot';
        const noGravity = projectile.noGravity !== undefined ? projectile.noGravity : true;
        const texture = projectile.texture !== undefined ? projectile.texture : 'kubejs:textures/item/example_item.png'
        const item = projectile.item !== undefined ? projectile.item : 'minecraft:air'
        return { entity: entity, velocity: velocity, sound: sound, noGravity: noGravity, texture: texture, item: item }
    },
    // summon projectile at player
    summonProjectile: function(params) {
        // parameters of function, player and velocity of projectile, and sound it makes when shot
        const {
            player,
            projectile
        } = params
        const projectileData = verifyProjectile({ projectile: projectile })
        // angle player looking at
        const playerAngle = {
            x: player.lookAngle.x(),
            y: player.lookAngle.y(),
            z: player.lookAngle.z()
        }
        // create entity to shoot
        const entity = player.level.createEntity(projectileData.entity)
        // spawn entity
        entity.spawn()
        Utils.server.schedule(5, () => {
            // entity spawn position
            entity.pos = new Vec3d(player.x + (1.5 * playerAngle.x), player.y + (player.getEyeHeight() + playerAngle.y), player.z + (1.5 * playerAngle.z))
            // not affected by gravity
            entity.setNoGravity(projectileData.noGravity)
            const motion = new Vec3d(playerAngle.x * projectileData.velocity, playerAngle.y * projectileData.velocity,  playerAngle.z * projectileData.velocity)
            // entity.persistentData.put('motion', motion)
            // entity movement
            entity.setDeltaMovement(motion)
        })
        // player.level.playSound(null, player.x, player.y, player.z, 'minecraft:entity.ghast.shoot', 'players', 1, 1)
        player.level.playSound(null, player.x, player.y, player.z, projectileData.sound, 'players', 1, 1) // scarier
        // seconds entity will exist for
        let entityLife = 20
        // after number of ticks, entity will be killed
        Utils.server.scheduleInTicks(20 * entityLife, ctx => {
            // if (explosion !== undefined) {
            //     // explodeEntity({ explosion: explosionData })
            //     const strength = explosion.strength !== undefined ? explosion.strength : 5;
            //     const causesFire = explosion.causesFire !== undefined ? explosion.causesFire : true;
            //     const explosionMode = explosion.explosionMode !== undefined ? explosion.explosionMode : 'tnt';
                
            //     let explosionSummon = explosion.entity.block.createExplosion()
            //     explosionSummon
            //         .exploder(explosion.entity)
            //         .strength(strength)
            //         .causesFire(causesFire)
            //         .explosionMode(explosionMode)
            //         .explode()
            // }
            
            explodeEntity({ entity: entity, strength: 5, causesFire: true, explosionMode: 'tnt' })
            removeEntity({ entity: entity })
        })
    },
    // create projectile entity given object arguments
    createProjectile: function(params) {
        // parameters of function, player and velocity of projectile, and sound it makes when shot
        const {
            event,
            projectile,
            explosion
        } = params
        const projectileData = verifyProjectile({ projectile: projectile })

        // check if explosion is null or not
        const explosionData = explosion || {}
        // check each property of explosion data, if undefined set default value
        const strength = explosionData.strength !== undefined ? explosionData.strength : 2
        const causesFire = explosionData.causesFire !== undefined ? explosionData.causesFire : false
        const explosionMode = explosionData.explosionMode !== undefined ? explosionData.explosionMode : 'mob'
        // create projectile for event
        event.create(projectileData.entity, 'entityjs:projectile')
            // one-off values set at startup of game
            .sized(0.4, 0.4)
            .renderScale(1, 1, 1)
            .item(item => {
                item.canThrow(true)
            })
            // use custom texture
            .textureLocation(entity => {
                return projectileData.texture
            })
            // prevents an item specifically for this entity from being created (keep if you already have an item to shoot the projectile)
            // uncomment if you want it to auto create item (if you havent already)
            .noItem()
            // all methods below return void, so nothing needs to be returned
            .onHitBlock(context => {
                const { entity } = context;
                if (entity.removed || entity.level.isClientSide()) { return }
                // if (explosionData !== undefined) {
                //     explodeEntity({ explosion: explosionData })
                // }
                
                // if (explosion !== undefined) {
                //     // explodeEntity({ explosion: explosionData })
                //     const strength = explosion.strength !== undefined ? explosion.strength : 5;
                //     const causesFire = explosion.causesFire !== undefined ? explosion.causesFire : true;
                //     const explosionMode = explosion.explosionMode !== undefined ? explosion.explosionMode : 'tnt';
                    
                //     let explosionSummon = explosion.entity.block.createExplosion()
                //     explosionSummon
                //         .exploder(explosion.entity)
                //         .strength(strength)
                //         .causesFire(causesFire)
                //         .explosionMode(explosionMode)
                //         .explode()
                // }
                explodeEntity({ entity: entity, strength: strength, causesFire: causesFire, explosionMode: explosionMode })
                removeEntity({ entity: entity })
            })
            .onHitEntity(context => {
                const { entity, result } = context;
                if (entity.removed || entity.level.isClientSide()) { return }
                // custom effect upon hitting entity
                if (result.entity.living) {
                    result.entity.setSecondsOnFire(10)
                }
                // if (explosionData !== undefined) {
                //     explodeEntity({ explosion: explosionData })
                // }
                
                // if (explosion !== undefined) {
                //     // explodeEntity({ explosion: explosionData })
                //     const strength = explosion.strength !== undefined ? explosion.strength : 5;
                //     const causesFire = explosion.causesFire !== undefined ? explosion.causesFire : true;
                //     const explosionMode = explosion.explosionMode !== undefined ? explosion.explosionMode : 'tnt';
                    
                //     let explosionSummon = explosion.entity.block.createExplosion()
                //     explosionSummon
                //         .exploder(explosion.entity)
                //         .strength(strength)
                //         .causesFire(causesFire)
                //         .explosionMode(explosionMode)
                //         .explode()
                // }
                explodeEntity({ entity: entity, strength: strength, causesFire: causesFire, explosionMode: explosionMode })
                removeEntity({ entity: entity })
            })
            .tick(entity => {
                // check if projectile entity has been discarded (to prevent phantom projectiles, 
                // particularly after hitting entity, so does not continue to a block)
                // also check for if trying to render client side, should only do server-side entity checks
                // (prevents item duplicating in summon command below for both server and client)
                if (entity.removed|| entity.level.isClientSide()) { return }
                
                // if in water, kill entity
                if (entity.getLevel().getBlockState(entity.blockPosition()).getBlock().id == "minecraft:water") {
                    Utils.server.runCommandSilent(`particle minecraft:angry_villager ${entity.x} ${entity.y} ${entity.z} 0.125 0.125 0.125 1 50 force`)
                    entity.getLevel().playSound(null, entity.x, entity.y, entity.z, 'minecraft:block.fire.extinguish', 'players', 1, 1)
                    // and drop item (this is the summon command i am referring to above)
                    Utils.server.runCommandSilent(`summon item ${entity.x} ${entity.y} ${entity.z} {Item:{id:"${projectileData.item}",Count:1b}}`)
                    removeEntity({ entity: entity })
                }
            })
    }
}

// global item utility functions will use in parts of program
global.itemUtils = {
    // pass in player, item used and the cooldown (if no cooldown passed in assumed there is not one)
    useItem: function(params) {
        // parameters that can be passed in, item and its cooldown (in seconds)
        const {
            player,
            item,
            cooldown
        } = params 
        // define all parameter defaults if undefined
        const c = cooldown !== undefined ? cooldown : 0;
        // item cooldown
        player.addItemCooldown(item, 20 * c)
        // do not reduce stack size if in creative
        if (!player.isCreative()) { item.shrink(1) }
    }
}
