// let triviaAPIURL = "https://opentdb.com/api.php?amount=50&type=multiple";
let triviaAPIURL = "questions.json";
let pexelsAPIURL = "https://api.pexels.com/v1/search?per_page=1&query=";
let pexelsAPIKey = "KeWg7MXEfustws2OQeyh3WLqWZqpj2IB7LAW2TbBYZTEI42bGZV1XT0i";

let score = 0;
let round = 0;
let percentage = 0;
let questionsAsked = [];

// load the service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js').then(function(registration) {
      console.log('Service Worker registered with scope:', registration.scope);
    }, function(error) {
      console.log('Service Worker registration failed:', error);
    });
  });
}

// handle install prompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const installButton = document.getElementById('installButton');
  installButton.style.display = 'block';

  installButton.addEventListener('click', () => {
    installButton.style.display = 'none';
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
    });
  });
});

window.onload = function() {

    // create start button
    var elemStart = document.createElement("button");
    elemStart.setAttribute("id", "start");
    elemStart.innerHTML = "Start";
    document.getElementById("start-container").appendChild(elemStart);

    elemStart.onclick = function () {
        fetchQuestions();
    };

} // window.onload

// fetch questions and answers from open trivia db
async function fetchQuestions() {

    try {   

        const response = await fetch(triviaAPIURL);
        const data = await response.json();
        showQuestion(data);

    } catch(error) {

        console.error('Error fetching questions: ', error);

    } // catch

} // fetchQuestions

