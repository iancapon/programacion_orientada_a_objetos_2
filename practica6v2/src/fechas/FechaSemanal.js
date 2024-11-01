const FechaSemanal = function(dia){
    const _semana = ["domingo","lunes","martes","miercoles","jueves","viernes","sabado"]

    this.diaSemana = () => _semana.indexOf(dia)

    this.soyLaMismaFecha = function(otra){
        return otra.diaSemana() === this.diaSemana()
    }
}

module.exports = FechaSemanal