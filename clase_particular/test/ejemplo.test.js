const Calendario = require("../src/Calendario")
const fechaDiaSemana = require("../src/fechaDiaDeSemana")
const fechaExacta = require("../src/fechaExacta")
const fechaRepetidaAnualmente = require("../src/fechaRepetidaAnualmente")
const fechaDiaDeSemana = require("../src/fechaDiaDeSemana")


test("Añadir fecha puntual al calendario de un empleado",()=>{
    const calendario = new Calendario()
    const franco = new fechaExacta(25,12,2024)

    calendario.aniadirFechaAlCalendario(franco)

    expect(calendario.esFranco(new fechaExacta(25,12,2024))).toBe(true)
})

test("Añadir fecha puntual al calendario de un empleado, no es una fecha",()=>{
    const calendario = new Calendario()
    const franco = new fechaExacta(25,12,2024)

    calendario.aniadirFechaAlCalendario(franco)

    expect(calendario.esFranco(new fechaExacta(10,3,2030))).toBe(false)
})

test("Añadir una fecha repetida todos los años.",()=>{
    const calendario = new Calendario()
    const franco = new fechaRepetidaAnualmente(25,12)

    calendario.aniadirFechaAlCalendario(franco)

    expect(calendario.esFranco(new fechaExacta(25,12,2024))).toBe(true)
})

test("Añadir un dia de semana al calendario",()=>{
    const calendario = new Calendario()
    const franco = new fechaDiaSemana("martes")

    calendario.aniadirFechaAlCalendario(franco)

    expect(calendario.esFranco(new fechaExacta(12,11,2024))).toBe(true)
})