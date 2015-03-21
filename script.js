
myTurn = true;

window.onload = function()  {
	var col = document.getElementsByClassName("column")

	for(var i = 0; i < col.length; i++) {
		col[i].addEventListener("click", sendClickedField);
	}

	generateGameID();
	activateGameFunctions();
	pollNextField(0);
};

function generateGameID() {

	var loc = window.location.toString();
	var n =	loc.indexOf("gameID=");
	var gameIdIsDefined = n != -1;
	if(gameIdIsDefined) {
//		alert("game is defined");
		var currentGameID = loc.substring(n + 7);	

		/*TODO check if game id is "valid" currently : all ids under current id are valid
		 * if not valid, get the fuck out of here!*/

		/*check if this player is already in this game*/
		if(getCookie("gameID") == currentGameID) {
			setGameIDURL();
			$("#hide").show();
			return;
		}

		/*check if this game really exists, so you are the second player*/
		if(getTheRightPlayer(currentGameID) == "U") {
			document.cookie = "gameID=" + currentGameID;
			document.cookie = "player=" + "U";
			//alert("your are the second player");
			myTurn = false;
			setGameIDURL();
			$("#hide").show();
		} 
		/* create a new one */	
		else {
			createNewGame();
		}
		/* make stored files unvalid!*/
	} else {
		createNewGame();
	}
}

function createNewGame() {
//	alert("your are the first player");
	   $.get(
		  "generateGameID.php",
		  function (gameID) {
			var stateObj = { foo: "game.php?gameID=" + gameID };
			history.pushState(stateObj, "page 2", "game.php?gameID=" + gameID);
			document.cookie = "gameID=" + gameID;
			document.cookie = "player=" + "X"; 
			setGameIDURL();
			showPrompt();
		  }
	  );
	   myTurn = true;
}

function setGameIDURL() {
	document.getElementById("gameIDField").setAttribute("value", 
			"http://deoldsax.de/tictacto/game.php?gameID=" + getCookie("gameID"));
}

function showPrompt() {
	var gameIDPrompt = document.getElementById("gameIDPrompt");
	gameIDPrompt.setAttribute("value", "http://deoldsax.de/tictacto/game.php?gameID=" + getCookie("gameID"));

	$("#prompt").fadeIn();
	gameIDPrompt.select();
}

function getTheRightPlayer(id) {
	var result = null;
	var query = "getTheRightPlayer.php?gameID=" + id;
	$.ajax({
		url: query,
		type: "get",
		async: false,
		success: function(data) {
			result = data;
		}
	});

	return result;
}

/* global var */
lastClickedField = "f-1";

function sendClickedField() {
	if(!myTurn) {
		return;
	}
	sendDataPost("in.php", 3, "gameID=" + getCookie("gameID") + "&" + "fieldID=" + this.id + "&" 
		   + "player=" + getCookie("player"));
	lastClickedField = this.id; 
}

function sendDataPost(file, contentLength, query) {
	var xhr;

	if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Msxml2.XMLHTTP");
    }

	xhr.open("POST", file, true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.setRequestHeader("Content-Length", contentLength);
	xhr.send(query);
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
} 


/* Game Handling Functions */
/* global var */
filledFields = [];

function activateGameFunctions() {

	$(".column").click(function() {
		if(!myTurn) {
			return;
		}
		if(!filledFields[this.id]) {
			if(getCookie("player") == "X") {
				$("#" + this.id).css({"background-image" : "url(cross-blue.png)"});
			} else {
				$("#" + this.id).css({"background-image" : "url(circle-blue.png)"});
			}
			filledFields[this.id] = true;
			myTurn = false;
			pollNextField(5000);
		} 
	});

	$(".startBtn").click(function() {
		$("#prompt").hide();
		$("#hide").fadeIn();
	});

	$("#gameIDField").click(function() {
		$(this).select();
	});

	$("#gameIDPrompt").click(function() {
		$(this).select();
	});
}

function checkFields() {
	if(filledFields.length < 5) {
		return;
	}

	var winner = "";
	var winnerExists = false;

	if(filledFields["f11"] == filledFields["f12"] && filledFields["f11"] == filledFields["f13"]) {
		winner = "f11";
		winnerExists = true;
	} else if (filledFields["f21"] == filledFields["f22"] && filledFields["f21"] == filledFields["f23"]) {
		winner = "f21";
		winnerExists = true;
	} else if (filledFields["f31"] == filledFields["f32"] && filledFields["f31"] == filledFields["f33"]) {
		winner = "f31";
		winnerExists = true;
	} else if (filledFields["f11"] == filledFields["f21"] && filledFields["f11"] == filledFields["f13"]) {
		winner = "f11";
		winnerExists = true;
	} else if (filledFields["f12"] == filledFields["f22"] && filledFields["f12"] == filledFields["f32"]) {
		winner = "f12";
		winnerExists = true;
	} else if (filledFields["f13"] == filledFields["f23"] && filledFields["f13"] == filledFields["f33"]) {
		winner = "f13";
		winnerExists = true;
	} else if (filledFields["f11"] == filledFields["f22"] && filledFields["f11"] == filledFields["f33"]) {
		winner = "f11";
		winnerExists = true;
	} else if (filledFields["f13"] == filledFields["f22"] && filledFields["f13"] == filledFields["f31"]) {
		winner = "f13";
		winnerExists = true;
	}

	if(winnerExists) {
		var i = $("#" + winner).css("background-image");								
		alert(i);
	}
}

function pollNextField(timeout) {
	if(!myTurn) {
		 setTimeout(function(){
			  $.ajax({ 
				  url: "getFieldState.php?gameID=" + getCookie("gameID"),
				  type: "get",
			  	  success: function(field){
					  if(field.toString() != lastClickedField) {
						setNewField(field.toString());	
						myTurn = true;
					  } else {
						  pollNextField(5000);
					  }
				  }
			  });
		  }, 1000);
	}
}

function setNewField(fieldID) {
	if(getCookie("player") == "X") {
		$("#" + fieldID).css({"background-image" : "url(circle-blue.png)"});
	} else {
		$("#" + fieldID).css({"background-image" : "url(cross-blue.png)"});
	}

	filledFields[fieldID] = true;
}
