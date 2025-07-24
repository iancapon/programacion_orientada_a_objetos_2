const Cuenta = require("./Cuenta")
const { PaqueteNulo } = require("./Paquete")

const Cliente = function (nombre, linea, fechaActual) {
    this.nombre = () => nombre
    this.linea = () => linea
    const cuenta = new Cuenta()
    this.paqueteActivo = new PaqueteNulo()
    this.paqueteInactivo = new PaqueteNulo()
    this.fecha = () => fechaActual
    this.renovarAutomaticamente = false

    this.actualizarFecha = (nuevaFecha) => this.fecha().actualizarFecha(nuevaFecha)

    this.fechaActual = () => this.fecha().fechaActual()

    this.activarRenovacionAutomatica = () => this.renovarAutomaticamente = true
    this.desactivarRenovacionAutomatica = () => this.renovarAutomaticamente = false

    this.recibirDatosMinutosEmprestados = function (clienteEmisor, datos, minutos) {
        this.paqueteActivo.chequearVencidoAgotado()
        const datosPrestados = clienteEmisor.tomarDatosPrestados(datos, minutos)
        this.paqueteActivo = this.paqueteActivo.sumarPlanCambiandoVencimiento(datosPrestados)
    }

    this.tomarDatosPrestados = function (datos, minutos) {
        const paquetesNuevos = this.paqueteActivo.prestarDatosMinutos(datos, minutos)
        this.paqueteActivo = paquetesNuevos.datosResultantesDelQuePresta

        return paquetesNuevos.datosResultantesPrestados
    }

    this.renovarSiSeHaAgotado = function () {
        if (this.renovarAutomaticamente && this.paqueteActivo.vencidoAgotado()) {
            cuenta.debitar(this.paqueteInactivo.precio())
            this.paqueteActivo = this.paqueteInactivo.duplicadoActivo(this.fecha())
        }
    }

    this.consume = function (consumo) {
        this.renovarSiSeHaAgotado()
        this.paqueteActivo = this.paqueteActivo.consumir(consumo)
    }

    this.quedaDisponible = function () {
        this.renovarSiSeHaAgotado()
        return this.paqueteActivo.informacionDelPaquete(this.fecha())
    }

    this.cargaDineroEnCuenta = function (dinero) {
        cuenta.cargar(dinero)
    }

    this.compraPaquete = function (paquete) {
        this.paqueteActivo.chequearVencidoAgotado()
        cuenta.debitar(paquete.precio())
        this.paqueteActivo = paquete.duplicadoActivo(this.fecha())
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