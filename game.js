const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion ={}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [ 

	{
		question: 'Who invents a loom that uses punched wooden cards to automatically weave fabric designs. Early computers would use similar punch cards?:',
		choice1: 'Charles Babbage',
		choice2: 'Charles Barkley',
		choice3: 'Joseph Marie Jacquard',
		choice4: 'Jose Mari Chan',
		answer: 3,
	},

	{
		question: 'Alan Turing presents the notion of a universal machine, later called________?:',
		choice1: 'Turing Machine',
		choice2: 'Fax Machine',
		choice3: 'Allan Machine',
		choice4: 'Washing Machine',
		answer: 1,
	},

	{
		question: 'SQL, which stands for ?:',
		choice1: 'Suko na Q Lodi',
		choice2: 'Sequence Quarrel Ligh',
		choice3: 'Secret Queen Love',
		choice4: 'Structured Query Language',
		answer: 4,
	},

	{
		question: 'Objective-C Developed by Brad Cox and Tom Love is developed in ____?:',
		choice1: '1823',
		choice2: '1932',
		choice3: '1983',
		choice4: '1893',
		answer: 3,
	},

	{
		question: '_______is a general-purpose, high-level language created by James Gosling for an interactive TV project:',
		choice1: 'Java',
		choice2: 'Javascript',
		choice3: 'JavaRice',
		choice4: 'Javaprom',
		answer: 1,
	},

	{
		question: 'In what year did English mathematician Charles Babbage conceive of a steam-driven calculating machine that would be able to compute tables of numbers?:',
		choice1: '1832',
		choice2: '1822',
		choice3: '1843',
		choice4: '1828',
		answer: 2,
	},

	{
		question: 'Who founded HP?:',
		choice1: 'Dwight Howard and Kristaps Porzingis',
		choice2: 'David Packard and Bill Hewlett',
		choice3: 'Hinyigo Pasqual and Piolo Pasqual',
		choice4: 'Arthur Henry and Poncho Pilato',
		answer: 2,
	},

	{
		question: 'What language is named after the French mathematician Blaise Pascal, Niklaus Wirth developed the programming language in his honor?:',
		choice1: 'PASCAL',
		choice2: 'BLAISE',
		choice3: 'BLAIPAS',
		choice4: 'CALBLAISE',
		answer: 1,
	},

	{
		question: 'It introduced a variety of programming language aspects that are visible languages of today such as Python, Java, and Ruby.What it is ?:',
		choice1: 'Pillowtalk',
		choice2: 'Smalltalk',
		choice3: 'Cacaotalk',
		choice4: 'TalknText',
		answer: 2,
	},

	{
		question: 'Who are the 3 makers of BDTK?:',
		choice1: 'Tito,Vic and Joey',
		choice2: 'Blossom,Bubbles and Buttercup',
		choice3: 'Joshua,Alfred and Ivan',
		choice4: 'PowerRanger Red,PowerRanger Blue and PowerRanger Green',
		answer: 3,
	}

]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()