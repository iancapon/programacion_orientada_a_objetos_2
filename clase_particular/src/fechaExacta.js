const fechaExacta = function(dia,mes,anio){
    this.objetoFecha = new Date(`${mes}/${dia}/${anio}`)
    
    this.diaDeSemana = ()=> this.objetoFecha.getDay()

    this.dia = ()=> dia
    this.mes = ()=> mes 
    this.anio = ()=> anio

    this.esLaMismaFecha = function(otraFecha){
        return this.dia() == otraFecha.dia() && this.mes() == otraFecha.mes() && this.anio() == otraFecha.anio()
    }
}

module.exports = fechaExacta