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
	// var php;
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
	var eattackr;
	var edamager;
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
		// $("#itemPopup").show();
		$("#goldh3").html("Gold: " + gold);
		$("#hpPotionsh3").html("HP Potions: " + potion);
		$("#whichWay").append('<h2 id="itemPopup">You found ' + droppedItem + '!</h2>');
			setTimeout(waitl, 1500);
				function waitl(){
					$("#itemPopup").remove();
				}
		}


	// function edropLoot(){
	// 	var eitemsLoot = ["null","HP Potion", "10 Gold"];
	// 	var edroppedItem = eitemsLoot[Math.floor(Math.random() * 2) + 1];
	// 	console.log("edropped " + edroppedItem);
	// 	eitems.push(edroppedItem);
	// 	console.log("enemy items " + eitems);
	// }

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
		eattackr = Math.floor(Math.random() * 20) + 1;
	}

	function edamageRoll(){
		edamager = Math.floor(Math.random() * 6) + 1;
	}

	//***********************************************************************
	//player
	//I don't know if I set this up right.
	var player = {
		php:25,
		pitems:[""],
		pattack:pattackr,
		pdamage:pdamager,
		pdefense:10,
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
		ekilledImg:'<img class="center-block" id="eimg" src="assets/img/warriorDead.gif" width="150" height="150">',

		ehp:8,
		eitems:[""],
		eattack:0,
		edamage:edamager += 0,
		edefense:8,
		xp:+3,
	}

	// function regen({

	// });

	var skeleton = {
		id:1,
		name:"Weak Skeleton",
		eimg:'assets/img/skel.gif',
		ekilledImg:'assets/img/skelDead.png',

		ehp:10,
		eitems:[""],
		eattack:0,
		edamage:0,
		edefense:2,
		xp:+2,
	}

	var rat = {
		id:2,
		name:"Large Rat",
		eimg:'assets/img/rat.gif',
		ekilledImg:'assets/img/ratDead.png',

		ehp:14,
		eitems:[""],
		eattack:0,
		edamage:1,
		edefense:3,
		xp:+5,
	}

	var thief = {
		id:3,
		name:"Dungeon Keeper",
		eimg:'assets/img/warrior.gif',
		ekilledImg:'assets/img/warriorDead.png',
		edmgImg:'assets/img/warriorDmg.gif',
		ehp:16,
		eitems:[""],
		eattack:0,
		edamage:3,
		edefense:6,
		xp:+25,
	}

	var demonLord = {
		id:4,
		name:"Demon Lord",
		eimg:'assets/img/demon.gif',
		ekilledImg:'assets/img/demonDead.png',

		ehp:20,
		eitems:[""],
		eattack:0,
		edamage:6,
		edefense:8,
		xp:+50,
	}
	var enemiesArray = [creature, skeleton, rat, thief, demonLord];

	//***********************************************************************
	//is there an enemy in this room?
	function isEnemy(){
		var isEnemyHere = Math.floor(Math.random() * 2) + 1;
		if(isEnemyHere === 1){
			console.log("no enemy in this room");
			setTimeout(waitl, 1000);
				function waitl(){
					alert("No enemies in this room");
				}
			isEnemyCheck = false;

		}
		if(isEnemyHere === 2){
			console.log("theres something in here")
			alert("Something is stirring in the darkness");
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
	//***************************Difficulty Scale***************************
	function whatEnemy(){
		if(player.xp <= 30){
			var enemyAppear = enemiesArray[Math.floor(Math.random() * 2) + 1];
		}
		else if(player.xp >= 30){
			var enemyAppear = enemiesArray[Math.floor(Math.random() * 3) + 1];
		}
		else if(player.xp >= 50){
			var enemyAppear = enemiesArray[Math.floor(Math.random() * 4) + 1];
		}
		

			
		console.log("enemy ", enemyAppear);
		console.log("A " + enemyAppear.name + " has appeared!");
		console.log(enemyAppear.name);
		console.log(enemyAppear.ehp);

		//I need to make this less of a mess. I'm having trouble doing this.
		var enemyAppearText = ('<div class="row"> <div id="playerInfo" class="col-md-4"><h2 id="playerAttack"></h2><h2 id="playerDamage"></h2></div> <div id="appearEnemy" class="col-md-4"></div> <div id="enemyInfo" class="col-md-4"><h2 id="enemyAttack"></h2><h2 id="enemyDamage"></h2></div></div>');
		$("#mainGameBox").append(enemyAppearText);
		$("#appearEnemy").append('<h3 id="killed"></h3>');
		$("#killed").hide();


		$("#appearEnemy").append("<h2 id=enemyName>" + enemyAppear.name + "</h2>");
		$("#appearEnemy").append('<img class="center-block" id="eimg" src="'+ enemyAppear.eimg + '" width="150" height="150">');
		$("#appearEnemy").append('<h3 id="enemyHpH3">' + enemyAppear.ehp + ' HP</h3>');
		$("#appearEnemy").append('<div class="row"> <div class="col-md-4"></div> <div id="combatBtnDiv" class="col-md-4"><button type="button" id="attackBtn" class="center-block btn btn-danger">Attack!</button></div><div class="col-md-4"></div></div>');
		$("#appearEnemy").append('<div class="row"> <div class="col-md-4"></div> <div id="combatBtnDiv" class="col-md-4"><button type="button" id="waitAttackBtn" class="center-block btn btn">Wait...</button></div><div class="col-md-4"></div></div>');
		$("#waitAttackBtn").hide();
		console.log("Test enemy HP: " + enemyAppear.ehp);
		$("#eimg").show();
		$("#enemyInfo").show();
		$("#playerAttack").show();
		$("#playerDamage").show();
		$("#enemyDamage").show();
		$("#enemyAttack").show();
		
		$("#attackBtn").on("click", function(){
				combat(enemyAppear, player);
			});
			
		
	}
	$("#potionButton").on("click", function(){
		var currentHP = 25 - player.php;
		if(potion >= 1){
			player.php += currentHP;
			potion = potion - 1;
			$("#hpPotionsh3").replaceWith('<h3 id="hpPotionsh3">Potions: ' + potion + '</h3>');
			$("#playerHP").replaceWith('<h2 id="playerHP">' + player.php + " HP</h3>");
			console.log("heal " + currentHP);
			console.log("potions " + potion);
		}
		else{
			setTimeout(waitl, 20);
				function waitl(){
					alert("Out of Health Potions!");
				}
			
		};
			
	});




	//combat
		
	//combat functions
	//Why doesn't it stop when reaching 0? It gets to 0 or <0 then you must click once more in order to clear.
	//I am trying to get it to end combat as soon as ehp <= 0.
	function combat(currentEnemy, playerCombat){

		$("#attackBtn").hide();
		$("#waitAttackBtn").show();
		setTimeout(waitx, 2800);
			function waitx(){
				$("#waitAttackBtn").hide();
				$("#attackBtn").show();
			}

		

		pattackRoll();
		console.log("attack roll " + pattackr);
		console.log("Enemy Defense: " + currentEnemy.edefense);
		console.log("Enemy HP: " + currentEnemy.ehp);
		if(pattackr > currentEnemy.edefense){

			pdamageRoll();
			console.log("attack damage: " + pdamager);
			$("#playerDamage").show();
			$("#playerDamage").replaceWith('<h4 id="playerDamage">You did ' + pdamager +' damage to ' + currentEnemy.name + '!</h4>');
			setTimeout(waitv, 1600);
				function waitv(){
					$("#playerDamage").hide();
				}
			currentEnemy.ehp -= pdamager;
			console.log("enemyhp: " + currentEnemy.ehp);
			$("#enemyHpH3").replaceWith('<h4 id="enemyHpH3">' + currentEnemy.ehp + " HP</h4>");
		

		//enemy
		if(currentEnemy.ehp > 1){
			setTimeout(waitz, 1200);
				function waitz(){
								
				eattackRoll();
				console.log("attack roll " + eattackr);
				console.log("Player Defense: " + playerCombat.defense);
				console.log("Enemy HP: " + playerCombat.php);
				if(eattackr > playerCombat.pdefense){

					edamageRoll();
					var enemyDamages = edamager + currentEnemy.edamage;
					console.log("edamager " + edamager);
					console.log("currentEnemy.edamage " + currentEnemy.edamage);
					console.log(enemyDamages + " enemy damage");

					console.log("attack damage: " + enemyDamages);
					$("#enemyDamage").show();
					$("#enemyDamage").replaceWith('<h4 id="enemyDamage">' + currentEnemy.name + ' did ' + enemyDamages +' damage to you!</h4>');
					setTimeout(waitb, 1300);
						function waitb(){
							$("#enemyDamage").hide();
						}
					playerCombat.php -= enemyDamages;
					console.log("player hp: " + playerCombat.php);
					$("#playerHP").replaceWith('<h2 id="playerHP">' + playerCombat.php + " HP</h3>");
				}
				else{
					$("#enemyAttack").show();
					$("#enemyAttack").replaceWith('<h4 id="enemyAttack">' + currentEnemy.name + ' Missed their attack!</h4>');
					console.log("Missed attack. Attack roll " + eattackr + " < " + playerCombat.pdefense);
					setTimeout(waitg, 1200);
						function waitg(){
							$("#enemyAttack").hide();
						}
				}
			}
		}
		if(currentEnemy.ehp <= 0){
			$("#combatBtnDiv").hide();
			// $("#waitAttackBtn").hide();
			$("#playerAttack").hide();
			$("#playerDamage").hide();
			$("#enemyName").hide();
			$("#enemyHpH3").replaceWith('<h3 id="enemyHpH3">' + "0 HP</h3>");
			$("#eimg").replaceWith('<img class="center-block" id="eimg" src="'+ currentEnemy.ekilledImg + '" width="150" height="150">');
			$("#killed").show();
			$("#killed").text("You've killed " + currentEnemy.name + "!")
			enemiesKilled += 1;
			playerCombat.xp += currentEnemy.xp;
			console.log("Player XP: " + playerCombat.xp);
			console.log("Enemies Killed: " + enemiesKilled);
			$("#xph3").html("XP: " + playerCombat.xp);
			$("#enemiesKilledh3").html("Enemies Killed: " + enemiesKilled);
			console.log("You've killed " + currentEnemy.name + "!");
			
			
			regen(currentEnemy);
			setTimeout(waity, 2500);
			function waity(){
				$("#eimg").hide();
				mainGame();
			}
		}
		else if(playerCombat.php <= 0){
			$("#attackBtn").hide();
			$("#waitAttackBtn").hide();
			$("#playerAttack").hide();
			$("#playerDamage").hide();
			$("#enemyName").hide();
			$("#playerHP").replaceWith('<h3 id="playerHP">YOU ARE DEAD</h3>');
				
			setTimeout(waity, 2500);
			function waity(){
				var death = confirm("You have been killed. Play again?");
				if (death){
					window.location.replace("game.html")
				}
				else{
					window.location.replace("index.html")
				}
			}
		}

	}
		
		else{
			$("#playerAttack").show();
			$("#playerAttack").replaceWith('<h3 id="playerAttack">' + currentEnemy.name + ' dodged your attack!</h3>');
			console.log("Missed attack. Attack roll " + pattackr + " < " + currentEnemy.edefense);
			setTimeout(waitm, 1500);
				function waitm(){
					$("#playerAttack").hide();
				}
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
		setTimeout(waitl, 20);
				function waitl(){
					alert("You see " + rooms.length+ " cooridors on your path. Choose one.");
				}
		
		for(var i = 0; i < rooms.length; i++){
			var roomBtn = $("<button>");
			roomBtn.addClass("btn btn-default btn-lg room-button room room-button-color");
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
		$("#playerHP").html(player.php + " HP");
		$("#goldh3").html("Gold: " + gold);
		$("#hpPotionsh3").html("Potions: " + potion);
		$("#xph3").html("XP: " + player.xp);
		$("#enemiesKilledh3").html("Kills: " + enemiesKilled);
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
		};
	};
});




