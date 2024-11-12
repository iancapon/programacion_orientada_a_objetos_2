"use strict";
const {crearMapa, crearMarsRover, crearObstaculo, crearCoordenadas} = require("./factories");

describe("Teniendo un Mapa NxM.", () => {
    test("Mars Rover respeta los limites del mapa.", () => {
        const mapa = crearMapa(5, 6, [])
        const marsRover = crearMarsRover(0, 0, mapa);
        expect(() => marsRover.movete("A")).toThrow(new Error("La secuencia de comandos indicados represetan una trayectoria fuera del mapa."));
        expect(() => marsRover.movete("S")).toThrow(new Error("La secuencia de comandos indicados represetan una trayectoria fuera del mapa."));
        expect(() => marsRover.movete("W".repeat(7))).toThrow(new Error("La secuencia de comandos indicados represetan una trayectoria fuera del mapa."));
        expect(() => marsRover.movete("D".repeat(6))).toThrow(new Error("La secuencia de comandos indicados represetan una trayectoria fuera del mapa."));
    });
});

describe("Comandos base cuando hay obstaculos.", () => {
    describe("Encontrar obstaculo con comando W.", () => {
        test("Cuando se encuentra un obstaculo en la ultima operacion, no la realiza.", () => {
            const obstaculos = [crearObstaculo(50, 51)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("W");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 50));
        });

        test("Recibe comando WD, se encuentra un obstaculo en el primer movimiento y lo esquiva.", () => {
            const obstaculos = [crearObstaculo(50, 51)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("WD");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(51, 51));
        });

        test("Recibe comando WDWW, se encuentra un obstaculo en el primer movimiento y lo esquiva y continua ejecutando el resto de los comandos.", () => {
            const obstaculos = [crearObstaculo(50, 51)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("WDWW");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(51, 53));
        });

        test("Recibe comando WA, se encuentra un obstaculo en el primer movimiento y lo esquiva.", () => {
            const obstaculos = [crearObstaculo(50, 51)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("WA");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(49, 51));
        });

        test("Recibe comando WAWW, se encuentra un obstaculo en el primer movimiento y lo esquiva y continua ejecutando el resto de los comandos.", () => {
            const obstaculos = [crearObstaculo(50, 51)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("WAWW");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(49, 53));
        });

        test("Recibe comando WS, se encuentra un obstaculo en el primer movimiento y lo esquiva.", () => {
            const obstaculos = [crearObstaculo(50, 51)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("WS");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 50));
        });

        test("Recibe comando WSDD, se encuentra un obstaculo en el primer movimiento y lo esquiva y continua ejecutando el resto de los comandos.", () => {
            const obstaculos = [crearObstaculo(50, 51)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("WSDD");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(52, 50));
        });

        test("Recibe comando WW, se encuentra un obstaculo en el primer movimiento y lo esquiva.", () => {
            const obstaculos = [crearObstaculo(50, 51)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("WW");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 52));
        });

        test("Recibe comando WWWW, se encuentra un obstaculo en el primer movimiento y lo esquiva y continua ejecutando el resto de los comandos.", () => {
            const obstaculos = [crearObstaculo(50, 51)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("WWWW");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 54));
        });

        test("Recibe comando WWWW, se encuentra un obstaculo en el ultimo movimiento y ejecuta todos menos el ultimo comando.", () => {
            const obstaculos = [crearObstaculo(50, 54)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("WWWW");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 53));
        });
    });

    describe("Encontrar obstaculo con comando S.", () => {
        test("Cuando se encuentra un obstaculo en la ultima operacion, no la realiza.", () => {
            const obstaculos = [crearObstaculo(50, 49)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("S");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 50));
        });

        test("Recibe comando SD, se encuentra un obstaculo en el primer movimiento y lo esquiva.", () => {
            const obstaculos = [crearObstaculo(50, 49)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("SD");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(51, 49));
        });

        test("Recibe comando SDSS, se encuentra un obstaculo en el primer movimiento y lo esquiva y continua ejecutando el resto de los comandos.", () => {
            const obstaculos = [crearObstaculo(50, 49)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("SDSS");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(51, 47));
        });

        test("Recibe comando SA, se encuentra un obstaculo en el primer movimiento y lo esquiva.", () => {
            const obstaculos = [crearObstaculo(50, 49)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("SA");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(49, 49));
        });

        test("Recibe comando SASS, se encuentra un obstaculo en el primer movimiento y lo esquiva y continua ejecutando el resto de los comandos.", () => {
            const obstaculos = [crearObstaculo(50, 49)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("SASS");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(49, 47));
        });

        test("Recibe comando SW, se encuentra un obstaculo en el primer movimiento y lo esquiva.", () => {
            const obstaculos = [crearObstaculo(50, 49)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("SW");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 50));
        });

        test("Recibe comando SWDD, se encuentra un obstaculo en el primer movimiento y lo esquiva y continua ejecutando el resto de los comandos.", () => {
            const obstaculos = [crearObstaculo(50, 49)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("SWDD");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(52, 50));
        });

        test("Recibe comando SS, se encuentra un obstaculo en el primer movimiento y lo esquiva.", () => {
            const obstaculos = [crearObstaculo(50, 49)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("SS");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 48));
        });

        test("Recibe comando SSSS, se encuentra un obstaculo en el primer movimiento y lo esquiva y continua ejecutando el resto de los comandos.", () => {
            const obstaculos = [crearObstaculo(50, 49)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("SSSS");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 46));
        });

        test("Recibe comando SSSS, se encuentra un obstaculo en el ultimo movimiento y ejecuta todos menos el ultimo comando.", () => {
            const obstaculos = [crearObstaculo(50, 46)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("SSSS");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 47));
        });
    });

    describe("Encontrar obstaculo con comando D.", () => {
        test("Cuando se encuentra un obstaculo en la ultima operacion, no la realiza.", () => {
            const obstaculos = [crearObstaculo(51, 50)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("D");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 50));
        });

        test("Recibe comando DW, se encuentra un obstaculo en el primer movimiento y lo esquiva.", () => {
            const obstaculos = [crearObstaculo(51, 50)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("DW");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(51, 51));
        });

        test("Recibe comando DWDD, se encuentra un obstaculo en el primer movimiento y lo esquiva y continua ejecutando el resto de los comandos.", () => {
            const obstaculos = [crearObstaculo(51, 50)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("DWDD");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(53, 51));
        });

        test("Recibe comando DS, se encuentra un obstaculo en el primer movimiento y lo esquiva.", () => {
            const obstaculos = [crearObstaculo(51, 50)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("DS");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(51, 49));
        });

        test("Recibe comando DSDD, se encuentra un obstaculo en el primer movimiento y lo esquiva y continua ejecutando el resto de los comandos.", () => {
            const obstaculos = [crearObstaculo(51, 50)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("DSDD");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(53, 49));
        });

        test("Recibe comando DA, se encuentra un obstaculo en el primer movimiento y lo esquiva.", () => {
            const obstaculos = [crearObstaculo(51, 50)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("DA");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 50));
        });

        test("Recibe comando DAWW, se encuentra un obstaculo en el primer movimiento y lo esquiva y continua ejecutando el resto de los comandos.", () => {
            const obstaculos = [crearObstaculo(51, 50)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("DAWW");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 52));
        });

        test("Recibe comando DD, se encuentra un obstaculo en el primer movimiento y lo esquiva.", () => {
            const obstaculos = [crearObstaculo(51, 50)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("DD");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(52, 50));
        });

        test("Recibe comando DDDD, se encuentra un obstaculo en el primer movimiento y lo esquiva y continua ejecutando el resto de los comandos.", () => {
            const obstaculos = [crearObstaculo(51, 50)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("DDDD");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(54, 50));
        });

        test("Recibe comando DDDD, se encuentra un obstaculo en el ultimo movimiento y ejecuta todos menos el ultimo comando.", () => {
            const obstaculos = [crearObstaculo(54, 50)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("DDDD");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(53, 50));
        });
    });

    describe("Encontrar obstaculo con comando A.", () => {
        test("Cuando se encuentra un obstaculo en la ultima operacion, no la realiza.", () => {
            const obstaculos = [crearObstaculo(49, 50)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("A");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 50));
        });

        test("Recibe comando AW, se encuentra un obstaculo en el primer movimiento y lo esquiva.", () => {
            const obstaculos = [crearObstaculo(49, 50)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("AW");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(49, 51));
        });

        test("Recibe comando AWAA, se encuentra un obstaculo en el primer movimiento y lo esquiva y continua ejecutando el resto de los comandos.", () => {
            const obstaculos = [crearObstaculo(49, 50)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("AWAA");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(47, 51));
        });

        test("Recibe comando AS, se encuentra un obstaculo en el primer movimiento y lo esquiva.", () => {
            const obstaculos = [crearObstaculo(49, 50)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("AS");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(49, 49));
        });

        test("Recibe comando ASAA, se encuentra un obstaculo en el primer movimiento y lo esquiva y continua ejecutando el resto de los comandos.", () => {
            const obstaculos = [crearObstaculo(49, 50)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("ASAA");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(47, 49));
        });

        test("Recibe comando AD, se encuentra un obstaculo en el primer movimiento y lo esquiva.", () => {
            const obstaculos = [crearObstaculo(49, 50)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("AD");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 50));
        });

        test("Recibe comando ADWW, se encuentra un obstaculo en el primer movimiento y lo esquiva y continua ejecutando el resto de los comandos.", () => {
            const obstaculos = [crearObstaculo(49, 50)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("ADWW");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 52));
        });

        test("Recibe comando AA, se encuentra un obstaculo en el primer movimiento y lo esquiva.", () => {
            const obstaculos = [crearObstaculo(49, 50)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("AA");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(48, 50));
        });

        test("Recibe comando AAAA, se encuentra un obstaculo en el primer movimiento y lo esquiva y continua ejecutando el resto de los comandos.", () => {
            const obstaculos = [crearObstaculo(49, 50)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("AAAA");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(46, 50));
        });

        test("Recibe comando AAAA, se encuentra un obstaculo en el ultimo movimiento y ejecuta todos menos el ultimo comando.", () => {
            const obstaculos = [crearObstaculo(46, 50)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("AAAA");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(47, 50));
        });
    });
});

