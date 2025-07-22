const Cuenta = require("./Cuenta")
const { PaqueteNulo } = require("./Paquete")

const Cliente = function (nombre, linea, fechaActual) {
    this.nombre = () => nombre
    this.linea = () => linea
    const cuenta = new Cuenta()
    this.paquete = new PaqueteNulo()
    this.fecha = () => fechaActual
    this.renovarAutomaticamente = false

    this.actualizarFecha = (nuevaFecha) => this.fecha().actualizarFecha(nuevaFecha)

    this.fechaActual = () => this.fecha().fechaActual()

    this.activarRenovacionAutomatica = () => this.renovarAutomaticamente = true
    this.desactivarRenovacionAutomatica = () => this.renovarAutomaticamente = false

    this.recibirDatosMinutosEmprestados = function (clienteEmisor, datos, minutos) {
        this.paquete.chequearVencidoAgotado()
        const datosPrestados = clienteEmisor.tomarDatosPrestados(datos, minutos)
        this.paquete = this.paquete.sumarPlanCambiandoVencimiento(datosPrestados)
    }

    this.tomarDatosPrestados = function (datos, minutos) {
        const paquetesNuevos = this.paquete.prestarDatosMinutos(datos, minutos)
        this.paquete = paquetesNuevos.datosResultantesDelQuePresta

        return paquetesNuevos.datosResultantesPrestados
    }


    this.renovarSiSeHaAgotado = function () {
        if (this.renovarAutomaticamente && this.paquete.vencidoAgotado()) {
            cuenta.debitar(this.paquete.precio())
            this.paquete = this.paquete.duplicadoActivo(this.fecha())
        }
    }

    this.consume = function (consumo) {
        this.renovarSiSeHaAgotado()
        this.paquete = this.paquete.consumir(consumo)
    }

    this.quedaDisponible = function () {
        this.renovarSiSeHaAgotado()
        return this.paquete.informacionDelPaquete(this.fecha())
    }

    this.cargaDineroEnCuenta = function (dinero) {
        cuenta.cargar(dinero)
    }

    this.compraPaquete = function (paquete) {
        this.paquete.chequearVencidoAgotado()
        cuenta.debitar(paquete.precio())
        this.paquete = paquete.duplicadoActivo(this.fecha())

        return this.paquete
    }

    this.soyElMismoCliente = function (clienteAChequear) {
        return this.nombre() == clienteAChequear.nombre() && this.linea() == clienteAChequear.linea()
    }

    this.duplicado = function (fecha) {
        return new Cliente(this.nombre(), this.linea(), fecha)
    }

}

module.exports = Cliente