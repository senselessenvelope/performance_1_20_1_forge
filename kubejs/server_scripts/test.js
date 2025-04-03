

LevelEvents.tick(event => {
    if(event.level.dayTime() % 24000 === 6001) {
       console.log(VillagerUtils.getProfessions());
    }
})


// TEST, was trying to see if maybe needs to be updated every tick
// other version i had is EntityEvents.spawned(...)
LevelEvents.tick(event => {
    const world = event.level;  // Get the world object
    // Get all entities in the world
    const entities = world.getEntities();
    // Iterate over each entity
    entities.forEach(entity => {
        // Check if the spawned entity is the Blue Skies NPC (e.g., Gatekeeper)
        if (entity.type === "blue_skies:gatekeeper") {
            // need to do something to the class, but more likely the object, to edit its trades
            // console.log(entity.class.getTradesForProgression())
            // getTradesForProgression() seems to have the two hard-coded items as trades, and cannot be changed because getTradesForProgression() recalculates the list everytime is called 
            // by the player interacting with the gatekeeper villager
            console.log(entity.offers) // THIS KINDA WORKS, need to add the offer for portal blocks and shit, returns an arraylist of trades
            console.log(entity.offers.toString()) // this returns a list of trade objects, need to make a new MerchantOffer and add it to trades

            // // code from decompiled class file for example of the two trades (hard-coded in getTradesForProgression() method)
            // trades.add((new SkiesVillagerTrades.SingleTrade.Builder()).item(Items.f_42517_, 1).result(SkiesItems.blue_journal, 1).maxUses(50).givenXP(0).build());
            // trades.add((new SkiesVillagerTrades.SingleTrade.Builder()).item(Items.f_42616_, Math.min(64, Math.max(1, BlueSkiesConfig.COMMON.getZealLighterCost()))).result(SkiesItems.zeal_lighter, 1).maxUses(5).givenXP(10).build());
            
            // // trades is not public, so cannot access, but even if i could, is recalculated every time in getTradesForProgression
            // console.log(entity.offers.add(VillagerUtils.createSimpleTrade(["minecraft:emerald"], "minecraft:diamond"))) // returns true
            // console.log(entity.trades) // trades is undefined
            
            console.log(entity.getTradesForProgression(1, 1)) // used method for GateKeeperEntity object (using two placeholder ints)
            // returns arraylist:
            //      [com.legacy.blue_skies.entities.villager.SkiesVillagerTrades$SingleTrade@62d00039, com.legacy.blue_skies.entities.villager.SkiesVillagerTrades$SingleTrade@223ca64c] [java.util.ArrayList]
            console.log(entity.getTradesForProgression(1, 1).get(0))
            // returns single object:
            //      com.legacy.blue_skies.entities.villager.SkiesVillagerTrades$SingleTrade@52785cee [com.legacy.blue_skies.entities.villager.SkiesVillagerTrades$SingleTrade]

            // // see wiki for info on loading Java classes:
            // //      https://kubejs.com/wiki/other/major-updates/6.0#java
            let SkiesVillagerTrades = Java.loadClass('com.legacy.blue_skies.entities.villager.SkiesVillagerTrades')
            let SkiesBlocks = Java.loadClass('com.legacy.blue_skies.registries.SkiesBlocks')

            // obtaining list from method in GatekeeperEntity.class, and adding a new item, AND IT WORKS
            let temp_list = entity.getTradesForProgression(100, 100)
            temp_list.add((new SkiesVillagerTrades.SingleTrade.Builder()).item(Items.DIAMOND, 1).result(SkiesBlocks.turquoise_stonebrick, 8).maxUses(5).givenXP(10).build())
            for (let i = 0; i < temp_list.length; i++) {
                console.log("ITEM " + i)
                console.log(temp_list.get(i))
            }
            // console.log(temp_list.get(2).itemSold) // undefined (does not exist)
            // console.log(temp_list.get(2).result()) // cannot find function (private)

            // // this line (combination of two temp_list lines above) WILL add the trade, problem is the mod calls getTradesForProgression() EVERY TIME, 
            // // recreating the list of offers
            // entity.offers.add((new SkiesVillagerTrades.SingleTrade.Builder()).item(Items.DIAMOND, 1).result(SkiesBlocks.turquoise_stonebrick, 8).maxUses(5).givenXP(10).build())
    
    
            // trying to modify offers instead by loading class and creating new offers
            let MerchantOffer = Java.loadClass('net.minecraft.world.item.trading.MerchantOffer')
            let ItemStack = Java.loadClass('net.minecraft.world.item.ItemStack')
    
            // offers list is obtainable
            console.log('BEFORE ADDING ITEM (should be 2 items)')
            for (let i = 0; i < entity.offers.length; i++) {
                console.log(entity.offers.get(i).toString())
            }
    
            // // decompiled class item from SkiesVillagerTrades.class (some parts are just random garbage)
            // new MerchantOffer(new ItemStack(this.itemGiven1.m_41720_(), this.itemGiven1Count), new ItemStack(this.itemGiven2.m_41720_(), this.itemGiven2Count), new ItemStack(this.itemSold.m_41720_(), this.soldItemCount), this.maxUses, this.givenXP, this.priceMultiplier);
            // // my item
            // (new MerchantOffer(new ItemStack(Items.DIAMOND, 1), new ItemStack(Items.DIAMOND, 1), new ItemStack(SkiesBlocks.turquoise_stonebrick, 8), 5, 10, 0.05))
    
            // adding to offers list
            entity.offers.add((new MerchantOffer(new ItemStack(Items.DIAMOND, 1), new ItemStack(Items.DIAMOND, 1), new ItemStack(SkiesBlocks.turquoise_stonebrick, 8), 5, 10, 0.05)))
            
            // offers still has 2 items after adding (because is regenerated)
            console.log('AFTER ADDING ITEM (should be 3 items)')
            for (let i = 0; i < entity.offers.length; i++) {
                console.log(entity.offers.get(i).toString())
            }
    
        }
    })
    
})




