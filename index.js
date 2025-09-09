const canvas =  document.querySelector("canvas")
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.5


//main sprite generator
class sprite{
    constructor({position,velocity,color,offset}){
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width:50,
            height:50
        }
        this.color = color
        this.isAttacking
    }
    draw(){
        c.fillStyle = this.color
        c.fillRect(
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )

        //attack box
        if(this.isAttacking){
            c.fillStyle = 'blue'
            c.fillRect(
                this.attackBox.position.x,
                this.attackBox.position.y, 
                this.attackBox.width, 
                this.attackBox.height
            )
        }
    }
    update(){
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0
        }else this.velocity.y += gravity
    }
    attack(){
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100);
    }
}


//player sprite
const player = new sprite({
    position: {
        x: 0,
        y: 0 
    },
    velocity: {
        x: 0,
        y: 0 
    },
    color:'green',
    offset:{
        x:50,
        y:0
    }
})

//enemy sprite
const enemy = new sprite({
    position: {
        x: 400,
        y: 100 
    },
    velocity: {
        x: 0,
        y: 0 
    },
    color:'red',
    offset:{
        x:-50,
        y:0
    }
})

const keys = {
    a:{
        pressed: false
    },
    d:{
        pressed: false
    },
    ArrowRight:{
        pressed: false
    },
    ArrowLeft:{
        pressed: false
    }
}
function detectCollision({rectangle1,rectangle2}){
    return(
        
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && 
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}
function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    //player movements 
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
    }else if (keys.d.pressed && player.lastKey === 'd'){
       player.velocity.x = 5 
    }

    //enemy movements
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5
    }else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
       enemy.velocity.x = 5 
    }

    //player is attacking
    if(detectCollision({rectangle1:player,rectangle2:enemy}) && player.isAttacking) {
        player.isAttacking = false
            console.log('player attack successful')
        }
    //enemy is attacking
    if(detectCollision({rectangle1:enemy,rectangle2:player}) && enemy.isAttacking) {
        enemy.isAttacking = false
            console.log('enemy attack successful')
        }
}
animate()

window.addEventListener('keydown',(event)=>{
    // console.log(event.key)
    switch(event.key){
    //player movements 
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            console.log(player.position.y)
            break
        case 'w':
            if(player.position.y === 426 ){
                player.velocity.y = -20
            }
            break
        case ' ':
            player.attack()
            break

    //enemy movememts
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            if(enemy.position.y === 426 ){
                enemy.velocity.y = -20
            }
            break
        case 'ArrowDown':
            enemy.attack()
            break
    }
})
window.addEventListener('keyup',(event)=>{
    //player movements 
    switch(event.key){
        case 'd' :
            keys.d.pressed = false
            break
        case 'a' :
            keys.a.pressed = false
            break
    }
    //enemy movememts
    switch(event.key){
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
    }
})