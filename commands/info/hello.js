module.exports = {
    name: "hello",
    category: "info",
    permission: [],
    devOnly: false,
    run: async({client, message, args}) =>{
        message.reply("Hey there")
    }
}