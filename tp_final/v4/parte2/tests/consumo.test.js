const Sistema = require("../src/Sistema")
const Cliente = require("../src/Cliente")
const { Paquete } = require("../src/Paquete")
const { ConsumoDatos, ConsumoMinutos, ConsumoApp } = require("../src/Consumo")

describe("Cliente intenta usar un paquete sin haberlo comprado", () => {
    test("001 Cliente intenta consumir sin haber comprado un paquete.", () => {
        const cliente = new Cliente(nombre = "ian", linea = 12345678)
        const fecha = new Date("2025-07-18T12:00:00");
        const sistema = new Sistema(fecha, [cliente], [])
        const consumo = new ConsumoDatos(datos = 100, inicio = new Date("2025-07-18T13:00:00"), fin = new Date("2025-07-18T14:00:00"))

        expect(() => sistema.clienteConsume(cliente, consumo)).toThrow(new Error("Para usar los datos primero debe comprar un paquete."))
    })

    test("002 Cliente intenta ver la informacion del paquete, sin haber comprado un paquete.", () => {
        const cliente = new Cliente(nombre = "ian", linea = 12345678)
        const fecha = new Date("2025-07-18T12:00:00");
        const sistema = new Sistema(fecha, [cliente], [])

        expect(() => sistema.clienteQuiereSaberCuantoLeQuedaDisponible(cliente)).toThrow(new Error("Para usar los datos primero debe comprar un paquete."))
    })
})

