const PaqueteActivo = function (nombre, precio, gb, minutos, duracion, fechaDeCompra, fechaActual, appsIlimitadas =[]) {
    this.nombre = () => nombre
    this.gb = () => gb
    this.minutos = () => minutos
    this.duracion = () => duracion
    this.precio = () => precio
    this.appsIlimitadas = () => appsIlimitadas
    this.fechaDeCompra = () => fechaDeCompra
    this.fechaActual = fechaActual

    this.vencido = () => this.duracion() <= (this.fechaActual.fechaActual() - this.fechaDeCompra()) / (1000 * 60 * 60 * 24)

    this.agotado = () => this.gb() <= 0 || this.minutos() <= 0

    this.chequearVencidoAgotado = function () {
        if (!this.vencido() && !this.agotado()) {
            throw new Error("No se puede comprar un paquete hasta que este vencido o agotado")
        }
    }

    this.informacionDelPaquete = function () {
        return {
            "Fecha de compra: ": this.fechaDeCompra().toUTCString(),
            "GB disponibles: ": this.gb(),
            "minutos disponibles: ": this.minutos(),
            "Dias hasta que venza: ": this.duracion() - (this.fechaActual.fechaActual() - this.fechaDeCompra()) / (1000 * 60 * 60 * 24)
        }
    }

    this.soyElMismoPaquete = function (paqueteAChequear) {
        return this.nombre() == paqueteAChequear.nombre()
    }

    this.duplicado = function (fecha) {
        return new PaqueteActivo(
            this.nombre(),
            this.precio(),
            this.gb(),
            this.minutos(),
            this.duracion(),
            fecha.fechaActual(),
            fecha,
            this.appsIlimitadas()
        )
    }

    this.consumir = function (consumo) {
        if (this.gb() < consumo.datos()) {
            throw new Error("Cliente no puede consumir datos que no tiene.")
        }
        if (this.minutos() < consumo.minutos()) {
            throw new Error("Cliente no puede consumir minutos que no tiene.")
        }
        return new PaqueteActivo(
            this.nombre(),
            this.precio(),
            this.gb() - consumo.datos(this.appsIlimitadas()),
            this.minutos() - consumo.minutos(),
            this.duracion(),
            this.fechaDeCompra(),
            this.fechaActual,
            this.appsIlimitadas()
        )
    }
}

const Paquete = function (nombre, precio, gb, minutos, duracion, appsIlimitadas) {
    this.nombre = () => nombre
    this.gb = () => gb
    this.minutos = () => minutos
    this.duracion = () => duracion
    this.precio = () => precio
    this.appsIlimitadas = () => appsIlimitadas

    this.informacionDelPaquete = function () {
        return {
            "GB disponibles: ": this.gb(),
            "minutos disponibles: ": this.minutos(),
            "Dias hasta que venza: ": this.duracion()
        }
    }

    this.soyElMismoPaquete = function (paqueteAChequear) {
        return this.nombre() == paqueteAChequear.nombre()
    }

    this.duplicado = function (fecha) {
        return new PaqueteActivo(
            this.nombre(),
            this.precio(),
            this.gb(),
            this.minutos(),
            this.duracion(),
            fecha.fechaActual(),
            fecha,
            this.appsIlimitadas()
        )
    }
}

const PaqueteNulo = function () {
    this.chequearVencidoAgotado = function () {
        return
    }

    this.consumir = function (consumo) {
        throw new Error("Para usar los datos primero debe comprar un paquete.")
    }

    this.vencido = function () {
        throw new Error("Para usar los datos primero debe comprar un paquete.")
    }

    this.agotado = function () {
        throw new Error("Para usar los datos primero debe comprar un paquete.")
    }

    this.informacionDelPaquete = function () {
        throw new Error("Para usar los datos primero debe comprar un paquete.")
    }

    this.duplicado = function () {
        throw new Error("No se puede duplicar un paquete nulo")
    }
}
module.exports = { Paquete, PaqueteNulo, PaqueteActivo }