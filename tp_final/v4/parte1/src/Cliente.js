const Cuenta = require("./Cuenta")
const Paquete = require("./Paquete")

const Cliente = function (nombre, linea, fechaActual) {
    this.nombre = () => nombre
    this.linea = () => linea
    this.cuenta = new Cuenta()
    this.paquete = new Paquete()
    this.fecha = fechaActual

    this.fechaActual = () => this.fecha.fechaActual()

    this.quedaDisponible = function(){
        return this.paquete.informacionDelPaquete(this.fecha)
    }

    this.cargaDineroEnCuenta = function(dinero){
        this.cuenta.cargar(dinero)
    }

    this.compraPaquete = function(paquete){
        this.cuenta.debitar(paquete.precio())
        this.paquete = paquete.duplicado(this.fecha)
        
        return this.paquete
    }

    this.soyElMismoCliente = function (clienteAChequear) {
        return this.nombre() == clienteAChequear.nombre() && this.linea() == clienteAChequear.linea()
    }

    this.duplicado = function (fecha) {
        return new this.constructor(this.nombre(), this.linea(), fecha)
    }
}

module.exports = Cliente