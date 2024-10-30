const { diaValido, mesValido, anioValido, diaDeSemanaValido } = require("../objetoDiaMesAnio")

const DiaSemanaMesEspecificoTodosLosAnios = function (dia, mes, anio) {
    this.soy = () => "Dia de la semana mes especifico, todos los años";

    this.dia = () => diaValido(dia)
    this.mes = () => mesValido(mes)
    this.anio = () => anioValido(anio)

    this.tipoCorrecto = function () {
        return this.dia() !== undefined && this.mes() !== undefined && this.anio() === undefined && diaDeSemanaValido(dia);
    };

    this.es = function (otraFecha) {
        if (otraFecha.diaDeLaSemana() === this.dia() && otraFecha.mes() === this.mes()) {
            return true;
        }
        return false;
    };

    this.toString = () => diaDeSemanaSegunIndice(this.dia()) + "/" + String(this.mes())

};
module.exports = DiaSemanaMesEspecificoTodosLosAnios;
