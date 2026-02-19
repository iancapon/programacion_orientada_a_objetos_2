const Cuenta = require("./Cuenta")

const Cliente = function (nombre = null, linea = null, cuenta = new Cuenta(), reloj) {
    if (!nombre || !linea) {
        throw new Error("Cliente no tiene los parámetros necesarios para ser válido.")
    }
    this.nombre = nombre
    this.linea = linea
    this.cuenta = cuenta
    this.reloj = reloj
    this.paqueteActivo = {
        activo: () => false,
        vencido: () => true,
        agotado: () => true,
        consume: () => { throw new Error("No puede consumir sin un paquete activo.") }
    }
    this.registroDeConsumos = []
    this.consumosHastaLaFecha = () => this.registroDeConsumos

    this.estado = () => {
        return this.paqueteActivo.activo() ? this.paqueteActivo.estado(reloj.ahora()) : {
            minutosRestantes: 0,
            megabytesRestantes: 0,
            diasHastaVencimiento: 0,
        }
    }

    this.comprarPaquete = function (paquete) {
        const horaActual = reloj.ahora()
        if (!this.paqueteActivo.vencido(horaActual) && !this.paqueteActivo.agotado()) {
            throw new Error("El paquete sigue activo.")
        }
        this.cuenta.debitar(paquete.precio())
        this.paqueteActivo = paquete.activo(horaActual)
    }

    this.consume = function (consumo) {
        // tiene datos/minutos y duracion, asi registro correctamente en base a la #hora reloj
        const resumen = consumo.resumen(reloj.ahora())
        this.paqueteActivo.consumir(resumen)
        this.registroDeConsumos.push(resumen)
    }

    this.cargar = (monto) => this.cuenta.cargar(monto)
}

module.exports = Cliente