const FechaCompartida = function (date) {
    this.date = date

    this.fechaActual = () => new Date(this.date.getTime())

    this.actualizarFecha = function (nuevaFecha) {
        if (nuevaFecha < this.date) {
            throw new Error("Fecha introducida no puede ser previa a la fecha actual")
        }
        this.date = nuevaFecha
    }
}

module.exports = FechaCompartida 