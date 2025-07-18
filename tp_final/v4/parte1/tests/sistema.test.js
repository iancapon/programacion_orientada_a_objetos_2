const Sistema = require("../src/Sistema")
const Cliente = require("../src/Cliente")
const Paquete = require("../src/Paquete")
const {ConsumoDatos, ConsumoMinutos} = require("../src/Consumo")

test("001 El cliente intenta acceder a sus datos sistema pero no está registrado", () => {
    const fecha = new Date("2025-07-18T12:00:00")
    const sistema = new Sistema(fecha)
    const cliente = new Cliente(nombre = "ian", linea = 12345678)

    expect(() => (sistema.encontrarCliente(cliente))).toThrow(new Error("El cliente no se encuentra en el sistema."))
})

test("002 El sistema se crea con clientes registrados", () => {
    const fecha = new Date("2025-07-18T12:00:00")
    const cliente = new Cliente(nombre = "ian", linea = 12345678)
    const sistema = new Sistema(fecha, [cliente], [])

    const resultado = sistema.encontrarCliente(cliente)

    expect(resultado.soyElMismoCliente(cliente)).toBe(true)
})

test("003 El sistema no tiene registrado el paquete", () => {
    const paquete = new Paquete("Paquete Basico")
    const fecha = new Date("2025-07-18T12:00:00")
    const sistema = new Sistema(fecha, [], [])

    expect(() => (sistema.encontrarPaquete(paquete))).toThrow(new Error("El paquete no se encuentra en el sistema."))
})

test("004 El sistema se crea con paquetes registrados", () => {
    const paquete = new Paquete("Paquete Basico")
    const fecha = new Date("2025-07-18T12:00:00")
    const sistema = new Sistema(fecha, [], [paquete])

    const resultado = sistema.encontrarPaquete(paquete)
    expect(resultado.soyElMismoPaquete(paquete)).toBe(true)
})

test("005 Un cliente busca comprar un paquete, pero no tiene dinero suficiente", () => {
    const cliente = new Cliente(nombre = "ian", linea = 12345678)
    const paquete = new Paquete("Paquete Basico", costo = 1000, datos = 1000, minutos = 1000, duracion = 30)
    const fecha = new Date("2025-07-18T12:00:00")
    const sistema = new Sistema(fecha, [cliente], [paquete])


    expect(() => sistema.clienteCompraPaquete(cliente, paquete, fecha)).toThrow(new Error("Cliente no tiene saldo suficiente."))

})

test("006 Cliente carga dinero en cuenta y compra paquete", () => {
    const cliente = new Cliente(nombre = "ian", linea = 12345678)
    const paquete = new Paquete("Paquete Basico", costo = 1000, datos = 1000, minutos = 1000, duracion = 30)
    const fecha = new Date("2025-07-18T12:00:00");
    const sistema = new Sistema(fecha, [cliente], [paquete])

    sistema.clienteCargaDineroEnCuenta(cliente, dinero = 1000, fecha)

    let resultado = sistema.clienteCompraPaquete(cliente, paquete, fecha)
    expect(resultado.soyElMismoPaquete(paquete)).toBe(true)

})

test("007 Cliente quiere saber cuanto le queda disponible", () => {
    const cliente = new Cliente(nombre = "ian", linea = 12345678)
    const paquete = new Paquete("Paquete Basico", costo = 1000, datos = 1000, minutos = 1000, duracion = 30)
    const fecha = new Date("2025-07-18T12:00:00");
    const sistema = new Sistema(fecha, [cliente], [paquete])

    sistema.clienteCargaDineroEnCuenta(cliente, dinero = 1000, fecha)
    sistema.clienteCompraPaquete(cliente, paquete, fecha)

    expect(sistema.clienteQuiereSaberCuantoLeQuedaDisponible(cliente, new Date("2025-07-20T12:00:00"))).toEqual({
        "Dias hasta que venza: ": 28,
        "Fecha de compra: ": "Fri, 18 Jul 2025 15:00:00 GMT",
        "GB disponibles: ": 1000,
        "minutos disponibles: ": 1000
    })
})

