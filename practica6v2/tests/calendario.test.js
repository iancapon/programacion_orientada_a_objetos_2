const { Calendario, FechaExacta, DiaMes, FechaSemanal, MesAnio, FechaSemanalAnio, DiaAnio, FechaSemanalMes } = require("./tiposDeFechas")

describe("Inputs de calendario vacios", () => {
    test("Marcos tiene libre todos los días 25/12, todos los años", () => {
        const cal = new Calendario()
        const franco = new DiaMes(25, 12)

        cal.nuevoFranco(franco)

        expect(cal.esFranco(new FechaExacta(25, 12, 2030))).toBe(true)
    })
    test("Marcos tiene libre el dia 20/11/2024", () => {
        const cal = new Calendario()
        const franco = new FechaExacta(20, 11, 2024)

        cal.nuevoFranco(franco)

        expect(cal.esFranco(new FechaExacta(20, 11, 2024))).toBe(true)
        expect(cal.esFranco(new FechaExacta(20, 11, 2030))).toBe(false)//no es el mismo año
    })
    test("Marcos tiene libre todos lunes", () => {
        const cal = new Calendario()
        const franco = new FechaSemanal("lunes")

        cal.nuevoFranco(franco)

        expect(cal.esFranco(new FechaExacta(4, 11, 2024))).toBe(true)//es un lunes
        expect(cal.esFranco(new FechaExacta(5, 11, 2024))).toBe(false)//es un martes
    })
    test("Marcos tiene libre todos martes de 2024", () => {
        const cal = new Calendario()
        const franco = new FechaSemanalAnio("martes", 2024)

        cal.nuevoFranco(franco)

        expect(cal.esFranco(new FechaExacta(5, 11, 2024))).toBe(true)//martes de 2024
        expect(cal.esFranco(new FechaExacta(4, 11, 2024))).toBe(false)//lunes de 2024
    })
    test("Marcos tiene libre todo el mes de marzo y abril del año 2024", () => {
        const cal = new Calendario()
        const marzo = new MesAnio(3, 2025)
        const abril = new MesAnio(4, 2025)

        cal.nuevoFranco(marzo)
        cal.nuevoFranco(abril)

        expect(cal.esFranco(new FechaExacta(10, 3, 2025))).toBe(true)
        expect(cal.esFranco(new FechaExacta(5, 4, 2025))).toBe(true)
        expect(cal.esFranco(new FechaExacta(5, 3, 2030))).toBe(false)
    })

    test("Paula tiene franco todos los 6 del 2025", () => {
        const cal = new Calendario()
        const franco = new DiaAnio(6, 2025)

        cal.nuevoFranco(franco)

        expect(cal.esFranco(new FechaExacta(6, 3, 2025))).toBe(true)
        expect(cal.esFranco(new FechaExacta(6, 6, 2025))).toBe(true)
        expect(cal.esFranco(new FechaExacta(5, 3, 2025))).toBe(false)
        expect(cal.esFranco(new FechaExacta(6, 3, 2026))).toBe(false)
    })

    test("Federico tiene franco todos los sabados de marzo de todos los anios", () => {
        const cal = new Calendario()
        const franco = new FechaSemanalMes("sabado", 3)

        cal.nuevoFranco(franco)

        //sabado de marzo
        expect(cal.esFranco(new FechaExacta(2, 3, 2024))).toBe(true)
        expect(cal.esFranco(new FechaExacta(9, 3, 2024))).toBe(true)
        expect(cal.esFranco(new FechaExacta(8, 3, 2025))).toBe(true)
        //sabado de noviembre
        expect(cal.esFranco(new FechaExacta(2, 11, 2024))).toBe(false)
    })
})