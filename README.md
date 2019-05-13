# Illutia buddy

Currently not under development.

## ???
A proxy between your Illutia client and the server it connects to. It provides some extra features to make your gameplay more enjoyable.


## Usage
Adjust `config.js` to your needs.

`illutia-buddy.bat` is provided to update and start the app. Or just run this project with `node .`

Project will automatically set up and start up the Illutia game client for use.

## Unstable!
This is still highly unstable. I advice against using it as is. I'll make a release branch when I consider it stable.

## Features
* Notification when specified mobs spawn nearby
* Notification when specified items drop nearby
* Fake a command to the client/server with `/fake [client|server] COMMAND`
* Message with the current quest credit count for this session when gaining a quest credit

## What's next
Some things I'm considering adding:

* Auto talk to approaching players (with delay between messages to same player)
* Show meta information (eg: quest credits) of active player on in-game window
* Track quest credits across sessions
* Automatic buffing
