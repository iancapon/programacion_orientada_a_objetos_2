const FechaExacta = function(dia,mes,anio){
    const fecha = new Date(mes+"/"+dia+"/"+anio)

    this.dia = () => String(fecha.getDate())
    this.mes = () => String(fecha.getMonth()+1)
    this.anio = () => String(fecha.getFullYear())
    this.diaSemana = () => fecha.getDay()

    this.soyLaMismaFecha = function(otra){
        return otra.dia() === this.dia() && otra.mes() === this.mes() && otra.anio() === this.anio()
    }
}

module.exports = FechaExacta