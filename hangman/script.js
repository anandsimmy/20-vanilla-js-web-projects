const wordContainer= document.getElementById('word')

const letters= ['programmer', 'computer', 'keyboard', 'internet', 'facebook']

const randomLetter= letters[Math.floor(Math.random() * letters.length)]

const setLettersOfRandomWord= () => {
    for(let i=0; i < randomLetter.length; i++){
        const letterElement= document.createElement('div')
        letterElement.classList.add('letter')
        letterElement.textContent= randomLetter[i]
        wordContainer.appendChild(letterElement)
    }
}

setLettersOfRandomWord()

document.addEventListener('keypress', (e) => {
    console.log(e.key)
})