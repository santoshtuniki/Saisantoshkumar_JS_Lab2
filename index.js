// Quiz constructor -> creates an object { questions: '', score: '', questionIndex:'' }
function Quiz( questions ){
	this.questions = questions;
	this.score = 0;
	this.questionIndex = 0;	// corresponding to the array index in questions
}

// isEnded() -> returns true, if questionIndex is equal to length of questions
Quiz.prototype.isEnded = function(){
	return this.questionIndex === this.questions.length;
};

// getQuestionByIndex() -> returns question object corresponding to the questionIndex
Quiz.prototype.getQuestionByIndex = function(){
	return this.questions[ this.questionIndex ];
};

// checkOptionWithAnswer() -> Marks the userAnswer depending on whether it is correct or incorrect
Quiz.prototype.checkOptionWithAnswer = function( userAnswer ){
	if( this.getQuestionByIndex().isCorrectAnswer( userAnswer ) ){
		this.score++;
	}
	this.questionIndex++;
};

// Question constructor -> creates an object { questionText: '', choices: '', answer:'' }
function Question( questionText, choices, answer ){
	this.questionText = questionText;
	this.choices = choices;
	this.answer = answer;
};

// isCorrectAnswer() -> returns true, if the userAnswer matches the given answer
Question.prototype.isCorrectAnswer = function( userAnswer ){
	return this.answer === userAnswer;
};

// if quiz ended, show scores (or else) update question, options, progress, eventlisteners
function loadQuestions() {
	if( quiz.isEnded() ) {
		showScores();
	}
	else {
		// show question
		let question = quiz.getQuestionByIndex();
		var element = document.getElementById("question");	// 'p' element
		element.innerHTML = question.questionText;	// Assign questionText to element
  
		// show options
		var choices = question.choices;		// Array of choices
		for(var i = 0; i < choices.length; i++) {
			var element = document.getElementById("choice" + i);	// 'span' element
			element.innerHTML = choices[i];		// Assign choice to respective span element
			handleOptionButton("btn" + i, choices[i]);
		}
  
		updateProgress();
	}
}

// if button clicked, checks the option and updates the score & simultaneously goes to the next question
function handleOptionButton(id,choice){
	let button = document.getElementById(id);	// 'button' element
	button.onclick = function(){
		quiz.checkOptionWithAnswer(choice);
		loadQuestions();
	}
}

function updateProgress(){
	var element = document.getElementById("progress");
	element.innerHTML=`Question ${quiz.questionIndex+1} of ${quiz.questions.length}`;
}

function showScores(){
	let quizOverHTML =  `<h1> Result</h1> <h2> Your score : ${quiz.score} & percentage is ${quiz.score*100/quiz.questions.length} %</h2>`;
	document.getElementById("quiz").innerHTML=quizOverHTML;
}

let questions = [
	new Question("JavaScript supports", ["Functions", "XHTML","CSS", "HTML"], "Functions"),
	new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
	new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
	new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
	new Question("JavaScript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language")
];
// console.log(questions)
/*
	(5) [Question, Question, Question, Question, Question]
		0: Question {questionText: 'JavaScript supports', choices: Array(4), answer: 'Functions'}
		1: Question {questionText: 'Which language is used for styling web pages?', choices: Array(4), answer: 'CSS'}
		2: Question {questionText: 'Which is not a JavaScript Framework?', choices: Array(4), answer: 'Django'}
		3: Question {questionText: 'Which is used for Connect To Database?', choices: Array(4), answer: 'PHP'}
		4: Question {questionText: 'JavaScript is a ', choices: Array(4), answer: 'Programming Language'}
		length: 5
		[[Prototype]]: Array(0)
*/

let quiz = new Quiz(questions);
// console.log(quiz)
/*
	Quiz {questions: Array(5), score: 0, questionIndex: 0}
		questionIndex: 0
		questions: (5) [Question, Question, Question, Question, Question]
		score: 0
		[[Prototype]]: Object
*/

loadQuestions();