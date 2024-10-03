const Rover=function(N,M){
    this.map_n=N
    this.map_m=M
    this.p=new Posicion(N/2,M/2)
    this.posicionActualDelRover= () => this.p.posicionActual()
    this.manejoDeErrorSecuenciaMayorAdiez=function(arr){
        if(arr.length>10){
            throw new Error("Maximo de 10 casillas")
        }
    }
    this.condicionDentroDelBorde = (p) =>  p.x>=0 && p.x < this.map_n && p.y>=0 && p.y < this.map_m 

    this.dentroDelBorde=function(secuencia){
        let posicion_futura=new Posicion(this.p.posicionActual().x,this.p.posicionActual().y)
        posicion_futura.avanzarUnaSecuencia(secuencia)

        return this.condicionDentroDelBorde(posicion_futura.posicionActual())
    }

    this.avanzarSiTerminaDentroDelBorde=function(secuencia){
        if(this.dentroDelBorde(secuencia)){
            this.p.avanzarUnaSecuencia(secuencia)
        }
    }
    
    this.mover=function(command){
        const secuencia= command.split("")
        this.manejoDeErrorSecuenciaMayorAdiez(secuencia)
        this.avanzarSiTerminaDentroDelBorde(secuencia)
        
    }
}

const Posicion=function(startx,starty){
    this.p={
        x:startx,
        y:starty
    }
    this.posicionActual= () => this.p
    this.avanzarW = function(movimiento){
        if(movimiento=="w"){
            this.p.y++
        }
    }
    this.avanzarS = function(movimiento){
        if(movimiento=="s"){
            this.p.y--
        }
    }
    this.avanzarD = function(movimiento){
        if(movimiento=="d"){
            this.p.x++
        }
    }
    this.avanzarA = function(movimiento){
        if(movimiento=="a"){
            this.p.x--
        }
    }
    this.avanzarUnaCasilla=function(movimiento){
        this.avanzarW(movimiento)
        this.avanzarA(movimiento)
        this.avanzarS(movimiento)
        this.avanzarD(movimiento)
    }
    this.avanzarUnaSecuencia=function(secuencia){
        secuencia.forEach(c=>this.avanzarUnaCasilla(c))
    }
}
module.exports=Rover