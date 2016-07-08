$(document).ready(function() {
/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess = 0;
var winningNumber = Math.floor(Math.random()*99+1);
var guessCount = 0;


/* **** Guessing Game Functions **** */

// Generate the Winning Number

var generateWinningNumber = function(){
	winningNumber = Math.floor(Math.random()*99+1);
};
// Fetch the Players Guess

var playersGuessSubmission = function(event){
	event.preventDefault();
	if (($('#guess-input').val() === '') || (guessCount > 4)) {
		event.stopPropogation();
	} else {
		playersGuess = $('#guess-input').val();
		guessCount++;
		$('#guess-counter').text("You've used " + guessCount + " out of 5 guesses");
		lowerOrHigher();
		checkGuess();
	}
};

// Determine if the next guess should be a lower or higher number

var lowerOrHigher = function(){
	if (playersGuess < winningNumber) {
		$('#high-low').text("Higher!");
	} else if (playersGuess > winningNumber) {
		$('#high-low').text("Lower!");
	}
	if (Math.abs(playersGuess - winningNumber) < 5) {
		$('#high-low').text($('#high-low').text() + " You're getting hot!");
	} else if (Math.abs(playersGuess - winningNumber) < 20) {
		$('#high-low').text($('#high-low').text() + " You're getting warm!");
	} else {
		$('#high-low').text($('#high-low').text() + " You're cold!");
	}
}

// Check if the Player's Guess is the winning number 

var checkGuess = function(){
	if (playersGuess == winningNumber) {
		$('#high-low').text("CONGRATS! THAT'S CORRECT!");
		$('#hint-statement').text("");
	} else if (guessCount > 4) {
		$('#hint-statement').text("");
		$('#high-low').text("Nice try! But the answer was " + winningNumber + "!");
	}
};

// Create a provide hint button that provides additional clues to the "Player"

var provideHint = function(){
	var hintMin = Math.floor(winningNumber/10)*10
	var hintMax = hintMin + 10;
	$('#hint-statement').text("It's between " + hintMin + " & " + hintMax + "!");
};

// Allow the "Player" to Play Again

var playAgain = function(){
	guessCount = 0;
	generateWinningNumber();
	$('#high-low').text("");
	$('#hint-statement').text("");
	$('#guess-counter').text("You've used " + guessCount + " out of 5 guesses");
};


/* **** Event Listeners/Handlers ****  */


	//Press Submit
	$('#submit-button').on('click', playersGuessSubmission);
	$('#guess-input').keypress(function(e) {
        if(e.which == 13) {
            jQuery(this).blur();
            jQuery('#submit-button').focus().click();
            this.focus();
        }
    });

	//Press Again
	$('#again-button').on('click', playAgain);

	//Press Hint
	$('#hint-button').on('click', provideHint);


});

