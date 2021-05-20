const wordContainer= document.getElementById('word')

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

const randomLetter= letters[Math.floor(Math.random() * letters.length)]

const setHiddenRandomWord= () => {
    for(let i=0; i < randomLetter.length; i++){
        const letterElement= document.createElement('div')
        letterElement.classList.add('letter')       
        wordContainer.appendChild(letterElement)
    }
}

const setLettersOfRandomWord= (key) => {
    for(let i=0; i < randomLetter.length; i++){
        if(randomLetter[i]===key){
            wordContainer.children[i].textContent= key
        }
    }
}

setHiddenRandomWord()

document.addEventListener('keypress', (e) => {
    console.log(e.key)
    setLettersOfRandomWord(e.key)
})
