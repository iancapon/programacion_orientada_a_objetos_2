const Cuenta = require("./Cuenta")
const Paquete = require("./Paquete")

const Cliente = function (nombre, linea, fechaActual) {
    this.nombre = () => nombre
    this.linea = () => linea
    this.cuenta = new Cuenta()
    this.paquete = new Paquete()
    this.fecha = fechaActual

    this.quedaDisponible = function(fecha){
        this.fecha = fecha
        return this.paquete.informacionDelPaquete(this.fecha)
    }

    this.cargaDineroEnCuenta = function(dinero, fecha){
        this.fecha = fecha
        this.cuenta.cargar(dinero)
    }

    this.compraPaquete = function(paquete, fecha){
        this.fecha = fecha
        this.cuenta.debitar(paquete.precio())
        this.paquete = paquete.duplicado(this.fecha)
        
        return this.paquete
    }

    this.soyElMismoCliente = function (clienteAChequear) {
        return this.nombre() == clienteAChequear.nombre() && this.linea() == clienteAChequear.linea()
    }

    this.duplicado = function (fecha) {
        return new this.constructor(this.nombre(), this.linea(), fechaActual)
    }
}

module.exports = Cliente