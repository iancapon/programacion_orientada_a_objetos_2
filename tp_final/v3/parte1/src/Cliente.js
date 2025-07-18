const Paquete = require("./Paquete")


const Cliente = function (nombre, linea) {
    this.nombre = () => nombre
    this.linea = () => linea
    this.cuenta = 0
    this.paquete = new Paquete(0,0,0,0)
    this.consumos = []
    this.planVigente = new Plan()

    this.validarQueHaVencidoElPlan = function(fechaActual){
        this.planVigente.planVencido(this.paquete,fechaActual)
    }

    this.soy = function (cliente) {
        if (cliente instanceof Cliente) {// ?
            return this.nombre() === cliente.nombre() && this.linea() === cliente.linea()
        }
        return false
    }

    this.consumir = function (consumo) {
        consumo.consumirDesde(this.planVigente)
        this.consumos.push(consumo.resumir())
    }

    this.resumenDeConsumos = function () {
        return this.consumos
    }

    this.validarDineroEnCuenta = function (precio) {
        if (this.cuenta - precio < 0) {
            throw new Error("El cliente no tiene suficiente dinero en la cuenta.")
        }
    }

    this.adquirirPaquete = function (paquete, fecha) {
        this.paquete = paquete
        ////////////////////////// actualizar plan
        this.planVigente.actualizarPlan(paquete.datos(), paquete.minutos(), fecha)
    }


    this.debitarDeCuenta = function (precio) {
        this.cuenta -= precio
    }

    this.ingresarEnCuenta = function (saldo) {
        this.cuenta += saldo
    }

}


const Plan = function () {
    this.datos = 0
    this.minutos = 0
    this.fechaDeAdquisicion = undefined

    this.actualizarPlan = function (datos, minutos, fecha) {
        this.datos = datos
        this.minutos = minutos
        this.fechaDeAdquisicion = fecha
    }

    this.tiempoDesdeAdquisicion = function(fecha){
        return fecha.getTime() - this.fechaDeAdquisicion.getTime()
    }

    this.tiempoVencido = function (fecha, dias) {
        if(this.fechaDeAdquisicion == undefined){
            return true
        }
        return this.tiempoDesdeAdquisicion(fecha) >= dias * 24 * 60 * 60 * 1000
    }

    this.planVencido = function(paquete,fechaActual){
        if((this.minutos > 0 || this.datos > 0) && !this.tiempoVencido(fechaActual,paquete.dias())){
            throw new Error("El plan no está vencido ni agotado.")
        }
    }
}

module.exports = Cliente