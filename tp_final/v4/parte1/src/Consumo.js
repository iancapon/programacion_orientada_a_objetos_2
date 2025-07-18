const ConsumoDatos = function (datos, inicio, fin) {
    this.fechaDeInicio = () => inicio
    this.fechaDeFin = () => fin
    this.datos = () => datos
    this.minutos = () => 0
}

const ConsumoMinutos = function (minutos, inicio, fin) {
    this.fechaDeInicio = () => inicio
    this.fechaDeFin = () => fin
    this.datos = () => 0
    this.minutos = () => minutos
}

module.exports = {ConsumoDatos, ConsumoMinutos}
