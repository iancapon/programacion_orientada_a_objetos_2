const ConsumoDeApp = function (App, Datos, Fecha) {
    this.app = App
    this.datos = Datos
    this.minutos = 0
    this.fecha = Fecha

    this.obtenerResumen = function () {
        return { app: this.app, datos: this.datos, minutos: 0, fecha: this.fecha }
    }

    this.montoConsumido = function () {
        const resumen = this.obtenerResumen()
        return `Has consumido ${resumen.datos} MB, y ${resumen.minutos} minutos, en la fecha ${resumen.fecha.toString()}.`
    }

    this.obtenerFecha = function () {
        return this.fecha
    }
}

module.exports = ConsumoDeApp