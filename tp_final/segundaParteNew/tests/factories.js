const Cliente = require("../src/Cliente")
const Consumo = require("../src/Consumo")
const ConsumoDeApp = require("../src/ConsumoDeApp")
const Paquete = require("../src/Paquete")

const crearCliente = function (nombre, linea) {
    return new Cliente(nombre, linea)
}

const crearConsumo = function (datos, minutos, fecha) {
    return new Consumo(datos, minutos, fecha)
}

const crearConsumoDeApp = function (app, datos, fecha) {
    return new ConsumoDeApp(app, datos, fecha)
}

const crearPaquete = function (megabytes, minutos, dias, precio, appsIlimitadas) {
    return new Paquete(megabytes, minutos, dias, precio, appsIlimitadas)
}

const crearFecha = function (fechaNotacionAnglosajona) {
    return new Date(fechaNotacionAnglosajona)
}

module.exports = {
    crearCliente: crearCliente,
    crearConsumo: crearConsumo,
    crearConsumoDeApp: crearConsumoDeApp,
    crearPaquete: crearPaquete,
    crearFecha: crearFecha
}