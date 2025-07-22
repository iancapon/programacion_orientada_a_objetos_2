const Sistema = require("../src/Sistema")
const Cliente = require("../src/Cliente")
const { Paquete } = require("../src/Paquete")

test("001 Sistema se crea con una fecha inicial, los clientes tienen esa misma fecha.", () => {
    const fecha = new Date("2025-07-18T12:00:00")
    const cliente = new Cliente(nombre = "ian", linea = 12345678)
    const sistema = new Sistema(fecha, [cliente], [])

    expect(sistema.encontrarCliente(cliente).fechaActual()).toEqual(new Date("2025-07-18T12:00:00"))
})

test("002 Un cliente hace un cambio, solo el tiene una fecha diferente.", () => {
    const ian = new Cliente(nombre = "ian", linea = 12345678)
    const nico = new Cliente(nombre = "nico", linea = 98765432)
    const paquete = new Paquete("Paquete Basico", costo = 1000, datos = 1000, minutos = 1000, duracion = 30)
    const sistema = new Sistema(new Date("2025-07-18T12:00:00"), [ian, nico], [paquete])

    fecha = new Date("2025-07-22T12:00:00")
    sistema.clienteCargaDineroEnCuenta(ian, dinero = 1000, fecha)
    sistema.clienteCompraPaquete(ian, paquete, fecha)

    expect(sistema.encontrarCliente(ian).fechaActual()).toEqual(new Date("2025-07-22T12:00:00"))
    expect(sistema.encontrarCliente(nico).fechaActual()).toEqual(new Date("2025-07-18T12:00:00"))
})

test("003 Se intenta hacer una operacion con una fecha previa a la actual, no es posible", () => {
    const ian = new Cliente(nombre = "ian", linea = 12345678)
    const sistema = new Sistema(new Date("2025-07-18T12:00:00"), [ian], [])

    fecha = new Date("2025-07-15T12:00:00")
    expect(() => sistema.clienteCargaDineroEnCuenta(ian, dinero = 1000, fecha)).toThrow(new Error("Fecha introducida no puede ser previa a la fecha actual"))

})

test("004 La fecha que tiene el cliente y el paquete que ha adquirido es la misma", () => {
    const ian = new Cliente(nombre = "ian", linea = 12345678)
    const paquete = new Paquete("Paquete Basico", costo = 1000, datos = 1000, minutos = 1000, duracion = 30)
    const sistema = new Sistema(new Date("2025-07-18T12:00:00"), [ian], [paquete])

    fecha = new Date("2025-07-22T12:00:00")
    sistema.clienteCargaDineroEnCuenta(ian, dinero = 1000, fecha)
    sistema.clienteCompraPaquete(ian, paquete, fecha)

    expect(sistema.encontrarCliente(ian).fechaActual()).toEqual(new Date("2025-07-22T12:00:00"))
    expect(sistema.clienteQuiereSaberCuantoLeQuedaDisponible(ian, fecha)).toEqual({
        "Dias hasta que venza: ": 30,
        "Fecha de compra: ": "Tue, 22 Jul 2025 15:00:00 GMT",
        "GB disponibles: ": 1000,
        "minutos disponibles: ": 1000
    })
})