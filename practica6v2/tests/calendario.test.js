const Calendario = require("../src/Calendario")
const FechaExacta = require("../src/fechas/FechaExacta")
const DiaMes = require("../src/fechas/DiaMes")
const FechaSemanal = require("../src/fechas/FechaSemanal")
const MesAnio = require("../src/fechas/MesAnio")
const FechaSemanalAnio = require("../src/fechas/FechaSemanalAnio")
const DiaAnio = require("../src/fechas/DiaAnio")
const FechaSemanalMes = require("../src/fechas/FechaSemanalMes")

describe("Inputs de calendario vacios",()=>{
    test("Marcos tiene libre todos los días 25/12, todos los años", ()=>{
        const cal = new Calendario()
        const franco = new DiaMes("25","12")

        cal.nuevoFranco(franco)

        expect(cal.esFranco(new FechaExacta("25","12","2030"))).toBe(true)        
    })
    test("Marcos tiene libre el dia 20/11/2024",()=>{
        const cal = new Calendario()
        const franco = new FechaExacta("20","11","2024")

        cal.nuevoFranco(franco)

        expect(cal.esFranco(new FechaExacta("20","11","2024"))).toBe(true)
        expect(cal.esFranco(new FechaExacta("20","11","2030"))).toBe(false)//no es el mismo año
    })
    test("Marcos tiene libre todos lunes", ()=>{
        const cal = new Calendario()
        const franco = new FechaSemanal("lunes")

        cal.nuevoFranco(franco)

        expect(cal.esFranco(new FechaExacta("4","11","2024"))).toBe(true)        
        expect(cal.esFranco(new FechaExacta("5","11","2024"))).toBe(false)//es un martes
    })
    test("Marcos tiene libre todos martes de 2024", ()=>{
        const cal = new Calendario()
        const franco = new FechaSemanalAnio("martes","2024")

        cal.nuevoFranco(franco)

        expect(cal.esFranco(new FechaExacta("5","11","2024"))).toBe(true)//es un martes de 2024
        expect(cal.esFranco(new FechaExacta("4","11","2024"))).toBe(false)//lunes 2024
    })
    test("Marcos tiene libre todo el mes de marzo y abril del año 2024", ()=>{
        const cal = new Calendario()
        const marzo = new MesAnio("3","2025")
        const abril = new MesAnio("4","2025")

        cal.nuevoFranco(marzo)
        cal.nuevoFranco(abril)

        expect(cal.esFranco(new FechaExacta("10","3","2025"))).toBe(true)//marzo      
        expect(cal.esFranco(new FechaExacta("5","4","2025"))).toBe(true)//abril
        expect(cal.esFranco(new FechaExacta("5","3","2030"))).toBe(false)//marzo 2030
    })

    test("Paula tiene franco todos los 6 del 2025", ()=>{
        const cal = new Calendario()
        const franco = new DiaAnio("6","2025")

        cal.nuevoFranco(franco)

        expect(cal.esFranco(new FechaExacta("6","3","2025"))).toBe(true)
        expect(cal.esFranco(new FechaExacta("6","6","2025"))).toBe(true)
        expect(cal.esFranco(new FechaExacta("5","3","2025"))).toBe(false)
        expect(cal.esFranco(new FechaExacta("6","3","2026"))).toBe(false)
    })

    test("Federico tiene franco todos los sabados de marzo de todos los anios", ()=>{
        const cal = new Calendario()
        const franco = new FechaSemanalMes("sabado","3")

        cal.nuevoFranco(franco)

        //sabado de marzo
        expect(cal.esFranco(new FechaExacta("2","3","2024"))).toBe(true)
        expect(cal.esFranco(new FechaExacta("9","3","2024"))).toBe(true)
        expect(cal.esFranco(new FechaExacta("8","3","2025"))).toBe(true)
        //sabado de noviembre
        expect(cal.esFranco(new FechaExacta("2","11","2024"))).toBe(false)
    })
})