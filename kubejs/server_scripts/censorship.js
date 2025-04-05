
PlayerEvents.decorateChat(event => {
    // Replace swears
    event.setMessage(event.message.replace('fuck', 'frick'))
    event.setMessage(event.message.replace('shit', 'poop'))
    event.setMessage(event.message.replace('dick', 'peepee'))
    event.setMessage(event.message.replace('pussy', 'thingy'))
    event.setMessage(event.message.replace(' ass', ' booty'))
    event.setMessage(event.message.replace('bitch', 'lady'))
    event.setMessage(event.message.replace('whore', 'woman'))
    event.setMessage(event.message.replace('slut', 'lass'))
    event.setMessage(event.message.replace('pedophile', 'diddler'))
    event.setMessage(event.message.replace('pedo', 'nonce'))
    event.setMessage(event.message.replace('retard', 'dummy'))
})