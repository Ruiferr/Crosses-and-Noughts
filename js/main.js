var currentClass = "red";
var player1 = new Object(); 
var player2 = new Object();

player1.score = 0; 
player2.score = 0; 


function toggleClass(){
	if (currentClass == "red"){
		currentClass = "blue";
	}
	else{
		currentClass = "red";
	}
}

function checkWinners(){
	//Verificar Horizontais
	var win;
	for(var linha = 0; linha != 3; linha++){
		win = true;
		for(var coluna = 0; coluna != 3; coluna++){
			var elem = $("td[data-y=" + linha + "][data-x=" + coluna + "]");
			if(!elem.hasClass(currentClass)){
				win = false;
				break;
			}
		}
		if(win == true){
			break;
		}
	}

	if(win == true){
		return true;
	}

	//Verificar Verticais

	var win;
	for(var coluna = 0; coluna != 3; coluna++){
		win = true;
		for(var linha = 0; linha != 3; linha++){
			var elem = $("td[data-y=" + linha + "][data-x=" + coluna + "]");
			if(!elem.hasClass(currentClass)){
				win = false;
				break;
			}
		}
		if(win == true){
			break;
		}
	}

	if(win == true){
		return true;
	}

	//Verificar Diagonal principal
	win = true;
	var elem1 = $("td[data-y=0][data-x=0]");
	var elem2 = $("td[data-y=1][data-x=1]");
	var elem3 = $("td[data-y=2][data-x=2]");
	if(!elem1.hasClass(currentClass) || !elem2.hasClass(currentClass) || !elem3.hasClass(currentClass)){
		win = false;
	}

	if(win == true){
		return true;
	}

	//Verificar Diagonal Secundária

	win = true;
	var elem1 = $("td[data-y=2][data-x=0]");
	var elem2 = $("td[data-y=1][data-x=1]");
	var elem3 = $("td[data-y=0][data-x=2]");
	if(!elem1.hasClass(currentClass) || !elem2.hasClass(currentClass) || !elem3.hasClass(currentClass)){
		win = false;
	}

	if(win == true){
		return true;
	}

}


function preparePolyfills(){

	if (!navigator.notification) {
		navigator.notification = new Object();

		navigator.notification.alert=function(message,callback,title,buttonName){
			alert(message);
			callback();
		};
	}
}



function restart(){
	
	$("#galo td").each(function() {
		$(this).removeClass('red');
		$(this).removeClass('blue');
	});

	var currentClass = "red";

}

function checkEmpate(){
	red = $("#galo td.red").length;
	blue = $("#galo td.blue").length;

	number = red + blue;
	if (number == 9) {
		setTimeout(function(){alert('Empate!')}, 100);
	}

}

$(document).ready(function(){

	preparePolyfills();


	do{
		player1.name = prompt('Player 1 name:', 'Player1')
		if (!player1.name) {
			alert('Place a name to start the game')
		}
	} while(!player1.name);

	$("#player1").html(player1.name);



	do{
		player2.name = prompt('Player 2 name:', 'Player2')
		if (!player2.name) {
			alert('Place a name to start the game')
		}
	} while(!player2.name);

	$("#player2").html(player2.name);





	$("#galo td").click(function(event){
		navigator.vibrate(500);
		var elem = $(event.currentTarget);
		var x = elem.data("x");
		var y = elem.data("y");

		if ($(this).hasClass('red') || $(this).hasClass('blue')) {

		}else{
			elem.addClass(currentClass);
			
			if(checkWinners()){
				//setTimeout(function(){navigator.notification.alert('game Over!',alertDismissed,'GameOver','OK');},100);
				setTimeout(function(){alert('Game Over!')}, 100);
				updateScores();
			}


			checkEmpate();

			toggleClass();


		
		}



	});

});

function updateScores(){

	var objMaxScore;
		
	if (localStorage.maxScore) {
		objMaxScore = JSON.parse(localStorage.maxScore);
	}
		if (currentClass == 'red') {
			player1.score = player1.score + 1;
			$("#scorePlayer1").html(player1.score);
			if (!objMaxScore || objMaxScore.score < player1.score) {
				if (objMaxScore) {
					alert('New record! You are now the leader. Last leader:'+objMaxScore.name);
				}
				localStorage.maxScore = JSON.stringify(player1);
			}
		}else{
			player2.score = player2.score + 1;
			$("#scorePlayer2").html(player2.score);

			if (!objMaxScore || objMaxScore.score < player2.score) {
				if (objMaxScore) {
					alert('New record! You are now the leader. Last leader:'+objMaxScore.name);
				}
				localStorage.maxScore = JSON.stringify(player2);
			}
		}

}

