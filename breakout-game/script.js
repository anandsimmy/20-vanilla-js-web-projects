const rulesDiv= document.getElementById('rules')
const showRulesButton= document.getElementById('rules-btn')
// const closeButton= document.getElementById('close-btn')

showRulesButton.addEventListener('click', () => {
    rulesDiv.classList.add('show')
})

closeButton.addEventListener('click', () => {
    rulesDiv.classList.remove('show')
})
