const fechaRepetidaAnualmente = function(dia,mes){
    this.dia = ()=> dia
    this.mes = ()=> mes 

    this.esLaMismaFecha = function(otraFecha){
        return this.dia() == otraFecha.dia() && this.mes() == otraFecha.mes()
    }
}

module.exports = fechaRepetidaAnualmente