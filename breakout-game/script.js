const rulesDiv= document.getElementById('rules')
const showRulesButton= document.getElementById('rules-btn')
const closeButton= document.getElementById('close-btn')
const canvas= document.getElementById('canvas')
const ctx= canvas.getContext('2d')

let score= 0
const brickRowCount= 5
const brickColumnCount= 9

const ball= {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    dx: 4,
    dy: -4
}

const paddle= {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0
}

const brickProps= {
    w: 70,
    h: 20,
    offsetX: 45,
    offsetY: 60,
    padding: 10,
    visibility: true
}

const allBricks= []
for(let i=0; i<brickColumnCount; i++){
    const { w, h, offsetX, offsetY, padding }= brickProps
    allBricks[i]= []
    for (let j=0; j<brickRowCount; j++){
        const x= i * (w + padding) + offsetX
        const y= j * (h + padding) + offsetY
        allBricks[i][j]= { x, y, ...brickProps }
    }

}

const drawBricks= () => {
    allBricks.forEach(column => {
        column.forEach(brick => {
            const { x, y, w, h , visibility }= brick
            ctx.beginPath()
            ctx.rect(x, y, w, h)
            ctx.fillStyle= visibility === true ? '#0095dd' : 'transparent'
            ctx.fill()
            ctx.closePath()
        })
    })
}

const drawBall= () => {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI*2)
    ctx.fillStyle= '#0095dd'
    ctx.fill()
    ctx.closePath()
}

const drawPaddle= () => {
    ctx.beginPath()
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h)
    ctx.fillStyle = '#0095dd'
    ctx.fill()
    ctx.closePath()
}

const drawScore= () => {
    ctx.font= '20px Arial'
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30)
}

const draw= () => {
    drawBall()
    drawPaddle()
    drawScore()
    drawBricks()
}

const movePaddle= () => {
    paddle.x += paddle.dx

    if(paddle.x + paddle.w > canvas.width){
        paddle.x= canvas.width - paddle.w
    }else if(paddle.x < 0){
        paddle.x= 0
    }
}

const moveBall= () => {
    ball.x += ball.dx
    ball.y += ball.dy

    // horizontal collision detection
    if(ball.x + ball.size >= canvas.width || (ball.x <= 0)){
        ball.dx = -ball.dx
    }

    // vertical collision detection
    if(ball.y <= 0){
        ball.dy = -ball.dy
        //checking if its hitting the paddle
    }else if(
        ball.y + (ball.size/2) >= paddle.y &&
        ball.x + (ball.size/2) >= paddle.x &&
        ball.x - (ball.size/2) <= paddle.x + paddle.w){
        ball.dy = -ball.dy
    }else if(ball.y + (ball.size/2) >= paddle.y){
        ball.dy = -ball.dy
        resetGame();
    }

    allBricks.forEach(column => {
        column.forEach(brick => {
            if(brick.visibility){
                if(
                    ball.x + (ball.size/2) >= brick.x &&
                    ball.x - (ball.size/2) <= brick.x + brick.w &&
                    ball.y + (ball.size/2) >= brick.y &&
                    ball.y - (ball.size/2) <= brick.y + brick.h){
                        brick.visibility= false;
                        ball.dy = -ball.dy;
                        increaseScore();
                    }
            }
        })
    })   
}

const increaseScore= () => {
    score += 45;
    if(score % (brickRowCount * brickColumnCount) === 0){
        resetBricks();
    }
}

const resetGame= () => {
    // resetting score
    score= 0;
    // ball.x= canvas.width/2;
    // ball.y= canvas.height/2;
    // ball.dx= 4;
    // ball.dy= -4;

    // resetting bricks
    resetBricks();
    
}

const resetBricks= () => {
    allBricks.forEach(column => {
        column.forEach(brick => {
            brick.visibility= true;
        });
    });
}

const update= () => {
    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    //move paddle
    movePaddle()

    //move ball
    moveBall()

    //draw canavas
    draw()

    //animation
    requestAnimationFrame(update)
}

update()

const keyDown= (e) => {
    if(e.key === 'Right' || e.key === 'ArrowRight'){
        paddle.dx= paddle.speed
    }else if(e.key === 'Left' || e.key === 'ArrowLeft'){
        paddle.dx= -paddle.speed
    }
}

const keyUp= (e) => {
    if(e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'Left' || e.key === 'ArrowLeft'){
        paddle.dx= 0
    }
}

//keyboard listeners for paddle
document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyUp)

showRulesButton.addEventListener('click', () => {
    rulesDiv.classList.add('show')
})

closeButton.addEventListener('click', () => {
    rulesDiv.classList.remove('show')
})