describe("Cliente usa su paquete, ingresando consumos y chequeando cuantos datos le quedan", () => {
    test("003 Cliente quiere saber cuanto le queda disponible de dias, y para consumir.", () => {
        const cliente = new Cliente(nombre = "ian", linea = 12345678)
        const paquete = new Paquete("Paquete Basico", costo = 1000, datos = 1000, minutos = 1000, duracion = 30, [])
        const fecha = new Date("2025-07-18T12:00:00");
        const sistema = new Sistema(fecha, [cliente], [paquete])

        sistema.clienteCargaDineroEnCuenta(cliente, dinero = 1000, fecha)
        sistema.clienteCompraPaquete(cliente, paquete, fecha)

        expect(sistema.clienteQuiereSaberCuantoLeQuedaDisponible(cliente, new Date("2025-07-20T12:00:00"))).toEqual({
            "Dias hasta que venza: ": 28,
            "Fecha de compra: ": new Date("2025-07-18T12:00:00"),
            "GB disponibles: ": 1000,
            "minutos disponibles: ": 1000,
            "apps ilimitadas": []
        })
    })

    test("004 Consumo de internet no se efectua por no tener suficiente saldo de datos", () => {
        const fecha = new Date("2025-07-18T12:00:00");
        const cliente = new Cliente(nombre = "ian", linea = 12345678)
        const paquete = new Paquete("Paquete Basico", costo = 1000, datos = 1000, minutos = 1000, duracion = 30, [])
        const sistema = new Sistema(fecha, [cliente], [paquete])
        const consumo = new ConsumoDatos(datos = 2000, inicio = new Date("2025-07-18T13:00:00"), fin = new Date("2025-07-18T14:00:00"))

        sistema.clienteCargaDineroEnCuenta(cliente, dinero = 1000, fecha)
        sistema.clienteCompraPaquete(cliente, paquete, fecha)

        expect(() => sistema.clienteConsume(cliente, consumo)).toThrow("Cliente no puede consumir datos que no tiene.")
    })

    test("005 Consumo de minutos de llamada no se efectua por no tener suficiente saldo de minutos", () => {
        const fecha = new Date("2025-07-18T12:00:00");
        const cliente = new Cliente(nombre = "ian", linea = 12345678)
        const paquete = new Paquete("Paquete Basico", costo = 1000, datos = 1000, minutos = 1000, duracion = 30, [])
        const sistema = new Sistema(fecha, [cliente], [paquete])
        const consumo = new ConsumoMinutos(minutos = 2000, inicio = new Date("2025-07-18T13:00:00"), fin = new Date("2025-07-18T14:00:00"))

        sistema.clienteCargaDineroEnCuenta(cliente, dinero = 1000, fecha)
        sistema.clienteCompraPaquete(cliente, paquete, fecha)

        expect(() => sistema.clienteConsume(cliente, consumo)).toThrow("Cliente no puede consumir minutos que no tiene.")
    })

    test("006 Consumo de internet se registra en el sistema", () => {
        const fecha = new Date("2025-07-18T12:00:00");
        const cliente = new Cliente(nombre = "ian", linea = 12345678)
        const paquete = new Paquete("Paquete Basico", costo = 1000, datos = 1000, minutos = 1000, duracion = 30, [])
        const sistema = new Sistema(fecha, [cliente], [paquete])
        const consumo = new ConsumoDatos(datos = 400, inicio = new Date("2025-07-18T13:00:00"), fin = new Date("2025-07-18T14:00:00"))

        sistema.clienteCargaDineroEnCuenta(cliente, dinero = 1000, fecha)
        sistema.clienteCompraPaquete(cliente, paquete, fecha)
        sistema.clienteConsume(cliente, consumo)

        expect(sistema.clienteQuiereSaberCuantoLeQuedaDisponible(cliente, new Date("2025-07-20T12:00:00"))).toEqual({
            "Dias hasta que venza: ": 28,
            "Fecha de compra: ": new Date("2025-07-18T12:00:00"),
            "GB disponibles: ": 600,
            "minutos disponibles: ": 1000,
            "apps ilimitadas": []
        })
    })

    test("007 Consumo de minutos de llamada se registra en el sistema", () => {
        const fecha = new Date("2025-07-18T12:00:00");
        const cliente = new Cliente(nombre = "ian", linea = 12345678)
        const paquete = new Paquete("Paquete Basico", costo = 1000, datos = 1000, minutos = 1000, duracion = 30, [])
        const sistema = new Sistema(fecha, [cliente], [paquete])
        const consumo = new ConsumoMinutos(datos = 800, inicio = new Date("2025-07-18T13:00:00"), fin = new Date("2025-07-18T14:00:00"))

        sistema.clienteCargaDineroEnCuenta(cliente, dinero = 1000, fecha)
        sistema.clienteCompraPaquete(cliente, paquete, fecha)
        sistema.clienteConsume(cliente, consumo)

        expect(sistema.clienteQuiereSaberCuantoLeQuedaDisponible(cliente, new Date("2025-07-20T12:00:00"))).toEqual({
            "Dias hasta que venza: ": 28,
            "Fecha de compra: ": new Date("2025-07-18T12:00:00"),
            "GB disponibles: ": 1000,
            "minutos disponibles: ": 200,
            "apps ilimitadas": []
        })
    })

    test("008 Sistema guarda los consumos de los clientes ordenados por fecha", () => {
        const fecha = new Date("2025-07-18T12:00:00");
        const ian = new Cliente(nombre = "ian", linea = 12345678)
        const nico = new Cliente(nombre = "nico", linea = 98765432)
        const paquete = new Paquete("Paquete Basico", costo = 1000, datos = 1000, minutos = 1000, duracion = 30, [])
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

        sistema.clienteConsume(ian, consumos[0])
        sistema.clienteConsume(nico, consumos[1])
        sistema.clienteConsume(ian, consumos[2])
        sistema.clienteConsume(nico, consumos[3])
        sistema.clienteConsume(ian, consumos[4])
        sistema.clienteConsume(nico, consumos[5])

        expect(sistema.consumosDe(ian, new Date("2025-07-25T14:00:00"))).toEqual([
            { "minutos": 80, "inicio": new Date("2025-07-18T13:00:00"), "fin": new Date("2025-07-18T14:00:00") },
            { "datos": 50, "inicio": new Date("2025-07-20T13:00:00"), "fin": new Date("2025-07-20T14:00:00") },
            { "minutos": 90, "inicio": new Date("2025-07-22T13:00:00"), "fin": new Date("2025-07-22T14:00:00") },
        ])

        expect(sistema.consumosDe(nico, new Date("2025-07-25T14:00:00"))).toEqual([
            { "minutos": 30, "inicio": new Date("2025-07-19T13:00:00"), "fin": new Date("2025-07-19T14:00:00") },
            { "datos": 40, "inicio": new Date("2025-07-21T13:00:00"), "fin": new Date("2025-07-21T14:00:00") },
            { "minutos": 100, "inicio": new Date("2025-07-23T13:00:00"), "fin": new Date("2025-07-23T14:00:00") },
        ])
    })

    test("009 Consumo de app se registra en el sistema", () => {
        const fecha = new Date("2025-07-18T12:00:00");
        const cliente = new Cliente(nombre = "ian", linea = 12345678)
        const paquete = new Paquete("Paquete Basico", costo = 1000, datos = 1000, minutos = 1000, duracion = 30, [])
        const sistema = new Sistema(fecha, [cliente], [paquete])
        const consumo = new ConsumoApp(app = "whatsapp", datos = 80, inicio = new Date("2025-07-18T13:00:00"), fin = new Date("2025-07-18T14:00:00"))

        sistema.clienteCargaDineroEnCuenta(cliente, dinero = 1000, fecha)
        sistema.clienteCompraPaquete(cliente, paquete, fecha)
        sistema.clienteConsume(cliente, consumo)

        expect(sistema.consumosDe(cliente, new Date("2025-07-25T14:00:00"))).toEqual([
            { "app": "whatsapp", "datos": 80, "inicio": new Date("2025-07-18T13:00:00"), "fin": new Date("2025-07-18T14:00:00") }
        ])

        expect(sistema.clienteQuiereSaberCuantoLeQuedaDisponible(cliente, new Date("2025-07-20T12:00:00"))).toEqual({
            "Dias hasta que venza: ": 28,
            "Fecha de compra: ": new Date("2025-07-18T12:00:00"),
            "GB disponibles: ": 920,
            "minutos disponibles: ": 1000,
            "apps ilimitadas": []
        })
    })

    test("010 Consumo de app de uso ilimitado", () => {
        const fecha = new Date("2025-07-18T12:00:00");
        const cliente = new Cliente(nombre = "ian", linea = 12345678)
        const paquete = new Paquete("Paquete Especial", costo = 1000, datos = 1000, minutos = 1000, duracion = 30, ["whatsapp", "linkedin"])
        const sistema = new Sistema(fecha, [cliente], [paquete])
        const consumo = new ConsumoApp(app = "whatsapp", datos = 80, inicio = new Date("2025-07-18T13:00:00"), fin = new Date("2025-07-18T14:00:00"))

        sistema.clienteCargaDineroEnCuenta(cliente, dinero = 1000, fecha)
        sistema.clienteCompraPaquete(cliente, paquete, fecha)
        sistema.clienteConsume(cliente, consumo)

        expect(sistema.consumosDe(cliente, new Date("2025-07-25T14:00:00"))).toEqual([
            { "app": "whatsapp", "datos": 80, "inicio": new Date("2025-07-18T13:00:00"), "fin": new Date("2025-07-18T14:00:00") }
        ])

        expect(sistema.clienteQuiereSaberCuantoLeQuedaDisponible(cliente, new Date("2025-07-20T12:00:00"))).toEqual({
            "Dias hasta que venza: ": 28,
            "Fecha de compra: ": new Date("2025-07-18T12:00:00"),
            "GB disponibles: ": 1000,
            "minutos disponibles: ": 1000,
            "apps ilimitadas": ["whatsapp", "linkedin"]
        })


    })
})