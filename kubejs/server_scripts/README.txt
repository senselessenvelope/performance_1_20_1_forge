contents of each file:

example.js 					-just an example, a console info log

enhanced_celestials_game_stages.js 		-for assigning/removing gamestages from all players given an Enhanced Celestials event, 
						 BUT now also teleports all mobs that were specific to that moon into the void once the 
						 moon is over, right now it does this for ALL of them, BUT i may change this in the future 
						 to only do it for limited ones such as, for example, Hirschgeist/Missioner for the blue 
						 moon and other mobs, but right now it just teleports them out AND after very night (in 
						 the morning at tick 0) it tells all players that the creatures of the night are now 
						 going back to hiding, ideally i want it to keep some info between nights to see if, once 
						 the enhancedcelestials:default comes back, to see what moon was previous night, and 
						 customise it based on that, where it will say something like "The blood lust of the 
						 sanguine creatures has been satiated..." after the blood moon, or smth gay like that
						 NOTE: SHOULD ONLY APPLY TO OVERWORLD, OTHER DIMENSIONS THIS SCRIPT WILL NOT TELEPORT MOBS

modified_loot.js 				-for modifying iron ore to have a chance of dropping copper or galosphere silver (rarer), 
					 	 and other ores to have chance to drop amethyst, or 2 shards from galosphere, lumiere and 
					 	 allurite, because the world that i pre-generated was created in 1.12.2
					 	 NEVERMIND, i forgot about the fact that ores WILL generate in deepslate layers, so may 
					 	 just make copper and silver a bit rarer from chests, and make them NOT drop from iron, 
					 	 as for amethyst, this can be found very easily, so WILL need to change that to drop 
					 	 allurite and lumiere, because they seem to be much rarer, just as a biome in itself, 
					 	 and i didnt manage to see any in deepslate layer, but did find quite a few amethyst 
					 	 clusters, so those should serve fine for drops, NEED TO ADD THAT GALOSPHERE GEM SUPPORT 
						 BUT i did add loot modifiers for some bosses, particularly for aether and nether, that 
						 makes them drop an eye, eventually to be used to craft end painting

grant_game_stages.js 				-grants gamestages based on advancements, same as previous scripts file BUT now uses Utils 
						 to run it as game commands, allowing me to assign a gamestage to ALL players, rather than 
						 just one player, ALSO has prettier text telling players certain stage is unlocked

edit_recipes.js 				-removes tntplusmod:supernova_tnt recipe so that that OP tnt is uncraftable, ALSO removes 
						 crafting recipes for eyes from legendary_monsters mod and applies them to be used to create 
						 dimensional paintings end painting

prevent_specific_tnt_spawns.js 			-certain conditions (mostly for overworld) for limiting tnt destruction, this script 
						 bans supernova from ever being ignited in ANY dimension (in case a player somehow obtains 
						 it), bans the levitation tnt in just the overworld (because could be used to rise up and 
						 grief the surface) and for every other tnt that is highly destructive limits them to be 
						 only ignitable under Y=40 in overworld, while the less destructive ones like vanilla tnt 
						 or tntplusmod C4 are allowed anywhere in the overworld, and all of these are allowed 
						 everywhere in every other dimension, except supernova of course which is banned in EVERY 
						 dimension, and the way all these explosive preventions are implemented are because these 
						 are entities, they can be teleported into the void and also killed (you probably only need 
						 one or the other, but doing both just feels more secure and covers all bases)






enhanced_celestials_game_stages_supers.text 	-for same as other file BUT this ALSO separates super moons, whereas the other gives 
						 same stage for a particular moon, regardless of whether it is super or not, e.g. 
						 super blood moons and blood moons both give same blood_moon stage