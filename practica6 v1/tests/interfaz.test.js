const { describe } = require("node:test")
const Empleados = require("../src/Empleados")
const { crearFecha } = require("../src/crearFecha")
describe("Registro de empleados y sus francos", () => {
    test("Añado fecha de franco para Marcos, es una fecha del tipo : 'Mes entero de un año especifico' ", () => {
        const baseDeDatos = new Empleados()

        baseDeDatos.nuevoEmpleado("Marcos")

        expect(baseDeDatos.nuevoFranco("Marcos", crearFecha(undefined, "abril", 2025))).toEqual("Mes entero de un año especifico")
    })

    test("Busco fechas en las que Marcos va a tener franco", () => {
        const baseDeDatos = new Empleados()

        baseDeDatos.nuevoEmpleado("Marcos")

        baseDeDatos.nuevoFranco("Marcos", crearFecha(25, "diciembre"))
        baseDeDatos.nuevoFranco("Marcos", crearFecha(20, 11, 2024))
        baseDeDatos.nuevoFranco("Marcos", crearFecha("lunes"))
        baseDeDatos.nuevoFranco("Marcos", crearFecha("martes", undefined, 2024))
        baseDeDatos.nuevoFranco("Marcos", crearFecha(undefined, "marzo", 2025))
        baseDeDatos.nuevoFranco("Marcos", crearFecha(undefined, "abril", 2025))

        expect(baseDeDatos.esFranco("Marcos", crearFecha(25, 12, 2020))).toEqual("Es franco") //navidad
        expect(baseDeDatos.esFranco("Marcos", crearFecha("20", "11", "2024"))).toEqual("Es franco") //feriado nacional
        expect(baseDeDatos.esFranco("Marcos", crearFecha(28, 10, 2024))).toEqual("Es franco") // es lunes
        expect(baseDeDatos.esFranco("Marcos", crearFecha(29, 10, 2024))).toEqual("Es franco") // martes de 2024
        expect(baseDeDatos.esFranco("Marcos", crearFecha(1, "marzo", 2025))).toEqual("Es franco")//marzo de 2025
        expect(baseDeDatos.esFranco("Marcos", crearFecha(1, "abril", "2025"))).toEqual("Es franco")//abril de 2025
    })

    test("Busco fechas en las que Marcos no va a tener franco", () => {
        const baseDeDatos = new Empleados()

        baseDeDatos.nuevoEmpleado("Marcos")

        baseDeDatos.nuevoFranco("Marcos", crearFecha(25, "diciembre"))
        baseDeDatos.nuevoFranco("Marcos", crearFecha(20, 11, 2024))
        baseDeDatos.nuevoFranco("Marcos", crearFecha("lunes"))
        baseDeDatos.nuevoFranco("Marcos", crearFecha("martes", undefined, 2024))
        baseDeDatos.nuevoFranco("Marcos", crearFecha(undefined, "marzo", 2025))
        baseDeDatos.nuevoFranco("Marcos", crearFecha(undefined, "abril", 2025))

        expect(baseDeDatos.esFranco("Marcos", crearFecha(26, 12, 2020))).toEqual("No es franco")
        expect(baseDeDatos.esFranco("Marcos", crearFecha("19", "11", "2026"))).toEqual("No es franco")
        expect(baseDeDatos.esFranco("Marcos", crearFecha(30, 10, 2024))).toEqual("No es franco")
        expect(baseDeDatos.esFranco("Marcos", crearFecha(29, 10, 2025))).toEqual("No es franco")
        expect(baseDeDatos.esFranco("Marcos", crearFecha(1, "mayo", 2025))).toEqual("No es franco")
        expect(baseDeDatos.esFranco("Marcos", crearFecha(1, "junio", "2025"))).toEqual("No es franco")
    })

    test("Busco fechas en las que Paula va a tener franco", () => {
        const baseDeDatos = new Empleados()

        baseDeDatos.nuevoEmpleado("Paula")

        baseDeDatos.nuevoFranco("Paula", crearFecha("25", "mayo"))
        baseDeDatos.nuevoFranco("Paula", crearFecha("01", "enero"))
        baseDeDatos.nuevoFranco("Paula", crearFecha("25", "diciembre"))
        baseDeDatos.nuevoFranco("Paula", crearFecha("09", "02"))
        baseDeDatos.nuevoFranco("Paula", crearFecha("sabado"))
        baseDeDatos.nuevoFranco("Paula", crearFecha("domingo"))
        baseDeDatos.nuevoFranco("Paula", crearFecha(6, undefined, "2025"))

        expect(baseDeDatos.esFranco("Paula", crearFecha(25, 5, 2013))).toEqual("Es franco") // 25 de mayo
        expect(baseDeDatos.esFranco("Paula", crearFecha(6, "febrero", 2025))).toEqual("Es franco") // un dia 6 en el año 2025
        expect(baseDeDatos.esFranco("Paula", crearFecha(6, "marzo", 2025))).toEqual("Es franco") // un dia 6 en el año 2025
    })

    test("Busco fechas en las que Paula NO va a tener franco", () => {
        const baseDeDatos = new Empleados()

        baseDeDatos.nuevoEmpleado("Paula")

        baseDeDatos.nuevoFranco("Paula", crearFecha("25", "mayo"))
        baseDeDatos.nuevoFranco("Paula", crearFecha("01", "enero"))
        baseDeDatos.nuevoFranco("Paula", crearFecha("25", "diciembre"))
        baseDeDatos.nuevoFranco("Paula", crearFecha("09", "02"))
        baseDeDatos.nuevoFranco("Paula", crearFecha("sabado"))
        baseDeDatos.nuevoFranco("Paula", crearFecha("domingo"))
        baseDeDatos.nuevoFranco("Paula", crearFecha(6, undefined, "2025"))

        expect(baseDeDatos.esFranco("Paula", crearFecha(27, 5, 2013))).toEqual("No es franco") // 27 de mayo
        expect(baseDeDatos.esFranco("Paula", crearFecha(6, "febrero", 2026))).toEqual("No es franco") // un dia 6 en el año 2026
        expect(baseDeDatos.esFranco("Paula", crearFecha(6, "marzo", 2026))).toEqual("No es franco") // un dia 6 en el año 2026
    })

    describe("GENERAR UNA LISTA DE FRANCOS DE TODOS LOS EMPLEADOS", () => {
        const baseDeDatos = new Empleados()

        baseDeDatos.nuevoEmpleado("Marcos")
        baseDeDatos.nuevoEmpleado("Paula")

        baseDeDatos.nuevoFranco("Marcos", crearFecha(25, "diciembre"))
        baseDeDatos.nuevoFranco("Marcos", crearFecha(20, 11, 2024))
        baseDeDatos.nuevoFranco("Marcos", crearFecha("lunes"))
        baseDeDatos.nuevoFranco("Marcos", crearFecha("martes", undefined, 2024))
        baseDeDatos.nuevoFranco("Marcos", crearFecha(undefined, "marzo", 2025))
        baseDeDatos.nuevoFranco("Marcos", crearFecha(undefined, "abril", 2025))

        baseDeDatos.nuevoFranco("Paula", crearFecha("25", "mayo"))
        baseDeDatos.nuevoFranco("Paula", crearFecha("01", "enero"))
        baseDeDatos.nuevoFranco("Paula", crearFecha("25", "diciembre"))
        baseDeDatos.nuevoFranco("Paula", crearFecha("09", "02"))
        baseDeDatos.nuevoFranco("Paula", crearFecha("sabado"))
        baseDeDatos.nuevoFranco("Paula", crearFecha("domingo"))
        baseDeDatos.nuevoFranco("Paula", crearFecha(6, undefined, "2025"))

        baseDeDatos.listaDeFrancos()

    })

    test("Busco fecha en la que paula tiene franco, pero no está registrada como empleada aun", () => {
        const baseDeDatos = new Empleados()

        expect(() => baseDeDatos.esFranco("Paula", crearFecha("25", "mayo"))).toThrow("Empleado invalido")
    })

    test("Busco añadir franco para paula, pero no está registrada como empleada aun", () => {
        const baseDeDatos = new Empleados()

        expect(() => baseDeDatos.nuevoFranco("Paula", crearFecha("25", "mayo"))).toThrow("Empleado invalido")
    })

})