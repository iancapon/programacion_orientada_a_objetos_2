const Tijera = function(){
    this.resultadoContra_mi = function(tipo){
        return "Victoria"
    }

    this.contra = function(contrincante){
        return contrincante.resultadoContra_mi("Tijera")
    }
}
module.exports = Tijera