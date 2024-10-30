const Calendario = require("./Calendario")
const { crearFecha } = require("./crearFecha")

const Empleados = function () {
    this.empleados = []

    this.nuevoEmpleado = function (nombre) {
        this.empleados.push(new Calendario(nombre))
    }

    this.validarQueEmpleadoExiste = function(empleado) {
        if (empleado == undefined) {
            throw new Error ("Empleado invalido")
        }
    }

    this.nuevoFranco = function (nombre, fecha) {
        const sujeto = this.empleados.find(empleado => empleado.soyEmpleado(nombre))
        this.validarQueEmpleadoExiste(sujeto)
        return sujeto.nuevoFranco(fecha)
    }

    this.esFranco = function (nombre, fecha) {
        const sujeto = this.empleados.find(empleado => empleado.soyEmpleado(nombre))
        this.validarQueEmpleadoExiste(sujeto)
        if (sujeto.esFranco(fecha)) {
            return "Es franco"
        }
        return "No es franco"
    }

    this.listaDeFrancos = function(){
        this.empleados.forEach(empleado => empleado.listaDeFrancos())
    }
}

module.exports = Empleados