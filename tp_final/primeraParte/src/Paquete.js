const Paquete = function (gigabytes, minutos, dias, precio) {
    this.gigabytes = gigabytes
    this.minutos = minutos
    this.dias = dias
    this.precio = precio

    this.resumen = function () {
        return this.gigabytes + " GB, " + this.minutos + " minutos, " + this.dias + " dias, " + this.precio + " pesos."
    }
    this.cuesta = function () { return this.precio }
}

module.exports = Paquete