function showQuestion(data) {

    // update question/round number
    round++;

    // determine question to ask
    let questionNum = Math.floor(Math.random() * 25);

    while (questionsAsked.includes(questionNum) == true) {

        questionNum = Math.floor(Math.random() * 25);

    } // while

    questionsAsked.push(questionNum);

    document.getElementById("instructions").innerHTML = "";
    document.getElementById("display").innerHTML = "Question #" + round + "<br>Score: " + percentage + "%";
    document.getElementById("question").innerHTML = data.results[questionNum].question;
    document.body.style.backgroundColor = "#eeeeee";
    document.body.style.backgroundImage = "none";

    var elemOptions = document.createElement("div");
    var elemMain = document.getElementById("main");
    var elemContainer = document.getElementById("next-container");
    var elemStartContainer = document.getElementById("start-container");
    var elemDisplay = document.getElementById("display");
    elemDisplay.style.marginTop = "28px";
    elemMain.innerHTML = "";
    elemContainer.innerHTML = "";
    elemStartContainer.innerHTML = "";
    document.getElementById("img-container").innerHTML = "";

    // create restart button
    var elemRestart = document.createElement("button");
    elemRestart.setAttribute("id", "restart");
    elemRestart.innerHTML = "Reset";
    elemContainer.appendChild(elemRestart);

    elemRestart.onclick = function () {
        resetGame();
    };
	
    var elemArrow = document.createElement("div");
    elemArrow.setAttribute("id", "arrow");
    elemArrow.innerHTML = "&uarr;<br>&darr;";
    elemMain.appendChild(elemArrow);

        // create a button for each option
        var elemOption1 = document.createElement("button");
        var elemOption2 = document.createElement("button");
        var elemOption3 = document.createElement("button");
        var elemOption4 = document.createElement("button");
        var elemOption5 = document.createElement("button");
        var elemOption6 = document.createElement("button");
        var elemOption7 = document.createElement("button");
        var elemOption8 = document.createElement("button");

        // add a class to all the options
        elemOption1.classList.add("option");
        elemOption2.classList.add("option");
        elemOption3.classList.add("option");
        elemOption4.classList.add("option");
        elemOption5.classList.add("option");
        elemOption6.classList.add("option");
        elemOption7.classList.add("option");
        elemOption8.classList.add("option");

        // put all the options in elemOptions
        elemOptions.appendChild(elemOption1);
        elemOptions.appendChild(elemOption2);
        elemOptions.appendChild(elemOption3);
        elemOptions.appendChild(elemOption4);
        elemOptions.appendChild(elemOption5);
        elemOptions.appendChild(elemOption6);
        elemOptions.appendChild(elemOption7);
        elemOptions.appendChild(elemOption8);

        // put the options into an array
        let answers = [
            data.results[questionNum].correct_answer,
            data.results[questionNum].incorrect_answers[0],
            data.results[questionNum].incorrect_answers[1],
            data.results[questionNum].incorrect_answers[2],
            data.results[questionNum + 25].correct_answer,
            data.results[questionNum + 25].incorrect_answers[0],
            data.results[questionNum + 25].incorrect_answers[1],
            data.results[questionNum + 25].incorrect_answers[2]
        ];

    // multiple choice
    if (data.results[questionNum].type == "multiple") {

        // display options
        for (let i = 0; i < 8; i++) {

            let optionNum = Math.floor(Math.random() * (7 - i));

            if (i == 0 && answers[optionNum] == data.results[questionNum].correct_answer) {
                elemOption1.innerHTML = answers[optionNum];
                elemOption1.setAttribute("id", "correct-option");
            } // if
            else if (i == 0) {
                elemOption1.innerHTML = answers[optionNum];
                // elemOption1.setAttribute("id", "incorrect-option");
                elemOption1.classList.add("incorrect-option");
            } // if

            else if (i == 1 && answers[optionNum] == data.results[questionNum].correct_answer) {
                elemOption2.innerHTML = answers[optionNum];
                elemOption2.setAttribute("id", "correct-option");
            } // if
            else if (i == 1) {
                elemOption2.innerHTML = answers[optionNum];
                // elemOption2.setAttribute("id", "incorrect-option");
                elemOption2.classList.add("incorrect-option");
            } // if

            else if (i == 2 && answers[optionNum] == data.results[questionNum].correct_answer) {
                elemOption3.innerHTML = answers[optionNum];
                elemOption3.setAttribute("id", "correct-option");
            } // if
            else if (i == 2) {
                elemOption3.innerHTML = answers[optionNum];
                // elemOption3.setAttribute("id", "incorrect-option");
                elemOption3.classList.add("incorrect-option");
            } // if

            else if (i == 3 && answers[optionNum] == data.results[questionNum].correct_answer) {
                elemOption4.innerHTML = answers[optionNum];
                elemOption4.setAttribute("id", "correct-option");
            } // if
            else if (i == 3) {
                elemOption4.innerHTML = answers[optionNum];
                // elemOption4.setAttribute("id", "incorrect-option");
                elemOption4.classList.add("incorrect-option");
            } // if

            if (i == 4 && answers[optionNum] == data.results[questionNum].correct_answer) {
                elemOption5.innerHTML = answers[optionNum];
                elemOption5.setAttribute("id", "correct-option");
            } // if
            else if (i == 4) {
                elemOption5.innerHTML = answers[optionNum];
                // elemOption1.setAttribute("id", "incorrect-option");
                elemOption5.classList.add("incorrect-option");
            } // if

            else if (i == 5 && answers[optionNum] == data.results[questionNum].correct_answer) {
                elemOption6.innerHTML = answers[optionNum];
                elemOption6.setAttribute("id", "correct-option");
            } // if
            else if (i == 5) {
                elemOption6.innerHTML = answers[optionNum];
                // elemOption2.setAttribute("id", "incorrect-option");
                elemOption6.classList.add("incorrect-option");
            } // if

            else if (i == 6 && answers[optionNum] == data.results[questionNum].correct_answer) {
                elemOption7.innerHTML = answers[optionNum];
                elemOption7.setAttribute("id", "correct-option");
            } // if
            else if (i == 6) {
                elemOption7.innerHTML = answers[optionNum];
                // elemOption3.setAttribute("id", "incorrect-option");
                elemOption7.classList.add("incorrect-option");
            } // if

            else if (i == 7 && answers[optionNum] == data.results[questionNum].correct_answer) {
                elemOption8.innerHTML = answers[optionNum];
                elemOption8.setAttribute("id", "correct-option");
            } // if
            else if (i == 7) {
                elemOption8.innerHTML = answers[optionNum];
                // elemOption4.setAttribute("id", "incorrect-option");
                elemOption8.classList.add("incorrect-option");
            } // if

            answers.splice(optionNum, 1);
    
        } //for

    } // if multiple choice

    if (round % 5 == 0 && round != 0) {

        elemDisplay.innerHTML += "<br>Checkpoint next.";

        if (percentage >= 80 && round != 1) {

            elemDisplay.style.color = "#229922";
    
        } // if
    
        else if (percentage <= 40 && round != 1) {
    
            elemDisplay.style.color = "#c1292e";
    
        } // else if
    
        else {
    
            elemDisplay.style.color = "#111111";
    
        } // else

    } // if

    elemMain.appendChild(elemOptions);

    // button for correct option
    document.getElementById("correct-option").onclick = function () {
        clickCorrect(data, questionNum);
    };

    // button for incorrect option
    var elemIncorrect = document.getElementsByClassName("incorrect-option");

    for (i = 0; i < elemIncorrect.length; i++) {

		elemIncorrect[i].onclick = function () {
            clickIncorrect(data, questionNum);
		} // onclick

	} // for
    
} // showQuestion

