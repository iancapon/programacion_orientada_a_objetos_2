const { crearCliente, crearConsumo, crearPaquete, crearFecha } = require("./factories")

describe("Consumos con aplicaciones especificas", () => {
    test("Consumo por parte de Whatsapp", () => {
        const cliente = crearCliente(nombre = "Pepe", linea = 1123456789)
        const paquete_basico = crearPaquete(datos = 1000, minutos = 100, dias = 7, precio = 150, fechaDeCompra = crearFecha("01/01/2024"))
        const consumo = crearConsumo(datos = 100, minutos = 0, fecha = crearFecha("01/01/2024"), app = "Whatsapp")

        cliente.cargarEnCuenta(200)
        cliente.comprarPaquete(paquete_basico)

        expect(cliente.consume(consumo)).toEqual("Has consumido 100 MB, y 0 minutos, con la App Whatsapp, en la fecha Mon Jan 01 2024 00:00:00 GMT-0300 (hora estándar de Argentina).")
    })

    test("Se quiere obtener el historial entero de consumo para un cliente. Algunas fechas con Apps", () => {
        const cliente = crearCliente(nombre = "Pepe", linea = 1123456789)
        const paquete_basico = crearPaquete(datos = 10000, minutos = 100, dias = 7, precio = 150, fechaDeCompra = crearFecha("01/01/2024"))

        cliente.cargarEnCuenta(150)
        cliente.comprarPaquete(paquete_basico)
        cliente.consume(crearConsumo(datos = 100, minutos = 0, fecha = crearFecha("01/01/2024"), app = "Whatsapp"))
        cliente.consume(crearConsumo(datos = 300, minutos = 10, fecha = crearFecha("01/02/2024")))
        cliente.consume(crearConsumo(datos = 200, minutos = 0, fecha = crearFecha("01/03/2024")))
        cliente.consume(crearConsumo(datos = 700, minutos = 20, fecha = crearFecha("01/04/2024"), app = "Instagram"))
        cliente.consume(crearConsumo(datos = 500, minutos = 0, fecha = crearFecha("01/05/2024")))

        expect(cliente.consumosHastaLaFecha()).toEqual([
            { datos: 100, minutos: 0, fecha: crearFecha("01/01/2024"), app: "Whatsapp" },
            { datos: 300, minutos: 10, fecha: crearFecha("01/02/2024") },
            { datos: 200, minutos: 0, fecha: crearFecha("01/03/2024") },
            { datos: 700, minutos: 20, fecha: crearFecha("01/04/2024"), app: "Instagram" },
            { datos: 500, minutos: 0, fecha: crearFecha("01/05/2024") },
        ])
    })

})

describe("Consumo ilimitado para ciertas apps", () => {
    test("Whatsapp es una app de uso ilimitado, el consumo no le descuenta datos.", () => {
        const cliente = crearCliente(nombre = "Pepe", linea = 1123456789)
        const paquete_basico = crearPaquete(datos = 1000, minutos = 100, dias = 7, precio = 150, crearFecha("01/01/2024"), ilimitadas = ["Whatsapp"])
        const consumo = crearConsumo(datos = 200, minutos = 50, fecha = crearFecha("01/02/2024"), app = "Whatsapp")

        cliente.cargarEnCuenta(200)
        cliente.comprarPaquete(paquete_basico)

        expect(cliente.consume(consumo)).toEqual("Has consumido 200 MB, y 50 minutos, con la App Whatsapp, en la fecha Tue Jan 02 2024 00:00:00 GMT-0300 (hora estándar de Argentina).")
        expect(cliente.resumenDeSaldo()).toEqual("Le quedan: 1000 MB y 100 minutos. Vence en 6 días.")
    })

    test("Whatsapp e Instagram son apps de uso ilimitado, consumir otras apps si descuentan", () => {
        const cliente = crearCliente(nombre = "Pepe", linea = 1123456789)
        const paquete_basico = crearPaquete(datos = 1000, minutos = 100, dias = 7, precio = 150, crearFecha("01/01/2024"), ilimitadas = ["Whatsapp", "Instagram"])

        cliente.cargarEnCuenta(200)
        cliente.comprarPaquete(paquete_basico)

        expect(cliente.consume(crearConsumo(datos = 200, minutos = 50, fecha = crearFecha("01/02/2024"), app = "Whatsapp"))).toEqual("Has consumido 200 MB, y 50 minutos, con la App Whatsapp, en la fecha Tue Jan 02 2024 00:00:00 GMT-0300 (hora estándar de Argentina).")
        expect(cliente.resumenDeSaldo()).toEqual("Le quedan: 1000 MB y 100 minutos. Vence en 6 días.")

        expect(cliente.consume(crearConsumo(datos = 200, minutos = 0, fecha = crearFecha("01/03/2024"), app = "Youtube"))).toEqual("Has consumido 200 MB, y 0 minutos, con la App Youtube, en la fecha Wed Jan 03 2024 00:00:00 GMT-0300 (hora estándar de Argentina).")
        expect(cliente.resumenDeSaldo()).toEqual("Le quedan: 800 MB y 100 minutos. Vence en 5 días.")
        
        expect(cliente.consume(crearConsumo(datos = 200, minutos = 0, fecha = crearFecha("01/03/2024")))).toEqual("Has consumido 200 MB, y 0 minutos, en la fecha Wed Jan 03 2024 00:00:00 GMT-0300 (hora estándar de Argentina).")
        expect(cliente.resumenDeSaldo()).toEqual("Le quedan: 600 MB y 100 minutos. Vence en 5 días.")

        expect(cliente.consume(crearConsumo(datos = 200, minutos = 50, fecha = crearFecha("01/04/2024"), app = "Instagram"))).toEqual("Has consumido 200 MB, y 50 minutos, con la App Instagram, en la fecha Thu Jan 04 2024 00:00:00 GMT-0300 (hora estándar de Argentina).")
        expect(cliente.resumenDeSaldo()).toEqual("Le quedan: 600 MB y 100 minutos. Vence en 4 días.")
    })

})