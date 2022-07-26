class Sprite {
    constructor({
        position, 
        imageSrc, 
        scale = 1, 
        framesMax = 1, 
        offset = {x:0, y:0}
    }) {
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image () // Acá usamos un native API object de Javascript.
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.offset = offset // Esto es para compensar el espacio que hay la img de samuraiMack.
    }

    draw() {   
      c.drawImage(
        this.image,
        this.framesCurrent * (this.image.width / this.framesMax),
        0,
        this.image.width / this.framesMax,
        this.image.height, // Las primeras cuatro líneas determinan el cropping del shop.
        this.position.x - this.offset.x, 
        this.position.y - this.offset.y, 
        (this.image.width / this.framesMax) * this.scale, 
        this.image.height * this.scale
       )
    }

    animateFrames() {
        this.framesElapsed++
    // Acá hacemos que los frames se ralenticen o se muevan.
            if(this.framesElapsed % this.framesHold === 0) {
            if(this.framesCurrent < this.framesMax - 1) { 
            this.framesCurrent++ 
            } else {
              this.framesCurrent = 0  
            }
          }
}
    
// En el update hacemos que el recorte vaya pasando por todo el shop, a framesMax le restamos uno porque en el parámetro del constructor es = 1.
    update() {
        this.draw()
        this.animateFrames()
    }

}

// Acá creo el objeto. Defino la posición y la velocidad como un solo argumento con {}.
// Al aplicar extends, hacemos que la class Fighter pueda tomar todos los métodos de la class Sprite.
// Super() adopta lo que tiene el constructor padre del Sprite.
class Fighter extends Sprite{
    constructor({
        position, 
        velocity, 
        color = 'red', 
        imageSrc, 
        scale = 1, 
        framesMax = 1,
        offset = {x:0, y:0},
        sprites,
        attackBox = { offset: {}, width:undefined, height:undefined }
    }) {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset,
        })

        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        }
        this.color = color
        this.isAttacking 
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.sprites = sprites
        this.dead = false
    // Acá usamos un bucle para acceder a las propiedades que están en el Sprite del Index.js.

        for ( const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
    }

    // Esto se elimina porque los personajes ya no van a ser más rectángulos.
    // draw() {
    //     c.fillStyle = this.color
    //     c.fillRect(this.position.x, this.position.y, this.width, this.height)
    //
    // attack box
    //     if (this.isAttacking) {
    //         c.fillStyle = 'green'
    //         c.fillRect(
    //             this.attackBox.position.x, 
    //             this.attackBox.position.y, 
    //             this.attackBox.width, 
    //             this.attackBox.height
    //         )
    //      }    
    // }
    

// Esto actualiza el movimiento.
    update() {
        this.draw()
        if(!this.dead) this.animateFrames()

        // attack boxes
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y
        // draw the attack box
        // c.fillRect(
        //     this.attackBox.position.x, 
        //     this.attackBox.position.y, 
        //     this.attackBox.width, 
        //     this.attackBox.height
        // )

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y// Esto es igual a usar "this.position.y = this.position.y + this.velocity.y."

// gravity function
        if (this.position.y + this.height + this.velocity.y >= 
            canvas.height - 96) {
            this.velocity.y = 0 // Acá lo que buscamos es que el rect no siga hasta abajo y se frene en el height de canvas, que es 0.
            this.position.y = 330
        } else this.velocity.y += gravity 
    }

    attack() {
        this.switchSprite('attack1')
        this.isAttacking = true
    }

    takeHit(){
    this.health -= 20

        if (this.health <= 0) {
            this.switchSprite('death')
        } else this.switchSprite('takeHit')      
    }

//Método para cambiar de Sprites. 
    switchSprite(sprite){
    if(this.image === this.sprites.death.image) {
        if(this.framesCurrent === this.sprites.death.framesMax - 1)
        this.dead = true
    return}

// Overriding all other animations with the attack animation.
    if
    (this.image === this.sprites.attack1.image && 
    this.framesCurrent < this.sprites.attack1.framesMax -1
    ) 
        return

// Override when fighter takes hit.

    if
    (this.image === this.sprites.takeHit.image && 
    this.framesCurrent < this.sprites.takeHit.framesMax -1
    )

        return

    switch(sprite) {
        case 'idle':
            if (this.image !== this.sprites.idle.image) {
            this.image = this.sprites.idle.image
            this.framesMax = this.sprites.idle.framesMax
            this.framesCurrent = 0
        }
        break
        case 'run':
            if (this.image !== this.sprites.run.image) { 
            this.image = this.sprites.run.image
            this.framesMax = this.sprites.run.framesMax
            this.framesCurrent = 0
        }
        break
        case 'jump':
            if (this.image !== this.sprites.jump.image) {
            this.image = this.sprites.jump.image
            this.framesMax = this.sprites.jump.framesMax
            this.framesCurrent = 0
        }
        break
        case 'fall':
            if (this.image !== this.sprites.fall.image) {
            this.image = this.sprites.fall.image
            this.framesMax = this.sprites.fall.framesMax
            this.framesCurrent = 0
        }
        break
        case 'attack1':
            if (this.image !== this.sprites.attack1.image) {
            this.image = this.sprites.attack1.image
            this.framesMax = this.sprites.attack1.framesMax
            this.framesCurrent = 0
        }
        break
        case 'takeHit':
            if (this.image !== this.sprites.takeHit.image) {
            this.image = this.sprites.takeHit.image
            this.framesMax = this.sprites.takeHit.framesMax
            this.framesCurrent = 0
        }
        break
        case 'death':
            if (this.image !== this.sprites.death.image) {
            this.image = this.sprites.death.image
            this.framesMax = this.sprites.death.framesMax
            this.framesCurrent = 0
        }
        break
    }
}
}