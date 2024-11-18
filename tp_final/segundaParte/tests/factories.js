const Cliente = require("../src/Cliente")
const Consumo = require("../src/Consumo")
const Paquete = require("../src/Paquete")

const crearCliente = function (nombre, linea) {
    return new Cliente(nombre, linea)
}

const crearConsumo = function (datos, minutos, fecha) {
    return new Consumo(datos, minutos, fecha)
}

const crearPaquete = function (megabytes, minutos, dias, precio, fechaDeCompra) {
    return new Paquete(megabytes, minutos, dias, precio, fechaDeCompra)
}

const crearFecha = function(fechaNotacionAnglosajona){
    return new Date(fechaNotacionAnglosajona)
}

module.exports = {
    crearCliente: crearCliente,
    crearConsumo: crearConsumo,
    crearPaquete: crearPaquete,
    crearFecha: crearFecha
}