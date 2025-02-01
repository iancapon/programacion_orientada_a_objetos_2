const Paquete = function (megabytes, minutos, dias, precio, appsIlimitadas) {
    const INFO = {
        Datos: megabytes,
        Minutos: minutos,
        Dias: dias,
        Precio: precio
    }

    this.datos = megabytes
    this.minutos = minutos
    this.dias = dias
    this.ultimaFecha = undefined
    this.appsIlimitadas = appsIlimitadas != undefined ? appsIlimitadas : []

    this.setearFechaDeCompra = function(fecha){
        this.ultimaFecha = fecha
    }

    this.adquierePaquete = function (fechaDeCompra) {
        let paqueteNuevo = new Paquete(INFO.Datos, INFO.Minutos, INFO.Dias, INFO.Precio, this.appsIlimitadas)
        paqueteNuevo.setearFechaDeCompra(fechaDeCompra)

        return paqueteNuevo
    }

    this.particionar = function (paqueteExterno, datos, minutos, fecha) {
        this.consumeDatos(datos)
        this.consumeMinutos(minutos)
        this.consumeDias(fecha)

        return new Paquete(datos + paqueteExterno.datosRestantes(), minutos + paqueteExterno.minutosRestantes(), this.dias, INFO.Precio, this.ultimaFecha)
    }

    this.renovar = function (fechaDeRenovacion) {
        this.datos = INFO.Datos
        this.minutos = INFO.Minutos
        this.dias = INFO.Dias
        this.ultimaFecha = fechaDeRenovacion
    }

    this.cuesta = function () { return INFO.Precio }

    this.resumenDelPlan = function () {
        return `${INFO.Datos} MB, ${INFO.Minutos} minutos, ${INFO.Dias} dias, ${INFO.Precio} pesos.`
    }

    this.resumenDeSaldo = function () {
        return `Le quedan: ${this.datos} MB y ${this.minutos} minutos. Vence en ${this.dias} días.`
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

    this.validarQueNoEsAppDeUsoIlimitado = function (resumen) {
        if (resumen.app != undefined) {
            return this.appsIlimitadas.includes(resumen.app) === false
        }
        return true
    }

    this.consumir = function (consumo) {
        const resumen = consumo.obtenerResumen()

        this.consumeMinutos(resumen.minutos)
        this.consumeDias(resumen.fecha)

        if (this.validarQueNoEsAppDeUsoIlimitado(resumen)) {
            this.consumeDatos(resumen.datos)
        }

    }
}

module.exports = Paquete