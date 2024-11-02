const DiaAnio = function(dia,anio){

    this.dia = () => dia
    this.anio = () => anio

    this.soyLaMismaFecha = function(otra){
        return otra.dia() === this.dia() && otra.anio() === this.anio()
    }
}

module.exports = DiaAnio