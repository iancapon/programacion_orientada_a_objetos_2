const FechaSemanalAnio = function(dia,anio){
    const _semana = ["domingo","lunes","martes","miercoles","jueves","viernes","sabado"]

    this.anio = () => anio
    this.diaSemana = () => _semana.indexOf(dia)

    this.soyLaMismaFecha = function(otra){
        return otra.diaSemana() === this.diaSemana() && otra.anio() === this.anio()
    }
}

module.exports = FechaSemanalAnio