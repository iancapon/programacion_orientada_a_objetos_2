const Cuenta = require("./Cuenta")
const { Paquete, PaqueteNulo, PaqueteActivo } = require("./Paquete")

const Cliente = function (nombre, linea, fechaActual) {
    this.nombre = () => nombre
    this.linea = () => linea
    this.cuenta = new Cuenta()
    this.paqueteActivo = new PaqueteNulo()
    this.paqueteInactivo = new PaqueteNulo()
    this.fecha = fechaActual
    this.renovarAutomaticamente = false

    this.fechaActual = () => this.fecha.fechaActual()

    this.actualizarFecha = (nuevaFecha) => this.fecha.actualizarFecha(nuevaFecha)

    this.activarRenovacionAutomatica = () => this.renovarAutomaticamente = true
    this.desactivarRenovacionAutomatica = () => this.renovarAutomaticamente = false

    this.renovarSiSeHaAgotado = function () {
        if (!this.renovarAutomaticamente) {
            return
        } if (this.paqueteActivo.vencido() || this.paqueteActivo.agotado()) {
            this.cuenta.debitar(this.paqueteInactivo.precio())
            this.paqueteActivo = this.paqueteInactivo.duplicadoActivo(this.fecha)
        }
    }


    this.consume = function (consumo) {
        this.renovarSiSeHaAgotado()
        this.paqueteActivo = this.paqueteActivo.consumir(consumo)
    }

    this.quedaDisponible = function () {
        this.renovarSiSeHaAgotado()
        return this.paqueteActivo.informacionDelPaquete(this.fecha)
    }

    this.cargaDineroEnCuenta = function (dinero) {
        this.cuenta.cargar(dinero)
    }

    this.compraPaquete = function (paquete) {
        this.paqueteActivo.chequearVencidoAgotado()
        this.cuenta.debitar(paquete.precio())
        this.paqueteActivo = paquete.duplicadoActivo(this.fecha)
        this.paqueteInactivo = paquete.duplicadoInactivo()

        return this.paqueteActivo
    }

    this.soyElMismoCliente = function (clienteAChequear) {
        return this.nombre() == clienteAChequear.nombre() && this.linea() == clienteAChequear.linea()
    }

    this.duplicado = function (fecha) {
        return new Cliente(this.nombre(), this.linea(), fecha)
    }
}

module.exports = Cliente