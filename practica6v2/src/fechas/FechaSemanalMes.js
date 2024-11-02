const FechaSemanalMes = function(dia,mes){
    const _semana = ["domingo","lunes","martes","miercoles","jueves","viernes","sabado"]

    this.mes = () => mes
    this.diaSemana = () => _semana.indexOf(dia)

    this.soyLaMismaFecha = function(otra){
        return otra.diaSemana() === this.diaSemana() && otra.mes() === this.mes()
    }
}

module.exports = FechaSemanalMes