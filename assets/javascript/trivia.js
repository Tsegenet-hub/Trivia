//IMPORTANT!
$(document).ready(function(){

    // GLOBAL VARIABLES
    // ================
    
        //Define all global variables and objects
        let currentQuestion; 
        let correctAnswer; 
        let incorrectAnswer; 
        let unanswered; 
        let seconds; 
        let time; 
        let answered; 
        let userSelect;
        let messages = {
            correct: "Congratulations, that is correct!",
            incorrect: "uh oh" + "<br>" + 'That is not the right answer',
            endTime: "uh oh" + "<br>" + "Time is up!",
            finished: "How did you do?"
        };
    
        //Put all questions inside an array of objects
        var triviaQuestions = [
            {	question: " What is the only mammal capable of true flight?",
                answerList: [	"Bat",
                            "squirrel",
                            "Hummingbird",
                            "pine bird"],
                answer: 0,
                image: "assets/images/Bat.jpg",
                answerText: "Bats are the only mammals capable of true flight."
            },
    
            {	question: " A newborn kangaroo is about the size of a ...?",
                answerList: [	"Plum",
                            "orange",
                            "Lima Bean ",
                            "pear"],
                answer: 2,
                image: "assets/images/kangaroo.jpg",
                answerText: "A newborn kangaroo is about 1 inch in length -- approximately the size of a lima bean."
            },
    
            {	question: " What is the world's most poisonous spider?",
                answerList: [	"Brown Recluse",
                            "Brazilian Wandering Spider",
                            "Parasteatoda tepidariorum",
                            "Pholcus phalangioides"],
                answer: 1,
                image: "assets/images/spider.jpg",
                answerText: "According to the Guiness Book of World Records the most poisonous (or venomous) spider in the world is the Brazilian wandering spider (Phoneutria nigriventer) or banana spider."
            },
    
            {	question: "What is the smallest mammal in the world?",
                answerList: [	"Numbat",
                            "Mouse",
                            "baby goat",
                            "Bumblebee Bat"],
                answer: 3,
                image: "assets/images/batt.jpg",
                answerText: "The smallest mammal in the world is the bumblebee bat which lives along the River Kwai in western Thailand."
            },
    
            {	question: " What animal has the highest blood pressure?",
                answerList: [	"Giraffe",
                            "Elephant",
                            "cow",
                            "Lion"],
                answer: 1,
                image: "assets/images/giraffe.jpg",
                answerText: "Because of its extremely long neck, the giraffe must rely on its oversized heart (two feet long and twenty-five pounds!) to pump blood all the way to its head. As a result, the giraffe has the highest blood pressure of any animal."
            },
    
            {	question: "What is the collective name for a group of lions?",
                answerList: [	"Lions",
                            "Squad",
                            "A pride",
                            "Kings of the jungle"],
                answer: 2,
                image: "assets/images/pride.webp",
                answerText: "A group of Lions is called A pride."
            },
    
            {	question: "What animal did people worship in ancient Mesopotamia?",
                answerList: [	"Dogs",
                            "Pigeons",
                            "cows",
                            "goats"],
                answer: 1,
                image: "assets/images/pigeons.jpg",
                answerText: "In ancient Mesopotamia, pigeons were worshiped as fertility goddesses."
            },		
    
            {	question: "Which bird is a universal symbol of peace?",
                answerList: [	"Dove",
                            "pine",
                            "yellow bird",
                            "pigeon"],
                answer: 0,
                image: "assets/images/Dove.jpg",
                answerText: "A Dove (usually, white) is considered a universal symbol of peace."
            },		
    
            {	question: "Which bird of a symbol of good luck?",
                answerList: [	"Dove",
                            "pine",
                            "Stork",
                            "pigeon"],
                answer: 2,
                image: "assets/images/stork.jpg",
                answerText: "A Stork is a symbol of good luck."
            },		
    
            {	question: "What is the largest mammal in the world?",
                answerList: [	"Elephant",
                            "Blue Whale",
                            "Owl",
                            "Horse"],
                answer: 1,
                image: "assets/images/antarctic.jpg",
                answerText: "Blue Whale is the largest mammal in the world and weighs up to 200 tonnes, or around 441,000 pounds."
            },		
    
        ];
    
    
    // FUNCTIONS
    // =========
    
        //This hides the game area on page load
        $("#gameCol").hide();
        
        //This captures user click on start button to create a new game
        $("#startBtn").on("click", function(){
            $(this).hide();
            newGame();
        });
    
        //This captures the user's click on the reset button to create a new game
        $("#startOverBtn").on("click", function(){
            $(this).hide();
            newGame();
        });
    
        //This function sets up the page for a new game emptying all areas and showing game area
        function newGame(){
            $("#gameCol").show();
            $("#finalMessage").empty();
            $("#correctAnswers").empty();
            $("#incorrectAnswers").empty();
            $("#unanswered").empty();
            $("#gif").hide();
            $("#gifCaption").hide();
            currentQuestion = 0;
            correctAnswer = 0;
            incorrectAnswer = 0;
            unanswered = 0;
            newQuestion();
        }
    
        //This function displays the next question
        function newQuestion(){
            $("#message").empty();
            $("#correctedAnswer").empty();
            $("#gif").hide();
            $("#gifCaption").hide();
            answered = true;
            
            //This function displays the new question
            $("#currentQuestion").html("Question " + (currentQuestion+1) + " of " + triviaQuestions.length);
            $(".question").html(triviaQuestions[currentQuestion].question);
    
            //This function displays the new questions's answer options in multiple choice type
            for(var i = 0; i <= 5; i++){
    
                var choices = $("<div>");
                choices.text(triviaQuestions[currentQuestion].answerList[i]);
                choices.attr({"data-index": i });
                choices.addClass("thisChoice");
                $(".answerList").append(choices);
            }
    
            //This sets the timer
            countdown();
    
            //When user clicks on n answer this will pause the time and display the correct answer to the question 
            $(".thisChoice").on("click",function(){
                    userSelect = $(this).attr("data-index");
                    clearInterval(time);
                    answerPage(userSelect);
                });
            }
    
        //This function is for the timer countdown
        function countdown(){
            seconds = 15;
            $("#timeLeft").html("00:" + seconds);
            answered = true;
            //Sets a delay of one second before the timer starts
            time = setInterval(showCountdown, 1000);
        }
    
        //This function displays the countdown
        function showCountdown(){
            seconds--;
    
            if(seconds < 10) {
                $("#timeLeft").html("00:0" + seconds);	
            } else {
                $("#timeLeft").html("00:" + seconds);	
            }
            
            if(seconds < 1){
                clearInterval(time);
                answered = false;
                answerPage();
            }
        }
    
        //This function takes the user to the answer page after the user selects an answer or timer runs out
        function answerPage(userSelect){
            console.log(userSelect)
            $("#currentQuestion").empty();
            $(".thisChoice").empty(); //Clears question page
            $(".question").empty();
            $("#gif").show();
            $("#gifCaption").show();
    
            var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
            var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
    
            //This adds the gif that corresponds to this quesiton
            var gifImageLink = triviaQuestions[currentQuestion].image;
            var newGif = $("<img>");
            newGif.attr("src", gifImageLink);
            newGif.addClass("gifImg");
            $("#gif").html(newGif);
    
            //STILL TO DO
            //This adds a line of text below the gif that talks about why the answer is correct.
            var gifCaption = triviaQuestions[currentQuestion].answerText;
                newCaption = $("<div>");
                newCaption.html(gifCaption);
                newCaption.addClass("gifCaption");
                $("#gifCaption").html(newCaption);
            
            //This checks to see if user choice is correct, incorrect, or unanswered
            if((userSelect == rightAnswerIndex) && (answered === true)){
                correctAnswer++;
                $('#message').html(messages.correct);
            } else if((userSelect != rightAnswerIndex) && (answered === true)){
                incorrectAnswer++;
                $('#message').html(messages.incorrect);
                $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
            } else{
                unanswered++;
                $('#message').html(messages.endTime);
                $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
                answered = true;
            }
            
            if(currentQuestion == (triviaQuestions.length-1)){
                setTimeout(scoreboard, 6000);
            } else{
                currentQuestion++;
                setTimeout(newQuestion, 6000);
            }	
        }
    
        //This fucntion displays all the game stats
        function scoreboard(){
            $('#timeLeft').empty();
            $('#message').empty();
            $('#correctedAnswer').empty();
            $('#gif').hide();
            $("#gifCaption").hide();
    
            $('#finalMessage').html(messages.finished);
            $('#correctAnswers').html("Correct Answers: " + correctAnswer);
            $('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
            $('#unanswered').html("Unanswered: " + unanswered);
            $('#startOverBtn').addClass('reset');
            $('#startOverBtn').show();
            $('#startOverBtn').html("PLAY AGAIN");
        }
    
    // MAIN PROCESS
    //=============
    
    }); 