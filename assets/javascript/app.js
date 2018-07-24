$(document).ready(function () {
    $("#introSection").hide();
    $("#messageSection").hide();
    $('.tooltipped').tooltip({ // delay function for button tool tips
        delay: 50
    });


    $("#introSection").fadeIn(1000 * 5, function () { // fade in page elements
        // fadeIn function
    });

    $("#questionSoccer").hide()
    var correctCounter = 0,
        incorrectCounter = 0,
        currentQuestionIndex = 0;
        unansweredCounter = 0;


    var congratsMessages = ['Great going player', 'Good Job!', "To the Pitch you go!"];

    function randomNum(x) {
        var roll = Math.floor(Math.random() * x);
        return roll;
    }

    function randomCongrats() {
        var messageRoll = randomNum(congratsMessages.length);
    }

    function countDown() {
        $('.pickAnswer').click(function () {
            $(this).data('clicked', true);
        });
        var i = 30;
        var myInterval = setInterval(function () {

            if (i < 10) {
                $('#timerSeconds').html("0" + i);
                $(".pickAnswer").on("click", function () {
                    clearInterval(myInterval);
                })
            } else {
                $('#timerSeconds').html(i);
                $(".pickAnswer").on("click", function () {
                    clearInterval(myInterval);
                })
            }

            if (i === 0) {
                unansweredCounter++;
                clearInterval(myInterval);
                currentQuestionIndex++;
                $('#timer').effect("pulsate", {
                    times: 25
                }, 1000 * 5);
                i = 30;
                postQuestion(currentQuestionIndex);
            } else {
                i--;
            }
        }, 1000);
    }

    var questions = [
        // First question 
        {
            "q": "How many players are on a soccer team?",
            "c": ["7", "10", "11", "12"],
            "answer": 3
        },
        // Second question 2
        {
            "q": "How many substitutions are there in soccer?",
            "c": ["1", "4", "unlimited", "3"],
            "answer": 3
        },
        // Third question 
        {
            "q": "Every how many years is the World Cup?",
            "c": ["4", "1", "2", "3"],
            "answer": 0
        },
        // Fourth question 
        {
            "q": "Which country has the most World Cup Trophies?",
            "c": ["England", "Spain", "Argentina", "Brazil"],
            "answer": 3
        },
        // Fifth question 
        {
            "q": "How many referees are there in a soccer match?",
            "c": ["2", "1", "3", "4"],
            "answer": 2
        },
        // Sixth question 
        {
            "q": "Which country invented soccer?",
            "c": ["Argentina", "Brazil", "USA", "England"],
            "answer": 3
        },
        // Seventh question 
        {
            "q": "Which player has scored the most World Cup goals?",
            "c": ["Just Fontaine (France)", "Diego Maradona (Argentina)", "Miro Klose (Germany)"],
            "answer": 2
        },
        // Eighth question 
        {
            "q": "Which country hosted the first World Cup tournament?",
            "c": ["USA", "England", "Italy", "Uruguay"],
            "answer": 3
        },
        //  Ninth question 
        {
            "q": "Which of these countries has NOT hosted the World Cup twice?",
            "c": ["England", "France", "Germany", "Mexico"],
            "answer": 0
        },
        // Last question
        {
            "q": "Which World Cup tournament holds the record for highest attendance?",
            "c": ["2006-Germany", "1994- United States","2010-South Africa", "1998-France", "1950-Brazil"],
            "answer": 1
        }
    ];


    function postQuestion(n) {

        if (currentQuestionIndex < questions.length) {
            $('#question').remove();
            $('.pickAnswer').remove();
            countDown();
            $('#questionContainer').append("<div id='question'>" + questions[n].q + "</div>");
            for (var i = 0; i < questions[n].c.length; i++) {
                var newDiv = $("<div>");
                newDiv.addClass("pickAnswer").attr("indexnum", i).text(questions[n].c[i]);
                $('#choices').append(newDiv);
            }


        } else {
            resetGame(); //  successfully loops the game
        }

        $(".pickAnswer").on("click", function () {
            var userChoice = $(this).attr('indexnum'); // stored as a string not a number
            userChoice = parseInt(userChoice);

            
            if (userChoice === questions[currentQuestionIndex].answer) {
                correctCounter++;
                currentQuestionIndex++
                randomCongrats();

            } else {
                incorrectCounter++;
                currentQuestionIndex++;

            }
            postQuestion(currentQuestionIndex);
        })
    }

    function startTrivia() {
        $('#messageSection').hide();
        $('#gameMessage').empty()
        $('#questionContainer').show();
        $('#choices').show();
        $("#timer").show();
        correctCounter = 0;
        incorrectCounter = 0;
        unansweredCounter = 0;
        currentQuestionIndex = 0;

        postQuestion(currentQuestionIndex);

    }

    function resetGame() {
        $('#messageSection').show();
        $('#questionContainer').hide();
        $('#choices').hide();
        $('#timer').hide()

        $('#gameMessage').append("<h2>Great Job! You have completed the game!</h2>");
        $('#gameMessage').append("<h4>Total Correct: " + correctCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Incorrect: " + incorrectCounter + "</h4>");
        $('#gameMessage').append("<h4>Total unanswered: " + unansweredCounter + "</h4>");
        

        setTimeout(startTrivia, 1000 * 10);

    }



    $("#startButton").on("click", function () {
        $("#buttonRow").hide();
        $("#introCard").remove();
        $("#timer").append("<span id='timerMinutes'>00</span>:<span id='timerSeconds'>00</span>");
        $("#questionSoccer").show();

        startTrivia();


    })


});