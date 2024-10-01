const Posicion=function(posicion){
    this.x=posicion.x
    this.y=posicion.y
    /*this.getX=function(){
        return this.x
    }
    this.getY=function(){
        return this.y
    }*/
    this.obtenerPosicion=function(){
        return {
            x:this.x,
            y:this.y
        }
    }
    this.muevoYPositivo=function(direccion){
        if(direccion=="w"){
            this.y+=1
        } 
    }
    this.muevoYNegativo=function(direccion){
        if(direccion=="s"){
            this.y-=1
        }
    }
    this.muevoXPositivo=function(direccion){
        if(direccion=="d"){
            this.x+=1
        } 
    }
    this.muevoXNegativo=function(direccion){
        if(direccion=="a"){
            this.x-=1
        }
    }
    this.moverUnaUnidad=function(c){
        this.muevoYPositivo(c)
        this.muevoYNegativo(c)
        this.muevoXPositivo(c)
        this.muevoXNegativo(c)
    }
    this.moverEnSecuencia=function(secuencia){
        secuencia.split("").forEach(c=>{
            this.moverUnaUnidad(c)
        })
    }
}

const Rover=function(){
    this.posicion=new Posicion({x:50,y:50})
    this.miPosicion=function(){
        return this.posicion.obtenerPosicion()
    }
    this.comprobarRango=function(valor){
        let caso=false
        if(100-valor >= 0 && 100-valor <= 100){
            caso=true
        }
        return caso
    }
    this.chequearValidez=function(comando){
        const posicionAChequear=new Posicion(this.posicion.obtenerPosicion())
        posicionAChequear.moverEnSecuencia(comando)
        const nuevaPosicion=posicionAChequear.obtenerPosicion()

        if(this.comprobarRango(nuevaPosicion.x)){
            if(this.comprobarRango(nuevaPosicion.y)){
                return true
            }
        }
        
        return false
    }
    this.mover=function(comando){
        if(this.chequearValidez(comando)){
            this.posicion.moverEnSecuencia(comando)
        }
    }    
}
module.exports=Rover

/*this.posicion={
        x:50,
        y:50,
        muevoYPositivo:function(direccion){
            if(direccion=="w"){
                this.y+=1
            } 
        },
        muevoYNegativo:function(direccion){
            if(direccion=="s"){
                this.y-=1
            }
        },
        muevoXPositivo:function(direccion){
            if(direccion=="d"){
                this.x+=1
            } 
        },
        muevoXNegativo:function(direccion){
            if(direccion=="a"){
                this.x-=1
            }
        },
        moverUnaUnidad:function(c){
            this.muevoYPositivo(c)
            this.muevoYNegativo(c)
            this.muevoXPositivo(c)
            this.muevoXNegativo(c)
        },
        moverEnSecuencia:function(secuencia){
            secuencia.split("").forEach(c=>{
                this.moverUnaUnidad(c)
            })
        }
    }*/