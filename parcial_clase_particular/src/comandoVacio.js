"use strict";
const Comando = require("./comando");
const Coordenadas = require("./coordenadas");

const ComandoVacio = function(){
    Comando.call(this);

    this.coordenadasASumar = () => new Coordenadas(0,0);
    this.es = (operacion) => operacion==="ComandoVaio";
};

ComandoVacio.prototype = Object.create(Comando.prototype);
ComandoVacio.prototype.constructor = ComandoVacio;

module.exports = ComandoVacio;