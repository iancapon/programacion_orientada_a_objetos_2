const Cuenta = require("./Cuenta")
const { PaqueteNulo } = require("./Paquete")

const Cliente = function (nombre, linea, fechaActual) {
    const cuenta = new Cuenta()
    this.paqueteActivo = new PaqueteNulo()
    this.paqueteReferencia = new PaqueteNulo()
    this.nombre = () => nombre
    this.linea = () => linea
    this.fecha = () => fechaActual
    this.renovarAutomaticamente = false

    this.actualizarFecha = (nuevaFecha) => this.fecha().actualizarFecha(nuevaFecha)

    this.fechaActual = () => this.fecha().fechaActual()

    this.activarRenovacionAutomatica = () => this.renovarAutomaticamente = true
    this.desactivarRenovacionAutomatica = () => this.renovarAutomaticamente = false

    this.prestar = function (receptor, datos, minutos, fecha) {
        this.actualizarFecha(fecha)
        const nuevos = this.paqueteActivo.prestarDatosMinutos(datos, minutos)
        this.paqueteActivo = nuevos.sobrantes
        receptor.recibir(nuevos.prestados, fecha)
    }

    this.recibir = function (datos_minutos, fecha) {
        this.actualizarFecha(fecha)
        this.paqueteActivo.chequearVencidoAgotado()
        this.paqueteActivo = this.paqueteActivo.sumarDatosMinutosCambiarVencimiento(datos_minutos)
    }

    this.renovarSiSeHaAgotado = function () {
        if (this.renovarAutomaticamente && this.paqueteActivo.vencidoAgotado()) {
            cuenta.debitar(this.paqueteReferencia.precio())
            this.paqueteActivo = this.paqueteReferencia.duplicadoActivo(this.fecha())
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
        return this.paqueteActivo.informacionDelPaquete()
    }

    this.cargaDineroEnCuenta = function (dinero, fecha) {
        this.actualizarFecha(fecha)
        cuenta.cargar(dinero)
    }

    this.compraPaquete = function (paquete, fecha) {
        this.actualizarFecha(fecha)
        this.paqueteActivo.chequearVencidoAgotado()
        cuenta.debitar(paquete.precio())
        this.paqueteActivo = paquete.duplicadoActivo(this.fecha())
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