describe("Cuando recibimos comandos incorrectos.", () => {
    test("Recibe comando WR, se encuentra un obstaculo en el primer movimiento pero el segundo comando es incorrecto asi que falla.", () => {
        const obstaculos = [crearObstaculo(50, 51)];
        const mapa = crearMapa(100, 100, obstaculos);
        const marsRover = crearMarsRover(50, 50, mapa);

        expect(() => marsRover.movete("WR")).toThrow(new Error("Comando incorrecto."));
        expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 50));
    });
});

describe("Cuando encontramos un obstaculo y al esquivarlo nos vamos del mapa.", () => {
    describe("Encontrar obstaculo con comando W.", () => {
        test("Recibe comando WD, se encuentra un obstaculo en el primer movimiento y al esquivarlo se va del mapa, la posicion final es igual a la original.", () => {
            const obstaculos = [crearObstaculo(50, 51)];
            const mapa = crearMapa(51, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            expect(() => marsRover.movete("WD")).toThrow(new Error("La secuencia de comandos indicados represetan una trayectoria fuera del mapa."));
            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 50));
        });

        test("Recibe comando WA, se encuentra un obstaculo en el primer movimiento y al esquivarlo se va del mapa, la posicion final es igual a la original.", () => {
            const obstaculos = [crearObstaculo(0, 51)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(0, 50, mapa);

            expect(() => marsRover.movete("WA")).toThrow(new Error("La secuencia de comandos indicados represetan una trayectoria fuera del mapa."));
            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(0, 50));
        });

        test("Recibe comando WW, se encuentra un obstaculo en el primer movimiento y no puede esquivarlo por la derecha porque sale del mapa, pero por la izquierda si.", () => {
            const obstaculos = [crearObstaculo(50, 51)];
            const mapa = crearMapa(51, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("WW");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 52));
        });

        test("Recibe comando WW, se encuentra un obstaculo en el primer movimiento y no puede esquivarlo por la izquierda porque sale del mapa, pero por la derecha si.", () => {
            const obstaculos = [crearObstaculo(0, 51)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(0, 50, mapa);

            marsRover.movete("WW");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(0, 52));
        });

        test("Recibe comando WW, se encuentra un obstaculo en el primer movimiento y no puede esquivarlo ni por la derecha ni por la izquierda porque sale del mapa.", () => {
            const obstaculos = [crearObstaculo(0, 51)];
            const mapa = crearMapa(1, 100, obstaculos);
            const marsRover = crearMarsRover(0, 50, mapa);

            expect(() => marsRover.movete("WW")).toThrow(new Error("La secuencia de comandos indicados represetan una trayectoria fuera del mapa."));
            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(0, 50));
        });
    });

    describe("Encontrar obstaculo con comando S.", () => {
        test("Recibe comando SD, se encuentra un obstaculo en el primer movimiento y al esquivarlo se va del mapa, la posicion final es igual a la original.", () => {
            const obstaculos = [crearObstaculo(50, 49)];
            const mapa = crearMapa(51, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            expect(() => marsRover.movete("SD")).toThrow(new Error("La secuencia de comandos indicados represetan una trayectoria fuera del mapa."));
            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 50));
        });

        test("Recibe comando SA, se encuentra un obstaculo en el primer movimiento y al esquivarlo se va del mapa, la posicion final es igual a la original.", () => {
            const obstaculos = [crearObstaculo(0, 49)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(0, 50, mapa);

            expect(() => marsRover.movete("SA")).toThrow(new Error("La secuencia de comandos indicados represetan una trayectoria fuera del mapa."));
            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(0, 50));
        });

        test("Recibe comando SS, se encuentra un obstaculo en el primer movimiento y no puede esquivarlo por la derecha porque sale del mapa, pero por la izquierda si.", () => {
            const obstaculos = [crearObstaculo(50, 49)];
            const mapa = crearMapa(51, 100, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("SS");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 48));
        });

        test("Recibe comando SS, se encuentra un obstaculo en el primer movimiento y no puede esquivarlo por la izquierda porque sale del mapa, pero por la derecha si.", () => {
            const obstaculos = [crearObstaculo(0, 49)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(0, 50, mapa);

            marsRover.movete("SS");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(0, 48));
        });

        test("Recibe comando SS, se encuentra un obstaculo en el primer movimiento y no puede esquivarlo ni por la derecha ni por la izquierda porque sale del mapa.", () => {
            const obstaculos = [crearObstaculo(0, 49)];
            const mapa = crearMapa(1, 100, obstaculos);
            const marsRover = crearMarsRover(0, 50, mapa);

            expect(() => marsRover.movete("SS")).toThrow(new Error("La secuencia de comandos indicados represetan una trayectoria fuera del mapa."));
            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(0, 50));
        });
    });

    describe("Encontrar obstaculo con comando D.", () => {
        test("Recibe comando DW, se encuentra un obstaculo en el primer movimiento y al esquivarlo se va del mapa, la posicion final es igual a la original.", () => {
            const obstaculos = [crearObstaculo(51, 50)];
            const mapa = crearMapa(100, 51, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            expect(() => marsRover.movete("DW")).toThrow(new Error("La secuencia de comandos indicados represetan una trayectoria fuera del mapa."));
            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 50));
        });

        test("Recibe comando DS, se encuentra un obstaculo en el primer movimiento y al esquivarlo se va del mapa, la posicion final es igual a la original.", () => {
            const obstaculos = [crearObstaculo(51, 0)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 0, mapa);

            expect(() => marsRover.movete("DS")).toThrow(new Error("La secuencia de comandos indicados represetan una trayectoria fuera del mapa."));
            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 0));
        });

        test("Recibe comando DD, se encuentra un obstaculo en el primer movimiento y no puede esquivarlo por arriba porque sale del mapa, pero por abajo si.", () => {
            const obstaculos = [crearObstaculo(51, 50)];
            const mapa = crearMapa(100, 51, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("DD");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(52, 50));
        });

        test("Recibe comando DD, se encuentra un obstaculo en el primer movimiento y no puede esquivarlo por abajo porque sale del mapa, pero por srriba si.", () => {
            const obstaculos = [crearObstaculo(51, 0)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 0, mapa);

            marsRover.movete("DD");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(52, 0));
        });

        test("Recibe comando DD, se encuentra un obstaculo en el primer movimiento y no puede esquivarlo ni por arriba ni por abajo porque sale del mapa.", () => {
            const obstaculos = [crearObstaculo(51, 0)];
            const mapa = crearMapa(100, 1, obstaculos);
            const marsRover = crearMarsRover(50, 0, mapa);

            expect(() => marsRover.movete("DD")).toThrow(new Error("La secuencia de comandos indicados represetan una trayectoria fuera del mapa."));
            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 0));
        });
    });

    describe("Encontrar obstaculo con comando A.", () => {
        test("Recibe comando AW, se encuentra un obstaculo en el primer movimiento y al esquivarlo se va del mapa, la posicion final es igual a la original.", () => {
            const obstaculos = [crearObstaculo(49, 50)];
            const mapa = crearMapa(100, 51, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            expect(() => marsRover.movete("AW")).toThrow(new Error("La secuencia de comandos indicados represetan una trayectoria fuera del mapa."));
            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 50));
        });

        test("Recibe comando AS, se encuentra un obstaculo en el primer movimiento y al esquivarlo se va del mapa, la posicion final es igual a la original.", () => {
            const obstaculos = [crearObstaculo(49, 0)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 0, mapa);

            expect(() => marsRover.movete("AS")).toThrow(new Error("La secuencia de comandos indicados represetan una trayectoria fuera del mapa."));
            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 0));
        });

        test("Recibe comando AA, se encuentra un obstaculo en el primer movimiento y no puede esquivarlo por arriba porque sale del mapa, pero por abajo si.", () => {
            const obstaculos = [crearObstaculo(49, 50)];
            const mapa = crearMapa(100, 51, obstaculos);
            const marsRover = crearMarsRover(50, 50, mapa);

            marsRover.movete("AA");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(48, 50));
        });

        test("Recibe comando AA, se encuentra un obstaculo en el primer movimiento y no puede esquivarlo por abajo porque sale del mapa, pero por srriba si.", () => {
            const obstaculos = [crearObstaculo(49, 0)];
            const mapa = crearMapa(100, 100, obstaculos);
            const marsRover = crearMarsRover(50, 0, mapa);

            marsRover.movete("AA");

            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(48, 0));
        });

        test("Recibe comando AA, se encuentra un obstaculo en el primer movimiento y no puede esquivarlo ni por arriba ni por abajo porque sale del mapa.", () => {
            const obstaculos = [crearObstaculo(49, 0)];
            const mapa = crearMapa(100, 1, obstaculos);
            const marsRover = crearMarsRover(50, 0, mapa);

            expect(() => marsRover.movete("AA")).toThrow(new Error("La secuencia de comandos indicados represetan una trayectoria fuera del mapa."));
            expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 0));
        });
    });
});

