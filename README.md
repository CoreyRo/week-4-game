# Javascript RPG Game
### By Corey Rodems



## Rough todo list

#### new room buttons, NSEW.

### create elements for the start
#### <p id="something"> You arrive at the dungeon entrance. Go in?
#### buttons for "Go in" and "Quit"
#### <p> You see '3' cooridors. One heads 'east' one heads 'north' and one heads 'west'.
#### buttons come up for each direction, player choses a direction and the game rolls

### Navigation game rolls to be made
#### direction choices (NSEW) so 1 - 4 random

#### Enemy? yes or no, so 1-2 random

#### if no enemy, loot? (HP Potion 1 out of 4 chance to appear)

### Combat game rolls to be made
#### initiative roll: if theres an enemy, decides if player or enemy attacks first. 1-20 whoever is higher

#### attack: 1-20, if attack is higher than enemy defense, then the attack hits. If the roll is 20, then damage is x2

#### damage: 1-10 if player attack hits, then roll for damage and subtract from enemy hp.

###Loop through rooms until player HP = 0
### When player dies
#### take number of enemies killed X
#### number of gold earned Y
#### number of HP potions left Z
#### minutes alive M
#### HP left, HP max - HP current = HP left (or H)
#### High score = ((XYZ)M)/ H