// get words to search image
function getKeyWords(data, questionNum) {

    let keyWords = [];
    let possibleKeys = data.results[questionNum].question.split(" ");

    
    for (let i = 1; i < possibleKeys.length; i++) {

        if (possibleKeys[i].charAt(0) == possibleKeys[i].charAt(0).toUpperCase() && isAlphaNumeric(possibleKeys[i]) == true) {
            keyWords.push(possibleKeys[i]);
            break;
        } // if

    } // for

    if (keyWords.length == 0) {

        keyWords.push(data.results[questionNum].correct_answer);

    } // if
    
    keyWords.push(data.results[questionNum].category);

    return keyWords;

} // getKeyWords

// check if there are non alphanumeric characters
// code: https://stackoverflow.com/questions/4434076/best-way-to-alphanumeric-check-in-javascript
function isAlphaNumeric(str) {

    var code, i, len;
  
    for (i = 0, len = str.length; i < len; i++) {

      code = str.charCodeAt(i);

      if (!(code > 47 && code < 58) && !(code > 64 && code < 91) && !(code > 96 && code < 123)) {

        return false;

      } // if

    } // for

    return true;

} // isAlphaNumeric

// fetch image from pexels API
// code: https://mdinfotech.net/?course=webdev&unit=6
async function fetchImage(keyWords) {

    let keyString = keyWords.toString();
    const url = pexelsAPIURL + keyString;
    const headers = {
        "Authorization": pexelsAPIKey
    };

    try {
        const response = await fetch(url, { headers });

        if (!response.ok) {
            throw new Error(`HTTP error: Status: ${response.status}`);
        } // if

        const data = await response.json();

        // add the image
        if (data.photos[0] != null && data.photos[0].src != null && data.photos[0].src.original != null) {

            var elemImage = document.createElement("div");
            elemImage.setAttribute('id', 'img-div');
            elemImage.innerHTML = "<img src = '" + data.photos[0].src.original + "' alt = " + data.photos[0].alt + ">";
            document.getElementById("img-container").appendChild(elemImage);

        } // if

    } catch (error) {
        console.error("Error fetching image data:", error);
    } // catch

} // fetchImage

function clickCorrect(data, questionNum) {

    var isCorrect = true;
    revealAnswer(isCorrect, data, questionNum);

} // clickCorrect

function clickIncorrect(data, questionNum) {

    var isCorrect = false;
    revealAnswer(isCorrect, data, questionNum);

} // clickIncorrect

function revealAnswer(isCorrect, data, questionNum) {

    document.getElementById("arrow").innerHTML = "";
    var elemDisplay = document.getElementById("display");

    // display image
    let keyWords = getKeyWords(data, questionNum);
    fetchImage(keyWords);
    
    // disable all buttons
    // code: https://stackoverflow.com/questions/30479448/disable-all-buttons-on-page
    const buttons = document.getElementsByTagName("button");
    for (const button of buttons) {
        button.disabled = true;
    } // for

    // enable restart and install buttons
    document.getElementById("restart").disabled = false;
    document.getElementById("installButton").disabled = false;
    
    // change border color
    document.getElementById("correct-option").style.borderColor = "#3ec300";
    var elemIncorrect = document.getElementsByClassName("incorrect-option");

    if (isCorrect == true) {

        score++;

        // change background color
        document.getElementById("correct-option").style.backgroundColor = "#1ca100";

    } // if

    else if (isCorrect == false) {

        // change color
        // code: https://stackoverflow.com/questions/5753680/change-css-of-class-in-javascript
        for (var i in elemIncorrect) {

            if (elemIncorrect.hasOwnProperty(i)) {
    
                elemIncorrect[i].classList.add("revealed-incorrect");
    
            } // if
    
        } // for

    } // else if

    // create next button
    var elemContainer = document.getElementById("next-container");
    var elemNext = document.createElement("button");
    elemNext.setAttribute("id", "next");
    elemNext.innerHTML = "Next >>>";
    elemContainer.appendChild(elemNext);
    
    // check round
    if (round % 5 != 0) {

        document.getElementById("next").onclick = function () {
            showQuestion(data);
        };

    } // if

    else if (round % 5 == 0 && round != 0) {

        document.getElementById("next").onclick = function () {
            showCheckpoint(data);
        };

    } // else if

    percentage = Math.floor((score / round) * 100);
 
} // revealAnswer

