const ConsumoMinutos = function (minutos, fecha) {
    this.minutos = minutos
    this.fecha = fecha

    this.consumirDesde = function (plan) {
        if(minutos > plan.minutos){
            throw new Error("No se pueden consumir estos minutos.")
        }
        plan.minutos -= minutos
    }

    this.resumir = function () {
        return {
            minutos: this.minutos,
            fecha: this.fecha
        }
    }
}

module.exports = ConsumoMinutos