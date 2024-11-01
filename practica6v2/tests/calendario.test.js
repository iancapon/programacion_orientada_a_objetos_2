const Calendario = require("../src/Calendario")
const FechaExacta = require("../src/fechas/FechaExacta")
const FechaAnual = require("../src/fechas/FechaAnual")
const FechaSemanal = require("../src/fechas/FechaSemanal")
const MesAnio = require("../src/fechas/MesAnio")

describe("Inputs de calendario vacios",()=>{
    test("Marcos tiene libre el dia 25/12/2024",()=>{
        const cal = new Calendario()
        const fecha = new FechaExacta("25","12","2024")

        cal.nuevoFranco(fecha)

        expect(cal.esFranco(new FechaExacta("25","12","2024"))).toBe(true)
        expect(cal.esFranco(new FechaExacta("25","12","2030"))).toBe(false)//no es el mismo año
    })
    test("Marcos tiene libre todos los días 25/12", ()=>{
        const cal = new Calendario()
        const franco = new FechaAnual("25","12")
        const fecha = new FechaExacta("25","12","2030")

        cal.nuevoFranco(franco)

        expect(cal.esFranco(fecha)).toBe(true)        
    })
    test("Marcos tiene libre todos lunes", ()=>{
        const cal = new Calendario()
        const franco = new FechaSemanal("lunes")
        const fecha = new FechaExacta("4","11","2024")

        cal.nuevoFranco(franco)

        expect(cal.esFranco(fecha)).toBe(true)        
        expect(cal.esFranco(new FechaExacta("5","11","2024"))).toBe(false)//es un martes
    })
    test("Marcos tiene libre todo el mes de marzo del año 2014", ()=>{
        const cal = new Calendario()
        const franco = new MesAnio("3","2024")
        const fecha = new FechaExacta("10","3","2024")

        cal.nuevoFranco(franco)

        expect(cal.esFranco(fecha)).toBe(true)        
        expect(cal.esFranco(new FechaExacta("5","4","2024"))).toBe(false)//abril
        expect(cal.esFranco(new FechaExacta("5","3","2030"))).toBe(false)//marzo 2030
    })
})