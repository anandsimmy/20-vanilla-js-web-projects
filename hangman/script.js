const wordContainer= document.getElementById('word')
const wrongLetterContainer= document.getElementById('wrong-letters')
const notificationContainer= document.getElementById('notification-container')
const figureParts= document.querySelectorAll('.figure-part')
const popupContainer= document.getElementById('popup-container')
const finalMessage= document.getElementById('final-message')
const playButton= document.getElementById('play-button')

const letters= [
    'programmer',
    'computer',
    'keyboard',
    'internet',
    'facebook',
    'aquarium',
    'flowers',
    'linkedin'
]

let randomLetter;

const setHiddenRandomWord= () => {
    randomLetter= letters[Math.floor(Math.random() * letters.length)]
    wordContainer.innerHTML= ''
    for(let i=0; i < randomLetter.length; i++){
        const letterElement= document.createElement('div')
        letterElement.classList.add('letter')       
        wordContainer.appendChild(letterElement)
    }
}

const showPopcontainer= (win= 'true') => {
    popupContainer.style.display= 'flex'
    finalMessage.textContent= `${win ? 'Hurray, You won the game! 🥳' : 'Sorry, You lost the game! 😵'}`
}

const showFigure= () => {
    const figures= [...figureParts]
    for(let i=0; i<figures.length; i++){
        if(figures[i].style.display==='none'){
            figures[i].style.display= 'flex'
            break
        }
    }
    if(!figures.some(figure => figure.style.display==='none')){
        showPopcontainer(false)
    }
}

const hideFigure= () => {
    const figures= [...figureParts]
    for(let i=0; i<figures.length; i++){
        figures[i].style.display= 'none'
    }
}

const showAlreadyTypeNotification= () => {
    notificationContainer.style.bottom= '0px'
    setTimeout(() => {
        notificationContainer.style.bottom= '-50px'
    }, 2000)
}

const setLettersOfRandomWord= (key) => {
    // checking if typed letter is present in the randomLetter or not
    if(!randomLetter.includes(key)){
        if(!wrongLetterContainer.hasChildNodes()){
            showFigure()
            const paragraphHeading= document.createElement('p')
            const wrongLettersSpan= document.createElement('span')
            paragraphHeading.className= 'wrong-paragraph'
            paragraphHeading.textContent= 'Wrong'
            wrongLettersSpan.textContent= key
            wrongLetterContainer.appendChild(paragraphHeading)
            wrongLetterContainer.appendChild(wrongLettersSpan)
        }
        else{
            const wrongLettersSpan= wrongLetterContainer.querySelector('span')
            // checking if typed letter is already there in the wrong words container
            if(wrongLettersSpan.textContent.includes(key)){
                showAlreadyTypeNotification()
            }else{
                showFigure()
                const wrongLettersSpan= wrongLetterContainer.querySelector('span')
                wrongLettersSpan.textContent= wrongLettersSpan.textContent + `,${key}`
            }
        }
    }else {
        // checking if typed letter is already there in the word container
        const childNodes= wordContainer.childNodes
        if([...childNodes]?.some(childNode => childNode.textContent.includes(key) )){
            showAlreadyTypeNotification()
        }else{
            for(let i=0; i < randomLetter.length; i++){
                if(randomLetter[i]===key){
                    wordContainer.children[i].textContent= key
                }
            }
            const letters= [...document.querySelectorAll('.letter')]
            if(!letters.some(letter => !letter.textContent)){
                showPopcontainer(true)
            }
        }
    }
}

const playAgain= () => {
    popupContainer.style.display= 'none'
    wrongLetterContainer.innerHTML= ''
    hideFigure()
    setHiddenRandomWord()
}

// starting game
setHiddenRandomWord()

// listeners
document.addEventListener('keypress', (e) => {
    notificationContainer.style.bottom= '-50px'
    setLettersOfRandomWord(e.key)
})

playButton.addEventListener('click', () => {
    playAgain()
})
