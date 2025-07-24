const Consumo = function (inicio, fin) {
    this.fechaDeInicio = () => inicio
    this.fechaDeFin = () => fin
    this.datos = () => 0
    this.minutos = () => 0
    this.app = () => "No se registró"

    this.datosImportantes = function () {
        return { "app": this.app(), "datos": this.datos(), "minutos": this.minutos(), "inicio": this.fechaDeInicio(), "fin": this.fechaDeFin() }
    }
}

const ConsumoApp = function (app, datos, inicio, fin) {
    Consumo.call(this, inicio, fin);
    this.datos = (listaDeAppsIlimitadas = []) => listaDeAppsIlimitadas.includes(app) ? 0 : datos
    this.app = () => app
}

ConsumoApp.prototype = Object.create(Consumo.prototype);
ConsumoApp.prototype.constructor = ConsumoApp;

const ConsumoDatos = function (datos, inicio, fin) {
    Consumo.call(this, inicio, fin);
    this.datos = () => datos
}

ConsumoDatos.prototype = Object.create(Consumo.prototype);
ConsumoDatos.prototype.constructor = ConsumoDatos;

const ConsumoMinutos = function (minutos, inicio, fin) {
    Consumo.call(this, inicio, fin);
    this.minutos = () => minutos
}

ConsumoMinutos.prototype = Object.create(Consumo.prototype);
ConsumoMinutos.prototype.constructor = ConsumoMinutos;

module.exports = { ConsumoDatos, ConsumoMinutos, ConsumoApp }