// EntityEvents.spawned((event) => {
//     const entity = event.entity;

    
//     // console.log(`Entity Spawned: ${entity}`);
//     // console.log(`Entity Spawned: ${entity.type}`);
    
//     // Check if the spawned entity is the Blue Skies NPC (e.g., Gatekeeper)
//     if (entity.type === "blue_skies:gatekeeper") {
//         // need to do something to the class, but more likely the object, to edit its trades
//         // console.log(entity.class.getProfessions())
//         console.log(entity.offers) // THIS KINDA WORKS, need to add the offer for portal blocks and shit, returns an arraylist of trades
//         console.log(entity.offers.toString()) // this returns a list of trade objects, need to make a new MerchantOffer and add it to trades
//         // trades.add((new SkiesVillagerTrades.SingleTrade.Builder()).item(Items.f_42517_, 1).result(SkiesItems.blue_journal, 1).maxUses(50).givenXP(0).build());
        
//         // // offers/trades is not public, so cannot access
//         // console.log(entity.offers.add(VillagerUtils.createSimpleTrade(["minecraft:emerald"], "minecraft:diamond"))) // returns true
//         // console.log(entity.trades) // trades is undefined, and doing toString of undefined does nothing
        
//         console.log(entity.getTradesForProgression(1, 1)) // used method for GateKeeperEntity object (using two placeholder ints)
//         console.log(entity.getTradesForProgression(1, 1).get(0)) // first SingleTrade object in trades arraylist
//         // // source code (from decompiled SkiesVillagerTrades class):
//         // // trades.add((new SkiesVillagerTrades.SingleTrade.Builder()).item(Items.f_42616_, Math.min(64, Math.max(1, BlueSkiesConfig.COMMON.getZealLighterCost()))).result(SkiesItems.zeal_lighter, 1).maxUses(5).givenXP(10).build());
        


//         // // see wiki for info on loading Java classes:
//         // //      https://kubejs.com/wiki/other/major-updates/6.0#java
//         // const CactusBlock = Java.loadClass('net.minecraft.world.level.block.CactusBlock')
//         // console.log(CactusBlock);


//         // loading blue skies classes (for editing trades and adding objects)
//         let SkiesVillagerTrades = Java.loadClass('com.legacy.blue_skies.entities.villager.SkiesVillagerTrades')
//         let SkiesBlocks = Java.loadClass('com.legacy.blue_skies.registries.SkiesBlocks')

//         // entity.getTradesForProgression(1, 1).add((new SkiesVillagerTrades.SingleTrade.Builder()).item(Items.DIAMOND, 1).result(SkiesItems.turquoise_stonebrick, 8).maxUses(5).givenXP(10).build())

//         // not adding, this is just getting the trades array list that i am then trying to add to, wouldnt do anything tho because this method 
//         // is called every time when trading afaik, or every tick, and the method is being called internally within the class, so this is just 
//         // giving you the list, but you modifying it isnt going to affect the villager because methods within the class are calling this method 
//         // every time its needed anyway, recreating the list with the hard-coded 2 items that the villager offers
//         entity.getTradesForProgression(0, 0).add((new SkiesVillagerTrades.SingleTrade.Builder()).item(Items.DIAMOND, 1).result(SkiesBlocks.turquoise_stonebrick, 8).maxUses(5).givenXP(10).build())
//         // entity.offers.add((new SkiesVillagerTrades.SingleTrade.Builder()).item(Items.DIAMOND, 1).result(SkiesBlocks.turquoise_stonebrick, 8).maxUses(5).givenXP(10).build())


