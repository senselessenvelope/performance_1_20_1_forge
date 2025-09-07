
// function getAllFuncs(toCheck) {
//     const props = [];
//     let obj = toCheck;
//     do {
//         props.push(...Object.getOwnPropertyNames(obj));
//     } while (obj = Object.getPrototypeOf(obj));
    
//     return props.sort().filter((e, i, arr) => { 
//        if (e!=arr[i+1] && typeof toCheck[e] == 'function') return true;
//     });
// }


// // testing MoreJS to see if can add trades to modded blue_skies:gatekeeper
// MoreJSEvents.villagerTrades(event => {
//     // event.addTrade("blue_skies:gatekeeper", 2, Item.of("minecraft:diamond", 10), "minecraft:stick")
//     // const trade = event.addTrade(profession, level, [...input], output);
//     const profession = event.villager.id
//     console.log(profession)
//     // const trade = event.addTrade('blue_skies:gatekeeper', 1, [
//     //     Item.of("minecraft:diamond", 10)
//     // ], 'minecraft:stick');
// })


// EntityEvents.spawned((event) => {
//     const entity = event.entity;

    
//     // console.log(`Entity Spawned: ${entity}`);
//     // console.log(`Entity Spawned: ${entity.type}`);
    
//     // Check if the spawned entity is the Blue Skies NPC (e.g., Gatekeeper)
//     if (entity.type === "blue_skies:gatekeeper") {
//         // // need to do something to the class, but more likely the object, to edit its trades
//         // // console.log(entity.class.getProfessions())
//         // console.log(entity.offers) // THIS KINDA WORKS, need to add the offer for portal blocks and shit, returns an arraylist of trades
//         // console.log(entity.offers.toString()) // this returns a list of trade objects, need to make a new MerchantOffer and add it to trades
//         // // trades.add((new SkiesVillagerTrades.SingleTrade.Builder()).item(Items.f_42517_, 1).result(SkiesItems.blue_journal, 1).maxUses(50).givenXP(0).build());
        

//         // console.log(Object.getOwnPropertyNames(entity))


//         // // // offers/trades is not public, so cannot access
//         // // console.log(entity.offers.add(VillagerUtils.createSimpleTrade(["minecraft:emerald"], "minecraft:diamond"))) // returns true
//         // // console.log(entity.trades) // trades is undefined, and doing toString of undefined does nothing
        
//         // console.log(entity.getTradesForProgression(1, 1)) // used method for GateKeeperEntity object (using two placeholder ints)
//         // console.log(entity.getTradesForProgression(1, 1).get(0)) // first SingleTrade object in trades arraylist
//         // // // source code (from decompiled SkiesVillagerTrades class):
//         // // // trades.add((new SkiesVillagerTrades.SingleTrade.Builder()).item(Items.f_42616_, Math.min(64, Math.max(1, BlueSkiesConfig.COMMON.getZealLighterCost()))).result(SkiesItems.zeal_lighter, 1).maxUses(5).givenXP(10).build());
        


//         // // // see wiki for info on loading Java classes:
//         // // //      https://kubejs.com/wiki/other/major-updates/6.0#java
//         // // const CactusBlock = Java.loadClass('net.minecraft.world.level.block.CactusBlock')
//         // // console.log(CactusBlock);


//         // loading blue skies classes (for editing trades and adding objects)
//         let SkiesVillagerTrades = Java.loadClass('com.legacy.blue_skies.entities.villager.SkiesVillagerTrades')
//         let SkiesBlocks = Java.loadClass('com.legacy.blue_skies.registries.SkiesBlocks')

//         // console.log(Object.getOwnPropertyNames(SkiesVillagerTrades))


//         // console.log(getAllFuncs(entity))
//         // getAllFuncs(entity)



//         // // entity.getTradesForProgression(1, 1).add((new SkiesVillagerTrades.SingleTrade.Builder()).item(Items.DIAMOND, 1).result(SkiesItems.turquoise_stonebrick, 8).maxUses(5).givenXP(10).build())

//         // // not adding, this is just getting the trades array list that i am then trying to add to, wouldnt do anything tho because this method 
//         // // is called every time when trading afaik, or every tick, and the method is being called internally within the class, so this is just 
//         // // giving you the list, but you modifying it isnt going to affect the villager because methods within the class are calling this method 
//         // // every time its needed anyway, recreating the list with the hard-coded 2 items that the villager offers
//         // entity.getTradesForProgression(0, 0).add((new SkiesVillagerTrades.SingleTrade.Builder()).item(Items.DIAMOND, 1).result(SkiesBlocks.turquoise_stonebrick, 8).maxUses(5).givenXP(10).build())
//         // // entity.offers.add((new SkiesVillagerTrades.SingleTrade.Builder()).item(Items.DIAMOND, 1).result(SkiesBlocks.turquoise_stonebrick, 8).maxUses(5).givenXP(10).build())


