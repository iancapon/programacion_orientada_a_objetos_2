const Paquete = require("./Paquete")

const Cliente = function (nombre, linea) {
    this.nombre = nombre
    this.linea = linea
    this.cuenta = 0//dinero en cuenta

    this.paquete = new Paquete(gigabytes = 0, minutos = 0, dias = 0, precio = 0)//paquete vacio
    this.renueva = false

    this.cargarEnCuenta = function (monto) {
        this.cuenta += monto
    }

    this.consume = function (datos, minutos, fecha) {
        this.paquete.consumeDatos(datos)
        this.paquete.consumeMinutos(minutos)
        this.paquete.pasanDias(fecha)
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


    this.comprarPaquete = function (paquete, fechaDeCompra) {
        this.validarDineroEnCuenta(paquete)
        this.validarPaqueteVencido_Agotado()

        this.paquete = paquete
        this.paquete.seCompraEn(fechaDeCompra)
        this.cuenta -= paquete.cuesta()

        return "Paquete comprado: " + paquete.resumen()
    }

    this.saldoEnCuenta = function () {
        return this.cuenta
    }

}

module.exports = Cliente