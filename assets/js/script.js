var questionSe = [
	{
		question: "Which HTML element is used for specifying a footer for a document or section?",
		answers: [
			{
				choice: "A. bottom",
				id: "A",
			},
			{
				choice: "B. footer",
				id: "B",
			},
			{
				choice: "C. section",
				id: "C",
			},
			{
				choice: "D. end",
				id: "D",
			},
		],
		hit: "B",
	},

	{
		question: "In CSS, how do you select an element with the id 'unique'?",
		answers: [
			{ choice: "A. .unique", id: "A" },
			{ choice: "B. #unique", id: "B" },
			{ choice: "C. unique", id: "C" },
			{ choice: "D. *unique", id: "D" },
		],
		hit: "B",
	},

	{
		question: "How can you add a comment in a CSS file?",
		answers: [
			{ choice: "A. // This is a comment", id: "A" },
			{ choice: "B. /* This is a comment */", id: "B" },
			{ choice: "C. - This is a comment -", id: "C" },
			{ choice: "D. <!-- This is a comment -->", id: "D" },
		],
		hit: "B",
	},

	{
		question: "What does HTML stand for?",
		answers: [
			{ choice: "A. Hyper Trainer Marking Language", id: "A" },
			{ choice: "B. Hyper Text Marketing Language", id: "B" },
			{ choice: "C. Hyper Text Markup Language", id: "C" },
			{ choice: "D. Hyper Text Markup Leveler", id: "D" },
		],
		hit: "C",
	},

	{
		question: "Which object in JavaScript can be used to ensure code runs after a specified time delay?",
		answers: [
			{ choice: "A. setTimeout", id: "A" },
			{ choice: "B. timeWait", id: "B" },
			{ choice: "C. delayFunction", id: "C" },
			{ choice: "D. wait", id: "D" },
		],
		hit: "A",
	},

	{
		question: "In CSS, what property is used to change the text color of an element?",
		answers: [
			{ choice: "A. text-color", id: "A" },
			{ choice: "B. fgcolor", id: "B" },
			{ choice: "C. color", id: "C" },
			{ choice: "D. background-color", id: "D" },
		],
		hit: "C",
	},
];

var questionIndex = 0;
var playerScore = 0;
var countdownTimer = 0;
var highscoreList = [];
if (localStorage.getItem("highscoreList") !== null) {
	highscoreList = JSON.parse(localStorage.getItem("highscoreList"));

}
//var to check if in the middle of the quiz when the time is close to 0 the user select something
var quizInProgress = false;

var startButton = document.querySelector("#gamma-start");
var welcomeSection = document.querySelector("#beta-modal");
var questionSection = document.querySelector("#delta-section");
var questionElement = document.querySelector(".question-modal");
var optionElement = document.querySelector(".options-modal");
var answerFeedback = document.querySelector(".hit");
var completionModal = document.querySelector("#epsilon-done");
var finalScoreElement = document.querySelector("#zeta-score");
var submitButton = document.querySelector("#iota-submit");
var timerDisplay = document.querySelector("#omega-span");
var highscoresSection = document.querySelector("#kappa-highscores");
var initialsInput = document.querySelector("#theta-initials");
var highscoresDisplay = document.querySelector("#lambda-list");
var goBackButton = document.querySelector("#mu-back");
var clearHighscoresButton = document.querySelector("#nu-clear");
var highscoresButton = document.querySelector("#alpha-btn");
var hitShow = document.querySelector(".hit")

/**
 * start the quiz
 */
function startQuiz() {
	//reset quiz variables
	indexArray = 0;
	score = 0;
	inProgress = true;
	timer = 60;
	highscoresButton.setAttribute("disabled", "true");

	quizTimer();
	//hidden the section when the button is pressed
	welcomeSection.classList.remove("d-flex");
	welcomeSection.classList.add("d-none");

	//show the sectionQuiz with the add class d-flex
	questionSection.classList.add("d-flex");
	//remove the sectionQuiz with the remove class d-none
	questionSection.classList.remove("d-none");
	showPage();
}

/**
 * clean the page after start button is pressed
 */
