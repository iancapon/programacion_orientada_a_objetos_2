const Consumo = function (Datos, Minutos, Fecha) {
    this.datos = Datos
    this.minutos = Minutos
    this.fecha = Fecha

    this.obtenerResumen = function () {
        return { datos: this.datos, minutos: this.minutos, fecha: this.fecha }
    }

    this.montoConsumido = function(){
        const resumen = this.obtenerResumen()
        return `Has consumido ${resumen.datos} MB, y ${resumen.minutos} minutos, en la fecha ${resumen.fecha.toString()}.`
    }

    this.obtenerFecha = function () {
        return this.fecha
    }
}

module.exports = Consumo 