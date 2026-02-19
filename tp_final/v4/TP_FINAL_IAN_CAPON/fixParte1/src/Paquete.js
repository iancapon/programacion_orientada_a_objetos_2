const Consumible = function (montoFinal) {
    this.montoActual = 0
    this.monto = () => this.montoActual
    this.montoTotal = () => montoFinal
    this.montoRestante = () => montoFinal - this.montoActual
    this.consumir = (cantidad) => {
        if (montoFinal - this.montoActual < cantidad) {
            throw new Error("No se puede consumir esa cantidad.")
        }
        this.montoActual += cantidad
    }
}

const PaqueteActivo = function (minutos, megabytes, dias, fechaDeActivacion) {
    this.minutos = new Consumible(minutos)
    this.megabytes = new Consumible(megabytes)

    this.activo = () => true

    this.estado = function (fechaActual) {
        const milisEnUnDia = 86400000
        return {
            fechaDeActivacion,
            minutosRestantes: this.minutos.montoRestante(),
            megabytesRestantes: this.megabytes.montoRestante(),
            diasHastaVencimiento: dias - (fechaActual.getTime() - fechaDeActivacion.getTime()) / milisEnUnDia,
        }
    }

    this.vencido = function (fechaActual) {
        const milisEnUnDia = 86400000
        return fechaActual - fechaDeActivacion > dias * milisEnUnDia
    }

    this.agotado = function () {
        return this.minutos.montoRestante() <= 0 && this.megabytes.montoRestante() <= 0
    }

    this.consumir = function (resumen) {
        this.minutos.consumir(resumen.minutos)
        this.megabytes.consumir(resumen.megabytes)
    }
}

const Paquete = function (precio, minutos, megabytes, dias) {
    this.precio = () => precio
    this.minutos = () => minutos
    this.megabytes = () => megabytes
    this.dias = () => dias

    this.activo = (fechaDeActivacion) => new PaqueteActivo(minutos, megabytes, dias, fechaDeActivacion)

}

module.exports = { Paquete, PaqueteActivo }