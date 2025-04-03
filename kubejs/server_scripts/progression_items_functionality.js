

BlockEvents.rightClicked(event => {
    const {level} = event;
    const {block} = event;
    const {item} = event;
    var mob;
    if (block.id == 'stalwart_dungeons:awful_ghast_altar') {
        if (item.id != 'kubejs:ghast_key') {
            return
        }
        mob = block.createEntity('stalwart_dungeons:awful_ghast')
    } else if (block.id == 'stalwart_dungeons:nether_keeper_altar') {
        if (item.id != 'kubejs:keeper_key') {
            return
        }
        mob = block.createEntity('stalwart_dungeons:nether_keeper')
    } else {
        return
    }
    mob.spawn()
    level.playSound(null, event.player.x, event.player.y, event.player.z, 'minecraft:entity.wither.spawn', 'master', 1, 0.5)
    item.shrink(1)
})
