const { diaValido, mesValido, anioValido, diaDeSemanaValido, diaDeSemanaSegunIndice } = require("../objetoDiaMesAnio")

const DiaSemanaAnioEspecifico = function (dia, mes, anio) {
    this.soy = () => "Dia de la semana año especifico";

    this.dia = () => diaValido(dia)
    this.mes = () => mesValido(mes)
    this.anio = () => anioValido(anio)

    this.tipoCorrecto = function () {
        return this.dia() !== undefined && this.mes() === undefined && this.anio() !== undefined && diaDeSemanaValido(dia);
    };

    this.es = function (otraFecha) {
        if (otraFecha.diaDeLaSemana() === this.dia() && otraFecha.anio() === this.anio()) {
            return true;
        }
        return false;
    };

    this.toString = () => diaDeSemanaSegunIndice(this.dia()) + "/" + String(this.anio())

};
module.exports = DiaSemanaAnioEspecifico;
