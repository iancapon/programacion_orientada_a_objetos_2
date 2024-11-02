const FechaExacta = function(dia,mes,anio){
    const fecha = new Date(String(mes)+"/"+String(dia)+"/"+String(anio))

    this.dia = () => fecha.getDate()
    this.mes = () => fecha.getMonth()+1
    this.anio = () => fecha.getFullYear()
    this.diaSemana = () => fecha.getDay()

    this.soyLaMismaFecha = function(otra){
        return otra.dia() === this.dia() && otra.mes() === this.mes() && otra.anio() === this.anio()
    }

    this.toString = ()=> fecha.toString()
}

module.exports = FechaExacta