test("008 Consumo de internet no se efectua por no tener suficiente saldo de datos", () => {
    const fecha = new Date("2025-07-18T12:00:00");
    const cliente = new Cliente(nombre = "ian", linea = 12345678)
    const paquete = new Paquete("Paquete Basico", costo = 1000, datos = 1000, minutos = 1000, duracion = 30)
    const sistema = new Sistema(fecha, [cliente], [paquete])    
    const consumo = new ConsumoDatos(datos = 2000, inicio = new Date("2025-07-18T13:00:00"), fin = new Date("2025-07-18T14:00:00"))

    sistema.clienteCargaDineroEnCuenta(cliente, dinero = 1000, fecha)
    sistema.clienteCompraPaquete(cliente, paquete, fecha)

    expect(() => sistema.clienteConsume(cliente, consumo)).toThrow("Cliente no puede consumir datos que no tiene.")
})

test("009 Consumo de minutos de llamada no se efectua por no tener suficiente saldo de minutos", () => {
    const fecha = new Date("2025-07-18T12:00:00");
    const cliente = new Cliente(nombre = "ian", linea = 12345678)
    const paquete = new Paquete("Paquete Basico", costo = 1000, datos = 1000, minutos = 1000, duracion = 30)
    const sistema = new Sistema(fecha, [cliente], [paquete])    
    const consumo = new ConsumoMinutos(minutos = 2000, inicio = new Date("2025-07-18T13:00:00"), fin = new Date("2025-07-18T14:00:00"))

    sistema.clienteCargaDineroEnCuenta(cliente, dinero = 1000, fecha)
    sistema.clienteCompraPaquete(cliente, paquete, fecha)

    expect(() => sistema.clienteConsume(cliente, consumo)).toThrow("Cliente no puede consumir minutos que no tiene.")
})

test("010 Consumo de internet", () => {
    const fecha = new Date("2025-07-18T12:00:00");
    const cliente = new Cliente(nombre = "ian", linea = 12345678)
    const paquete = new Paquete("Paquete Basico", costo = 1000, datos = 1000, minutos = 1000, duracion = 30)
    const sistema = new Sistema(fecha, [cliente], [paquete])    
    const consumo = new ConsumoDatos(datos = 400, inicio = new Date("2025-07-18T13:00:00"), fin = new Date("2025-07-18T14:00:00"))

    sistema.clienteCargaDineroEnCuenta(cliente, dinero = 1000, fecha)
    sistema.clienteCompraPaquete(cliente, paquete, fecha)
    sistema.clienteConsume(cliente, consumo)

    expect(sistema.clienteQuiereSaberCuantoLeQuedaDisponible(cliente, new Date("2025-07-20T12:00:00"))).toEqual({
        "Dias hasta que venza: ": 28,
        "Fecha de compra: ": "Fri, 18 Jul 2025 15:00:00 GMT",
        "GB disponibles: ": 600,
        "minutos disponibles: ": 1000
    })
})

test("011 Consumo de internet", () => {
    const fecha = new Date("2025-07-18T12:00:00");
    const cliente = new Cliente(nombre = "ian", linea = 12345678)
    const paquete = new Paquete("Paquete Basico", costo = 1000, datos = 1000, minutos = 1000, duracion = 30)
    const sistema = new Sistema(fecha, [cliente], [paquete])    
    const consumo = new ConsumoMinutos(datos = 800, inicio = new Date("2025-07-18T13:00:00"), fin = new Date("2025-07-18T14:00:00"))

    sistema.clienteCargaDineroEnCuenta(cliente, dinero = 1000, fecha)
    sistema.clienteCompraPaquete(cliente, paquete, fecha)
    sistema.clienteConsume(cliente, consumo)

    expect(sistema.clienteQuiereSaberCuantoLeQuedaDisponible(cliente, new Date("2025-07-20T12:00:00"))).toEqual({
        "Dias hasta que venza: ": 28,
        "Fecha de compra: ": "Fri, 18 Jul 2025 15:00:00 GMT",
        "GB disponibles: ": 1000,
        "minutos disponibles: ": 200
    })
})