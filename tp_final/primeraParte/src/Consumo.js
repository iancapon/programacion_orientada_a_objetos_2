const Consumo = function (Datos, Minutos, Fecha) {
    this.datos = Datos
    this.minutos = Minutos
    this.fecha = Fecha

    this.obtenerResumen = function () {
        return { datos: this.datos, minutos: this.minutos, fecha: this.fecha }
    }

    this.obtenerFecha = function () {
        return this.fecha
    }

    this.efectuarConsumo = function (paquete) {
        paquete.consumeDatos(this.datos)
        paquete.consumeMinutos(this.minutos)
        paquete.consumeDias(this.fecha)
    }

}

module.exports = Consumo 