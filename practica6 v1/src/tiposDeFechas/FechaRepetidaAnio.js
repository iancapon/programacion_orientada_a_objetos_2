const { diaValido, mesValido, anioValido, diaDeSemanaValido } = require("../objetoDiaMesAnio")

const FechaRepetidaAnio = function (dia, mes, anio) {
    this.soy = () => "Fecha repetida todos los años";

    this.dia = () => diaValido(dia)
    this.mes = () => mesValido(mes)
    this.anio = () => anioValido(anio)

    this.tipoCorrecto = function () {
        return this.dia() !== undefined && this.mes() !== undefined && this.anio() === undefined && !diaDeSemanaValido(dia);
    };

    this.es = function (otraFecha) {
        if (otraFecha.dia() == this.dia() && otraFecha.mes() == this.mes()) {
            return true;
        }
        return false;
    };

    this.toString = () => String(this.dia())+"/" + String(this.mes()+1)

};
module.exports = FechaRepetidaAnio;