function cleanPage() {
	// if (indexArray >= 0) {
	questionElement.textContent = "";
	optionElement.textContent = "";
	answerFeedback.textContent = "";

	if (showCornerScores) {
		welcomeSection.classList.remove("d-flex");
		welcomeSection.classList.add("d-none");
		completionModal.classList.remove("d-flex");
		completionModal.classList.add("d-none");
	} else {
		return;
	}
	// }
}

function showPage() {
	if (!inProgress || indexArray === questionSe.length) return;
	//add a margin-bottom to the questions
	questionElement.classList.add("mb-3");
	//show the question
	questionElement.textContent = questionSe[indexArray].question;

	for (let a = 0; a < questionSe[indexArray].answers.length; a++) {
		var btnEl = document.createElement("BUTTON");
		btnEl.classList.add("btn", "btn-info", "px-5", "mb-3", "mt-2", "text-left");
		btnEl.textContent = questionSe[indexArray].answers[a].choice;
		optionElement.classList.add("d-flex", "flex-column");
		optionElement.appendChild(btnEl);
		if (questionSe[indexArray].answers[a].id === questionSe[indexArray].hit) {
			btnEl.addEventListener("click", timeDelayCorrect);
		} else {
			btnEl.addEventListener("click", timeDelayWrong);
		}
	}
}

function timeDelayCorrect() {
	score++;
	indexArray++;
	cleanPage();
	answerFeedback.classList.add("mt-4");
	answerFeedback.textContent = "Rigth Answer!";
	showPage();
}

function timeDelayWrong() {
	timer = timer - 10;
	indexArray++;
	cleanPage();
	answerFeedback.classList.add("mt-4");
	answerFeedback.textContent = "Wrong Answer! Keep trying";
	showPage();
}

function quizTimer() {
	var timeId = setInterval(() => {
		timer = timer - 1;

		if (timer < 0) timer = 0;

		timerDisplay.textContent = timer;

		if (timer <= 0 || indexArray === questionSe.length) {
			clearInterval(timeId);
			completeQuiz();
		}
	}, 1000);
}

function completeQuiz() {
	timer = 0;
	inProgress = false;
	cleanPage();
	highscoresButton.removeAttribute("disabled");
	completionModal.classList.remove("d-none");
	completionModal.classList.add("d-flex");
	finalScoreElement.textContent = score;

	if (initialsInput.value !== "") {
		initialsInput.value = "";
	}
}

function saveInitialScore() {
	//getting the input and removing the outside spaces
	var initialValue = initialsInput.value.trim();

	//force the user to enter the initial
	if (
		initialValue !== "" &&
		typeof initialsInput.value === "string" &&
		initialValue.toLowerCase().match(/^[a-z]+$/)
	) {
		highscoreList.push({ initials: initialValue, score: score });
		localStorage.setItem("userHighScores", JSON.stringify(highscoreList));

		//clean the page before highscores display page
		completionModal.classList.add("d-none");
		completionModal.classList.remove("d-flex");

		// show the new page for highcores
		showHighscores();
	} else {
		alert("you must to enter your initials to save your score!");
	}
}

function showHighscores() {
	highscoresSection.classList.remove("d-none");
	highscoresSection.classList.add("d-flex");

	highscoresDisplay.textContent = "";

	for (let i = 0; i < highscoreList.length; i++) {
		var divEl = document.createElement("div");
		divEl.classList.add("card", "initial-score", "pl-2", "shadow-sm", "mb-2");
		divEl.textContent =
			i +
			1 +
			". " +
			highscoreList[i].initials +
			" - " +
			highscoreList[i].score;
			highscoresDisplay.appendChild(divEl);
	}
}

function goBack() {
	timer = 0;
	timerDisplay.textContent = timer;

	highscoresSection.classList.add("d-none");
	highscoresSection.classList.remove("d-flex");
	welcomeSection.classList.add("d-flex");
	welcomeSection.classList.remove("d-none");
}

function clearScores() {
	highscoreList.splice(0, highscoreList.length);
	localStorage.removeItem("userHighScores");
	highscoresDisplay.textContent = "";
}

function showCornerScores() {
	cleanPage();
	showHighscores();
}

// all event here
startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", saveInitialScore);
goBackButton.addEventListener("click", goBack);
clearHighscoresButton.addEventListener("click", clearScores);
highscoresButton.addEventListener("click", showCornerScores);