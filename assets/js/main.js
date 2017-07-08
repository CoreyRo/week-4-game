//**********Javascript Dungeon Survival Game**********
//****************Dungeon Survival RPG****************
//******************By Corey Rodems*******************

//figure out why the enemyAppear.X stuff throwing back undefined.
//create the combat loop.
//create the use potion function.
//create the xp += for score
//create the lose condition HP <=0 then end game and show total score.

//****************************************************************
	//vars
$(document).ready(function($) {
	$("#hudRow").hide();
	var rooms = [""];
	var newRooms;
	var whichWay;
	var howMany;
	var roomBtn;
	var itemsLoot = [""];
	var droppedItem;
	var edroppedItem;
	//player vars
	var php;
	var name;
	var eimg;
	var pitems = [""];
	var pattackr;
	var pdamager;
	var pcritDamage;
	var pdefense;
	var xp = 0;
	var gold = 0;
	var potion = 2;
	//enemy vars
	// var ehp;
	// var eitems = [""];
	// var eattack;
	// var edamage;
	// var edefense;
	// var eitemsLoot = [""];
	// var eloot;
	// var enemyAppear;
	var edroppedItem;
	var isEnemyCheck;
	var exp = 0;
	var enemiesArray = [""];
	var enemiesKilled = 0;


	//***********************************************************************
	//loot drops
	function dropLoot(){
		var itemsLoot = ["null","HP Potion", "10 Gold"];
		var droppedItem = itemsLoot[Math.floor(Math.random() * 2) + 1];
			if(droppedItem === "10 Gold"){
				gold += 10;
			}
			if(droppedItem === "HP Potion"){
				potion += 1;
			}
		console.log("dropped " + droppedItem);
		console.log("Gold: " + gold);
		console.log("Potions: " + potion);
		$("#goldh3").html("Gold: " + gold);
		$("#hpPotionsh3").html("HP Potions: " + potion);
	}

	function edropLoot(){
		var eitemsLoot = ["null","HP Potion", "10 Gold"];
		var edroppedItem = eitemsLoot[Math.floor(Math.random() * 2) + 1];
		console.log("edropped " + edroppedItem);
		eitems.push(edroppedItem);
		console.log("enemy items " + eitems);
	}

	//***********************************************************************
	//player rolls
	function pattackRoll(){
		pattackr = Math.floor(Math.random() * 20) + 1;
	}

	function pdamageRoll(){
		pdamager = Math.floor(Math.random() * 6) + 1;
	}


	//enemy rolls
	function eattackRoll(){
		currentEnemy.eattack = Math.floor(Math.random() * 20) + 1;
	}

	function edamageRoll(){
		currentEnemy.edamage = Math.floor(Math.random() * 6) + 1;
	}

	//***********************************************************************
	//player
	//I don't know if I set this up right.
	var player = {
		php:"25",
		pitems:[""],
		pattack:pattackr,
		pdamage:pdamager,
		pdefense:16,
		xp:0,
		
	}
	//***********************************************************************
	//enemies
	//need to figure out how to make them show up using the enemyArray.name
	//I don't know if I set this up right.
	var creature = {
		id:0,
		name:"creature",
		eimg:'scr="http://via.placeholder.com/150x150"',
		ehp:8,
		eitems:[""],
		eattack:0,
		edamage:0,
		edefense:8,
		xp:+3,
	}

	// function regen({

	// });

	var skeleton = {
		id:1,
		name:"Weak Skeleton",
		eimg:'<img class="center-block" id="eimg" src="assets/img/skel.gif" width="150" height="150">',
		ehp:10,
		eitems:[""],
		eattack:0,
		edamage:0,
		edefense:3,
		xp:+5,
	}

	var rat = {
		id:2,
		name:"Large Rat",
		eimg:'<img class="center-block" id="eimg" src="assets/img/rat.gif" width="150" height="150">',
		ehp:14,
		eitems:[""],
		eattack:0,
		edamage:0,
		edefense:4,
		xp:+10,
	}

	var thief = {
		id:3,
		name:"Dungeon Keeper",
		eimg:'<img class="center-block" id="eimg" src="assets/img/warrior.gif" width="150" height="150">',
		ehp:16,
		eitems:[""],
		eattack:0,
		edamage:0,
		edefense:6,
		xp:+20,
	}

	var demonLord = {
		id:4,
		name:"Demon Lord",
		eimg:'<img class="center-block" id="eimg" src="assets/img/demon.gif" width="150" height="150">',
		ehp:18,
		eitems:[""],
		eattack:0,
		edamage:0,
		edefense:8,
		xp:+50,
	}
	var enemiesArray = [creature, skeleton, rat, thief, demonLord];

	//***********************************************************************
	//is there an enemy in this room?
	function isEnemy(){
		var isEnemyHere = Math.floor(Math.random() * 2) + 1;
		if(isEnemyHere === 1){
			console.log("no enemy in this room")
			alert("No enemies in this room")
			isEnemyCheck = false;

		}
		if(isEnemyHere === 2){
			console.log("theres something in here")
			alert("Something is stirring in the darkness")
			isEnemyCheck = true;
		}
	}

	//what type of enemy is in the room?
	//enemyAppear is throwing back [object object]?
	//Not reseting Object properties when finished?

	//supposed to reset enemy ehp and stats, but it's not
	function regen(current){
		for(var i = 0; i < enemiesArray.length; i++){
			if(current.id === enemiesArray[i].id){
				current = enemiesArray[i];
				skeleton.ehp = 10;
				rat.ehp = 14;
				thief.ehp = 16;
				demonLord.ehp = 18;
				console.log("current enemy for regen: " + current.name);
				console.log("HP now?: " + current.ehp);
			}
		}

	}

	function whatEnemy(){
		var enemyAppear = enemiesArray[Math.floor(Math.random() * 4) + 1];
			
		console.log("enemy ", enemyAppear);
		console.log("A " + enemyAppear.name + " has appeared!");
		console.log(enemyAppear.name);
		console.log(enemyAppear.ehp);

		//I need to make this less of a mess. I'm having trouble doing this.
		var enemyAppearText = ('<div class="row"> <div id="playerInfo" class="col-md-4"><h2 id="playerAttack"></h2><h2 id="playerDamage"></h2></div> <div id="appearEnemy" class="col-md-4"></div> <div id="enemyInfo" class="col-md-4"></div></div>');
		$("#mainGameBox").append(enemyAppearText);
		$("#appearEnemy").append('<h3 id="killed"></h3>');

		$("#appearEnemy").append("<h2>" + enemyAppear.name + "</h2>" + enemyAppear.eimg + '<h3 id="enemyHpH3">' + enemyAppear.ehp + " HP</h3>" + '<div class="row"> <div class="col-md-4"></div> <div id="combatBtnDiv" class="col-md-4"><button type="button" id="attackBtn" class="center-block btn btn-danger">Attack!</button></div><div class="col-md-4"></div></div>');
		console.log("Test enemy HP: " + enemyAppear.ehp);

		$("#attackBtn").on("click", function(){
				combat(enemyAppear);
			});
			
		
	}
	//combat
		
	//combat functions
	//Why doesn't it stop when reaching 0? It gets to 0 or <0 then you must click once more in order to clear.
	//I am trying to get it to end combat as soon as ehp <= 0.
	function combat(currentEnemy){
		
		pattackRoll();
		console.log("attack roll " + pattackr);
		console.log("Enemy Defense: " + currentEnemy.edefense);
		console.log("Enemy HP: " + currentEnemy.ehp);
		// if(currentEnemy.ehp > 0){

			if(pattackr > currentEnemy.edefense){

				pdamageRoll();
				$("#killed").hide();
				console.log("attack damage: " + pdamager);
				$("#playerDamage").replaceWith('Your attack hits ' + currentEnemy.name + '!');

				currentEnemy.ehp -= pdamager;
				console.log("enemyhp: " + currentEnemy.ehp);
				$("#enemyHpH3").replaceWith('<h3 id="enemyHpH3">' + currentEnemy.ehp + " HP</h3>");
				if(currentEnemy.ehp <= 0){
					$("#killed").show();
					$("#killed").text("You've killed " + currentEnemy.name + "!")
					$("#enemyHpH3").replaceWith('<h3 id="enemyHpH3">' + "0 HP</h3>");
					enemiesKilled += 1;
					player.xp += currentEnemy.xp;
					console.log("Player XP: " + player.xp);
					console.log("Enemies Killed: " + enemiesKilled);
					$("#xph3").html("XP: " + player.xp);
					$("#enemiesKilledh3").html("Enemies Killed: " + enemiesKilled);
					console.log("You've killed " + currentEnemy.name + "!");
					regen(currentEnemy);
					setTimeout(wait, 2000);
					function wait(){
						mainGame();
					}
					// mainGame();
				}
				
			}
			else{
				$("#playerAttack").replaceWith(currentEnemy.name + ' dodged your attatck!');
				// $("#missed").
				console.log("Missed attack. Attack roll " + pattackr + " < " + currentEnemy.edefense);
				// alert("Missed!")
			}

		//something is broken around here, you can get free kills, the timing is off maybe?	
		// }
		// else{
		// 	enemiesKilled += 1;
		// 	player.xp += currentEnemy.xp;
		// 	console.log("Player XP: " + player.xp);
		// 	console.log("Enemies Killed: " + enemiesKilled);
		// 	$("#xph3").html("XP: " + player.xp);
		// 	$("#enemiesKilledh3").html("Enemies Killed: " + enemiesKilled);
		// 	alert("You've killed " + currentEnemy.name + "!");
		// 	mainGame();
			
		// }
		// else{
		// 	alert("test else");
		// 	mainGame();
		// }
		
	}

	//***********************************************************************
	//new room loop
	function newRooms(){
		var newRooms = $(
			'<div class="row"> <div class="col-md-4"></div> <div id="whichWay" class="col-md-4"></div> <div class="col-md-4"></div></div>');
		$("#mainGameBox").append(newRooms);
		var howMany = Math.floor(Math.random() * 4) + 1;
		if(howMany === 1){
			var rooms = ["North"]
			}
		if(howMany === 2){
			var rooms = ["North", "East"]
		}
		if(howMany === 3){
			var rooms = ["North", "East", "South"]
		}
		if(howMany === 4){
			var rooms = ["North", "East", "South", "West"]
		}
		console.log("how many rooms " + howMany);
		console.log("rooms " + rooms);
		alert("You see " + rooms.length+ " cooridors on your path. Choose one.");
		for(var i = 0; i < rooms.length; i++){
			var roomBtn = $("<button>");
			roomBtn.addClass("room-button room room-button-color");
			roomBtn.attr("data-room", rooms[i]);
			roomBtn.attr("id", rooms[i]);
			roomBtn.text(rooms[i]);
			$("#whichWay").append(roomBtn);
		}
	}
	//Starts the game
	$("#enterDunBtn").on("click", function() {
			alert("Good luck traveler.");
	        mainGame();
	      });
	//Quits the game to the index page
	$("#quitDunBtn").on("click", function() {
	        alert("Another coward walks away");
	        window.location.replace("index.html")
	      });

	//Main game loop
	function mainGame(){
		console.log(enemiesArray);
		$("#goldh3").html("Gold: " + gold);
		$("#hpPotionsh3").html("HP Potions: " + potion);
		$("#xph3").html("XP: " + player.xp);
		$("#enemiesKilledh3").html("Enemies Killed: " + enemiesKilled);
		$("#hudRow").show();
		$("#mainGameBox").replaceWith('<div class="col-md-12" id="mainGameBox">');
		$("#whichWay").show();
		
		
		isEnemy();
		if(isEnemyCheck){
			$("#whichWay").hide();

			whatEnemy();
			
			
		//Something is broken around here. You can get free kills.
		}
		if(!isEnemyCheck){
			newRooms();
			$("#whichWay").show();
			dropLoot();
			$(".room").on("click", function(){
			mainGame();

		});
		}
	}
});


