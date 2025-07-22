const ConsumoDatos = function (datos, inicio, fin) {
    this.fechaDeInicio = () => inicio
    this.fechaDeFin = () => fin
    this.datos = () => datos
    this.minutos = () => 0

    this.datosImportantes = function () {
        return { "datos": this.datos(), "inicio": this.fechaDeInicio(), "fin": this.fechaDeFin() }
    }
}

const ConsumoMinutos = function (minutos, inicio, fin) {
    this.fechaDeInicio = () => inicio
    this.fechaDeFin = () => fin
    this.datos = () => 0
    this.minutos = () => minutos

    this.datosImportantes = function () {
        return { "minutos": this.minutos(), "inicio": this.fechaDeInicio(), "fin": this.fechaDeFin() }
    }
}

module.exports = { ConsumoDatos, ConsumoMinutos }
