const Sistema = require("../src/Sistema")
const Cliente = require("../src/Cliente")
const { Paquete } = require("../src/Paquete")
const { ConsumoDatos, ConsumoMinutos } = require("../src/Consumo")


describe("Cliente adquiere paquetes", () => {
    test("001 Cliente busca comprar un paquete, pero no tiene dinero suficiente", () => {
        const cliente = new Cliente(nombre = "ian", linea = 12345678)
        const paquete = new Paquete("Paquete Basico", costo = 1000, datos = 1000, minutos = 1000, duracion = 30, [])
        const fecha = new Date("2025-07-18T12:00:00")
        const sistema = new Sistema(fecha, [cliente], [paquete])


        expect(() => sistema.clienteCompraPaquete(cliente, paquete, fecha)).toThrow(new Error("Cliente no tiene saldo suficiente."))

    })

    test("002 Cliente carga dinero en cuenta y compra paquete", () => {
        const cliente = new Cliente(nombre = "ian", linea = 12345678)
        const paquete = new Paquete("Paquete Basico", costo = 1000, datos = 1000, minutos = 1000, duracion = 30, [])
        const fecha = new Date("2025-07-18T12:00:00");
        const sistema = new Sistema(fecha, [cliente], [paquete])

        sistema.clienteCargaDineroEnCuenta(cliente, dinero = 1000, fecha)

        const resultado = sistema.clienteCompraPaquete(cliente, paquete, fecha)
        expect(resultado.soyElMismoPaquete(paquete)).toBe(true)

    })

    test("003 Cliente intenta comprar otro paquete antes de que venza o agote el actual, no puede", () => {
        const fecha = new Date("2025-07-18T12:00:00");
        const cliente = new Cliente(nombre = "ian", linea = 12345678)
        const paquete = new Paquete("Paquete Basico", costo = 1000, datos = 1000, minutos = 1000, duracion = 30, [])
        const sistema = new Sistema(fecha, [cliente], [paquete])

        sistema.clienteCargaDineroEnCuenta(cliente, 2000, fecha)
        sistema.clienteCompraPaquete(cliente, paquete, fecha)

        expect(() => sistema.clienteCompraPaquete(cliente, paquete, fecha)).toThrow(new Error("No se puede renovar un paquete hasta que este vencido o agotado"))
    })

    test("004 Cliente ha agotado el paquete actual, puede comprar otro...", () => {
        const fecha = new Date("2025-07-18T12:00:00");
        const cliente = new Cliente(nombre = "ian", linea = 12345678)
        const paquete = new Paquete("Paquete Basico", costo = 1000, datos = 1000, minutos = 1000, duracion = 30, [])
        const sistema = new Sistema(fecha, [cliente], [paquete])
        const consumo = new ConsumoDatos(datos = 1000, inicio = new Date("2025-07-18T13:00:00"), fin = new Date("2025-07-18T14:00:00"))

        sistema.clienteCargaDineroEnCuenta(cliente, 2000, fecha)
        sistema.clienteCompraPaquete(cliente, paquete, fecha)
        sistema.clienteConsume(cliente, consumo)

        expect(sistema.clienteQuiereSaberCuantoLeQuedaDisponible(cliente, new Date("2025-07-20T12:00:00"))).toEqual({
            "Dias hasta que venza: ": 28,
            "Fecha de compra: ": new Date("2025-07-18T12:00:00"),
            "GB disponibles: ": 0,
            "minutos disponibles: ": 1000,
            "apps ilimitadas": []
        })

        sistema.clienteCompraPaquete(cliente, paquete, new Date("2025-07-21T12:00:00"))

        expect(sistema.clienteQuiereSaberCuantoLeQuedaDisponible(cliente, new Date("2025-07-21T12:00:00"))).toEqual({
            "Dias hasta que venza: ": 30,
            "Fecha de compra: ": new Date("2025-07-21T12:00:00"),
            "GB disponibles: ": 1000,
            "minutos disponibles: ": 1000,
            "apps ilimitadas": []
        })

    })

    test("005 Cliente setea paquete para auto renovarse en la proxima entrada, si ha vencido, y tiene dinero en cuenta.", () => {
        const fecha1 = new Date("2025-07-18T12:00:00");
        const cliente = new Cliente(nombre = "ian", linea = 12345678)
        const paquete = new Paquete("Paquete Basico", costo = 1000, datos = 1000, minutos = 1000, duracion = 30, [])
        const sistema = new Sistema(fecha1, [cliente], [paquete])

        sistema.activarRenovacionAutomaticaParaCliente(cliente)
        sistema.clienteCargaDineroEnCuenta(cliente, 2000, fecha1)
        sistema.clienteCompraPaquete(cliente, paquete, fecha1)
        sistema.clienteConsume(cliente, new ConsumoDatos(800, fecha1, fecha1))

        expect(sistema.clienteQuiereSaberCuantoLeQuedaDisponible(cliente, new Date("2025-08-16T12:00:00"))).toEqual({
            "Dias hasta que venza: ": 1,
            "Fecha de compra: ": new Date("2025-07-18T12:00:00"),
            "GB disponibles: ": 200,
            "minutos disponibles: ": 1000,
            "apps ilimitadas": []
        })
        expect(sistema.clienteQuiereSaberCuantoLeQuedaDisponible(cliente, new Date("2025-08-17T12:00:00"))).toEqual({
            "Dias hasta que venza: ": 30,
            "Fecha de compra: ": new Date("2025-08-17T12:00:00"),
            "GB disponibles: ": 1000,
            "minutos disponibles: ": 1000,
            "apps ilimitadas": []
        })
    })

    test("006 Cliente compra paquete con apps de uso ilimitado", () => {
        const fecha = new Date("2025-07-18T12:00:00");
        const cliente = new Cliente(nombre = "ian", linea = 12345678)
        const paquete = new Paquete("Paquete Especial", costo = 1000, datos = 1000, minutos = 1000, duracion = 30, ["whatsapp", "linkedin"])
        const sistema = new Sistema(fecha, [cliente], [paquete])

        sistema.clienteCargaDineroEnCuenta(cliente, dinero = 1000, fecha)
        sistema.clienteCompraPaquete(cliente, paquete, fecha)

        expect(sistema.clienteQuiereSaberCuantoLeQuedaDisponible(cliente, new Date("2025-07-18T12:00:00"))).toEqual({
            "Dias hasta que venza: ": 30,
            "Fecha de compra: ": new Date("2025-07-18T12:00:00"),
            "GB disponibles: ": 1000,
            "minutos disponibles: ": 1000,
            "apps ilimitadas": ["whatsapp", "linkedin"]
        })
    })
})

