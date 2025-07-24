const Sistema = require("../src/Sistema")
const Cliente = require("../src/Cliente")
const { Paquete } = require("../src/Paquete")

describe("Creacion del sistema", () => {
    test("001 Sistema no tiene el cliente registrado", () => {
        const fecha = new Date("2025-07-18T12:00:00")
        const sistema = new Sistema(fecha, [], [])
        const cliente = new Cliente(nombre = "ian", linea = 12345678)

        expect(() => (sistema.encontrarCliente(cliente))).toThrow(new Error("El cliente no se encuentra en el sistema."))
    })

    test("002 Sistema se crea con clientes registrados", () => {
        const fecha = new Date("2025-07-18T12:00:00")
        const cliente = new Cliente(nombre = "ian", linea = 12345678)
        const sistema = new Sistema(fecha, [cliente], [])

        const resultado = sistema.encontrarCliente(cliente)

        expect(resultado.soyElMismoCliente(cliente)).toBe(true)
    })

    test("003 Sistema no tiene registrado el paquete", () => {
        const paquete = new Paquete("Paquete Basico", costo = 1000, datos = 1000, minutos = 1000, duracion = 30, [])
        const fecha = new Date("2025-07-18T12:00:00")
        const sistema = new Sistema(fecha, [], [])

        expect(() => (sistema.encontrarPaquete(paquete))).toThrow(new Error("El paquete no se encuentra en el sistema."))
    })

    test("004 Sistema se crea con paquetes registrados", () => {
        const paquete = new Paquete("Paquete Basico", costo = 1000, datos = 1000, minutos = 1000, duracion = 30, [])
        const fecha = new Date("2025-07-18T12:00:00")
        const sistema = new Sistema(fecha, [], [paquete])

        const resultado = sistema.encontrarPaquete(paquete)
        expect(resultado.soyElMismoPaquete(paquete)).toBe(true)
    })
})
