"use strict";
const Coordenadas = function(x, y){
    this.x = x;
    this.y = y;
    
    this.toArray = function(){
        return [x, y]
    };

    this.sumar = function(coordenadas){
        let resultado = coordenadas.sumarEnElEjeX(this.x);
        resultado = resultado.sumarEnElEjeY(this.y);
        return resultado;
    }

    this.sumarEnElEjeX = function(valor){ 
        return new Coordenadas(this.x + valor, this.y)
    };

    this.sumarEnElEjeY = function(valor){ 
        return new Coordenadas(this.x, this.y + valor)
    };

    this.restar = function(coordenadas){
        let resultado = coordenadas.restarEnElEjeX(this.x);
        resultado = resultado.restarEnElEjeY(this.y);
        return resultado;
    }

    this.restarEnElEjeX = function(valor){ 
        return new Coordenadas(this.x - valor, this.y)
    };

    this.restarEnElEjeY = function(valor){ 
        return new Coordenadas(this.x, this.y - valor)
    };

    this.saltosHacia = function(coordenada){
        const valor = this.restar(coordenada)
        return Math.abs(valor.toArray()[0]) + Math.abs(valor.toArray[1])
    }

    this.dentroDe = function(puntoInferiorIsquierdo, puntoSuperiosDerecho){
        return this.mayorOIgual(puntoInferiorIsquierdo) 
            && this.menorOIgual(puntoSuperiosDerecho)
    };

    this.mayorOIgual = function(coordenada){
        return coordenada.xMenorOIgualA(this.x) && coordenada.yMenorOIgualA(this.y);
    };

    this.menorOIgual = function(coordenada) {
        return coordenada.xMayorOIgualA(this.x) && coordenada.yMayorOIgualA(this.y);
    };

    this.xMenorOIgualA = function(x){
        return this.x <= x;
    };

    this.yMenorOIgualA = function(y){
        return this.y <= y;
    };

    this.xMayorOIgualA = function(x){
        return this.x > x;
    };

    this.yMayorOIgualA = function(y){
        return this.y > y;
    };

    this.en = function (coordenadas){
        return this.equals(coordenadas);
    }

    this.equals = function (otro) {
        return this.x === otro.x && this.y === otro.y;
    };

    this.toString = function() {
        return `Coordenadas(${this.x}, ${this.y})`;
    };

};

module.exports = Coordenadas;