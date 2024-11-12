"use strict";

const ComandoIncorrecto = function(){
    this.mover = function(marsRover){
        throw new Error ("Comando incorrecto.");
    };
    this.moverDadoComandoAnterior = (comandoAnterior, marsRover) => {
        throw new Error ("Comando incorrecto.");
    };
    this.es = (operacion) => true;
};


module.exports = ComandoIncorrecto;