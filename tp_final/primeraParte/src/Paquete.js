const Paquete = function (gigabytes, minutos, dias, precio, fechaDeCompra) {
    this.datos = gigabytes
    this.minutos = minutos
    this.dias = dias
    this.precio = precio

    this.ultimaFecha = fechaDeCompra

    this.renovar = function (fechaDeRenovacion) {
        this.datos = gigabytes
        this.minutos = minutos
        this.dias = dias
        this.ultimaFecha = fechaDeRenovacion
    }

    this.seCompraEn = function (fecha) { this.ultimaFecha = fecha == undefined ? this.ultimaFecha : fecha }

    this.resumenDelPlan = function () {
        return this.datos + " GB, " + this.minutos + " minutos, " + this.dias + " dias, " + this.precio + " pesos."
    }

    this.cuesta = function () { return this.precio }


    this.validarDatosPasados = function (datos) {
        if (this.datos - datos < 0) {
            throw new Error("No se puede consumir esa cantidad de datos.")
        }
    }
    this.consumeDatos = function (datos) {
        this.validarDatosPasados(datos)
        this.datos -= datos
    }

    this.validarMinutosPasados = function (minutos) {
        if (this.minutos - minutos < 0) {
            throw new Error("No se puede consumir esa cantidad de minutos.")
        }
    }
    this.consumeMinutos = function (minutos) {
        this.validarMinutosPasados(minutos)
        this.minutos -= minutos
    }

    this.calcularDiferenciaDeDias = function (fecha) {
        return (fecha.getTime() - this.ultimaFecha.getTime()) / (1000 * 60 * 60 * 24) // de milisegundos a dias
    }
    this.validarDiasPasados = function (fecha) {
        if (this.dias - this.calcularDiferenciaDeDias(fecha) < 0) {
            throw new Error("No se puede consumir esa cantidad de dias.")
        }
    }
    this.pasanDias = function (fecha) {
        this.validarDiasPasados(fecha)
        this.dias -= this.calcularDiferenciaDeDias(fecha)
        this.ultimaFecha = fecha

        return this.dias === 0//se termina el plan
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