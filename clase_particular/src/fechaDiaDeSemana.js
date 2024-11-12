const fechaDiaSemana = function(dia){
    const diasDeLaSemana = ["domingo","lunes","martes","miercoles","jueves","viernes","sabado"]
    this.diaDeSemana = ()=> diasDeLaSemana.indexOf(dia)

    this.esLaMismaFecha = function(otraFecha){
        return this.diaDeSemana() == otraFecha.diaDeSemana()
    }
}

module.exports = fechaDiaSemana