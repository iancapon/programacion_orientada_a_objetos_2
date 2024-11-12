const Calendario = function () {
    this.francos = []

    this.aniadirFechaAlCalendario = function (franco) {
        this.francos.push(franco)
    }

    this.esFranco = function (franco) {
        return this.francos.find(fecha => fecha.esLaMismaFecha(franco)) != undefined
    }
}

module.exports = Calendario