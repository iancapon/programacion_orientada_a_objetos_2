const Cuenta = require("./Cuenta")
const { PaqueteActivoNulo } = require("./Paquete")

const Cliente = function (nombre = null, linea = null, cuenta = new Cuenta(), reloj) {
    if (!nombre || !linea) {
        throw new Error("Cliente no tiene los parámetros necesarios para ser válido.")
    }
    this.nombre = nombre
    this.linea = linea
    this.cuenta = cuenta
    this.paqueteActivo = new PaqueteActivoNulo()

    this.reloj = reloj
    this.horaActualHandler = () => {// para que el paquete se autorenueve cuando le toque
        const horaActual = this.reloj.ahora()
        this.paqueteActivo.autorenovar(horaActual, this.cuenta)
        return horaActual
    }


    this.registroDeConsumos = []
    this.consumosHastaLaFecha = (inicio = null, fin = null) => {
        return this.registroDeConsumos.filter(({ inicio: fechaConsumo }) => {
            const cumpleInicio = inicio ? fechaConsumo >= inicio : true
            const cumpleFin = fin ? fechaConsumo <= fin : true

            return cumpleInicio && cumpleFin
        })
    }

    this.estado = () => {
        const horaActual = this.horaActualHandler()
        return this.paqueteActivo.estado(horaActual)
    }

    this.comprarPaquete = function (paquete, autorenovado = false) {
        const horaActual = this.horaActualHandler()
        if (!this.paqueteActivo.vencido(horaActual) && !this.paqueteActivo.agotado()) {
            throw new Error("El paquete sigue activo.")
        }
        this.cuenta.debitar(paquete.precio())
        this.paqueteActivo = paquete.activo(horaActual, autorenovado)
    }

    this.consume = function (consumo) {
        const horaActual = this.horaActualHandler()
        consumo.aplicar(this.paqueteActivo)
        this.registroDeConsumos.push(consumo.resumen(horaActual))
    }

    this.cargar = (monto) => this.cuenta.cargar(monto)
}

module.exports = Cliente