//         // trying to use MerchantOffer objects (which require ItemStack objects)
//         let MerchantOffer = Java.loadClass('net.minecraft.world.item.trading.MerchantOffer')
//         let ItemStack = Java.loadClass('net.minecraft.world.item.ItemStack')
//         let ArrayList = Java.loadClass('java.util.ArrayList')

        
//         console.log("before")
//         console.log(typeof entity)

//         // // console.log(Object.getOwnPropertyNames(entity))

//         // console.log(Object.keys(entity))


//         // // console.log(entity.overrideOffers(new MerchantOffer(new ItemStack(Items.DIAMOND, 1), new ItemStack(Items.DIAMOND, 1), new ItemStack(SkiesBlocks.turquoise_stonebrick, 8), 5, 10, 0.05)))
//         // // console.log(entity.overrideOffers(entity.offers))


//         console.log(entity.offers)
//         // NEW OFFER CREATED
//         let new_offer = new MerchantOffer(new ItemStack(Items.DIAMOND, 1), new ItemStack(Items.DIAMOND, 1), new ItemStack(SkiesBlocks.turquoise_stonebrick, 8), 5, 10, 0.05)
        
//         console.log(new_offer)

//         // DOES NOT WORK -- TRYING TO CHANGE OFFER TO JUST BE MY CUSTOM OFFER
//         console.log(entity.overrideOffers(new ArrayList(new_offer)))


//         // console.log(entity.overrideOffers(new ArrayList(new_offer)))
//         console.log("after")


//         // console.log('BEFORE ADDING ITEM (should be 2 items)')
//         // for (let i = 0; i < entity.offers.length; i++) {
//         //     console.log(entity.offers.get(i).toString())
//         // }

//         // // new MerchantOffer(new ItemStack(this.itemGiven1.m_41720_(), this.itemGiven1Count), new ItemStack(this.itemGiven2.m_41720_(), this.itemGiven2Count), new ItemStack(this.itemSold.m_41720_(), this.soldItemCount), this.maxUses, this.givenXP, this.priceMultiplier);

//         // // (new MerchantOffer(new ItemStack(Items.DIAMOND, 1), new ItemStack(Items.DIAMOND, 1), new ItemStack(SkiesBlocks.turquoise_stonebrick, 8), 5, 10, 0.05))



//         // // // adding example (does not actually add anything for some reason)
//         // // entity.offers.add((new MerchantOffer(new ItemStack(Items.DIAMOND, 1), new ItemStack(Items.DIAMOND, 1), new ItemStack(SkiesBlocks.turquoise_stonebrick, 8), 5, 10, 0.05)))
//         // // // // below returns true, so it just means that it added to offers, just not sure if offers is actually being used for the trades
//         // // // console.log(entity.offers.add((new MerchantOffer(new ItemStack(Items.DIAMOND, 1), new ItemStack(Items.DIAMOND, 1), new ItemStack(SkiesBlocks.turquoise_stonebrick, 8), 5, 10, 0.05))))

//         // // console.log('AFTER ADDING ITEM (should be 3 items)')
//         // // for (let i = 0; i < entity.offers.length; i++) {
//         // //     console.log(entity.offers.get(i).toString())
//         // // }



//         // entity.offers.remove(0)

//         // console.log('AFTER REMOVING ITEM (should be 1 item)')
//         // for (let i = 0; i < entity.offers.length; i++) {
//         //     console.log(entity.offers.get(i).toString())
//         // }





//         // // let SkiesVillagerTrades = Java.type('com.legacy.blue_skies.entities.villager.SkiesVillagerTrades')

//         // // // entity.getTradesForProgression(1, 1).add((new SkiesVillagerTrades.SingleTrade.Builder()).item(Items.DIAMOND, 1).result(SkiesItems.turquoise_stonebrick, 8).maxUses(5).givenXP(10).build())

//         // // entity.getTradesForProgression(1, 1).add((new SkiesVillagerTrades.SingleTrade.Builder()).item(Items.DIAMOND, 1).result(SkiesItems.turquoise_stonebrick, 8).maxUses(5).givenXP(10).build())


//     }
// });