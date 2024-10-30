const { diaValido, mesValido, anioValido, mesSegunIndice } = require("../objetoDiaMesAnio")

const MesAnioEspecifico = function (dia, mes, anio) {
    this.soy = () => "Mes entero de un año especifico";

    this.dia = () => diaValido(dia)
    this.mes = () => mesValido(mes)
    this.anio = () => anioValido(anio)

    this.tipoCorrecto = function () {
        return this.dia() === undefined && this.mes() !== undefined && this.anio() !== undefined;
    };

    this.es = function (otraFecha) {
        if (otraFecha.mes() === this.mes() && otraFecha.anio() === this.anio()) {
            return true;
        }
        return false;
    };

    this.toString = () => mesSegunIndice(this.mes()) + "/" + String(this.anio())

};
module.exports = MesAnioEspecifico;
