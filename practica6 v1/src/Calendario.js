const Calendario = function (nombre_del_empleado) {
    this.fechas = []
    this.nombre = nombre_del_empleado

    this.soyEmpleado = function (nombre) {
        return this.nombre === nombre
    }

    this.nuevoFranco = function (fecha) {
        this.fechas.push(fecha)
        return fecha.soy()
    }

    this.esFranco = function (fecha) {
        const encuentra = this.fechas.find(franco => franco.es(fecha))

        return encuentra != undefined
    }

    this.listaDeFrancos = function () {
        let text = this.nombre + ":\n"
        this.fechas.forEach(franco => {
            text += franco.toString() + " :: " + franco.soy() + "\n"
        })
        console.log(text)
    }

}

module.exports = Calendario