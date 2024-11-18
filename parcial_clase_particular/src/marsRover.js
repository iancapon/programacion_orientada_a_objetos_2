"use strict";
const comandoFactory = require("./comandoFactory");
const Coordenadas = require("./coordenadas");
const ComandoVacio = require("./comandoVacio");


const Bateria = function(inicial){
    this.bateria = inicial
    this.descargar = function(){
        this.bateria -= 1
    }
    this.recargar = function(){
        this.bateria = inicial
    }
    this.obtenerBateria = function(){
        return this.bateria
    }

}
//definimos bateria como bateriainicial
const MarsRover = function (posicionInicialX, posicionInicialY, mapa, bateriaInicial) {

    this.posicionActual = new Coordenadas(posicionInicialX, posicionInicialY);
    this.mapa = mapa;
    //aca defino el objeto
    this.bateria = new Bateria(bateriaInicial);
    this.estacion = new Coordenadas(posicionInicialX, posicionInicialY);

    this.obtenerBateria = function () {
        return this.bateria.obtenerBateria()
    }
    //
    this.obtenerPosicionActual = function () {
        return this.posicionActual;
    };

    this.movete = function (comandos) {
        this.validarMaximoDiezComandos(comandos);

        this.ejecutarComandos(comandos);
    };

    this.ejecutarComandos = function (secuenciaDeComandos) {
        const posicionInicial = this.posicionActual;
        let comandoPendiente = new ComandoVacio();

        const comandos = comandoFactory.crearComandos(secuenciaDeComandos);
        comandos.forEach(comando => {
            try {
                comando.moverDadoComandoAnterior(comandoPendiente, this);
                comandoPendiente = new ComandoVacio();
            } catch (error) {
                if (!(error.message === "Hay un obstaculo donde me debo mover.")) {
                    this.posicionActual = posicionInicial;
                    throw error;
                }
                comandoPendiente = comando;
            }
        });
    }

    this.validarMaximoDiezComandos = function (comandos) {
        if (comandos.length > 10)
            throw new Error("Las secuencias de comandos deben ser de hasta 10 movimientos.");
    }

    this.validarEstarDentroDelMapa = function (coordenadas) {
        if (this.mapa.superaLimites(coordenadas))
            throw new Error("La secuencia de comandos indicados represetan una trayectoria fuera del mapa.");

    };

    this.validarQueNoHayaObstaculos = function (coordenadas) {
        if (this.mapa.hayObstaculo(coordenadas)) {
            throw new Error("Hay un obstaculo donde me debo mover.");
        }
    }

    this.aplicarMovimiento = function (coordenadasAMover) {
        const resultadoDelMovimiento = coordenadasAMover.sumar(this.posicionActual);

        this.validarEstarDentroDelMapa(resultadoDelMovimiento);
        this.validarQueNoHayaObstaculos(resultadoDelMovimiento);

        if (!this.posicionActual.equals(resultadoDelMovimiento)) {
            this.bateria.descargar()// -= 1
        }

        this.posicionActual = resultadoDelMovimiento
        //
        if (this.bateria != undefined) {
            if (this.posicionActual.saltosHacia(this.estacion) > this.bateria.obtenerBateria()) {
                this.posicionActual = this.estacion
                this.bateria.recargar()
                throw new Error("Se aleja demasiado de la estacion de recarga")
            }
        }


        if (this.posicionActual.equals(this.estacion)) {
            this.bateria.recargar()
        }
        //
    }

};


module.exports = MarsRover;