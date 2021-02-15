const container= document.querySelector('.container')
const seats= document.querySelectorAll('.row .seat:not(.occupied)')
const count= document.getElementById('count')
const total= document.getElementById('total')
const movie= document.getElementById('movie')

let ticketPrice= movie.value

const updateUiFromLocal= () => {
    const selectedSeatsIndex= localStorage.getItem('selectedSeatsIndex')
    const selectedMovieIndex= localStorage.getItem('selectedMovieIndex') || 0
    const selectedMovieValue= localStorage.getItem('selectedMovieValue') || 0

    if(selectedSeatsIndex.length>0){
        [...seats].forEach((seat, index) => {
            if(selectedSeatsIndex.includes(index)){
                seat.classList.toggle('selected')
            }
        })
    }
    movie.selectedIndex= selectedMovieIndex
    ticketPrice= selectedMovieValue
}

const saveDataToLocalStorage= (selectedMovieIndex, selectedMovieValue) => {
    localStorage.setItem('selectedMovieIndex', selectedMovieIndex)
    localStorage.setItem('selectedMovieValue', selectedMovieValue)
}

//update total and count
const updateTotalAndCount= () => {
    const selectedSeats= document.querySelectorAll('.row .seat.selected')

    //saving data to localStorage
    const seatsIndex= [...selectedSeats].map((seat) => {
        return [...seats].indexOf(seat)
    })
    localStorage.setItem('selectedSeatsIndex', JSON.stringify(seatsIndex))

    count.innerText= selectedSeats.length
    total.innerText= selectedSeats.length * ticketPrice   
}

//listeners
container.addEventListener('click', (e) => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected')
        updateTotalAndCount()
    }
})

movie.addEventListener('change',() => {
    ticketPrice= movie.value
    saveDataToLocalStorage(movie.selectedIndex, movie.value)
    updateTotalAndCount()
})


//executing functions
updateUiFromLocal()
updateTotalAndCount()
saveDataToLocalStorage(movie.selectedIndex, movie.value)
