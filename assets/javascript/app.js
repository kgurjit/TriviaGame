var quiz = [
	{country: 'Denmark', options:['Quito', 'Copenhagen', 'New Delhi', 'Prague'], capital: 'Copenhagen'},
	{country: 'Germany', options:['Jakarta', 'Georgetown', 'Berlin', 'Oslo'], capital: 'Berlin'},
	{country: 'South Korea', options:['Warsaw', 'Lima', 'Seol', 'Beijing'], capital: 'Seol'},
	{country: 'Cuba', options:['Moscow', 'Paris', 'Budapest', 'Havana'], capital: 'Havana'},
	{country: 'Ireland', options:['Dublin', 'Copenhagen', 'Tripoli', 'Prague'], capital: 'Dublin'}
];

var game = {};

var resetScores = function(){
	game.correctAnswers = 0;
	game.wrongAnswers = 0;
	game.unanswered = 0;
	game.time = 1;
};

var getQuizHtml = function(){
	var html = '';
	for(var i=0;i<quiz.length;i++) {
		var ques = quiz[i];

		var quesHtml = '<div class="ques">';

		quesHtml += '<h2>'+ ques.country + '</h2>';
		for(var j=0;j<ques.options.length;j++){
			var op = ques.options[j];
			var id = 'c' + i + '_' + j;
			quesHtml += '<input type="radio" name="country' + i + '" id="' + id + '" value="' + op + '"> <label for="' + id + '">' + op + '</label>';
		}
		quesHtml += '</div>';

		html += quesHtml;
	}
	return html;
};
var updateAndShowScorecard = function(){
	$(".correct .val").html(game.correctAnswers);
	$(".wrong .val").html(game.wrongAnswers);
	$(".unanswered .val").html(game.unanswered);
	$(".scorecard").show();
	$(".ques-section").hide();
	$("#startBtn").show();
};

var updateScores = function(){
	for(var i=0;i<quiz.length;i++) {
		var ques = quiz[i];
		var correctAnswer = ques.capital;
		var answered = $('input:radio[name=country' + i + ']:checked').val();
	
	
	if(typeof answered  === 'undefined') {
			game.unanswered = game.unanswered + 1;
		} else if(answered === correctAnswer) {
			game.correctAnswers = game.correctAnswers + 1;
		} else {
			game.wrongAnswers = game.wrongAnswers + 1;
		}
	}
	updateAndShowScorecard();
};

var updateTimeAndCheckAnswers = function(){
	game.time = game.time - 1;
	$("span#time").html(game.time);
	if(game.time === 0) {
		window.clearInterval(game.timer);
		updateScores();
	}
};

var startTimer = function(){
	$("span#time").html(game.time);
	game.timer = window.setInterval(updateTimeAndCheckAnswers, 1000);
};

//On click of start, display ques-section and hide start button
$("#startBtn").on("click", function(){
	$(".ques-section").show();
	resetScores();
	startTimer();
	$(".scorecard").hide();
	$("div.questions").html(getQuizHtml());	
	$("#startBtn").hide();
});


