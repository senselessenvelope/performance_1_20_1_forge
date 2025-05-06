// explosives that should be considered if they become problematic
// BY THE WAY, you CANNOT prevent the time bomb from exploding if no time was set on it through here, because if it blows up instantly there is no entity spawned, 
// so would need alternative (i.e. right-click check for flint and steel, but also other stuff such as redstone, etc., but not worth it anyway, not a huge worry)
const explosives_to_consider = ['minecraft:tnt', 'tntplusmod:c_4', 'tntplusmod:magnetic_tnt', 'tntplusmod:time_bomb_0_sec', 'tntplusmod:time_bomb_2_sec', 'tntplusmod:time_bomb_4_sec', 'tntplusmod:time_bomb_6_sec', 'tntplusmod:time_bomb_8_sec', 'tntplusmod:time_bomb_10_sec', 'tntplusmod:time_bomb_12_sec']
// explosives that will be restricted with their spawning in overworld
const restricted_explosives = ['tntplusmod:nuclear', 'tntplusmod:napalm_tnt', 'tntplusmod:fountain_tnt']
const restricted_explosives_blocks = ['tntplusmod:nuclear_block', 'tntplusmod:napalm', 'tntplusmod:fountain_tnt_block']
const nuclear = 'tntplusmod:nuclear_block'
const napalm = 'tntplusmod:napalm'
const fountain = 'tntplusmod:fountain_tnt_block'


// Looping through all entities to delete problematic TNTs
// this WILL also work if the problematic TNT is set off by one that DOES detonate (e.g. normal vanilla TNT)
ServerEvents.tick(event => {
    const entities = event.server.entities
    if (!entities) return
    // Loop through all entities currently in the world
    entities.forEach(entity => {
        // readable name (shown to player) and the item name (id)
        const displayName = entity.getDisplayName().getString()
        const spawnedEntity = entity.type.toString()
        // supernova will never be allowed to be set off
        if (spawnedEntity == 'tntplusmod:supernova') {
            // console log and feedback for player (though supernova is uncraftable 
            // this should ideally never even run, is just a failsafe if is detonated)
            console.log("SUPERNOVA TNT SET OFF")
            event.server.tell(`${displayName} was stopped by a greater, more powerful force`)
            Utils.server.runCommandSilent(`summon minecraft:item ${entity.x} ${entity.y + 1} ${entity.z} {Item:{Count:1b,id:"tntplusmod:supernova_tnt"}}`)
            entity.teleportTo(0, -10000, 0)
            entity.kill()
            console.log("SUPERNOVA KILLED")
        }
        // restricted explosives will only be restricted in overworld
        if (entity.level.dimension === 'minecraft:overworld') {
            // check if in our array of restricted explosives
            if (restricted_explosives.includes(spawnedEntity)) {
                // explosives are for use deep underground only
                if (entity.y > 40) {
                    // console logs and chat logs (for player feedback)
                    console.log(`${spawnedEntity} set off above overworld limit of Y=40 for high-power explosives`)
                    event.server.tell(`${displayName} was unable to set off too close to the overworld surface (go below Y=40)`)
                    let item
                    switch (spawnedEntity) {
                        case restricted_explosives[0]:
                            item = nuclear
                            break
                        case restricted_explosives[1]:
                            item = napalm
                            break
                        case restricted_explosives[2]:
                            item = fountain
                            break
                        default:
                            item = 'minecraft:air'
                            console.log(`No illegal matching case found for ${spawnedEntity}`)
                            break
                    }
                    Utils.server.runCommandSilent(`summon minecraft:item ${entity.x} ${entity.y + 1} ${entity.z} {Item:{Count:1b,id:"${item}"}}`)
                    console.log(`${spawnedEntity} spawned illegally at Y=${entity.y}! Cancelling!`)
                    entity.teleportTo(0, -10000, 0)
                    entity.kill()
                    console.log(`${spawnedEntity} in overworld killed`)
                }
            } else if (spawnedEntity == 'tntplusmod:levitation_tnt') {
                console.log("floating tnt set off in overworld")
                event.server.tell(`${displayName} was unable to fight the overworld force of gravity`)
                Utils.server.runCommandSilent(`summon minecraft:item ${entity.x} ${entity.y + 1} ${entity.z} {Item:{Count:1b,id:"tntplusmod:levitationtntblock"}}`)
                entity.teleportTo(0, -10000, 0)
                entity.kill()
                console.log("floating tnt in overworld killed")
            }
        }
    })
})