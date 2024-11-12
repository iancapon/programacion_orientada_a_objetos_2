const Cliente = function (nombre, linea) {
    this.nombre = nombre
    this.linea = linea
    this.cuenta = 0//dinero en cuenta

    this.paquetes = []

    this.cargarEnCuenta = function (monto) {
        this.cuenta += monto
    }

    this.validarDineroEnCuenta = function (paquete) {
        if (this.cuenta - paquete.cuesta() < 0) {
            throw new Error("No fue posible comprar el paquete, falta dinero.")
        }
    }

    this.comprarPaquete = function (paquete) {
        this.validarDineroEnCuenta(paquete)

        this.paquetes.push(paquete)
        this.cuenta -= paquete.cuesta()

        return "Paquete comprado: " + paquete.resumen()
    }

    this.saldoEnCuenta = function () {
        return this.cuenta
    }

}

module.exports = Cliente