describe("Clientes se prestan datos", () => {
    test("007 Cliente ian intenta prestar un datos y minutos a nico, pero nico aun tiene un plan vigente", () => {
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

    test("008 Cliente ian intenta prestar datos y minutos a nico, pero no tiene suficientes datos para prestar", () => {
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

    test("009 Cliente ian intenta prestar datos y minutos a nico, pero no tiene suficientes minutos para prestar", () => {
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

    test("010 Cliente ian intenta prestar datos / minutos negativos", () => {
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

        expect(() => sistema.clientePrestaDatosAOtro(ian, nico, datos = -1, minutos = -1, fecha)).toThrow(new Error("Se tiene que ingresar una cantidad positiva a los datos / minutos prestados"))

    })

    test("011 Cliente ian le presta datos y minutos a nico cuando agota el plan", () => {
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
            "Fecha de compra: ": new Date("2025-07-18T12:00:00"),
            "GB disponibles: ": 700,
            "minutos disponibles: ": 700,
            "apps ilimitadas": []
        })

        expect(sistema.clienteQuiereSaberCuantoLeQuedaDisponible(nico, fecha)).toEqual({
            "Dias hasta que venza: ": 30,
            "Fecha de compra: ": new Date("2025-07-18T12:00:00"),
            "GB disponibles: ": 300,
            "minutos disponibles: ": 1300,
            "apps ilimitadas": []
        })
    })

    test("012 Cliente ian le presta datos y minutos a nico cuando se le vence el plan", () => {
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
            "Fecha de compra: ": new Date("2025-07-28T12:00:00"),
            "GB disponibles: ": 1000,
            "minutos disponibles: ": 1000,
            "apps ilimitadas": []
        })

        expect(sistema.clienteQuiereSaberCuantoLeQuedaDisponible(nico, new Date("2025-08-18T12:00:00"))).toEqual({
            "Dias hasta que venza: ": -1,
            "Fecha de compra: ": new Date("2025-07-18T12:00:00"),
            "GB disponibles: ": 1000,
            "minutos disponibles: ": 1000,
            "apps ilimitadas": []
        })

        sistema.clientePrestaDatosAOtro(ian, nico, datos = 300, minutos = 300, new Date("2025-08-18T12:00:00"))

        expect(sistema.clienteQuiereSaberCuantoLeQuedaDisponible(ian, new Date("2025-08-18T12:00:00"))).toEqual({
            "Dias hasta que venza: ": 9,
            "Fecha de compra: ": new Date("2025-07-28T12:00:00"),
            "GB disponibles: ": 700,
            "minutos disponibles: ": 700,
            "apps ilimitadas": []
        })

        expect(sistema.clienteQuiereSaberCuantoLeQuedaDisponible(nico, new Date("2025-08-18T12:00:00"))).toEqual({
            "Dias hasta que venza: ": 9,
            "Fecha de compra: ": new Date("2025-07-28T12:00:00"),
            "GB disponibles: ": 1300,
            "minutos disponibles: ": 1300,
            "apps ilimitadas": []
        })
    })
})