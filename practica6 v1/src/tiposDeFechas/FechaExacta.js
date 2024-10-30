const { diaValido, mesValido, anioValido, diaDeSemanaValido } = require("../objetoDiaMesAnio")

const FechaExacta = function (dia, mes, anio) {
    this.soy = () => "Fecha exacta"

    this.dia = () => diaValido(dia)
    this.mes = () => mesValido(mes)
    this.anio = () => anioValido(anio)

    const _fecha = new Date(this.anio(), this.mes(), this.dia())
    this.diaDeLaSemana = () => _fecha.getDay()
    this.toString = () => _fecha.toString()

    this.tipoCorrecto = function () {
       // const validacion = [this.dia(), this.mes(), this.anio(), diaDeSemanaValido(dia)] // PARA IMPLEMENTAR MEJOR LA VALIDACION
        return this.dia() !== undefined && this.mes() !== undefined && this.anio() !== undefined
    }

    this.es = function (otraFecha) {
        if (otraFecha.dia() == this.dia() && otraFecha.mes() == this.mes() && otraFecha.anio() == this.anio()) {
            return true
        }
        return false
    }

    this.diaDeLaSemana = () => _fecha.getDay()

    this.aObjetoFecha = () => _fecha

    this.toString = () => String(this.dia())+"/" + String(this.mes()+1)+ "/" + String(this.anio())
}

module.exports = FechaExacta;