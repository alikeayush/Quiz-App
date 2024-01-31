const questions = [
    {
        question: ""Which of the following keywords is used to define a variable in Javascript?",
        answers:[
            {text:"Let", correct:false},
            {text:"Var", correct:false},
            {text:"Both A And B", correct:true},
            {text:"None", correct:false},
        ]
      },
    {
        question: "What does the term DNS stand for?",
        answers:[
            {text:"Data Network Service", correct:false},
            {text:"Domain Name System", correct:true},
            {text:"Digital Naming Server", correct:false},
            {text:"Dynamic Network Setup", correct:false},
        ]
    },
    {
        question: "Which programming language is known for its use in building dynamic web pages?",
        answers:[
            {text:"C++", correct:false},
            {text:"Javascript", correct:true},
            {text:"Python", correct:false},
            {text:"Swift", correct:false},
        ]
    },
    {
        question: "Which of the following is a NoSQL database?",
        answers:[
            {text:"PostgreSQL", correct:false},
            {text:"MongoDB", correct:true},
            {text:"SQLite", correct:false},
            {text:"MySQL", correct:false},
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score =0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML ="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML =questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display  = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
