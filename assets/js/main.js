$(document).ready(function($) {
var rooms = [""];



function newRooms(){
	var newRooms = $(
		'<div class="col-md-4"></div> <div id="whichWay" class="col-md-4"></div> <div class="col-md-4"></div>');
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
        mainGame();
      });
//Quits the game to the index page
$("#quitDunBtn").on("click", function() {
        alert("Another coward walks away");
        window.location.replace("index.html")
      });

//Main game code
function mainGame(){
	alert("Good luck traveler.");
	$("#mainGameBox").replaceWith('<div class="col-md-12" id="mainGameBox">')

	newRooms();
}
});


