const Consumo = function (inicio, fin) {
    this.fechaDeInicio = () => inicio
    this.fechaDeFin = () => fin
    this.datos = () => 0
    this.minutos = () => 0
    this.app = () => false

    this.datosImportantes = function () {
        return { "Consumo": "No hubo consumo", "inicio": this.fechaDeInicio().toUTCString(), "fin": this.fechaDeFin().toUTCString() }
    }
}

const ConsumoApp = function (app, datos, inicio, fin) {
    Consumo.call(this, inicio, fin);
    this.datos = () => datos
    this.app = () => app

    this.datosImportantes = function () {
        return { "app": this.app(), "datos": this.datos(), "inicio": this.fechaDeInicio().toUTCString(), "fin": this.fechaDeFin().toUTCString() }
    }
}

ConsumoApp.prototype = Object.create(Consumo.prototype);
ConsumoApp.prototype.constructor = ConsumoApp;

const ConsumoDatos = function (datos, inicio, fin) {
    Consumo.call(this, inicio, fin);
    this.datos = () => datos

    this.datosImportantes = function () {
        return { "datos": this.datos(), "inicio": this.fechaDeInicio().toUTCString(), "fin": this.fechaDeFin().toUTCString() }
    }
}

ConsumoDatos.prototype = Object.create(Consumo.prototype);
ConsumoDatos.prototype.constructor = ConsumoDatos;

const ConsumoMinutos = function (minutos, inicio, fin) {
    Consumo.call(this, inicio, fin);
    this.minutos = () => minutos

    this.datosImportantes = function () {
        return { "minutos": this.minutos(), "inicio": this.fechaDeInicio().toUTCString(), "fin": this.fechaDeFin().toUTCString() }
    }
}

ConsumoMinutos.prototype = Object.create(Consumo.prototype);
ConsumoMinutos.prototype.constructor = ConsumoMinutos;

module.exports = { ConsumoDatos, ConsumoMinutos, ConsumoApp }
