<img src="https://repository-images.githubusercontent.com/461631152/e6d159a6-611c-4dbc-beaa-399c79076b9f" width="400">

# 🦉 Brindibot
Brindibot is a Discord bot made with discord.js. The name is a portmanteau word of the Pokemon Brindibou (french name of Rowlet) with the word Bot.

## Functionalities 🧰
### List of available commands / subcommands
**/rm add** _`msg_id`  `role` `emoji`_  
_Types: String, Role, String_  
_Notes:_ This command create a reaction on a message that gives roles when a user react with it.

**/rm del** _`msg_id` `(role)` `(emoji)`_  
_Types: String, (Role), (String)_  
_Notes:_ If no optional args are specified, ***all*** emoji<->roles associations on the specified message will be removed.

**/roll** _`(min)` `(max)`_  
_Types: (Integer), (Integer)_  
_Notes:_ _/roll_ will returns a number between 1 and 100 (included) or between the optional arguments. If one of the args is not provided min or max will be replaced respectively by 1 and 100.

**/settings** _`language`_  
_Types: String_  
_Notes:_ Change the language that the bot use in a server.


## Install 🔧
### Download

### Setup the database
Setup a local MongoDB server or use an online service.

### Config (.env)
Don't forget to create a `.env` in the project root folder

```
	DISCORD_CLIENT_ID = client_id
	DISCORD_GUILD_ID = guild_id
	DISCORD_TOKEN = discord_token
	DB_USERNAME = username
	DB_URL = mongodb:abc
```

### Run

#### Development environment
1. Run `node .\deploy-commands.js`
2. To launch the bot, run `node .`

#### Production environment
1. In `deploy-commands.js` (project root folder), uncomment `// Routes.applicationGuildCommands(clientId),` and comment the above line `Routes.applicationGuildCommands(clientId, guildId),`
2. Run `node .\deploy-commands.js`
3. To launch the bot, run `node .`

#### Adding the bot to your server
`https://discord.com/oauth2/authorize?client_id=CLIENT_ID&permissions=PERMISSIONS_INTEGER&scope=bot%20applications.commands`  

(Don't forget the `%20applications.commands` at the end of the link)

**Important:** Once the bot is added, in *Server parameter > Roles* you need to ensure that the role of the bot is upper in the list than the roles that you want to make it gives.

## Notes 📝
### About
The bot is developed with Discord.js v13.  
This project use a linter, rules are stored in `.eslintrc.json`.

### Credits
- Command and event handler: discord.js Guide
- Database.js: Tyler Potts

### To Do
- /help command
- Role Manager: add a list command
- Button Management
- A remind me command
- Time Zone Converter
- ✅ Localisation (Slash commands can't be translated yet)

### Changelog
<details>
  <summary>See changelog</summary>

*Brindibot v1.1.0*
- `/roll` have now two optional args to let the user decide range of the roll.
- Localisation system; to change the language the bot use type `/settings language`.  
Supported languages: English (en) and French (fr).

*Brindibot v1.0.0* (release)

</details>

## See also 🔗
- Discord.js

discord.js Guide - [discordjs.guide](https://discordjs.guide)  
discord.js Setting up a linter - [discordjs.guide/preparations/setting-up-a-linter.html#installing-a-code-editor](https://discordjs.guide/preparations/setting-up-a-linter.html#installing-a-code-editor)  
discord.js Documentation - [discord.js.org/#/docs/main/stable/general/welcome](https://discord.js.org/#/docs/main/stable/general/welcome)

- Database

mongoosejs - [mongoosejs.com](https://mongoosejs.com)  
Free online MongoDB database - [mongodb.com/atlas](https://www.mongodb.com/atlas)

- Miscellaneous

A nice video tutorial series by Tyler Potts to make a Discord Bot  (Node.js, Discord.js v13) - [youtube.com/watch?v=Qc9uPgGmQ7I](https://www.youtube.com/watch?v=Qc9uPgGmQ7I)  
A website to preview your Markdowns files - [stackedit.io](https://stackedit.io/)  
Calculate a Permissions integer [discordapi.com/permissions.html](https://discordapi.com/permissions.html)
