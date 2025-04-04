
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