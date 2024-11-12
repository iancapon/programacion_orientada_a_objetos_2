"use strict";

const Comando = function(){
    
    this.mover = (marsRover) => {
        marsRover.aplicarMovimiento(this.coordenadasASumar());
    }

    this.ejecutarComandosDiferentesEntreSi = function (comandoSiguiente, marsRover){
        comandoSiguiente.mover(marsRover);
        this.mover(marsRover);
    };

    this.ejecutarComandosIgualesEntreSi = function (comandoSiguiente, marsRover){
        try{
            marsRover.movete(this.esquivarPlanA());
        }catch{
            marsRover.movete(this.esquivarPlanB());
        }
    };

    this.ejecutarCuandoElSiguienteEsW = function (comandoSiguiente, marsRover){
        this.ejecutarComandosDiferentesEntreSi(comandoSiguiente, marsRover);
    };

    this.ejecutarCuandoElSiguienteEsS = function (comandoSiguiente, marsRover){
        this.ejecutarComandosDiferentesEntreSi(comandoSiguiente, marsRover);
    };

    this.ejecutarCuandoElSiguienteEsD = function (comandoSiguiente, marsRover){
        this.ejecutarComandosDiferentesEntreSi(comandoSiguiente, marsRover);
    };

    this.ejecutarCuandoElSiguienteEsA = function (comandoSiguiente, marsRover){
        this.ejecutarComandosDiferentesEntreSi(comandoSiguiente, marsRover);
    };
 
};

module.exports = Comando;