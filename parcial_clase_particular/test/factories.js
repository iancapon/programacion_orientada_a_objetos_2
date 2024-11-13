const MarsRover = require("../src/marsRover");
const Mapa = require("../src/mapa");
const Coordenadas = require("../src/coordenadas");

const crearMarsRover = function (posicionInicialX, posicionInicialY, mapa = crearMapa(100, 100, []), bateria) {
    return new MarsRover(posicionInicialX, posicionInicialY, mapa, bateria);
}

const crearMapa = function (limiteSuperiorX, limiteSuperiorY, obstaculos = []){
    return new Mapa(limiteSuperiorX, limiteSuperiorY, obstaculos);
}

const crearCoordenadas = function (x, y){
    return new Coordenadas(x, y);
}


module.exports = {
    crearMapa: crearMapa,
    crearMarsRover: crearMarsRover,
    crearCoordenadas: crearCoordenadas,
    crearObstaculo: crearCoordenadas
}