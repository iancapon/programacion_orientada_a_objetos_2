const { crearCliente, crearConsumo, crearConsumoDeApp, crearPaquete, crearFecha } = require("./factories")

describe("Consumo de apps particulares - Uso ilimitado de apps particulares", () => {
    test("Consumo de whatssapp, una app en particular", () => {
        const cliente = crearCliente(nombre = "Pepe", linea = 1123456789)
        const paquete_basico = crearPaquete(datos = 1000, minutos = 100, dias = 7, precio = 150)
        const consumoDeWhatsapp = crearConsumoDeApp("WhatsApp", 300, crearFecha("01/01/2001"))

        cliente.cargarEnCuenta(1000)
        cliente.comprarPaquete(paquete_basico,crearFecha("01/01/2001"))
        cliente.consume(consumoDeWhatsapp)

        expect(cliente.consumosHastaLaFecha()).toEqual([
            { app: "WhatsApp", datos: 300, minutos: 0, fecha: crearFecha("01/01/2001") }
        ])
        expect(cliente.resumenDeSaldo()).toBe("Le quedan: 700 MB y 100 minutos. Vence en 7 días.")
    })

    test("Se desea saber los consumos, algunas apps son registradas, otras no. ", () => {
        const cliente = crearCliente(nombre = "Pepe", linea = 1123456789)
        const paquete_basico = crearPaquete(datos = 1000, minutos = 100, dias = 7, precio = 150)
        const consumoDeWhatsapp = crearConsumoDeApp("WhatsApp", 300, crearFecha("01/01/2001"))
        const consumoGeneral = crearConsumo(300, 0, crearFecha("01/01/2001"))
        const consumoDeFacebook = crearConsumoDeApp("Facebook", 300, crearFecha("01/01/2001"))

        cliente.cargarEnCuenta(1000)
        cliente.comprarPaquete(paquete_basico, crearFecha("01/01/2001"))
        cliente.consume(consumoDeWhatsapp)
        cliente.consume(consumoGeneral)
        cliente.consume(consumoDeFacebook)

        expect(cliente.consumosHastaLaFecha()).toEqual([
            { app: "WhatsApp", datos: 300, minutos: 0, fecha: crearFecha("01/01/2001") },
            { datos: 300, minutos: 0, fecha: crearFecha("01/01/2001") },
            { app: "Facebook", datos: 300, minutos: 0, fecha: crearFecha("01/01/2001") }
        ])
        expect(cliente.resumenDeSaldo()).toBe("Le quedan: 100 MB y 100 minutos. Vence en 7 días.")
    })

    test("Se cargan apps de uso ilimitado al paquete, al usar una de estas apps no descuenta datos. ", () => {
        const cliente = crearCliente(nombre = "Pepe", linea = 1123456789)
        const paquete_basico = crearPaquete(datos = 1000, minutos = 100, dias = 7, precio = 150, ["WhatsApp", "Facebook"])
        //paquete_basico.cargarAppsDeUsoIlimitado(["WhatsApp", "Facebook"])
        const consumoDeWhatsapp = crearConsumoDeApp("WhatsApp", 300, crearFecha("01/01/2001"))

        cliente.cargarEnCuenta(1000)
        cliente.comprarPaquete(paquete_basico, crearFecha("01/01/2001"))
        cliente.consume(consumoDeWhatsapp)

        expect(cliente.consumosHastaLaFecha()).toEqual([
            { app: "WhatsApp", datos: 300, minutos: 0, fecha: crearFecha("01/01/2001") }
        ])
        expect(cliente.resumenDeSaldo()).toBe("Le quedan: 1000 MB y 100 minutos. Vence en 7 días.")
    })
})