//         // trying to use MerchantOffer objects (which require ItemStack objects)
//         let MerchantOffer = Java.loadClass('net.minecraft.world.item.trading.MerchantOffer')
//         let ItemStack = Java.loadClass('net.minecraft.world.item.ItemStack')

//         console.log('BEFORE ADDING ITEM (should be 2 items)')
//         for (let i = 0; i < entity.offers.length; i++) {
//             console.log(entity.offers.get(i).toString())
//         }

//         // new MerchantOffer(new ItemStack(this.itemGiven1.m_41720_(), this.itemGiven1Count), new ItemStack(this.itemGiven2.m_41720_(), this.itemGiven2Count), new ItemStack(this.itemSold.m_41720_(), this.soldItemCount), this.maxUses, this.givenXP, this.priceMultiplier);

//         // (new MerchantOffer(new ItemStack(Items.DIAMOND, 1), new ItemStack(Items.DIAMOND, 1), new ItemStack(SkiesBlocks.turquoise_stonebrick, 8), 5, 10, 0.05))



//         // // adding example (does not actually add anything for some reason)
//         // entity.offers.add((new MerchantOffer(new ItemStack(Items.DIAMOND, 1), new ItemStack(Items.DIAMOND, 1), new ItemStack(SkiesBlocks.turquoise_stonebrick, 8), 5, 10, 0.05)))
//         // // // below returns true, so it just means that it added to offers, just not sure if offers is actually being used for the trades
//         // // console.log(entity.offers.add((new MerchantOffer(new ItemStack(Items.DIAMOND, 1), new ItemStack(Items.DIAMOND, 1), new ItemStack(SkiesBlocks.turquoise_stonebrick, 8), 5, 10, 0.05))))

//         // console.log('AFTER ADDING ITEM (should be 3 items)')
//         // for (let i = 0; i < entity.offers.length; i++) {
//         //     console.log(entity.offers.get(i).toString())
//         // }



//         entity.offers.remove(0)

//         console.log('AFTER REMOVING ITEM (should be 1 item)')
//         for (let i = 0; i < entity.offers.length; i++) {
//             console.log(entity.offers.get(i).toString())
//         }





//         // let SkiesVillagerTrades = Java.type('com.legacy.blue_skies.entities.villager.SkiesVillagerTrades')

//         // // entity.getTradesForProgression(1, 1).add((new SkiesVillagerTrades.SingleTrade.Builder()).item(Items.DIAMOND, 1).result(SkiesItems.turquoise_stonebrick, 8).maxUses(5).givenXP(10).build())

//         // entity.getTradesForProgression(1, 1).add((new SkiesVillagerTrades.SingleTrade.Builder()).item(Items.DIAMOND, 1).result(SkiesItems.turquoise_stonebrick, 8).maxUses(5).givenXP(10).build())


//     }
// });




// // for 1.18 pls use: onEvent("morejs.villager.trades", (event) => { ... })
// MoreJSEvents.villagerTrades((event) => {
//     /**
//      * Adds a trade to the given profession.
//      * - `profession`: The profession to add the trade to.
//      * - `level`: The level, the villager needs to offer the trade.
//      * - `input`: The input items for the trade. You can use a single item or an array with two items.
//      * - `output`: The output items for the trade.
//      */
//
//     const trade_vanilla = event.addTrade("minecraft:farmer", 1, TradeItem.of("minecraft:emerald", 10, 11), "minecraft:iron_ingot");
//
// // DOES NOT WORK BECAUSE NOT A VANILLA PROFESSION
//     const trade_blue_skies = event.addTrade("blue_skies:gatekeeper", 1, TradeItem.of("minecraft:emerald", 10, 11), "minecraft:iron_ingot");
//
//     // For 1.19+ only:
//     // If you want to use random selected price ranges, you can use `TradeItem.of(item, min, max)` for input and outputs
//     // event.addTrade("farmer", 1, ["minecraft:diamond", TradeItem.of("minecraft:apple", 10, 19)], "minecraft:acacia_sapling");
//
//
//     // `addTrade` return the trade to set optional data.
//     // trade.maxUses(number); // Sets the maximum amount of uses for the trade.
//     // trade.villagerExperience(number); // Sets the amount of villager experience the trade gives.
//     // trade.priceMultiplier(number); // Sets the price multiplier for the trade.
//     // trade.transform((offer, entity, random) => { ... }); // Transforms the offer when it's generated.
// });

// // VillagerUtils.addTrade('blue_skies:gatekeeper', 1, [
// //     { input: 'minecraft:emerald', count: 5 }, // 5 emeralds as input
// //     { output: 'minecraft:iron_ingot', count: 1 }, // Output item
// //     { xp: 10, maxUses: 10 } // Trade conditions
// // ]);


