$(document).ready(function($) {

//makes warrior class
function makeWarriorClass(){
var pickClassDiv = ("<div>")
pickClassDiv.addClass("col-md-4 warriorDiv");

var pickClassButton = $("<button>");
pickClassButton.addClass("btn btn-default");
pickClassButton.html("Pick");



$("#mainGameBox").append(pickClassDiv);
}

//makes paladin class
function makePaladinClass(){
var pickClassButton = $("<button>");
pickClassButton.addClass("btn btn-default");
pickClassButton.html("Pick");

$("#mainGameBox").append(pickClassButton);
}

//makes thief class
function makeThiefClass(){
var pickClassButton = $("<button>");
pickClassButton.addClass("btn btn-default");
pickClassButton.html("Pick");

$("#mainGameBox").append(pickClassButton);
}

makeWarriorClass();
makePaladinClass();
makeThiefClass();

});