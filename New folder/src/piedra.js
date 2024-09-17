const Piedra = function(){
    this.resultadoContra_mi = function(tipo){
        return "Empate"
    }

    this.contra = function(contrincante){
        return contrincante.resultadoContra_mi("Piedra")
    }
}
module.exports = Piedra