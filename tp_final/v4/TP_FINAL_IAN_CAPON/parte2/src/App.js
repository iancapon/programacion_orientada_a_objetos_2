const App = function (nombre) {
    this.nombre = () => nombre
    this.es = (app) => app.nombre() == this.nombre()
}

const AppNula = function () {
    App.call(this)
    this.nombre = () => "No se registró"
    this.es = () => false
}

AppNula.prototype = Object.create(App.prototype)
AppNula.prototype.constructor = AppNula

module.exports = {App, AppNula }