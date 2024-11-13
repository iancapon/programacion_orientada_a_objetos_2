"use strict";
const { crearObstaculo, crearCoordenadas, crearMarsRover, crearMapa } = require("./factories");

describe("Se mueve una unidad, gasta 1 de bateria", () => {
    test("Se mueve una casilla, comando W, gasta 1 de bateria", () => {
        const mapa = crearMapa(10, 10, [])
        const marsRover = crearMarsRover(5, 5, mapa, 10);

        marsRover.movete("W");

        expect(marsRover.obtenerBateria()).toBe(9);
    })

    test("Se mueve una casilla, comando A, gasta 1 de bateria", () => {
        const mapa = crearMapa(10, 10, [])
        const marsRover = crearMarsRover(5, 5, mapa, 10);

        marsRover.movete("A");

        expect(marsRover.obtenerBateria()).toBe(9);
    })

    test("Se mueve una casilla, comando S, gasta 1 de bateria", () => {
        const mapa = crearMapa(10, 10, [])
        const marsRover = crearMarsRover(5, 5, mapa, 10);

        marsRover.movete("S");

        expect(marsRover.obtenerBateria()).toBe(9);
    })

    test("Se mueve una casilla, comando D, gasta 1 de bateria", () => {
        const mapa = crearMapa(10, 10, [])
        const marsRover = crearMarsRover(5, 5, mapa, 10);

        marsRover.movete("D");

        expect(marsRover.obtenerBateria()).toBe(9);
    })
})

describe("Se mueve varias unidades, gasta esas unidades de bateria",()=>{
    test("Se mueve 5 casillas, comando WWWWW, gasta 5 de bateria", () => {
        const mapa = crearMapa(10, 10, [])
        const marsRover = crearMarsRover(5, 2, mapa, 10);

        marsRover.movete("WWWWW");

        expect(marsRover.obtenerBateria()).toBe(5);
    })
})

describe("Se encuentra con obstaculos, gasta la cantidad correcta de bateria segun como lo esquiva",()=>{
    test("Se mueve dos casillas, comando WW, esquiva 1 obstaculo, gasta 4 de bateria", () => {
        const mapa = crearMapa(10, 10, [crearObstaculo(5,5)])
        const marsRover = crearMarsRover(5, 4, mapa, 10);

        marsRover.movete("WW");

        expect(marsRover.obtenerBateria()).toBe(6);
    })

    test("Se mueve dos casillas, comando WS, tiene enfrente un obstaculo, no gasta bateria", () => {
        const mapa = crearMapa(10, 10, [crearObstaculo(5,5)])
        const marsRover = crearMarsRover(5, 4, mapa, 10);

        marsRover.movete("WS");

        expect(marsRover.obtenerBateria()).toBe(10);
    })

    test("Se mueve dos casillas, comando AD, tiene enfrente un obstaculo, no gasta bateria", () => {
        const mapa = crearMapa(10, 10, [crearObstaculo(4,5)])
        const marsRover = crearMarsRover(5, 5, mapa, 10);

        marsRover.movete("AD");

        expect(marsRover.obtenerBateria()).toBe(10);
    })
})

describe("Intenta moverse fuera del mapa, no gasta bateria",()=>{
    test("...", () => {
        const mapa = crearMapa(6,6, [])
        const marsRover = crearMarsRover(5, 5, mapa, 10);

        expect(() => marsRover.movete("WW")).toThrow(new Error("La secuencia de comandos indicados represetan una trayectoria fuera del mapa."))
        expect(marsRover.obtenerBateria()).toBe(10)
    })
})

describe("Pasa al lado de la estacion de recarga, recarga su bateria",()=>{
    test("...", () => {
        const mapa = crearMapa(10,10, [])
        const marsRover = crearMarsRover(5, 5, mapa, 10);

        marsRover.movete("WW")
        marsRover.movete("SS")

        expect(marsRover.obtenerBateria()).toBe(10)
    })
})

describe("Se aleja de la estacion de recarga hasta que tiene que volver.",()=>{
    test("...", () => {
        const mapa = crearMapa(10,10, [])
        const marsRover = crearMarsRover(5, 5, mapa, 6);

        expect(()=> marsRover.movete("WWWW")).toThrow(new Error("Se aleja demasiado de la estacion de recarga"))
        
        expect(marsRover.obtenerPosicionActual.toEqualObject(crearCoordenadas(5, 5)))
        expect(marsRover.obtenerBateria()).toBe(6)
    })
})