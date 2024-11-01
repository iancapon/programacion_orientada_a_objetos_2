const MesAnio = function(mes,anio){

    this.mes = () => mes
    this.anio = () => anio

    this.soyLaMismaFecha = function(otra){
        return otra.mes() === this.mes() && otra.anio() === this.anio()
    }
}

module.exports = MesAnio