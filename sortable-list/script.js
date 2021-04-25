const draggable_list= document.getElementById('draggable-list')

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
let dragStartIndex
let dragEndIndex

createList()

//create list items
function createList(){
    [...richestPeople]
        .map(item => ({ value: item, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(item => item.value)
        .forEach((person, index) => {
            const listItem= document.createElement('li')


            listItem.setAttribute('data-index', index)

            listItem.innerHTML= `
                <span class="number">${index+1}</span>
                <div class="draggable" draggable="true">
                    <p class="person-name">${person}</p>
                    <i class="fas fa-grip-lines"></i>
                </div>
            `
            listItems.push(listItem)

            draggable_list.appendChild(listItem)
        })
}

const swapItems= (indexOne, indexTwo) => {

    //removing colors from all persons if any
    listItems.forEach((item) => {
        item.classList.remove('right', 'wrong')
    })

    const itemOneParent= listItems[indexOne]
    const itemTwoParent= listItems[indexTwo]

    itemOneParent.appendChild(listItems[indexTwo].querySelector('.draggable'))
    itemTwoParent.appendChild(listItems[indexOne].querySelector('.draggable'))
}

const dragStart= (e) => {
    dragStartIndex= e.target.closest('li').getAttribute('data-index')
}

const dragEnter= (e) => {
    e.target.classList.add('over')
}

const dragLeave= (e) => {
    e.target.classList.remove('over')
}

const dragOver= (e) => {
    e.preventDefault()
}

const dragDrop= (e) => {
    e.target.classList.remove('over')
    dragEndIndex= e.target.closest('li').getAttribute('data-index')
    swapItems(dragStartIndex, dragEndIndex)
}

const draggables= document.querySelectorAll('.draggable')

draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStart)
    draggable.addEventListener('dragenter', dragEnter)
    draggable.addEventListener('dragleave', dragLeave)
    draggable.addEventListener('dragover', dragOver)
    draggable.addEventListener('drop', dragDrop)
})

const checkButton= document.querySelector('.check-btn')

const checkOrder= () => {
    console.log(listItems)
    listItems.forEach((item, index) => {
        if(item.querySelector('.person-name').innerText.trim() === richestPeople[index]){
            item.classList.add('right')
        }else {
            item.classList.add('wrong')
        }
    })
}

checkButton.addEventListener('click', checkOrder)