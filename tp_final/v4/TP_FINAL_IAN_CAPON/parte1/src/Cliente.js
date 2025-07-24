const Cuenta = require("./Cuenta")
const { Paquete, PaqueteNulo, PaqueteActivo } = require("./Paquete")

const Cliente = function (nombre, linea, fechaActual) {
    this.nombre = () => nombre
    this.linea = () => linea
    this.cuenta = new Cuenta()
    this.paqueteActivo = new PaqueteNulo()
    this.paqueteReferencia = new PaqueteNulo()
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
            this.cuenta.debitar(this.paqueteReferencia.precio())
            this.paqueteActivo = this.paqueteReferencia.duplicadoActivo(this.fecha)
        }
    }


    this.consume = function (consumo) {
        this.actualizarFecha(consumo.fechaDeInicio())
        this.actualizarFecha(consumo.fechaDeFin())
        this.renovarSiSeHaAgotado()
        this.paqueteActivo = this.paqueteActivo.consumir(consumo)
    }

    this.quedaDisponible = function (fecha) {
        this.actualizarFecha(fecha)
        this.renovarSiSeHaAgotado()
        return this.paqueteActivo.informacionDelPaquete(this.fecha)
    }

    this.cargaDineroEnCuenta = function (dinero, fecha) {
        this.actualizarFecha(fecha)
        this.cuenta.cargar(dinero)
    }

    this.compraPaquete = function (paquete, fecha) {
        this.actualizarFecha(fecha)
        this.paqueteActivo.chequearVencidoAgotado()
        this.cuenta.debitar(paquete.precio())
        this.paqueteActivo = paquete.duplicadoActivo(this.fecha)
        this.paqueteReferencia = paquete.duplicadoInactivo()

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