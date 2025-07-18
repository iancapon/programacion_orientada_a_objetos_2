const Paquete = function (nombre = "Paquete Vacio", precio = 0, gb = 0, minutos = 0, duracion = 0, fechaDeCompra, fechaActual) {
    this.nombre = () => nombre
    this.gb = () => gb
    this.minutos = () => minutos
    this.duracion = () => duracion
    this.precio = () => precio
    this.fechaDeCompra = () => fechaDeCompra
    this.fechaActual = fechaActual

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
        return new this.constructor(this.nombre(), this.precio(), this.gb(), this.minutos(), this.duracion(), fecha.fechaActual(), fecha)
    }
}

module.exports = Paquete