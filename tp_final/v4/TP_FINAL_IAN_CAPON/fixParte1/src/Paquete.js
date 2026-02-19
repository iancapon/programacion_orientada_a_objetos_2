const PaqueteActivo = function (minutos, megabytes, dias, fechaDeActivacion) {
    this.minutos = minutos
    this.minutosUsados = 0
    this.megabytes = megabytes
    this.megabytesUsados = 0
    this.dias = dias
    this.fechaDeActivacion = fechaDeActivacion

    this.activo = () => true

    this.estado = function (fechaActual) {
        const milisEnUnDia = 86400000
        return {
            fechaDeActivacion: this.fechaDeActivacion,
            minutosRestantes: this.minutos - this.minutosUsados,
            megabytesRestantes: this.megabytes - this.megabytesUsados,
            diasHastaVencimiento: this.dias - (fechaActual.getTime() - this.fechaDeActivacion.getTime()) / milisEnUnDia,
        }
    }

    this.vencido = function (fechaActual) {
        const milisEnUnDia = 86400000
        return fechaActual - this.fechaDeActivacion > dias * milisEnUnDia
    }

    this.agotado = function () {
        return this.minutos - this.minutosUsados <= 0 && this.megabytes - this.megabytesUsados <= 0
    }

    this.consumir = function (resumen) {
        this.minutosUsados += resumen.minutos
        this.megabytesUsados += resumen.megabytes
    }
}
/*
PaqueteActivo.prototype.activo = () => true

PaqueteActivo.prototype.estado = function (fechaActual) {
    const milisEnUnDia = 86400000
    return {
        minutosRestantes: this.minutos - this.minutosUsados,
        megabytesRestantes: this.megabytes - this.megabytesUsados,
        diasHastaVencimiento: this.dias - (fechaActual.getTime() - this.fechaDeActivacion.getTime()) / milisEnUnDia,
    }
}
PaqueteActivo.prototype.vencido = function (fechaActual) {
    const milisEnUnDia = 86400000
    return fechaActual - this.fechaDeActivacion > dias * milisEnUnDia
}
PaqueteActivo.prototype.agotado = function () {
    return this.minutos - this.minutosUsados <= 0 && this.megabytes - this.megabytesUsados <= 0
}
PaqueteActivo.prototype.consumir = function (resumen) {
    this.minutosUsados += resumen.minutos
    this.megabytesUsados += resumen.megabytes
}
*/
const Paquete = function (precio, minutos, megabytes, dias) {
    this.precio = () => precio
    this.minutos = () => minutos
    this.megabytes = () => megabytes
    this.dias = () => dias

    this.activo = (fechaDeActivacion) => new PaqueteActivo(minutos, megabytes, dias, fechaDeActivacion)

}

module.exports = { Paquete, PaqueteActivo }