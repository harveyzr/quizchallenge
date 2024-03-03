var quizArray = [
	{
		question:
			"What is the HTML tag under which one can write the JavaScript code?",
		answers: [
			{
				choice: "A. <javascript>",
				id: "A",
			},
			{
				choice: "B. <scripted>",
				id: "B",
			},
			{
				choice: "C. <script>",
				id: "C",
			},
			{
				choice: "D. <js>",
				id: "D",
			},
		],
		hit: "C",
	},

	{
		question: "How do you create a function in JavaScript?",
		answers: [
			{ choice: "A. function:myFunction()", id: "A" },
			{ choice: "B. function myFunction()", id: "B" },
			{ choice: "C. function = myFunction()", id: "C" },
			{ choice: "D. None of the above.", id: "D" },
		],
		hit: "B",
	},

	{
		question:
			"Which built-in method combines the text of two strings and returns a new string?",
		answers: [
			{ choice: "A. append()", id: "A" },
			{ choice: "B. concat()", id: "B" },
			{ choice: "C. attach()", id: "C" },
			{ choice: "D. None of the above.", id: "D" },
		],
		hit: "B",
	},

	{
		question:
			"Which of the following function of String object returns the characters in a string between two indexes into the string?",
		answers: [
			{ choice: "A. split()", id: "A" },
			{ choice: "B. slice()", id: "B" },
			{ choice: "C. substr()", id: "C" },
			{ choice: "D. substring()", id: "D" },
		],
		hit: "D",
	},

	{
		question: "How to write an IF statement in JavaScript?",
		answers: [
			{ choice: "A.  if i = 5", id: "A" },
			{ choice: "B.  if (i == 5)", id: "B" },
			{ choice: "C.  if i == 5 then", id: "C" },
			{ choice: "D.  if i = 5 then", id: "D" },
		],
		hit: "B",
	},

	{
		question: "Which of the following is not a valid JavaScript variable name?",
		answers: [
			{ choice: "A. 2names", id: "A" },
			{ choice: "B. _first_and_last_names", id: "B" },
			{ choice: "C.  FirstAndLast", id: "C" },
			{ choice: "D. None of the above", id: "D" },
		],
		hit: "A",
	},
];


var startE1 = document.querySelector("#start");

// start quiz function
function startQuiz(){
    indexArray = 0;
    score = 0;
    inProgress = true;
    timer = 60;
    showHighScoresCorner.setAttribute("disabled", "true");

    quizTimer();
    sectionWelcome.classList.remove("d-flex");
    sectionWelcome.classList.add("d-none");

    sectionQuiz.classList.add("d-flex");

    sectionQuiz.classList.remove("d-none");
    showPage();
}

function cleanPage() {
    questionE1.textContent
}

// Events
startE1.addEventListener("click", startQuiz);