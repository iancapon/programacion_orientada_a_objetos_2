const Sistema = require("../src/Sistema")
const Cliente = require("../src/Cliente")
const { Paquete, PaqueteNulo, PaqueteActivo } = require("../src/Paquete")
const { ConsumoDatos, ConsumoMinutos } = require("../src/Consumo")

test("001 Cliente quiere saber cuanto le queda disponible de dias, y para consumir.", () => {
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

test("002 Consumo de internet no se efectua por no tener suficiente saldo de datos", () => {
    const fecha = new Date("2025-07-18T12:00:00");
    const cliente = new Cliente(nombre = "ian", linea = 12345678)
    const paquete = new Paquete("Paquete Basico", costo = 1000, datos = 1000, minutos = 1000, duracion = 30)
    const sistema = new Sistema(fecha, [cliente], [paquete])
    const consumo = new ConsumoDatos(datos = 2000, inicio = new Date("2025-07-18T13:00:00"), fin = new Date("2025-07-18T14:00:00"))

    sistema.clienteCargaDineroEnCuenta(cliente, dinero = 1000, fecha)
    sistema.clienteCompraPaquete(cliente, paquete, fecha)

    expect(() => sistema.clienteConsume(cliente, consumo)).toThrow("Cliente no puede consumir datos que no tiene.")
})

test("003 Consumo de minutos de llamada no se efectua por no tener suficiente saldo de minutos", () => {
    const fecha = new Date("2025-07-18T12:00:00");
    const cliente = new Cliente(nombre = "ian", linea = 12345678)
    const paquete = new Paquete("Paquete Basico", costo = 1000, datos = 1000, minutos = 1000, duracion = 30)
    const sistema = new Sistema(fecha, [cliente], [paquete])
    const consumo = new ConsumoMinutos(minutos = 2000, inicio = new Date("2025-07-18T13:00:00"), fin = new Date("2025-07-18T14:00:00"))

    sistema.clienteCargaDineroEnCuenta(cliente, dinero = 1000, fecha)
    sistema.clienteCompraPaquete(cliente, paquete, fecha)

    expect(() => sistema.clienteConsume(cliente, consumo)).toThrow("Cliente no puede consumir minutos que no tiene.")
})

test("004 Consumo de internet", () => {
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

test("005 Consumo de minutos de llamada", () => {
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

test("006 Sistema guarda los consumos de los clientes ordenados por fecha", () => {
    const fecha = new Date("2025-07-18T12:00:00");
    const ian = new Cliente(nombre = "ian", linea = 12345678)
    const nico = new Cliente(nombre = "nico", linea = 98765432)
    const paquete = new Paquete("Paquete Basico", costo = 1000, datos = 1000, minutos = 1000, duracion = 30)
    const sistema = new Sistema(fecha, [ian, nico], [paquete])

    sistema.clienteCargaDineroEnCuenta(ian, dinero = 1000, fecha)
    sistema.clienteCompraPaquete(ian, paquete, fecha)
    sistema.clienteCargaDineroEnCuenta(nico, dinero = 1000, fecha)
    sistema.clienteCompraPaquete(nico, paquete, fecha)

    consumos = [
        new ConsumoMinutos(minutos = 80, inicio = new Date("2025-07-18T13:00:00"), fin = new Date("2025-07-18T14:00:00")),
        new ConsumoMinutos(minutos = 30, inicio = new Date("2025-07-19T13:00:00"), fin = new Date("2025-07-19T14:00:00")),
        new ConsumoDatos(datos = 50, inicio = new Date("2025-07-20T13:00:00"), fin = new Date("2025-07-20T14:00:00")),
        new ConsumoDatos(datos = 40, inicio = new Date("2025-07-21T13:00:00"), fin = new Date("2025-07-21T14:00:00")),
        new ConsumoMinutos(minutos = 90, inicio = new Date("2025-07-22T13:00:00"), fin = new Date("2025-07-22T14:00:00")),
        new ConsumoMinutos(minutos = 100, inicio = new Date("2025-07-23T13:00:00"), fin = new Date("2025-07-23T14:00:00"))
    ]

    sistema.clienteConsume(ian,consumos[0])
    sistema.clienteConsume(nico,consumos[1])
    sistema.clienteConsume(ian,consumos[2])
    sistema.clienteConsume(nico,consumos[3])
    sistema.clienteConsume(ian,consumos[4])
    sistema.clienteConsume(nico,consumos[5])

    expect(sistema.consumosDe(ian, new Date("2025-07-25T14:00:00"))).toEqual([
        {"minutos": 80, "inicio": "Fri, 18 Jul 2025 16:00:00 GMT", "fin":"Fri, 18 Jul 2025 17:00:00 GMT"},
        {"datos": 50, "inicio": "Sun, 20 Jul 2025 16:00:00 GMT", "fin":"Sun, 20 Jul 2025 17:00:00 GMT"},
        {"minutos": 90, "inicio": "Tue, 22 Jul 2025 16:00:00 GMT", "fin":"Tue, 22 Jul 2025 17:00:00 GMT"},
    ])

    expect(sistema.consumosDe(nico, new Date("2025-07-25T14:00:00"))).toEqual([
        {"minutos": 30, "inicio": "Sat, 19 Jul 2025 16:00:00 GMT", "fin":"Sat, 19 Jul 2025 17:00:00 GMT"},
        {"datos": 40, "inicio": "Mon, 21 Jul 2025 16:00:00 GMT", "fin":"Mon, 21 Jul 2025 17:00:00 GMT"},
        {"minutos": 100, "inicio": "Wed, 23 Jul 2025 16:00:00 GMT", "fin":"Wed, 23 Jul 2025 17:00:00 GMT"},
    ])
})

