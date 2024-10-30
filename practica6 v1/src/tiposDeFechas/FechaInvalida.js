const FechaInvalida = function () {
    this.soy = () => "Fecha invalida"
    this.tipoCorrecto = () => true
    this.es = function(){
        throw new Error("Fecha ingresada invalida")
    }
}

module.exports = FechaInvalida