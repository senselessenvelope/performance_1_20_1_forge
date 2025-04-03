// priority: 0

// Visit the wiki for more info - https://kubejs.com/


// shows when world loads, so file loading works
console.info('Hello, World! (Loaded SERVER scripts!!!)')




const blood_moon_mobs = ["graveyard:ghoul", "graveyard:wraith", "graveyard:revenant", "graveyard:nightmare", "graveyard:skeleton_creeper", "whisperwoods:zotzpyre", 
                        "born_in_chaos_v1:glutton_fish", "zombies_plus:axe_zombie", "zombies_plus:bow_zombie", "zombies_plus:brute_zombie", "zombies_plus:cave_zombie", 
                        "zombies_plus:crawler_zombie", "zombies_plus:crossbow_zombie", "zombies_plus:leaper_zombie", "zombies_plus:runner_zombie", "zombies_plus:shrieker_zombie", 
                        "zombies_plus:slow_zombie", "zombies_plus:sword_zombie", "zombies_plus:vile_zombie", "zombies_plus:weak_zombie", "more_zombies2:zombie_summoner", 
                        "more_zombies2:zombie_god", "more_zombies2:dark_zombie", "more_zombies2:furious_zombie", "more_zombies2:horde_leader", "more_zombies2:horde_zombie", 
                        "more_zombies2:the_watcher", "more_zombies2:zombie_runner", "more_zombies2:zombie_soul", "more_zombies2:zombie_spitter", "born_in_chaos_v1:dire_hound_leader", 
                        "born_in_chaos_v1:zombie_clown", "enemyexpansion:meature", "enemyexpansion:slugger", "enemyexpansion:sprinter", 
                        "enemyexpansion:vampire", "more_zombies2:zombie_summoner"]

const blue_moon_mobs = ["born_in_chaos_v1:nightmare_stalker", "goat_man:goat_man", "antlers:wendigo", "whisperwoods:hirschgeist", "whisperwoods:wisp", "whisperwoods:hidebehind", 
                        "graveyard:corrupted_pillager", "graveyard:corrupted_vindicator", "born_in_chaos_v1:missioner", "born_in_chaos_v1:missioner", "distantfriends:friend"]

const harvest_moon_mobs = ["realmrpg_creep:creepling", "realmrpg_creep:halloweed", "born_in_chaos_v1:pumpkin_bruiser", "born_in_chaos_v1:seared_spirit", "knightquest:samhain", 
                        "born_in_chaos_v1:lifestealer"]


// For more info on Enhanced Celestials, look at the GitHub of source code:
//      https://github.com/CorgiTaco/Enhanced-Celestials/tree/f698f1c811fb9d4e931c47dec802f3b9b8347f48/Common/src/main/java/corgitaco/enhancedcelestials/item

