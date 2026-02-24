const Recurso = function (montoFinal) {
    this.montoActual = montoFinal
    this.renovar = () => { this.montoActual = montoFinal }
    this.montoRestante = () => this.montoActual
    this.consumir = (cantidad) => {
        if (this.montoActual - cantidad < 0) {
            throw new Error("No se puede consumir esa cantidad.")
        }
        this.montoActual -= cantidad
    }
    this.recibirPrestado = (cantidad) => { this.montoActual += cantidad }

}

const PaqueteActivo = function (paquete, fechaDeActivacion, autorenovado, ilimitadas) {
    this.minutos = new Recurso(paquete.minutos())
    this.megabytes = new Recurso(paquete.megabytes())
    this.fechaDeActivacion = fechaDeActivacion
    this.ilimitadas = Array.isArray(ilimitadas) ? ilimitadas : [];
    this.dias = () => paquete.dias()
    this.precio = () => paquete.precio()
    this.autorenovado = autorenovado

    this.consumirMinutos = (cantidad) => this.minutos.consumir(cantidad)
    this.consumirMegabytes = (cantidad, dominio) => {
        if (this.ilimitadas.includes(dominio)) {
            return
        }
        this.megabytes.consumir(cantidad)
    }

    this.prestar = function (megabytes, minutos) {
        if (this.megabytes.montoRestante() < megabytes || this.minutos.montoRestante() < minutos) {
            throw new Error("El cliente no posee la cantidad que desea prestar.")
        }
        this.megabytes.consumir(megabytes)
        this.minutos.consumir(minutos)
    }

    this.recibirPrestado = function (megabytes, minutos, horaActual, paqueteDelOtro) {
        if (!(this.vencido(horaActual) || this.agotado())) {
            throw new Error("El cliente que recibe el prestamo no tiene un paquete vencido o agotado.")
        }
        paqueteDelOtro.prestar(megabytes, minutos)
        this.megabytes.recibirPrestado(megabytes)
        this.minutos.recibirPrestado(minutos)
        
        return new PaqueteActivo(
            new Paquete(
                this.precio(),
                this.minutos.montoRestante(),
                this.megabytes.montoRestante(),
                diasRestantes,
                this.ilimitadas),

        )
    }

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

    this.estado = () => {
        return {
            minutosRestantes: 0,
            megabytesRestantes: 0,
            diasHastaVencimiento: 0,
        }
    }

    this.prestar = () => {
        throw new Error("El cliente no puede prestar nada si no compró un paquete.")
    }

    this.recibirPrestado = () => {
        throw new Error("El cliente no puede aceptar un prestamo si no compró un paquete.")
    }
}

const Paquete = function (precio, minutos, megabytes, dias, ilimitadas) {
    this.precio = () => precio
    this.minutos = () => minutos
    this.megabytes = () => megabytes
    this.dias = () => dias

    this.activo = (fechaDeActivacion, autorenovado) => new PaqueteActivo(this, fechaDeActivacion, autorenovado, ilimitadas)

}

module.exports = { Paquete, PaqueteActivo, PaqueteActivoNulo }