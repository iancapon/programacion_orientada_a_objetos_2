const Cuenta = require("./Cuenta")
const { Paquete, PaqueteNulo, PaqueteActivo } = require("./Paquete")

const Cliente = function (nombre, linea, fechaActual) {
    this.nombre = () => nombre
    this.linea = () => linea
    this.cuenta = new Cuenta()
    this.paquete = new PaqueteNulo()
    this.fecha = fechaActual
    this.renovarAutomaticamente = false

    this.activarRenovacionAutomatica = () => this.renovarAutomaticamente = true
    this.desactivarRenovacionAutomatica = () => this.renovarAutomaticamente = false

    this.recibirDatosMinutosEmprestados = function(clienteEmisor,datos,minutos){
        this.paquete.chequearVencidoAgotado()
        this.paquete = this.paquete.sumarPlanCambiandoVencimiento(clienteEmisor.tomarDatosPrestados(datos, minutos))
    }

    this.tomarDatosPrestados = function(datos, minutos){
        const paquetesNuevos = this.paquete.prestarDatosMinutos(datos, minutos)
        this.paquete = paquetesNuevos.datosResultantesDelQuePresta

        return paquetesNuevos.datosResultantesPrestados
    }

    this.renovarSiSeHaAgotado = function () {
        if (!this.renovarAutomaticamente) {
            return
        } if (this.paquete.vencido() || this.paquete.agotado()) {
            this.cuenta.debitar(this.paquete.precio())
            this.paquete = this.paquete.duplicado(this.fecha)
        }
    }

    this.fechaActual = () => this.fecha.fechaActual()

    this.consume = function (consumo) {
        this.renovarSiSeHaAgotado()
        this.paquete = this.paquete.consumir(consumo)
    }

    this.quedaDisponible = function () {
        this.renovarSiSeHaAgotado()
        return this.paquete.informacionDelPaquete(this.fecha)
    }

    this.cargaDineroEnCuenta = function (dinero) {
        this.cuenta.cargar(dinero)
    }

    this.compraPaquete = function (paquete) {
        this.paquete.chequearVencidoAgotado()
        this.cuenta.debitar(paquete.precio())
        this.paquete = paquete.duplicado(this.fecha)

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