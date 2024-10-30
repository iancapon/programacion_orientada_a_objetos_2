const { describe } = require("node:test")
const Calendario = require("../src/Calendario")
const { crearFecha } = require("../src/crearFecha")

describe("Ingresando fechas validas a un calendario sin nombre por vez",()=>{
    test("Un calendario tiene franco el dia 20/11/24 por un feriado", () => {
        const calendario = new Calendario()

        calendario.nuevoFranco(crearFecha("20", 11, "2024"))

        expect(calendario.fechas[0].soy()).toEqual("Fecha exacta")

        expect(calendario.esFranco(crearFecha(20, "noviembre", 2024))).toEqual(true)
    })

    test("Un calendario tiene franco todos los 25/12", () => {
        const calendario = new Calendario()

        calendario.nuevoFranco(crearFecha(25, "diciembre"))

        expect(calendario.fechas[0].soy()).toEqual("Fecha repetida todos los años")

        expect(calendario.esFranco(crearFecha(25, "diciembre", 1999))).toEqual(true)
    })

    test("Un calendario no tiene un franco el 10/12/2024 pero si el 10/12/2010 y el 01/01", () => {
        const calendario = new Calendario()

        calendario.nuevoFranco(crearFecha(10, "diciembre", 2010))
        calendario.nuevoFranco(crearFecha(1, "enero"))

        expect(calendario.esFranco(crearFecha(10, "diciembre", 2024))).toEqual(false)
        expect(calendario.esFranco(crearFecha(10, "diciembre", 2010))).toEqual(true)
        expect(calendario.esFranco(crearFecha(1, "enero", 2024))).toEqual(true)
    })

    test("Un calendario tiene franco todos los lunes", () => {
        const calendario = new Calendario()

        calendario.nuevoFranco(crearFecha("lunes"))

        expect(calendario.fechas[0].soy()).toEqual("Dia de la semana repetido todos los años")

        expect(calendario.esFranco(crearFecha(28, "octubre", 2024))).toEqual(true)
    })

    test("Un calendario tiene franco todos los martes del 2024", () => {
        const calendario = new Calendario()

        calendario.nuevoFranco(crearFecha("martes", undefined, 2024))

        expect(calendario.fechas[0].soy()).toEqual("Dia de la semana año especifico")

        expect(calendario.esFranco(crearFecha(29, "octubre", 2024))).toEqual(true)
        expect(calendario.esFranco(crearFecha(28, "octubre", 2025))).toEqual(false)
    })

    test("Un calendario tiene franco el mes de marzo del 2025", () => {
        const calendario = new Calendario()

        calendario.nuevoFranco(crearFecha(undefined, "marzo", 2025))

        expect(calendario.fechas[0].soy()).toEqual("Mes entero de un año especifico")

        expect(calendario.esFranco(crearFecha(3, "marzo", 2024))).toEqual(false)
        expect(calendario.esFranco(crearFecha(3, "marzo", 2025))).toEqual(true)
    })

    test("Un calendario tiene franco todos los dias 6 del año 2025", () => {
        const calendario = new Calendario()

        calendario.nuevoFranco(crearFecha(6, undefined, 2025))

        expect(calendario.fechas[0].soy()).toEqual("Todos los dias de cada mes de un año especifico")

        expect(calendario.esFranco(crearFecha(6, "marzo", 2025))).toEqual(true)
        expect(calendario.esFranco(crearFecha(7, "marzo", 2025))).toEqual(false)
        expect(calendario.esFranco(crearFecha(6, "marzo", 2026))).toEqual(false)
    })

    test("Un calendario tiene franco todos los sabados de octubre de todos los años", () => {
        const calendario = new Calendario()

        calendario.nuevoFranco(crearFecha("sabado", "octubre", undefined))

        expect(calendario.fechas[0].soy()).toEqual("Dia de la semana mes especifico, todos los años")

        expect(calendario.esFranco(crearFecha(26, "octubre", 2024))).toEqual(true)
        expect(calendario.esFranco(crearFecha(1, "noviembre", 2024))).toEqual(false)
        expect(calendario.esFranco(crearFecha(18, "octubre", 2025))).toEqual(true)
    })
})

describe("Fechas invalidas ingresadas",()=>{
    test("Se ingresa una fecha invalida con solo un mes, tira un error", () => {
        const calendario = new Calendario()

        calendario.nuevoFranco(crearFecha(undefined, "octubre", undefined))

        expect(() => (calendario.esFranco(crearFecha(26, "octubre", 2024)))).toThrow("Fecha ingresada invalida")
    })
})