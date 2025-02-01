const Consumo = function (Datos, Minutos, Fecha, App) {
    this.datos = Datos
    this.minutos = Minutos
    this.fecha = Fecha
    this.app = App

    this.obtenerResumen = function () {
        return { datos: this.datos, minutos: this.minutos, fecha: this.fecha, app: this.app }
    }

    this.montoConsumido = function () {
        const resumen = this.obtenerResumen()
        if(this.app != undefined){
            return `Has consumido ${resumen.datos} MB, y ${resumen.minutos} minutos, con la App ${resumen.app}, en la fecha ${resumen.fecha.toString()}.`
        }
        return `Has consumido ${resumen.datos} MB, y ${resumen.minutos} minutos, en la fecha ${resumen.fecha.toString()}.`
    }

    this.obtenerFecha = function () {
        return this.fecha
    }

}

module.exports = Consumo 