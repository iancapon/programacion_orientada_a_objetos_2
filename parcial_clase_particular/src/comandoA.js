"use strict";
const Comando = require("./comando");
const Coordenadas = require("./coordenadas");

const ComandoA = function () {
    Comando.call(this);

    this.coordenadasASumar = () => new Coordenadas(-1, 0);

    this.esquivarPlanA = () => "SAAW";
    this.esquivarPlanB = () => "WAAS";
    this.es = (operacion) => operacion === "A";

    this.moverDadoComandoAnterior = (comandoAnterior, marsRover) => {
        comandoAnterior.ejecutarCuandoElSiguienteEsA(this, marsRover);
    };

    this.ejecutarCuandoElSiguienteEsA = function (comandoSiguiente, marsRover) {
        this.ejecutarComandosIgualesEntreSi(comandoSiguiente, marsRover);
    };

    this.ejecutarCuandoElSiguienteEsD = function(comandoSiguiente, marsRover){
    };

};

ComandoA.prototype = Object.create(Comando.prototype);
ComandoA.prototype.constructor = ComandoA;

module.exports = ComandoA;