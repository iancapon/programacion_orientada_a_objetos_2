const Recurso = function (montoFinal) {
    this.montoActual = 0
    this.monto = () => this.montoActual
    this.renovar = () => { this.montoActual = 0 }
    this.montoRestante = () => montoFinal - this.montoActual
    this.consumir = (cantidad) => {
        if (montoFinal - this.montoActual < cantidad) {
            throw new Error("No se puede consumir esa cantidad.")
        }
        this.montoActual += cantidad
    }
}

const PaqueteActivo = function (paquete, fechaDeActivacion, autorenovado) {
    this.minutos = new Recurso(paquete.minutos())
    this.megabytes = new Recurso(paquete.megabytes())
    this.fechaDeActivacion = fechaDeActivacion
    this.dias = () => paquete.dias()
    this.precio = () => paquete.precio()
    this.autorenovado = autorenovado

    this.activo = () => true//no sirve de nada esto

    this.consumirMinutos = (cantidad) => this.minutos.consumir(cantidad)
    this.consumirMegabytes = (cantidad) => this.megabytes.consumir(cantidad)

    this.estado = function (fechaActual) {
        const milisEnUnDia = 86400000
        return {
            fechaDeActivacion: this.fechaDeActivacion,
            minutosRestantes: this.minutos.montoRestante(),
            megabytesRestantes: this.megabytes.montoRestante(),
            diasHastaVencimiento: this.dias() - (fechaActual.getTime() - this.fechaDeActivacion.getTime()) / milisEnUnDia,
        }
    }

    this.autorenovar = function (horaActual, cuenta) {
        if (this.autorenovado && this.vencido(horaActual)) {
            cuenta.debitar(this.precio())
            this.minutos.renovar()
            this.megabytes.renovar()
            this.fechaDeActivacion = horaActual
        }
    }

    this.vencido = function (fechaActual) {
        const milisEnUnDia = 86400000
        return fechaActual - this.fechaDeActivacion > this.dias() * milisEnUnDia
    }

    this.agotado = function () {
        return this.minutos.montoRestante() <= 0 && this.megabytes.montoRestante() <= 0
    }
}

const PaqueteActivoNulo = function () {
    this.activo = () => false
    this.vencido = () => true
    this.agotado = () => true
    this.autorenovar = () => null
    this.consume = () => { throw new Error("No puede consumir sin un paquete activo.") }
}

const Paquete = function (precio, minutos, megabytes, dias) {
    this.precio = () => precio
    this.minutos = () => minutos
    this.megabytes = () => megabytes
    this.dias = () => dias

    this.activo = (fechaDeActivacion, autorenovado) => new PaqueteActivo(this, fechaDeActivacion, autorenovado)

}

module.exports = { Paquete, PaqueteActivo, PaqueteActivoNulo }