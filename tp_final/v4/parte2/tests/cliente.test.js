const Sistema = require("../src/Sistema")
const Cliente = require("../src/Cliente")
const { Paquete, PaqueteNulo, PaqueteActivo } = require("../src/Paquete")
const { ConsumoDatos, ConsumoMinutos, ConsumoApp } = require("../src/Consumo")

test("001 Cliente ian intenta prestar un datos y minutos a nico, pero nico aun tiene un plan vigente", () => {
    const fecha = new Date("2025-07-18T12:00:00");
    const ian = new Cliente(nombre = "ian", linea = 12345678)
    const nico = new Cliente(nombre = "nico", linea = 98765432)
    const paquete = new Paquete("Paquete Basico", costo = 1000, datos = 1000, minutos = 1000, duracion = 30, [])
    const sistema = new Sistema(fecha, [ian, nico], [paquete])

    sistema.clienteCargaDineroEnCuenta(ian, dinero = 1000, fecha)
    sistema.clienteCompraPaquete(ian, paquete, fecha)
    sistema.clienteCargaDineroEnCuenta(nico, dinero = 1000, fecha)
    sistema.clienteCompraPaquete(nico, paquete, fecha)

    expect(() => sistema.clientePrestaDatosAOtro(ian, nico, datos = 300, minutos = 300, fecha)).toThrow(new Error("No se puede renovar un paquete hasta que este vencido o agotado"))
})

test("002 Cliente ian intenta prestar datos y minutos a nico, pero no tiene suficientes datos para prestar", () => {
    const fecha = new Date("2025-07-18T12:00:00");
    const ian = new Cliente(nombre = "ian", linea = 12345678)
    const nico = new Cliente(nombre = "nico", linea = 98765432)
    const paquete = new Paquete("Paquete Basico", costo = 1000, datos = 1000, minutos = 1000, duracion = 30, [])
    const sistema = new Sistema(fecha, [ian, nico], [paquete])
    const consumoIan = new ConsumoDatos(datos = 800, inicio = fecha, fin = fecha)
    const consumoNico = new ConsumoDatos(datos = 1000, inicio = fecha, fin = fecha)

    sistema.clienteCargaDineroEnCuenta(ian, dinero = 1000, fecha)
    sistema.clienteCompraPaquete(ian, paquete, fecha)
    sistema.clienteCargaDineroEnCuenta(nico, dinero = 1000, fecha)
    sistema.clienteCompraPaquete(nico, paquete, fecha)

    sistema.clienteConsume(ian, consumoIan)
    sistema.clienteConsume(nico, consumoNico)

    expect(() => sistema.clientePrestaDatosAOtro(ian, nico, datos = 300, minutos = 300, fecha)).toThrow(new Error("No alcanzan los datos / minutos que se desean prestar"))
})

test("003 Cliente ian intenta prestar datos y minutos a nico, pero no tiene suficientes minutos para prestar", () => {
    const fecha = new Date("2025-07-18T12:00:00");
    const ian = new Cliente(nombre = "ian", linea = 12345678)
    const nico = new Cliente(nombre = "nico", linea = 98765432)
    const paquete = new Paquete("Paquete Basico", costo = 1000, datos = 1000, minutos = 1000, duracion = 30, [])
    const sistema = new Sistema(fecha, [ian, nico], [paquete])
    const consumoIan = new ConsumoMinutos(minutos = 800, inicio = fecha, fin = fecha)
    const consumoNico = new ConsumoDatos(datos = 1000, inicio = fecha, fin = fecha)

    sistema.clienteCargaDineroEnCuenta(ian, dinero = 1000, fecha)
    sistema.clienteCompraPaquete(ian, paquete, fecha)
    sistema.clienteCargaDineroEnCuenta(nico, dinero = 1000, fecha)
    sistema.clienteCompraPaquete(nico, paquete, fecha)

    sistema.clienteConsume(ian, consumoIan)
    sistema.clienteConsume(nico, consumoNico)

    expect(() => sistema.clientePrestaDatosAOtro(ian, nico, datos = 300, minutos = 300, fecha)).toThrow(new Error("No alcanzan los datos / minutos que se desean prestar"))
})

