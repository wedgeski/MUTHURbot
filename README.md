# MUTHURbot
This is a simple bot for helping to run the Free League 'Alien' RPG on a Discord server.

It supports a small set of commands including:

  !roll   -- Roll task and stress dice
  !roster -- Manage the current PC and monster roster
  !init   -- Manage a simple initiative order for the current roster

## Example commands

  !roll 4                   -- Roll 4 task dice
  !roll 4+1                 -- Roll 4 task dice with 1 stress die
  !roster                   -- List the current roster
  !roster add <entityname>  -- Add <entityname> to the roster (this is assumed to be a PC)
  !roster add               -- List monsters and select to add
  !roster reset             -- Remove all monsters from the roster
  !init roll                -- Randomise all entries in the current roster

# Code Usage
These instructions assume you already have a working instance of Node.js and npm.

Once you've cloned the code, you'll need to do the following.

## Install dependencies
Navigate to the code directory and enter the command:

  npm install

This will install the MUTHURbot dependencies into the code directory.

## Set up your Discord environment
MUTHURbot expends to find a file '.env' in the code directory. The file 
should have only one line and look like:

  DISCORD_TOKEN=<your bot token here>

(ignore the leading whitespace). Use the Discord developer portal to create your 
version of MUTHURbot and generate a bot token. There are many good instructional 
sites on the internet for this!

## Create your image assets
MUTHURbot looks for an 'assets/' directory. From there it will pull dice images 
for use with the '!roll' command.

I've created my own versions of the Alien RPG dice sets but won't be sharing them 
out of respect for Free League copyright. However, you can generate your own 
dice images in a matter of minutes using the simplest of tools; at their most 
basic, they are 64x64px JPEGs with the following naming conventions:

  assets/skill_1_64px.jpg
  ...
  assets/skill_6_64px.jpg
  assets/stress_1_64px.jpg
  ...
  assets/stress_6_64px.jpg