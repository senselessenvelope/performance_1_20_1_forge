


// explosives that should be considered if they become problematic
// BY THE WAY, you CANNOT prevent the time bomb from exploding if no time was set on it through here, because if it blows up instantly there is no entity spawned, 
// so would need alternative (i.e. right-click check for flint and steel, but also other stuff such as redstone, etc., but not worth it anyway, not a huge worry)
const explosives_to_consider = ['minecraft:tnt', 'tntplusmod:c_4', 'tntplusmod:magnetic_tnt', 'tntplusmod:time_bomb_0_sec', 'tntplusmod:time_bomb_2_sec', 'tntplusmod:time_bomb_4_sec', 'tntplusmod:time_bomb_6_sec', 'tntplusmod:time_bomb_8_sec', 'tntplusmod:time_bomb_10_sec', 'tntplusmod:time_bomb_12_sec']
// explosives that will be restricted with their spawning in overworld
const restricted_explosives = ['tntplusmod:nuclear', 'tntplusmod:napalm_tnt', 'tntplusmod:fountain_tnt']

// Listen for the entity server event when any entity is spawned
EntityEvents.spawned(event => {

    const spawned_entity = event.entity
    
    // // for debugging
    // console.log(spawned_entity.name)
    // console.log(spawned_entity.type)
    // console.log(spawned_entity.type.toString)
    // // console.log(spawned_entity.name.getName())

    // gets the more readable name for player to see in chat
    const displayName = spawned_entity.getDisplayName().getString()


    // Use the stringified key from the translation component
    if (spawned_entity.type == 'tntplusmod:supernova') { // Check the entity type
        // console log and feedback for player (though supernova is uncraftable 
        // this should ideally never even run, is just a failsafe if it does)
        console.log("SUPERNOVA TNT SET OFF")
        event.server.tell(`${displayName} was stopped by a greater, more powerful force`)
        spawned_entity.teleportTo(0, -10000, 0)
        spawned_entity.kill()
        console.log("SUPERNOVA KILLED")
    }


    // restricted explosives will only be restricted in overworld
    if (spawned_entity.level.dimension === 'minecraft:overworld') {
        // Use the stringified key from the translation component
        if (restricted_explosives.includes(spawned_entity.type.toString())) { // Check the entity type
            // explosives are for use deep underground only
            if (spawned_entity.y > 40) {
                // console logs and chat logs (for player feedback)
                console.log(`${spawned_entity.type} set off above overworld limit of Y=40 for high-power explosives`)
                event.server.tell(`${displayName} was unable to set off too close to the overworld surface (go below Y=40)`)
                console.log(spawned_entity.y)
                spawned_entity.teleportTo(0, -10000, 0)
                spawned_entity.kill()
                console.log(`${spawned_entity.type} in overworld killed`)
            }
        } else if (spawned_entity.type == 'tntplusmod:levitation_tnt') {
            console.log("floating tnt set off in overworld")
            event.server.tell(`${displayName} was unable to fight the overworld force of gravity`)
            spawned_entity.teleportTo(0, -10000, 0)
            spawned_entity.kill()
            console.log("floating tnt in overworld killed")
        }
    }
})
