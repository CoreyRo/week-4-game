//**********Javascript Dungeon Survival Game**********
//****************Dungeon Survival RPG****************
//******************By Corey Rodems*******************

// WIP 7/10/17
// Extra To Do

//Shop mechanic 
//More enemies
//Remove all alert()s
//XP lvl up (more health)
//Attack damage image
//Attack sounds


//****************************************************************
	//vars
$(document).ready(function($) {
	$("#hudRow").hide();
	$("#foundEnemy").hide();
	var rooms = [""];
	var newRooms;
	var whichWay;
	var howMany;
	var roomBtn;
	var itemsLoot = [""];
	var droppedItem;
	var edroppedItem;
	var currentXPArray = [];
	//player vars
	// var php;
	var name;
	var eimg;
	var pitems = [""];
	var pattackr;
	var pdamager;
	var pcritDamage;
	var pdefense;
	var xp;
	var gold = 200;
	var potion = 2;
	var eattackr;
	var edamager;
	var edroppedItem;
	var isEnemyCheck;
	var exp = 0;
	var enemiesArray = [""];
	var enemiesKilled = 0;
	var dmgGoldNeed;
	var defGoldNeed;
	var accuGoldNeed;


	//***********************************************************************
	//loot drops




	function dropLoot(){
		$("#goldh3").html("Gold: " + gold);
		$("#hpPotionsh3").html("Potions: " + potion);
		var itemsLoot = ["null","HP Potion", "10 Gold"];
		var droppedItem = itemsLoot[Math.floor(Math.random() * 4) + 1];
			if(droppedItem === "10 Gold"){
				gold += 10;
				$("#goldh3").html("Gold: " + gold);

				console.log("dropped " + droppedItem);
				console.log("Gold: " + gold);
				console.log("Potions: " + potion);
				$(".room-button").hide();

				$("#whichWay").append('<h2 id="itemPopup">You found ' + droppedItem + '!</h2>');
					setTimeout(waitl, 1500);
						function waitl(){
							$("#itemPopup").replaceWith('<h2 id="itemPopup"> </h2>');
							$(".room-button").show();
						}
			}
			
			if(droppedItem === "HP Potion" && potion < 8){
				potion += 1;
				console.log("dropped " + droppedItem);
				console.log("Gold: " + gold);
				console.log("Potions: " + potion);
				$("#hpPotionsh3").html("Potions: " + potion);
				$(".room-button").hide();
				$("#whichWay").append('<h2 id="itemPopup">You found ' + droppedItem + '!</h2>');
					setTimeout(waitl, 1500);
						function waitl(){
							$("#itemPopup").replaceWith('<h2 id="itemPopup"> </h2>');
							$(".room-button").show();
							
						}
			}
	
			else{
				$(".room-button").hide();
				console.log("dropped " + droppedItem);
				console.log("Gold: " + gold);
				console.log("Potions: " + potion);
				// $("#itemPopup").show();
				$("#goldh3").html("Gold: " + gold);
				$("#hpPotionsh3").html("Potions: " + potion);
				$(".room-button").hide(400);
				setTimeout(waitl, 1500);
						function waitl(){
							
							$(".room-button").show();
							
						}
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
	var player = {
		php:25,
		tphp:25,
		pitems:[""],
		pattack:+0,
		pdamage:+0,
		pdefense:10,
		xp:0,
		lvl:1,
		
	}

	
	//***********************************************************************
	//enemies
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


	var skeleton = {
		id:1,
		name:"Weak Skeleton",
		eimg:'assets/img/skel.gif',
		ekilledImg:'assets/img/skelDead.png',

		ehp:10,
		eitems:[""],
		eattack:0,
		edamage:0,
		edefense:1,
		xp:+5,
	}

	var rat = {
		id:2,
		name:"Large Rat",
		eimg:'assets/img/rat.gif',
		ekilledImg:'assets/img/ratDead.png',

		ehp:14,
		eitems:[""],
		eattack:0,
		edamage:2,
		edefense:3,
		xp:+10,
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
		edamage:6,
		edefense:5,
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
		edamage:10,
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
			isEnemyCheck = false;

		}
		if(isEnemyHere === 2){
			console.log("theres something in here")
			isEnemyCheck = true;
		}
	}

	//what type of enemy is in the room?
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
		$("#shopButton").hide();
		if(player.xp < 25){
			var enemyAppear = enemiesArray[Math.floor(Math.random() * 2) + 1];
		}
		else if(player.xp < 50){
			var enemyAppear = enemiesArray[Math.floor(Math.random() * 3) + 1];
		}
		else if(player.xp >= 50){
			var enemyAppear = enemiesArray[Math.floor(Math.random() * 4) + 1];
		}
		

			
		console.log("enemy ", enemyAppear);
		console.log("A " + enemyAppear.name + " has appeared!");
		console.log(enemyAppear.name);
		console.log(enemyAppear.ehp);

		var enemyAppearText = ('<div class="row"> <div id="playerInfo" class="col-md-4"><h2 id="playerAttack"></h2><h2 id="playerDamage"></h2></div> <div id="appearEnemy" class="col-md-4"></div> <div id="enemyInfo" class="col-md-4"><h2 id="enemyAttack"></h2><h2 id="enemyDamage"></h2></div></div>');
		$("#mainGameBox").append(enemyAppearText);
		$("#appearEnemy").append('<h3 id="killed"></h3>');
		$("#killed").hide();
		$("#mainGameBox").show();

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

	// $("#shopButton").on("click", function(){
	// 	alert("Sorry, shop's closed until coded. Try again after the next update!")
	// });

	$("#potionButton").on("click", function(){
		var healthMax = player.tphp - 15;
		if(potion >= 1){
			if(player.php <= healthMax){
				player.php += 15;
			}
			else{
				player.php = player.tphp;
			}
			
			potion = potion - 1;
			$("#hpPotionsh3").replaceWith('<span id="hpPotionsh3">Potions: ' + potion + '</span>');
			$("#playerHP").replaceWith('<h2 id="playerHP">' + player.php + " HP</h3>");
			
			console.log("potions " + potion);
			console.log("healthMax " + healthMax);
			console.log("player.tphp " + player.tphp);
			console.log("player.php " + player.php);
		}
		else{
			setTimeout(waitl, 20);
				function waitl(){
					alert("Out of Health Potions!");
				}
			
		}
			
	});
	function hideShop(){
		setTimeout(closeShop, 1000)
		function closeShop(){
			$("#storeDiv").hide();
			$("#shopButton").hide();
		}
	}
	$("#shopButton").on("click", function(){
		console.log("Open Store");
		$("#storeDiv").show();
		$("#sharpen").show();
		$("#shield").show();
		$("#accu").show();
		// var sharpenClick = false;
		// var shieldClick = false;
		// var accuClick = false;
	});

	$("#dmgBtn").on("click", function(){
		console.log("clicked sharpen");
		
		dmgGoldNeed = 25;
		if(gold >= dmgGoldNeed){
			console.log("sharpen");
			player.pdamage += 2;
			
			gold -= dmgGoldNeed;
			dmgGoldNeed += 25;
			$("#dmgStat").text(player.pdamage);
			console.log(player.pdamge);
			hideShop();
		}
		else{
			alert("not enough gold!");
		}

	});

	//button not working
	$("#defBtn").on("click", function(){
		console.log("clicked");
		defGoldNeed = 25;
		if(gold >= defGoldNeed){
			console.log("harden");
			player.pdefense += 1;
			$("#goldh3").html("Gold: " + gold);
			gold -= defGoldNeed;
			defGoldNeed += 25;
			$("#defStat").text(player.pdefense);
			console.log(player.pdefense);
			hideShop();
	}
	else{
		alert("not enough gold!");
	}

	});

	//button not working
	$("#accBtn").on("click", function(){
		console.log("clicked");
		accuGoldNeed = 25;
		if(gold >= accuGoldNeed){
			console.log("accu");
			player.pattack += 1;
			
			gold -= accuGoldNeed;
			accuGoldNeed += 25;
			$("#defStat").text(player.pattack);
			console.log(player.pattack);
			hideShop();
	}
	else{
		alert("not enough gold!");
	}

	});

		
		// else if(gold >= 25 && shieldClick){
		// 	player.pattack += 2;
		// 	shieldClick = false;
		// 	gold -= 25;
		// 	$("#defStat").text(player.pdefense);
		// }
		// else if(gold >= 25 && accuClick){
		// 	player.pattack += 2;
		// 	accuClick = false;
		// 	gold -= 25;
		// 	$("#accuStat").text(player.pattack);
		// }
		// else{

		// }
	
	
	$("#lvlUpBtn").on("click", function(){
		console.log("playerxp " + player.xp);
		if(player.xp <= 75){
			if(exp >= 25){
					player.lvl += 1;
					player.tphp += 5;
					player.php = player.tphp;
					alert("You've leveled up");

					exp = 0;
					console.log("exp " + exp);
					$("#eimg").show();
					setTimeout(waitm, 600);
					function waitm(){
						mainGame();
					}

					
			}	
			else{
				alert("You can only level up every 25xp!");
			}
		}
		else{
			if(exp >= 75){
					player.lvl += 1;
					player.tphp += 10;
					player.php = player.tphp;
					alert("You've leveled up");

					exp = 0;
					console.log("exp " + exp);
					$("#eimg").show();
					setTimeout(waitn, 600);
					function waitn(){
						mainGame();
					}

					
			}	
			else{
				alert("You can only level up every 75xp!");
			}
		}			
	});




	//combat
		
	//combat functions
	function combat(currentEnemy, playerCombat){
			$("#eimg").show();
		
			$("#attackBtn").hide();
			$("#waitAttackBtn").show();
			setTimeout(waitx, 3000);
				function waitx(){
					$("#waitAttackBtn").hide();
					$("#attackBtn").show();
				}

			

			pattackRoll();
			var ptattack = playerCombat.pattack + pattackr;
			console.log("attack roll " + ptattack);
			console.log("Enemy Defense: " + currentEnemy.edefense);
			console.log("Enemy HP: " + currentEnemy.ehp);
			if(ptattack > currentEnemy.edefense){

				pdamageRoll();
				var ptdamage = playerCombat.pdamage + pdamager;
				console.log("attack damage: " + ptdamage);
				$("#playerDamage").show();
				$("#playerDamage").replaceWith('<h4 id="playerDamage">You did ' + ptdamage +' damage to ' + currentEnemy.name + '!</h4>');
				setTimeout(waitv, 1600);
					function waitv(){
						$("#playerDamage").hide();
					}
				currentEnemy.ehp -= ptdamage;
				console.log("enemyhp: " + currentEnemy.ehp);
				$("#enemyHpH3").replaceWith('<h4 id="enemyHpH3">' + currentEnemy.ehp + " HP</h4>");

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
			if(currentEnemy.ehp >= 1){
					setTimeout(waitz, 1200);
						function waitz(){
										
						eattackRoll();
						console.log("attack roll " + eattackr);
						console.log("Player Defense: " + playerCombat.pdefense);
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
							if(playerCombat.php < 1){
								$("#mainGameBox").hide();
								$("#attackBtn").hide();
								$("#waitAttackBtn").hide();
								$("#playerAttack").hide();
								$("#playerDamage").hide();
								$("#enemyName").hide();
								$("#playerHP").replaceWith('<h2 id="playerHP">YOU ARE DEAD</h2>');
									
								setTimeout(waity, 2800);
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
			else if(currentEnemy.ehp <= 0){
				$("#combatBtnDiv").hide();
				// $("#playerAttack").hide();
				// $("#playerDamage").hide();
				$("#enemyName").hide();
				$("#enemyHpH3").replaceWith('<h3 id="enemyHpH3">' + "0 HP</h3>");
				$("#eimg").replaceWith('<img class="center-block" id="eimg" src="'+ currentEnemy.ekilledImg + '" width="150" height="150">');
				$("#killed").show();
				$("#killed").html("You've killed " + currentEnemy.name + "!");
				setTimeout(waitk, 1800);
				function waitk(){
					$("#killed").html("You gained " + currentEnemy.xp + " XP!");
				}
				enemiesKilled += 1;
				playerCombat.xp += currentEnemy.xp;
				console.log("Player XP: " + playerCombat.xp);
				console.log("Enemies Killed: " + enemiesKilled);
				$("#xph3").html("XP: " + playerCombat.xp);
				exp += currentEnemy.xp;
				console.log("EXP POOL: " + exp);
				$("#enemiesKilledh3").html("Killed: " + enemiesKilled);
				console.log("You've killed " + currentEnemy.name + "!");
					
					if(player.xp <= 75){
						if(exp >= 25){
							setTimeout(waitlv, 10);
							function waitlv(){
								alert("You can level up!")
							}
							regen(currentEnemy);
							$("#lvlUpBtn").show();
							$("#mainGameBox").hide();
							setTimeout(waity, 3000);
							function waity(){
								$("#killed").hide(400);
								$("#eimg").hide();
								
							}
						}
						else{
							regen(currentEnemy);
							setTimeout(waity, 2800);
							function waity(){
								$("#killed").hide(400);
								$("#eimg").hide();
								mainGame();
							}
						}
					}
					else{

						if(exp >= 75){
							setTimeout(waitlv, 10);
							function waitlv(){
								alert("You can level up!")
							}
							regen(currentEnemy);
							$("#lvlUpBtn").show();
							$("#mainGameBox").hide();
							setTimeout(waity, 3000);
							function waity(){
								$("#killed").hide(400);
								$("#eimg").hide();
								
							}
						}
						else{
							regen(currentEnemy);
							setTimeout(waity, 2800);
							function waity(){
								$("#killed").hide(400);
								$("#eimg").hide();
								mainGame();
							}
						}

					}
			}
			
	}

	//***********************************************************************
	//new room loop
	function newRoomsFunc(){
		var newRooms = $(
			'<div class="row"><div class="col-md-12"><span id="newRoomText"></span></div></div><div class="row"> <div class="col-md-4"></div> <div id="whichWay" class="col-md-4"></div> <div class="col-md-4"></div></div>');
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
		$("#newRoomText").html("You see " + rooms.length+ " cooridors on your path. Choose one.");
				
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
		$("#storeDiv").hide();
		$("#shopButton").show();

		$("#dmgStat").text(player.pdamage);
			$("#defStat").text(player.pdefense);
			$("#accuStat").text(player.pattack);
		$("#mainGameBox").show();
		$("#lvlUpBtn").hide();
		$("#foundEnemy").hide();
		console.log(enemiesArray);
		$("#playerHP").html(player.php + " HP");
		$("#playerLevel").html("Player Level: " + player.lvl);
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
			$("#headRow").hide();
			$("#foundEnemy").show();
			$("#newEnemy").html("Something is stirring in the darkness...");
			setTimeout(waith, 2000)
				function waith(){
					$("#foundEnemy").hide(600);

				}
			setTimeout(waite, 2600);
				function waite(){
					
					$("#headRow").show();
				}

			whatEnemy();
			
			
		}
		if(!isEnemyCheck){
			newRoomsFunc();
			$("#whichWay").show();
			dropLoot();
			$(".room").on("click", function(){
			mainGame();

		});
		};
	};
});




