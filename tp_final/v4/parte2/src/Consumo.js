const ConsumoDatos = function (datos, inicio, fin) {
    this.fechaDeInicio = () => inicio
    this.fechaDeFin = () => fin
    this.datos = () => datos
    this.minutos = () => 0

    if (datos < 0) throw new Error("Datos no pueden ser negativos")

    this.datosImportantes = function () {
        return { "datos": this.datos(), "inicio": this.fechaDeInicio().toUTCString(), "fin": this.fechaDeFin().toUTCString() }
    }
}

const ConsumoMinutos = function (minutos, inicio, fin) {
    this.fechaDeInicio = () => inicio
    this.fechaDeFin = () => fin
    this.datos = () => 0
    this.minutos = () => minutos

    if (minutos < 0) throw new Error("Minutos no pueden ser negativos")

    this.datosImportantes = function () {
        return { "minutos": this.minutos(), "inicio": this.fechaDeInicio().toUTCString(), "fin": this.fechaDeFin().toUTCString() }
    }
}

module.exports = { ConsumoDatos, ConsumoMinutos }