function showCheckpoint(data) {
    
        if (percentage <= 40 || percentage >= 80) {

            // clear page
            var elemMain = document.getElementById("main");
            elemMain.innerHTML = "";
            document.getElementById("question").innerHTML = "";
            document.getElementById("img-container").innerHTML = "";
            document.getElementById("next-container").innerHTML = "";
            document.getElementById("instructions").innerHTML = "";
            document.getElementById("display").innerHTML = "";

            var elemFinal = document.createElement("div");
            elemFinal.setAttribute("id", "final-display");

            elemFinal.innerHTML = "Final Score: " + percentage + "%";

            if (percentage <= 40) {

                elemFinal.innerHTML += "<br>You lose.";
                document.body.style.backgroundImage = "linear-gradient(to bottom right, #dd2222, #770000)";

            } // if

            else if (percentage >= 80) {
    
                elemFinal.innerHTML += "<br>You win.";
                document.body.style.backgroundImage = "linear-gradient(to bottom right, #88ff88, #229922)";
        
            } // else if

            elemMain.appendChild(elemFinal);

	    // create restart button
	    var elemRestart = document.createElement("button");
	    elemRestart.setAttribute("id", "restart");
	    elemRestart.innerHTML = "Reset";
	    document.getElementById("next-container").appendChild(elemRestart);
	
	    elemRestart.onclick = function () {
	        resetGame();
	    };
    
        } // if

        else {

            showQuestion(data);

        } // else

    if (round == 25) {

        // clear page
        var elemMain = document.getElementById("main");
        elemMain.innerHTML = "";
        document.getElementById("question").innerHTML = "";
        document.getElementById("img-container").innerHTML = "";
        document.getElementById("next-container").innerHTML = "";
        document.getElementById("instructions").innerHTML = "";
        document.getElementById("display").innerHTML = "";

        var elemFinal = document.createElement("div");
        elemFinal.setAttribute("id", "final-display");

        elemFinal.innerHTML = "Final Score: " + percentage + "%";

        if (percentage < 60) {

            elemFinal.innerHTML += "<br>You lose.";
            document.body.style.backgroundImage = "linear-gradient(to bottom right, #dd2222, #770000)";
    
        } // if
    
        else if (percentage >= 60) {
    
            elemFinal.innerHTML += "<br>You win.";
            document.body.style.backgroundImage = "linear-gradient(to bottom right, #88ff88, #44bb44)";
    
        } // else if

        elemMain.appendChild(elemFinal);

    } // if

} // showCheckpoint

function resetGame() {

    score = 0;
    round = 0;
    percentage = 0;
    questionsAsked.length = 0;

    document.getElementById("display").style.color = "#111111";

    document.getElementById("display").innerHTML = "";
    document.getElementById("start-container").innerHTML = "";
    document.getElementById("next-container").innerHTML = "";
    document.getElementById("question").innerHTML = "";
    document.getElementById("img-container").innerHTML = "";
    document.getElementById("main").innerHTML = "";
    
    // create start button
    var elemStart = document.createElement("button");
    elemStart.setAttribute("id", "start");
    elemStart.innerHTML = "Start";
    document.getElementById("start-container").appendChild(elemStart);

    elemStart.onclick = function () {
        fetchQuestions();
    };

    document.body.style.backgroundImage = "none";
    document.getElementById("instructions").innerHTML = "You must answer 25 questions.<br><br>Every 5 questions, you reach a checkpoint. If your score is 80% or more at a checkpoint, you win. If your score is 40% or less at a checkpoint, you lose.<br><br>If your score is below 60% by the end, you lose.";

} // resetGame