test("004 Cliente ian le presta datos y minutos a nico cuando agota el plan", () => {
    const fecha = new Date("2025-07-18T12:00:00");
    const ian = new Cliente(nombre = "ian", linea = 12345678)
    const nico = new Cliente(nombre = "nico", linea = 98765432)
    const paquete = new Paquete("Paquete Basico", costo = 1000, datos = 1000, minutos = 1000, duracion = 30, [])
    const sistema = new Sistema(fecha, [ian, nico], [paquete])

    const consumoNico = new ConsumoDatos(datos = 1000, inicio = fecha, fin = fecha)

    sistema.clienteCargaDineroEnCuenta(ian, dinero = 1000, fecha)
    sistema.clienteCompraPaquete(ian, paquete, fecha)
    sistema.clienteCargaDineroEnCuenta(nico, dinero = 1000, fecha)
    sistema.clienteCompraPaquete(nico, paquete, fecha)

    sistema.clienteConsume(nico, consumoNico)

    sistema.clientePrestaDatosAOtro(ian, nico, datos = 300, minutos = 300, fecha)

    expect(sistema.clienteQuiereSaberCuantoLeQuedaDisponible(ian, fecha)).toEqual({
        "Dias hasta que venza: ": 30,
        "Fecha de compra: ": "Fri, 18 Jul 2025 15:00:00 GMT",
        "GB disponibles: ": 700,
        "minutos disponibles: ": 700,
        "apps ilimitadas": []
    })

    expect(sistema.clienteQuiereSaberCuantoLeQuedaDisponible(nico, fecha)).toEqual({
        "Dias hasta que venza: ": 30,
        "Fecha de compra: ": "Fri, 18 Jul 2025 15:00:00 GMT",
        "GB disponibles: ": 300,
        "minutos disponibles: ": 1300,
        "apps ilimitadas": []
    })
})


test("005 Cliente ian le presta datos y minutos a nico cuando se le vence el plan", () => {
    const fecha = new Date("2025-07-18T12:00:00");
    const ian = new Cliente(nombre = "ian", linea = 12345678)
    const nico = new Cliente(nombre = "nico", linea = 98765432)
    const paquete = new Paquete("Paquete Basico", costo = 1000, datos = 1000, minutos = 1000, duracion = 30, [])
    const sistema = new Sistema(fecha, [ian, nico], [paquete])

    const consumoNico = new ConsumoDatos(datos = 1000, inicio = fecha, fin = fecha)

    sistema.clienteCargaDineroEnCuenta(ian, dinero = 1000, fecha)
    sistema.clienteCargaDineroEnCuenta(nico, dinero = 1000, fecha)
    sistema.clienteCompraPaquete(nico, paquete, fecha)
    sistema.clienteCompraPaquete(ian, paquete, new Date("2025-07-28T12:00:00"))

    expect(sistema.clienteQuiereSaberCuantoLeQuedaDisponible(ian, new Date("2025-08-18T12:00:00"))).toEqual({
        "Dias hasta que venza: ": 9,
        "Fecha de compra: ": "Mon, 28 Jul 2025 15:00:00 GMT",
        "GB disponibles: ": 1000,
        "minutos disponibles: ": 1000,
        "apps ilimitadas": []
    })

    expect(sistema.clienteQuiereSaberCuantoLeQuedaDisponible(nico, new Date("2025-08-18T12:00:00"))).toEqual({
        "Dias hasta que venza: ": -1,
        "Fecha de compra: ": "Fri, 18 Jul 2025 15:00:00 GMT",
        "GB disponibles: ": 1000,
        "minutos disponibles: ": 1000,
        "apps ilimitadas": []
    })

    sistema.clientePrestaDatosAOtro(ian, nico, datos = 300, minutos = 300, new Date("2025-08-18T12:00:00"))

    expect(sistema.clienteQuiereSaberCuantoLeQuedaDisponible(ian, new Date("2025-08-18T12:00:00"))).toEqual({
        "Dias hasta que venza: ": 9,
        "Fecha de compra: ": "Mon, 28 Jul 2025 15:00:00 GMT",
        "GB disponibles: ": 700,
        "minutos disponibles: ": 700,
        "apps ilimitadas": []
    })

    expect(sistema.clienteQuiereSaberCuantoLeQuedaDisponible(nico, new Date("2025-08-18T12:00:00"))).toEqual({
        "Dias hasta que venza: ": 9,
        "Fecha de compra: ": "Mon, 28 Jul 2025 15:00:00 GMT",
        "GB disponibles: ": 1300,
        "minutos disponibles: ": 1300,
        "apps ilimitadas": []
    })
})