const Discord = require("discord.js")
require("dotenv").config()

const generateImage = require("./generateImage")
const events = require("./handlers/events")

const client = new Discord.Client({
    intents:[
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})

let bot = {
    client,
    prefix: "n.",
    owners: "243172504913313793"
}

client.command = new Discord.Collection()
client.events = new Discord.Collection()

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload)
client.loadCommands = (bot, reload) => require("./handlers/commands") (bot, reload)

client.loadEvents(bot, false)
client.loadCommands (bot, false)

module.exports = bot

/*client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on("messageCreate",(message) =>{
    if(message.content == "hi"){
        message.reply("Hello World")
    }
})

const WelcomeChannelId = "939496977224335390"

client.on("guildMemberAdd", async(member) =>{
    const img = await generateImage(member)
    member.guild.channels.cache.get(WelcomeChannelId).send({
        content: `<@${member.id}> Welcome to the server`,
        files: [img]
    }
})*/

client.login(process.env.TOKEN)