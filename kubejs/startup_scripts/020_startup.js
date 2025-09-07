// priority: 0

// ------------------------------
// -----[ PROGRESSION EYES ]-----
// ------------------------------

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

// ------------------------------------
// -----[ PROJECTILE INTERACTION ]-----
// ------------------------------------

// default time in seconds for effect if not specified for functions
global.constants = Object.freeze({
    DEFAULT_TIME:               1,
    DEFAULT_COOLDOWN:           0
})

// functions relating to when projectile collides with something
global.projectileInteractions = {
    entityHit: function(params) {
        const {
            entity,
            entityInteractionFunction
        } = params
        const {
            func,
            args
        } = entityInteractionFunction.data
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
        args = global.projectileInteractions.verifyArgs(args)
        const seconds = global.projectileInteractions.getTime(args)
        entity.setSecondsOnFire(seconds)
    },
    setOnWither: function(entity, args) {
        args = global.projectileInteractions.verifyArgs(args)
        const seconds = global.projectileInteractions.getTime(args)
        entity.potionEffects.add("minecraft:wither", 20 * seconds) // wither for X seconds
        entity.potionEffects.add("minecraft:instant_damage", 1, 1) // damage instantly
    }
}


// ----------------------------
// -----[ ENTITY UTILITY ]-----
// ----------------------------