describe("Cuando encontramos mas de un obstaculo ejecutando los comandos recibidos.", () => {

    describe("Cuando tengo obstaculos adelante y atras, y recibo la secuencia WSD el rover se mueve una posicion hacia la derecha.", () => {
        const obstaculos = [crearObstaculo(50, 51),crearObstaculo(50, 49)];
        const mapa = crearMapa(100, 100, obstaculos);
        const marsRover = crearMarsRover(50, 50, mapa);

        marsRover.movete("WSD");

        expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(51, 50));
    });

    describe("Cuando tengo obstaculos adelante y atras, y recibo la secuencia SWD el rover se mueve una posicion hacia la derecha.", () => {
        const obstaculos = [crearObstaculo(50, 51),crearObstaculo(50, 49)];
        const mapa = crearMapa(100, 100, obstaculos);
        const marsRover = crearMarsRover(50, 50, mapa);

        marsRover.movete("SWD");

        expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(51, 50));
    });

    describe("Cuando tengo obstaculos a la derecha e izquierda, y recibo la secuencia DAW el rover se mueve una posicion hacia la adelante.", () => {
        const obstaculos = [crearObstaculo(51, 50),crearObstaculo(49, 50)];
        const mapa = crearMapa(100, 100, obstaculos);
        const marsRover = crearMarsRover(50, 50, mapa);

        marsRover.movete("DAW");

        expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 51));
    });

    describe("Cuando tengo obstaculos a la derecha e izquierda, y recibo la secuencia ADW el rover se mueve una posicion hacia la adelante.", () => {
        const obstaculos = [crearObstaculo(51, 50),crearObstaculo(49, 50)];
        const mapa = crearMapa(100, 100, obstaculos);
        const marsRover = crearMarsRover(50, 50, mapa);

        marsRover.movete("ADW");

        expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 51));
    });


});