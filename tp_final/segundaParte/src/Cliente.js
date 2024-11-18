const Paquete = require("./Paquete")

const Cliente = function (nombre, linea) {
    this.nombre = nombre
    this.linea = linea
    this.cuenta = 0//dinero en cuenta

    this.paquete = new Paquete(megabytes = 0, minutos = 0, dias = 0, precio = 0)//paquete vacio
    this.renueva = false

    this.consumos = []

    this.cargarEnCuenta = function (monto) {
        this.cuenta += monto
    }

    this.saldoEnCuenta = function () {
        return this.cuenta
    }

    this.resumenDeSaldo = function () {
        return this.paquete.resumenDeSaldo()
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

    this.ordenarConsumosPorFecha = function () {
        this.consumos.sort((a, b) => a.fecha.getTime() - b.fecha.getTime())
    }

    this.consumosHastaLaFecha = function () {
        this.ordenarConsumosPorFecha()
        return this.consumos
    }

    this.dentroDeLaFecha = function (inicial, final, consumo) {
        return consumo.fecha.getTime() >= inicial.getTime() === consumo.fecha.getTime() <= final.getTime()
    }

    this.consumosAcotados = function (inicial, final) {
        this.ordenarConsumosPorFecha()
        return this.consumos.filter(consumo => {
            return this.dentroDeLaFecha(inicial, final, consumo)
        })
    }

    this.renovarSiEsValido = function (fecha) {
        if (this.paquete.consumeDias(fecha) && this.renueva) {
            this.validarDineroEnCuenta(this.paquete)
            this.paquete.renovar(fecha)
            this.cuenta -= this.paquete.cuesta()
        }
    }

    this.consume = function (consumo) {
        this.paquete.consume(consumo)
        this.renovarSiEsValido(consumo.obtenerFecha())
        this.consumos.push(consumo.obtenerResumen())

        return consumo.montoConsumido()
    }

    this.comprarPaquete = function (paquete, fechaDeCompra, renueva) {
        this.validarDineroEnCuenta(paquete)
        this.validarPaqueteVencido_Agotado()

        this.paquete = paquete
        this.paquete.seCompraEn(fechaDeCompra)
        this.cuenta -= paquete.cuesta()

        this.renueva = renueva 

        return "Paquete comprado: " + paquete.resumenDelPlan()
    }

}

module.exports = Cliente