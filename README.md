# MUTHURbot
This is a simple and UNOFFICIAL bot for helping to run the Free League 'Alien' RPG on a Discord server.

To be clear, this is a personal project, and this code is published with permission from Free League.

![Example dice roll](/images/roll_example.png)

It's designed for you to clone, modify (if you like), and run as your own instance. 
Instructions on getting a Discord developer login and creating a simple chat bot are 
easily found on the Discord developer site.

MUTHURbot supports a small set of commands including:

  * !roll   -- Roll task and stress dice
  * !push   -- Re-rolls the previous roll with an extra Stress die (once only)
  * !roster -- Manage the current PC and monster roster
  * !init   -- Manage a simple initiative order for the current roster

## Example commands

  * !roll 4                   -- Roll 4 task dice
  * !roll 4+1                 -- Roll 4 task dice with 1 stress die
  * !push                     -- Pushes the previous roll
  * !roster                   -- List the current roster
  * !roster add <entityname>  -- Add <entityname> to the roster (this is assumed to be a PC)
  * !roster add               -- List monsters and select to add
  * !roster reset             -- Remove all monsters from the roster
  * !init roll                -- Randomise all entries in the current roster

# Usage
These instructions assume you already have a working instance of Node.js and npm.

Once you've cloned the code, you'll need to do the following:

  1. Install dependencies
  2. Set up your Discord environment
  3. Create your image assets
  4. Create your PC roster

## Install dependencies
Navigate to the code directory and enter the command:

`npm install`

This will install the MUTHURbot dependencies into the MUTHURbot directory.

## Set up your Discord environment
MUTHURbot expends to find a file '.env' in the code directory. The file 
should have only one line and look like:

`DISCORD_TOKEN=<your bot token here>`

Use the Discord developer portal to create your version of MUTHURbot and 
generate a bot token. There are many good sources on the internet for this.

## Create your image assets
MUTHURbot looks for an 'assets/' directory. From there it will pull dice images 
for use with the '!roll' command.

I've created my own versions of the Alien RPG dice sets but won't be sharing them 
out of respect for Free League copyright. However, you can generate your own 
dice images in a matter of minutes using the simplest of tools; at their most 
basic, they are 64x64px JPEGs with the following naming conventions:

`skill_[1-6]_64px.jpg` and `stress_[1-6]_64px.jpg`

## Create your stored rosters
MUTHRbot will search for PC rosters within the 'rosters/' directory.

A roster resource looks like this:
```javascript
{
    "name": "Sample roster",
    "members": [
        {
            "name": "Bob",
            "label": "Smith (Bob)"
        },
        {
            "name": "Andrea",
            "label": "Jones (Andrea)"
        }
}
```
Use '!roster load' to load one of the available rosters into MUTHRbot.
