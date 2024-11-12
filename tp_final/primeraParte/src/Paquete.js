const Paquete = function (megabytes, minutos, dias, precio, fechaDeCompra) {
    this.INFORMACION_DEL_PAQUETE = {
        Datos: megabytes,
        Minutos: minutos,
        Dias: dias,
        Precio: precio
    }

    this.datos = megabytes
    this.minutos = minutos
    this.dias = dias
    this.ultimaFecha = fechaDeCompra

    this.renovar = function (fechaDeRenovacion) {
        this.datos = this.INFORMACION_DEL_PAQUETE.Datos
        this.minutos = this.INFORMACION_DEL_PAQUETE.Minutos
        this.dias = this.INFORMACION_DEL_PAQUETE.Dias
        this.ultimaFecha = fechaDeRenovacion
    }

    this.seCompraEn = function (fecha) { this.ultimaFecha = fecha == undefined ? this.ultimaFecha : fecha }

    this.cuesta = function () { return this.INFORMACION_DEL_PAQUETE.Precio }

    this.resumenDelPlan = function () {
        return this.datos + " GB, " + this.minutos + " minutos, " + this.dias + " dias, " + this.INFORMACION_DEL_PAQUETE.Precio + " pesos."
    }

    this.validarDatosPasados = function (datos) {
        if (this.datos - datos < 0) {
            throw new Error("No se puede consumir esa cantidad de datos.")
        }
    }

    this.validarMinutosPasados = function (minutos) {
        if (this.minutos - minutos < 0) {
            throw new Error("No se puede consumir esa cantidad de minutos.")
        }
    }

    this.calcularDiferenciaDeDias = function (fecha) {
        return (fecha.getTime() - this.ultimaFecha.getTime()) / (1000 * 60 * 60 * 24) // de milisegundos a dias
    }

    this.validarDiasPasados = function (fecha) {
        if (this.dias - this.calcularDiferenciaDeDias(fecha) < 0) {
            throw new Error("No se puede consumir esa cantidad de dias.")
        }
    }

    this.consumeDatos = function (datos) {
        this.validarDatosPasados(datos)
        this.datos -= datos
    }

    this.consumeMinutos = function (minutos) {
        this.validarMinutosPasados(minutos)
        this.minutos -= minutos
    }

    this.consumeDias = function (fecha) {
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