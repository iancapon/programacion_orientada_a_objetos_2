const Cuenta = require("./Cuenta")

const Cliente = function (nombre = null, linea = null, cuenta = new Cuenta(), reloj) {
    if (!nombre || !linea) {
        throw new Error("Cliente no tiene los parámetros necesarios para ser válido.")
    }
    this.nombre = nombre
    this.linea = linea
    this.cuenta = cuenta
    this.reloj = reloj
    this.paqueteActivo = null /////////////////////// meter null object pattern

    this.comprarPaquete = function (paquete) {
        this.cuenta.debitar(paquete.precio())
        this.paqueteActivo = paquete.activo()
    }

    this.cargar = (monto) => this.cuenta.cargar(monto)
}

module.exports = Cliente