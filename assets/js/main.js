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
	var ehp;
	var eitems = [""];
	var eattack;
	var edamage;
	var edefense;
	var eitemsLoot = [""];
	var eloot;
	var enemyAppear = [];
	var edroppedItem;
	var isEnemyCheck;
	var exp;
	var enemiesArray = [""];


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
	}

	function edropLoot(){
		var eitemsLoot = ["null","HP Potion", "10 Gold"];
		var edroppedItem = eitemsLoot[Math.floor(Math.random() * 2) + 1];
		console.log("edropped " + edroppedItem);
		eitems.push(edroppedItem);
		console.log("enemy items " + eitems);
	}

	//***********************************************************************
	//attack rolls
	function pattackRoll(){
		var pattackr = Math.floor(Math.random() * 20) + 1;
	}

	function pdamageRoll(){
		var pdamager = Math.floor(Math.random() * 6) + 1;
	}

	function eattackRoll(){
		var eattackr = Math.floor(Math.random() * 20) + 1;
	}

	function edamageRoll(){
		var edamager = Math.floor(Math.random() * 6) + 1;
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
		name:"creature",
		eimg:'scr="http://via.placeholder.com/150x150"',
		ehp:8,
		eitems:[""],
		eattack:eattack,
		edamage:edamage,
		edefense:8,
		xp:+3,
	}

	var skeleton = {
		name:"Weak Skeleton",
		eimg:'scr="../img/150x150.png"',
		ehp:10,
		eitems:[""],
		eattack:eattack,
		edamage:edamage,
		edefense:10,
		xp:+5,
	}

	var rat = {
		name:"Large Rat",
		eimg:'scr="../img/150x150.png"',
		ehp:14,
		eitems:[""],
		eattack:eattack,
		edamage:edamage,
		edefense:12,
		xp:+10,
	}

	var thief = {
		name:"Thief",
		eimg:'scr="../img/150x150.png"',
		ehp:16,
		eitems:[""],
		eattack:eattack,
		edamage:edamage,
		edefense:15,
		xp:+20,
	}

	var hellHound = {
		name:"Hell Hound",
		eimg:'scr="../img/150x150.png"',
		ehp:18,
		eitems:[""],
		eattack:eattack,
		edamage:edamage,
		edefense:16,
		xp:+50,
	}
	var enemiesArray = [creature, skeleton, rat, thief, hellHound];

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
	function whatEnemy(){
		var enemyAppear = enemiesArray[Math.floor(Math.random() * 4) + 1];
		if(enemyAppear < enemiesArray[0] || enemyAppear > enemiesArray[5]){
			isEnemy();
		}
		console.log("enemy " + enemyAppear);
		console.log("A " + enemyAppear.name + " has appeared!");
		console.log(enemyAppear.name);
		console.log(enemyAppear.ehp);

		//I need to make this less of a mess. I'm having trouble doing this.
		var enemyAppearText = ('<div class="row"> <div class="col-md-4"></div> <div id="appearEnemy" class="col-md-4"></div> <div class="col-md-4"></div></div>');
		$("#mainGameBox").append(enemyAppearText);
		$("#appearEnemy").append("<h2>" + enemyAppear.name + "</h2>" + '<img class="center-block" id="eimg" ' + enemyAppear.eimg + ' width="150" height="150" >' + "<h3>" + enemyAppear.ehp + " HP</h3>" + '<div class="row"> <div class="col-md-4"></div> <div id="combatBtnDiv" class="col-md-4"><button type="button" id="attackBtn" class="center-block btn btn-danger">Attack!</button></div><div class="col-md-4"></div></div>');
		
	}
	//combat
		
	//combat functions
	//not working with the click function down in the mainGame loop? 
	function combat(){
	
		pattackRoll();
		console.log(pattackr);
		if(pattackr > enemyAppear.edefense){
			pdamageRoll();
			console.log(pdamager);
			enemyAppear.ehp -= pdamager;
		}
	
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
		
		$("#mainGameBox").replaceWith('<div class="col-md-12" id="mainGameBox">')

		newRooms();
		isEnemy();
		if(isEnemyCheck){
				whatEnemy();
				//why does enemyAppear.ehp come up undefined if I just ran the whatEnemy()? I thought that would create the enemy.
				console.log("Test enemy HP: " + enemyAppear.ehp);
			if(enemyAppear.ehp > 0){
				$("#whichWay").hide();

				$("#attackBtn").on("click", combat());
			}
		

		}
		if(!isEnemyCheck){
			$("#whichWay").show();
			dropLoot();
			$(".room").on("click", function(){
			mainGame();
		})
		}
	}
});