// global entity utility functions will use in parts of program
global.entityUtils = {
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
    },
    moveProjectile: function(params) {
        if (!params.entity || !params.motion) { console.warn("Non-existing entity or motion for function moveProjectile") }
        const {
            entity,
            motion
        } = params
        if (entity.removed) return 
        // update speed
        entity.setDeltaMovement(motion)
        // recursive call after 10 ticks (to maintain speed)
        Utils.server.scheduleInTicks(10, ctx => {
            global.entityUtils.moveProjectile({ entity: entity , motion: motion })
        })
    },
    // summon projectile at player
    summonProjectile: function(params) {
        // parameters of function, player and velocity of projectile, and sound it makes when shot
        const {
            player,
            projectile
        } = params
        // ensure projectile data valid
        const projectileData = projectile.data
        const explosion = projectile.getExplosion()
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
            // entity.blockPosition
            // console.log(entity.pos)
            // console.log(entity.pos.x)
            // entity.pos = new Vec3d(player.x + (1.5 * playerAngle.x), player.y + (player.getEyeHeight() + playerAngle.y), player.z + (1.5 * playerAngle.z))
            
            entity.teleportTo(player.x + (1.5 * playerAngle.x), player.y + (player.getEyeHeight() + playerAngle.y), player.z + (1.5 * playerAngle.z))
            // console.log(entity.pos)
            
            // not affected by gravity
            entity.setNoGravity(projectileData.noGravity)
            const motion = new Vec3d(playerAngle.x * projectileData.velocity, playerAngle.y * projectileData.velocity,  playerAngle.z * projectileData.velocity)
            // if projectile has no gravity, you probably dont want it to decelerate
            if (projectileData.noGravity) {
                // recursive call for projectiles that have no gravity, will not be slowed down, call recursive motion function
                global.entityUtils.moveProjectile({ entity: entity , motion: motion })
            } else {
                // if it does have gravity, you want it to slow down with natural curve
                entity.setDeltaMovement(motion)
            }
        })
        player.level.playSound(null, player.x, player.y, player.z, projectileData.sound, 'players', 1, 1)
        // seconds entity will exist for
        let entityLife = 20
        // after number of ticks, entity will be killed
        Utils.server.scheduleInTicks(20 * entityLife, ctx => {
            explodeEntity({ entity: entity, explosion: explosion })
            removeEntity({ entity: entity })
        })
    },
    // create projectile entity given object arguments
    createProjectile: function(params) {
        // parameters of function, player and velocity of projectile, and sound it makes when shot
        const {
            event,
            projectile
        } = params
        // verifies projectile data, explosive data is verified later on (once we have the entity from context)
        const projectileData = projectile.data
        const explosion = projectile.getExplosion()
        // const explosionData = explosion || {}
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
                const { entity } = context
                if (entity.removed || entity.level.isClientSide()) { return }
                Utils.server.runCommandSilent(`particle minecraft:ash ${entity.x} ${entity.y} ${entity.z} 0.125 0.125 0.125 5 200 force`)
                // here we pass in explosion from function arguments
                explodeEntity({ entity: entity, explosion: explosion })
                removeEntity({ entity: entity })
            })
            .onHitEntity(context => {
                const { entity, result } = context
                if (entity.removed || entity.level.isClientSide()) { return }
                // custom effect upon hitting entity
                if (result.entity.living) {
                    // if it has a function to use upon interaction
                    if (projectileData.entityInteractionFunction) {
                        let timeSeconds = 10 // effect for 10 seconds if there is an effect it gives
                        global.projectileInteractions.entityHit({ 
                            entity: result.entity, 
                            entityInteractionFunction: projectileData.entityInteractionFunction
                        })
                    }
                }
                explodeEntity({ entity: entity, explosion: explosion })
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

// --------------------------
// -----[ ITEM UTILITY ]-----
// --------------------------

// global item utility functions will use in parts of program
global.itemUtils = {
    // pass in player, item used and the cooldown (if no cooldown passed in assumed there is not one)
    useItem: function(params) {
        // parameters that can be passed in, item and its cooldown (in seconds)
        const {
            player,
            item,
            cooldown
        } = params.data
        // item cooldown
        player.addItemCooldown(item, 20 * cooldown)
        // do not reduce stack size if in creative
        if (!player.isCreative()) { item.shrink(1) }
    },
    // pass in event, input ingredient and output potion through a Potion object
    createPotion: function(params) {
        const {
            event,
            input,
            output
        } = params.data
        /*
         * 1: top ingredient of brewing stand
         * 2: bottom ingredient of brewing stand
         * 3: result potion
         */
        event.addCustomBrewing(
            input,
            Ingredient.customNBT("minecraft:potion", (nbt) => {
                // does not work with anything other than minecraft:water as NBT tag, maybe not initialised yet at this point?
                return nbt.contains("Potion") && nbt.Potion == "minecraft:water"
            }),
            Item.of("minecraft:potion", { Potion: output })
        )
    },
    // pass in player, item used and the cooldown (if no cooldown passed in assumed there is not one)
    usePotion: function(params) {
        // general item use function
        global.itemUtils.useItem(params)
        // parameters that can be passed in, item and its cooldown (in seconds)
        const {
            player
        } = params.data
        // for potions give back glass bottle if not in creative
        if (!player.isCreative()) { player.give("minecraft:glass_bottle") }
    },
    checkerBoardRecipeWithCenterItem: function(params) {
        const {
            event,
            recipe
        } = params
        const output = recipe.output
        const itemOne = recipe.itemOne
        const itemTwo = recipe.itemTwo
        const centerItem = recipe.centerItem
        // if unspecified, assume center item is not a tool, and is used up in recipe
        const centerItemIsTool = recipe.centerItemIsTool !== undefined ? recipe.centerItemIsTool : false
        // if item should be damaged (for example, a bucket is considered a tool in this context but cannot be damaged, a pickaxe however can be damaged)
        const centerItemIsDamaged = recipe.centerItemIsDamaged !== undefined ? recipe.centerItemIsDamaged : false
        let craftedItem = event.shaped(
                output, 
                [
                    'XYX',
                    'YZY',
                    'XYX'
                ], 
                {
                    X: itemOne,
                    Y: itemTwo,
                    Z: centerItem
                }
            )
        // if item is to be damaged, damage by 1, otherwise do 0 damage (will only be damaged if is a tool)
        const damage = centerItemIsDamaged ? 1 : 0
        // if is a tool, will damage the center item (which can be changed to be a tool)
        if (centerItemIsTool) craftedItem.damageIngredient(centerItem, damage)
    }
}
