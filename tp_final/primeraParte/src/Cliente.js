const Paquete = require("./Paquete")

const Cliente = function (nombre, linea) {
    this.nombre = nombre
    this.linea = linea
    this.cuenta = 0//dinero en cuenta

    this.paquete = new Paquete(megabytes = 0, minutos = 0, dias = 0, precio = 0)//paquete vacio
    this.renueva = false

    this.consumos = []

    this.consumosHastaLaFecha = function (inicial, final) {
        this.consumos.sort((a,b) => a.fecha.getTime() - b.fecha.getTime())
        return this.consumos.filter(consumo => {
            const condicion_inicial = inicial == undefined ? true : consumo.fecha.getTime() >= inicial.getTime()
            const conficion_final = final == undefined ? true : consumo.fecha.getTime() <= final.getTime()
            return condicion_inicial == conficion_final
        })
    }

    this.cargarEnCuenta = function (monto) {
        this.cuenta += monto
    }

    this.resumenDeSaldo = function () {
        return `Le quedan: ${this.paquete.datosRestantes()} GB y ${this.paquete.minutosRestantes()} minutos. Vence en ${this.paquete.diasRestantes()} días.`
    }

    this.renovarSiEsValido = function (fecha) {
        if (this.paquete.pasanDias(fecha) && this.renueva) {
            this.validarDineroEnCuenta(this.paquete)
            this.paquete.renovar(fecha)
            this.cuenta -= this.paquete.cuesta()
        }
    }

    this.consume = function (datos, minutos, fecha) {
        this.paquete.consumeDatos(datos)
        this.paquete.consumeMinutos(minutos)
        this.paquete.pasanDias(fecha)

        this.renovarSiEsValido(fecha)

        this.consumos.push({ datos: datos, minutos: minutos, fecha: fecha })

        return this.resumenDeSaldo()
    }

    this.validarDineroEnCuenta = function (paquete) {
        if (this.cuenta - paquete.cuesta() < 0) {
            throw new Error("No fue posible comprar el paquete, falta saldo.")
        }
    }

    this.validarPaqueteVencido_Agotado = function () {
        if (this.paquete.diasRestantes() > 0 && this.paquete.datosRestantes() > 0 && this.paquete.minutosRestantes() > 0) {
            throw new Error("No fue posible comprar el paquete, ya hay un paquete activo.")
        }
    }


    this.comprarPaquete = function (paquete, fechaDeCompra, renueva) {
        this.validarDineroEnCuenta(paquete)
        this.validarPaqueteVencido_Agotado()

        this.paquete = paquete
        this.paquete.seCompraEn(fechaDeCompra)
        this.cuenta -= paquete.cuesta()

        this.renueva = renueva === true

        return "Paquete comprado: " + paquete.resumenDelPlan()
    }

    this.saldoEnCuenta = function () {
        return this.cuenta
    }

}

module.exports = Cliente