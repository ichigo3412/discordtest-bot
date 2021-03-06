const Canvas = require ("canvas")
const Discord = require ("discord.js")

const background = "https://i.imgur.com/YQjLU0n.jpg?1"

const dim = {
    width: 1200,
    height: 675,
    margin: 50
}

const av = {
    size: 256,
    x: 480,
    y: 170
}

const generateImage = async (member) => {
    let username = member.user.username
    let discrim = member.user.discriminator
    let avatarURL = member.user.displayAvatarURL({format: "png" , dynamic : false, size: av.size})

    const canvas = Canvas.createCanvas(dim.width,dim.height)
    const ctx = canvas.getContext("2d")
    
    //draw in the background
    const backImg = await Canvas.loadImage(background)
    ctx.drawImage(backImg, 0 , 0)

    //draw black tinted box
    ctx.fillStyle = "rgba (0,0,0,0.2)"
    ctx.fillRect(dim.margin, dim.margin, dim.width - 2 * dim.margin, dim.height - 2 * dim.margin)

    const avImg = await Canvas.loadImage(avatarURL)
    ctx.save()

    ctx.beginPath()
    ctx.arc (av.x + av.size / 2, av.y + av.size / 2, av.size / 2, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()

    ctx.drawImage(avImg, av.x, av.y)
    ctx.restore()

    //write in text
    ctx.fillStyle = "white"
    ctx.textAlign = "center"

    //draw in welcome
    ctx.font = " 50px Comic Sans"
    ctx.fillText("Welcome", dim.width / 2, dim.margin + 70)

    //draw in username
    ctx.font = " 60px Comic Sans"
    ctx.fillText (username + "#" +discrim, dim.width / 2, dim.height - dim.margin - 125)

    //draw in to the server
    ctx.font = "40px Comic Sans"
    ctx.fillText ("to the server", dim.width / 2, dim.height - dim.margin - 50)

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png")
    return attachment
}

module.exports = generateImage