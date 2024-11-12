const Paquete = function (gigabytes, minutos, dias, precio, fechaDeCompra) {
    this.datos = gigabytes
    this.minutos = minutos
    this.dias = dias
    this.precio = precio

    this.fechaDeCompra = fechaDeCompra

    this.seCompraEn = function (fecha) { this.fechaDeCompra = fecha }

    this.resumen = function () {
        return this.datos + " GB, " + this.minutos + " minutos, " + this.dias + " dias, " + this.precio + " pesos."
    }

    this.cuesta = function () { return this.precio }

    this.consumeDatos = function (datos) {
        this.datos -= datos
    }
    this.consumeMinutos = function (minutos) {
        this.minutos -= minutos
    }
    this.pasanDias = function (fecha) {
        if (this.fechaDeCompra != undefined) {
            this.dias -= (fecha.getTime() - this.fechaDeCompra.getTime()) / (1000 * 60 * 60 * 24) // de milisegundos a dias
        }

    }

    this.datosRestantes = function () {
        return this.datos
    }
    this.minutosRestantes = function () {
        return this.minutos
    }
    this.diasRestantes = function () {
        return this.dias
    }
}

module.exports = Paquete