// enhanced celestials uses a mix of Level so LevelEvents.tick() used instead of ServerEvents.tick()
LevelEvents.tick(event => {

        // console.log(event.getClass())
        // console.log(event.level.getClass())
        // console.log(event.level.getLunarContext().getClass())
        // console.log(event.level.getLunarContext().getLunarForecast().getClass())
        // console.log(event.level.getLunarContext().getLunarForecast().getCurrentEventRaw().getClass())
        // console.log(event.level.getLunarContext().getLunarForecast().getCurrentEventRaw().key().getClass())
        // console.log(event.level.getLunarContext().getLunarForecast().getCurrentEventRaw().key().location().getClass())
        // console.log(event.level.getLunarContext().getLunarForecast().getCurrentEventRaw().key().location().toString().getClass())


        // only run code if its in overworld
        if (event.level === event.server.getOverworld().getLevel())  {
                // can be null so this removes that spam from the chat
                if (event.level.getLunarContext() === null)  {
                        // do nothing, just pass
                } 
                else {

                        // to explain code just below, it looks at the lunar context of our event.level, grabs the forecast, then grabs the current event, 
                        // by this point we have a reference to a resource key so we get the resource key, then we get the location of the resource, and 
                        // convert it to a string to ensure it is of the right type for our cases,
                        // this is data types as they go along:
                        // SimpleEventJS
                        //      \
                        //      ServerLevel
                        //              \
                        //              EnhancedCelestialsContext
                        //                              \
                        //                              LunarContext
                        //                                      \
                        //                                      Holder$Reference
                        //                                              \
                        //                                              ResourceKey
                        //                                                      \
                        //                                                      ResourceLocation
                        //                                                              \
                        //                                                              String

                        // here is them logged in the console, looking up their documentation you can see various methods of how to access them, 
                        // especially for more widely know ones such as the net.minecraft classes
                        // [DD/MM/YYYY HH:MM:SS XM] [Server thread/INFO] example.js#111: class dev.latvian.mods.kubejs.level.SimpleLevelEventJS [java.lang.Class]
                        // [DD/MM/YYYY HH:MM:SS XM] [Server thread/INFO] example.js#112: class net.minecraft.server.level.ServerLevel [java.lang.Class]
                        // [DD/MM/YYYY HH:MM:SS XM] [Server thread/INFO] example.js#113: class corgitaco.enhancedcelestials.core.EnhancedCelestialsContext [java.lang.Class]
                        // [DD/MM/YYYY HH:MM:SS XM] [Server thread/INFO] example.js#114: class corgitaco.enhancedcelestials.lunarevent.LunarForecast [java.lang.Class]
                        // [DD/MM/YYYY HH:MM:SS XM] [Server thread/INFO] example.js#115: class net.minecraft.core.Holder$Reference [java.lang.Class]
                        // [DD/MM/YYYY HH:MM:SS XM] [Server thread/INFO] example.js#116: class net.minecraft.resources.ResourceKey [java.lang.Class]
                        // [DD/MM/YYYY HH:MM:SS XM] [Server thread/INFO] example.js#117: class net.minecraft.resources.ResourceLocation [java.lang.Class]
                        // [DD/MM/YYYY HH:MM:SS XM] [Server thread/INFO] example.js#118: class java.lang.String [java.lang.Class]

                        // getting current event as a string in format "enhancedcelestials:lunar_event", where lunar_event is one of the 6 available further down
                        var event_string = event.level.getLunarContext().getLunarForecast().getCurrentEventRaw().key().location().toString()

                        // checks for all 7 event types (includes super moons and default night)
                        if ((event_string === "enhancedcelestials:blood_moon")) {
                                Utils.server.runCommandSilent("gamestage add @a blood_moon")
                        }
                        else if (event_string === "enhancedcelestials:super_blood_moon") {
                                Utils.server.runCommandSilent("gamestage add @a blood_moon")
                        }
                        else if (event_string === "enhancedcelestials:blue_moon") {
                                Utils.server.runCommandSilent("gamestage add @a blue_moon")
                        }
                        else if (event_string === "enhancedcelestials:super_blue_moon") {
                                Utils.server.runCommandSilent("gamestage add @a blue_moon")
                        }
                        else if (event_string === "enhancedcelestials:harvest_moon") {
                                Utils.server.runCommandSilent("gamestage add @a harvest_moon")
                        }
                        else if (event_string === "enhancedcelestials:super_harvest_moon") {
                                Utils.server.runCommandSilent("gamestage add @a harvest_moon")
                        } else {
                                // otherwise this will be the default minecraft night, "enhancedcelestials:default"
                                Utils.server.runCommandSilent("gamestage remove @a blood_moon")
                                Utils.server.runCommandSilent("gamestage remove @a blue_moon")
                                Utils.server.runCommandSilent("gamestage remove @a harvest_moon")

                                // get world time (in ticks)
                                let world = event.level
                                let worldTime = world.dayTime() % 24000 // mod so it resets every day

                                // // for debugging
                                // console.log(worldTime)

                                // to prevent mobs from those moons to persist, i MAY only change this to despawn SPECIFIC mobs like Hirschgeist/Missioner, etc.
                                if (worldTime === 0.0) {
                                        // // for debugging
                                        // console.log("TICK TIME: 0.0 !!!!!")
                                        for (let i = 0; i < blood_moon_mobs.length; i++) {
                                                Utils.server.runCommandSilent(`teleport @e[type=${blood_moon_mobs[i]}] ~ -1000 ~`)
                                        }    
                                        for (let i = 0; i < blue_moon_mobs.length; i++) {
                                                console.log(blue_moon_mobs[i])
                                                Utils.server.runCommandSilent(`teleport @e[type=${blue_moon_mobs[i]}] ~ -1000 ~`)
                                        }    
                                        for (let i = 0; i < harvest_moon_mobs.length; i++) {
                                                Utils.server.runCommandSilent(`teleport @e[type=${harvest_moon_mobs[i]}] ~ -1000 ~`)
                                        }
                                        Utils.server.runCommand(`tellraw @a {"text":"The creatures of the night go back into hiding...","color":"green"}`)
                                }
                        }
                }
        } 
})




