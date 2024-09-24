const Cola=function(){
    let elemento
    let siguiente

    this.desencolar = function(){
        this.validarQueHayElementos()

        const elementoDesencolado = elemento
        elemento = undefined

        return elementoDesencolado
    }
    this.encolar = function(newElement){
        //let elementoDesencolado
        if(elemento !== undefined){
            siguiente = new Cola()
            siguiente.encolar(newElement)
        }else{
            elemento = newElement
        }
    }
    this.mensajeDeError = function() {
        return "La cola esta vacia"
    }
    this.validarQueHayElementos = function(){
        if (elemento === undefined){
            throw new Error(this.mensajeDeError())
        }
    }
}

module.exports = Cola