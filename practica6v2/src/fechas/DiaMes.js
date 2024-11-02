const DiaMes = function(dia,mes){
    this.dia = () => dia
    this.mes = () => mes

    this.soyLaMismaFecha = function(otra){
        return otra.dia() === this.dia() && otra.mes() === this.mes()
    }
}

module.exports = DiaMes