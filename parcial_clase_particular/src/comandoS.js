"use strict";
const Comando = require("./comando");
const Coordenadas = require("./coordenadas");

const ComandoS = function(){
    Comando.call(this);

    this.coordenadasASumar = () => new Coordenadas(0,-1);
    this.esquivarPlanA = () => "DSSA";
    this.esquivarPlanB = () => "ASSD";
    this.es = (operacion) => operacion==="S";

    this.moverDadoComandoAnterior = (comandoAnterior, marsRover) => {
        comandoAnterior.ejecutarCuandoElSiguienteEsS(this, marsRover);
    };

    this.ejecutarCuandoElSiguienteEsS = function(comandoSiguiente, marsRover){
        this.ejecutarComandosIgualesEntreSi(comandoSiguiente, marsRover);
    };

    this.ejecutarCuandoElSiguienteEsW = function(comandoSiguiente, marsRover){
    }

};

ComandoS.prototype = Object.create(Comando.prototype);
ComandoS.prototype.constructor = ComandoS;

module.exports = ComandoS;