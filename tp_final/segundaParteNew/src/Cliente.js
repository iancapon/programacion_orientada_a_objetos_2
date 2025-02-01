const Paquete = require("./Paquete")

const Cliente = function (nombre, linea) {
    this.nombre = nombre
    this.linea = linea
    this.cuenta = 0//dinero en cuenta

    this.paquete = new Paquete(megabytes = 0, minutos = 0, dias = 0, precio = 0)//paquete vacio
    this.renueva = false

    this.consumos = []
    this.prestamos = []

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
            throw new Error("No fue posible comprar el paquete, falta dinero en cuenta.")
        }
    }

    this.validarPaqueteVencido_Agotado = function () {
        if (this.paquete.diasRestantes() > 0 && this.paquete.datosRestantes() > 0 && this.paquete.minutosRestantes() > 0) {
            throw new Error("Aún hay un paquete activo.")
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
        this.paquete.consumir(consumo)
        this.renovarSiEsValido(consumo.obtenerFecha())
        this.consumos.push(consumo.obtenerResumen())

        return consumo.montoConsumido()
    }

    this.comprarPaquete = function (paquete, fechaDeCompra, renueva) {
        this.validarDineroEnCuenta(paquete)
        this.validarPaqueteVencido_Agotado()

        this.paquete = paquete.adquierePaquete(fechaDeCompra)
        this.cuenta -= paquete.cuesta()

        this.renueva = renueva

        return "Paquete comprado: " + paquete.resumenDelPlan()
    }

    this.tomarPrestadoPaquete = function(paqueteNuevo){
        this.validarPaqueteVencido_Agotado()
        this.paquete = paqueteNuevo
    }

    this.presta = function (otroCliente, datos, minutos, fecha) {
        const paqueteNuevo = this.paquete.particionar(otroCliente.paquete, datos, minutos, fecha)
        const entradaNueva = { datos: datos, minutos: minutos, fecha: fecha, desdeLinea: this.linea, haciaLinea: otroCliente.linea }

        otroCliente.tomarPrestadoPaquete(paqueteNuevo)

        otroCliente.prestamos.push(entradaNueva)
        this.prestamos.push(entradaNueva)
        
    }

    this.prestamosHastaLaFecha = function () {
        return this.prestamos
    }

}

module.exports = Cliente