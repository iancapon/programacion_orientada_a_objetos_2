const Sistema = require("../src/Sistema")
const Cliente = require("../src/Cliente")
const { Paquete, PaqueteNulo , PaqueteActivo} = require("../src/Paquete")
const { ConsumoDatos, ConsumoMinutos } = require("../src/Consumo")

test("001 Cliente intenta acceder a sus datos en el sistema pero no está registrado", () => {
    const fecha = new Date("2025-07-18T12:00:00")
    const sistema = new Sistema(fecha)
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
    const paquete = new Paquete("Paquete Basico", costo = 1000, datos = 1000, minutos = 1000, duracion = 30)
    const fecha = new Date("2025-07-18T12:00:00")
    const sistema = new Sistema(fecha, [], [])

    expect(() => (sistema.encontrarPaquete(paquete))).toThrow(new Error("El paquete no se encuentra en el sistema."))
})

test("004 Sistema se crea con paquetes registrados", () => {
    const paquete = new Paquete("Paquete Basico", costo = 1000, datos = 1000, minutos = 1000, duracion = 30)
    const fecha = new Date("2025-07-18T12:00:00")
    const sistema = new Sistema(fecha, [], [paquete])

    const resultado = sistema.encontrarPaquete(paquete)
    expect(resultado.soyElMismoPaquete(paquete)).toBe(true)
})

test("005 Cliente busca comprar un paquete, pero no tiene dinero suficiente", () => {
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

test("007 Cliente intenta comprar otro paquete antes de que venza o agote el actual, no puede", () => {
    const fecha = new Date("2025-07-18T12:00:00");
    const cliente = new Cliente(nombre = "ian", linea = 12345678)
    const paquete = new Paquete("Paquete Basico", costo = 1000, datos = 1000, minutos = 1000, duracion = 30)
    const sistema = new Sistema(fecha, [cliente], [paquete])

    sistema.clienteCargaDineroEnCuenta(cliente, 2000, fecha)
    sistema.clienteCompraPaquete(cliente, paquete, fecha)

    expect(() => sistema.clienteCompraPaquete(cliente, paquete, fecha)).toThrow(new Error("No se puede comprar un paquete hasta que este vencido o agotado"))
})

test("008 Cliente ha agotado el paquete actual, puede comprar otro...", () => {
    const fecha = new Date("2025-07-18T12:00:00");
    const cliente = new Cliente(nombre = "ian", linea = 12345678)
    const paquete = new Paquete("Paquete Basico", costo = 1000, datos = 1000, minutos = 1000, duracion = 30)
    const sistema = new Sistema(fecha, [cliente], [paquete])
    const consumo = new ConsumoDatos(datos = 1000, inicio = new Date("2025-07-18T13:00:00"), fin = new Date("2025-07-18T14:00:00"))

    sistema.clienteCargaDineroEnCuenta(cliente, 2000, fecha)
    sistema.clienteCompraPaquete(cliente, paquete, fecha)
    sistema.clienteConsume(cliente, consumo)

    expect(sistema.clienteQuiereSaberCuantoLeQuedaDisponible(cliente, new Date("2025-07-20T12:00:00"))).toEqual({
        "Dias hasta que venza: ": 28,
        "Fecha de compra: ": "Fri, 18 Jul 2025 15:00:00 GMT",
        "GB disponibles: ": 0,
        "minutos disponibles: ": 1000
    })

    sistema.clienteCompraPaquete(cliente, paquete, new Date("2025-07-21T12:00:00"))

    expect(sistema.clienteQuiereSaberCuantoLeQuedaDisponible(cliente, new Date("2025-07-21T12:00:00"))).toEqual({
        "Dias hasta que venza: ": 30,
        "Fecha de compra: ": "Mon, 21 Jul 2025 15:00:00 GMT",
        "GB disponibles: ": 1000,
        "minutos disponibles: ": 1000
    })

})

test("009 Cliente setea paquete para auto renovarse en la proxima entrada, si ha vencido, y tiene dinero en cuenta.", () => {
    const fecha1 = new Date("2025-07-18T12:00:00");
    const cliente = new Cliente(nombre = "ian", linea = 12345678)
    const paquete = new Paquete("Paquete Basico", costo = 1000, datos = 1000, minutos = 1000, duracion = 30)
    const sistema = new Sistema(fecha1, [cliente], [paquete])

    sistema.activarRenovacionAutomaticaParaCliente(cliente)
    sistema.clienteCargaDineroEnCuenta(cliente, 2000, fecha1)
    sistema.clienteCompraPaquete(cliente, paquete, fecha1)

    expect(sistema.clienteQuiereSaberCuantoLeQuedaDisponible(cliente, new Date("2025-08-16T12:00:00"))).toEqual({
        "Dias hasta que venza: ": 1,
        "Fecha de compra: ": "Fri, 18 Jul 2025 15:00:00 GMT",
        "GB disponibles: ": 1000,
        "minutos disponibles: ": 1000
    })
    expect(sistema.clienteQuiereSaberCuantoLeQuedaDisponible(cliente, new Date("2025-08-17T12:00:00"))).toEqual({
        "Dias hasta que venza: ": 30,
        "Fecha de compra: ": "Sun, 17 Aug 2025 15:00:00 GMT",
        "GB disponibles: ": 1000,
        "minutos disponibles: ": 1000
    })
})