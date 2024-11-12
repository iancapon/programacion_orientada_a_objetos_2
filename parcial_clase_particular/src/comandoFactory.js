"use strict";
const ComandoW = require("./comandoW");
const ComandoS = require("./comandoS");
const ComandoD = require("./comandoD");
const ComandoA = require("./comandoA");
const ComandoIncorrecto = require("./comandoIncorrecto");

const comandoFactory = {
    crearComandos: function(comandos){

        const comandosPosibles = [
            new ComandoW(),
            new ComandoS(),
            new ComandoD(),
            new ComandoA(),
            new ComandoIncorrecto()
        ];
        return comandos.split("").map((comando) => {
            return comandosPosibles.find((operacion) => operacion.es(comando.toUpperCase()));
        })

    }
}

module.exports = comandoFactory;