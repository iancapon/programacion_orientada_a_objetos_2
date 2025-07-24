const { AppNula } = require("./App")

const Consumo = function (inicio, fin) {
    this.fechaDeInicio = () => inicio
    this.fechaDeFin = () => fin
    this.datos = () => 0
    this.minutos = () => 0
    this.app = () => new AppNula()

    this.datosImportantes = function () {
        return { "app": this.app().nombre(), "datos": this.datos(), "minutos": this.minutos(), "inicio": this.fechaDeInicio(), "fin": this.fechaDeFin() }
    }
}

const ConsumoApp = function (aplicacion, datos, inicio, fin) {
    Consumo.call(this, inicio, fin);
    this.datos = (listaDeAppsIlimitadas = []) => listaDeAppsIlimitadas.find(app => app.es(aplicacion)) ? 0 : datos
    this.app = () => aplicacion
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
