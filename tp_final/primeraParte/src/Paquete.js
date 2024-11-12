const Paquete = function (gigabytes, minutos, dias, precio) {
    this.datos = gigabytes
    this.minutos = minutos
    this.dias = dias
    this.precio = precio

    this.resumen = function () {
        return this.datos + " GB, " + this.minutos + " minutos, " + this.dias + " dias, " + this.precio + " pesos."
    }

    this.cuesta = function () { return this.precio }

    this.consumeDatos=function(datos){
        this.datos -= datos
    }
    this.consumeMinutos=function(minutos){
        this.minutos -= minutos
    }
    this.pasanDias=function(dias){
        this.dias -= dias
    }

    this.datosRestantes = function () {
        return this.datos
    }
    this.minutosRestantes = function () {
        return this.minutos
    }
    this.diasRestantes = function () {
        return this.dias
    }
}

module.exports = Paquete