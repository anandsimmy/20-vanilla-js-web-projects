const draggable_list= document.getElementById('draggable-list')
const checkButton= document.getElementById('check')

const richestPeople= [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffet',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'
]

//store list tiems
const listItems= []

createList()

//create list items
function createList(){
    [...richestPeople].forEach((person, index) => {
        const listItem= document.createElement('li')

        listItem.setAttribute('data-index', index)

        listItem.innerHTML= `
            <span class="number">${index}</span>
            <div class="draggable" draggable="true">
                <p class="person-name">${person}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
        `
        listItems.push(listItem)

        draggable_list.appendChild(listItem)
    })
}