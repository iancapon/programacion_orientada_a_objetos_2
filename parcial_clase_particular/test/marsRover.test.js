"use strict";
const {crearCoordenadas, crearMarsRover} = require("./factories");


test("Mars Rover aterriza en una posicion inicial configurable.", () => {
    //Opcional, el enunciado no hace ninguna aclaracion de la posicion inicial.
    const marsRover = crearMarsRover(50, 50);

    expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 50));
});


describe("Movimientos basicos del Mars Rover.", () => {
    test("Mars Rover recibe 'W' y avanza una posicion hacia adelante.", () => {
        const marsRover = crearMarsRover(50, 50);

        marsRover.movete("W");

        expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 51));
    });

    test("Mars Rover recibe 'S' y avanza una posicion hacia atras.", () => {
        const marsRover = crearMarsRover(50, 50);

        marsRover.movete("S");

        expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 49));
    });

    test("Mars Rover recibe 'D' y avanza una posicion hacia la derecha.", () => {
        const marsRover = crearMarsRover(50, 50);

        marsRover.movete("D");

        expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(51, 50));
    });

    test("Mars Rover recibe 'A' y avanza una posicion hacia la izquierda.", () => {
        const marsRover = crearMarsRover(50, 50);

        marsRover.movete("A");

        expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(49, 50));
    });

    test("Mars Rover recibe sabe entender los comandos independientemente si estan en minuscula o mayuscula.", () => {
        const marsRover = crearMarsRover(50, 50);

        marsRover.movete("w");
        expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 51));
        marsRover.movete("d");
        expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(51, 51));
        marsRover.movete("s");
        expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(51, 50));
        marsRover.movete("a");
        expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 50));
    });
});


describe("Secuencias de comandos enviados al Mars Rover.", () => {
    test("Mars Rover recibe 'WW' y avanza dos posiciones hacia adelante.", () => {
        const marsRover = crearMarsRover(50, 50);

        marsRover.movete("WW");

        expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 52));
    });

    test("Mars Rover recibe 'WWW' y avanza tres posiciones hacia adelante.", () => {
        const marsRover = crearMarsRover(50, 50);

        marsRover.movete("WWW");

        expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 53));
    });

    test("Mars Rover recibe un comando incorreco y no realiza ningun movimiento.", () => {
        const marsRover = crearMarsRover(50, 50);

        expect(() => marsRover.movete("Q")).toThrow(new Error("Comando incorrecto."));
        expect(() => marsRover.movete("XWW")).toThrow(new Error("Comando incorrecto."));
        expect(() => marsRover.movete("DDDU")).toThrow(new Error("Comando incorrecto."));
        expect(() => marsRover.movete("SSPSS")).toThrow(new Error("Comando incorrecto."));
        expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 50));
    });

    test("Mars Rover recibe una secuencia de 10 movimientos y los realiza.", () => {
        const marsRover = crearMarsRover(50, 50);

        marsRover.movete("WWWWWWWWWW");

        expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 60));
    });

    test("Mars Rover no puede relizar secuencias de mas de 10 movimientos.", () => {
        const marsRover = crearMarsRover(50, 50);

        expect(() => marsRover.movete("AWDSAWDSAWD")).toThrow(new Error("Las secuencias de comandos deben ser de hasta 10 movimientos."));
        expect(() => marsRover.movete("AWDSAWDSAWDWWD")).toThrow(new Error("Las secuencias de comandos deben ser de hasta 10 movimientos."));
        expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 50));
    });
});


describe("El Mars Rover se mantiene dentro del mapa.", () => {
    test("Mars Rover llega al borde del extremo derecho superior.", () => {
        const marsRover = crearMarsRover(98, 98);

        marsRover.movete("WD");

        expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(99, 99));
    });

    test("Mars Rover llega al borde del extremo derecho inferior.", () => {
        const marsRover = crearMarsRover(98, 1);

        marsRover.movete("SD");

        expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(99, 0));
    });

    test("Mars Rover llega al borde del extremo izquierdo inferior.", () => {
        const marsRover = crearMarsRover(1, 1);

        marsRover.movete("SA");

        expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(0, 0));
    });

    test("Mars Rover llega al borde del extremo izquierdo superior.", () => {
        const marsRover = crearMarsRover(1, 98);

        marsRover.movete("WA");

        expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(0, 99));
    });

    test("Mars Rover se mantiene dentro del mapa cuando el comando le indica salir por el lado superior.", () => {
        const marsRover = crearMarsRover(50, 99);

        expect(() => marsRover.movete("W")).toThrow(new Error("La secuencia de comandos indicados represetan una trayectoria fuera del mapa."));
    });

    test("Mars Rover se mantiene dentro del mapa cuando el comando le indica salir por el lado inferior.", () => {
        const marsRover = crearMarsRover(50, 0);

        expect(() => marsRover.movete("S")).toThrow(new Error("La secuencia de comandos indicados represetan una trayectoria fuera del mapa."));
    });

    test("Mars Rover se mantiene dentro del mapa cuando el comando le indica salir por el lado derecho.", () => {
        const marsRover = crearMarsRover(99, 50);

        expect(() => marsRover.movete("D")).toThrow(new Error("La secuencia de comandos indicados represetan una trayectoria fuera del mapa."));
    });

    test("Mars Rover se mantiene dentro del mapa cuando el comando le indica salir por el lado izquierdo.", () => {
        const marsRover = crearMarsRover(0, 50);

        expect(() => marsRover.movete("A")).toThrow(new Error("La secuencia de comandos indicados represetan una trayectoria fuera del mapa."));
    });

    test("Mars Rover al recibir una secuencia de comandos que le indican salir del mapa permanece en su posicion original.", () => {
        const marsRover = crearMarsRover(50, 98);

        expect(() => marsRover.movete("WW")).toThrow(new Error("La secuencia de comandos indicados represetan una trayectoria fuera del mapa."));
        expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 98));
    });

    test("Mars Rover al recibir una secuencia de comandos que le indican salir y volver a entrar en el mapa, permanece en su posicion original.", () => {
        const marsRover = crearMarsRover(50, 98);

        expect(() => marsRover.movete("WWDDSSS")).toThrow(new Error("La secuencia de comandos indicados represetan una trayectoria fuera del mapa."));
        expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 98));
    });
});