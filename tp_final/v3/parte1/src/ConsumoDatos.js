const ConsumoDatos = function (datos, fecha) {
    this.datos = datos
    this.fecha = fecha

    this.consumirDesde = function (plan) {
        if(datos > plan.datos){
            throw new Error("No se pueden consumir estos datos.")
        }
        plan.datos -= datos
    }

    this.resumir = function () {
        return {
            datos: this.datos,
            fecha: this.fecha
        }
    }
}

module.exports = ConsumoDatos