const { diaValido, mesValido, anioValido, diaDeSemanaSegunIndice } = require("../objetoDiaMesAnio")

const DiaSemanaTodosLosAnios = function (dia, mes, anio) {
    this.soy = () => "Dia de la semana repetido todos los años";

    this.dia = () => diaValido(dia)
    this.mes = () => mesValido(mes)
    this.anio = () => anioValido(anio)

    this.tipoCorrecto = function () {
        return this.anio() === undefined && this.mes() === undefined && this.dia() !== undefined;
    };

    this.es = function (otraFecha) {
        if (otraFecha.diaDeLaSemana() === this.dia()) {
            return true;
        }
        return false;
    };

    this.toString = ()=> diaDeSemanaSegunIndice(this.dia())

};
module.exports = DiaSemanaTodosLosAnios;
