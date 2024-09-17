const Papel = function(){
    this.resultadoContra_mi = function(tipo){
        return "Derrota"
    }
    this.resultadoDePapelContraMi = function(){
        return "Empate"
    }
    this.resultadoDePiedraContraMi = function(){
        return "Derrota"
    }

    this.contra = function(contrincante){
        return contrincante.resultadoDePapelContraMi()
    }
}
module.exports = Papel