const { crearCliente, crearConsumo, crearPaquete, crearFecha } = require("./factories")

describe("Compra de paquetes", () => {
    test("Cliente compra un paquete, el sistema le debita de la cuenta", () => {
        const cliente = crearCliente(nombre = "Pepe", linea = 1123456789)
        const paquete_basico = crearPaquete(datos = 1000, minutos = 100, dias = 7, precio = 150)

        cliente.cargarEnCuenta(200)

        expect(cliente.comprarPaquete(paquete_basico)).toEqual("Paquete comprado: 1000 MB, 100 minutos, 7 dias, 150 pesos.")
        expect(cliente.saldoEnCuenta()).toEqual(50)
    })


    test("Cliente intenta compra un paquete, el sistema detecta faltante de dinero en la cuenta.", () => {
        const cliente = crearCliente(nombre = "Pepe", linea = 1123456789)
        const paquete_basico = crearPaquete(datos = 1000, minutos = 100, dias = 7, precio = 150)

        cliente.cargarEnCuenta(100)

        expect(() => cliente.comprarPaquete(paquete_basico)).toThrow(new Error("No fue posible comprar el paquete, falta dinero en cuenta."))
        expect(cliente.saldoEnCuenta()).toEqual(100)
    })

    test("Cliente adquiere un paquete, intenta adquirir otro antes de que se agote o termine el paquete actual, el sistema lo bloquea.", () => {
        const cliente = crearCliente(nombre = "Pepe", linea = 1123456789)
        const paquete_basico = crearPaquete(datos = 1000, minutos = 100, dias = 7, precio = 150)
        const paquete_intermedio = crearPaquete(datos = 2000, minutos = 500, dias = 7, precio = 300)

        cliente.cargarEnCuenta(450)
        cliente.comprarPaquete(paquete_intermedio)

        expect(() => cliente.comprarPaquete(paquete_basico)).toThrow(new Error("No fue posible comprar el paquete, ya hay un paquete activo."))
        expect(cliente.saldoEnCuenta()).toEqual(150)
    })

})

describe("Consumo de datos.", () => {

    test("Cliente consume algunos datos del paquete, sabe exactamente cuanto consumió.", () => {
        const cliente = crearCliente(nombre = "Pepe", linea = 1123456789)
        const paquete_basico = crearPaquete(datos = 1000, minutos = 100, dias = 7, precio = 150)

        cliente.cargarEnCuenta(450)
        cliente.comprarPaquete(paquete_basico, fecha = crearFecha("01/01/2024"))

        expect(cliente.consume(crearConsumo(datos = 100, minutos = 20, fecha = crearFecha("01/01/2024")))).toEqual("Has consumido 100 MB, y 20 minutos, en la fecha Mon Jan 01 2024 00:00:00 GMT-0300 (hora estándar de Argentina).")
    })

    test("Cliente consume algunos datos del paquete, posteriormente desea saber cuantos datos le quedan.", () => {
        const cliente = crearCliente(nombre = "Pepe", linea = 1123456789)
        const paquete_basico = crearPaquete(datos = 1000, minutos = 100, dias = 7, precio = 150)

        cliente.cargarEnCuenta(450)
        cliente.comprarPaquete(paquete_basico, fecha = crearFecha("01/01/2024"))

        cliente.consume(crearConsumo(datos = 100, minutos = 20, fecha = crearFecha("01/01/2024")))
        cliente.consume(crearConsumo(datos = 100, minutos = 20, fecha = crearFecha("01/02/2024")))
        expect(cliente.resumenDeSaldo()).toEqual("Le quedan: 800 MB y 60 minutos. Vence en 6 días.")
    })

    test("Cliente adquiere un paquete, se consumen los datos, adquiere otro paquete.", () => {
        const cliente = crearCliente(nombre = "Pepe", linea = 1123456789)
        const paquete_basico = crearPaquete(datos = 1000, minutos = 100, dias = 7, precio = 150)
        const paquete_intermedio = crearPaquete(datos = 2000, minutos = 500, dias = 7, precio = 300)

        cliente.cargarEnCuenta(450)
        cliente.comprarPaquete(paquete_basico, fecha = crearFecha("01/01/2024"))
        cliente.consume(crearConsumo(datos = 100, minutos = 0, fecha = crearFecha("01/08/2024")))

        expect(cliente.comprarPaquete(paquete_intermedio, fecha = crearFecha("01/08/2024"))).toEqual("Paquete comprado: 2000 MB, 500 minutos, 7 dias, 300 pesos.")
        expect(cliente.saldoEnCuenta()).toEqual(0)
    })

    test("Cliente adquiere un paquete, se consumen los minutos, adquiere otro paquete.", () => {
        const cliente = crearCliente(nombre = "Pepe", linea = 1123456789)
        const paquete_basico = crearPaquete(datos = 1000, minutos = 100, dias = 7, precio = 150)
        const paquete_intermedio = crearPaquete(datos = 2000, minutos = 500, dias = 7, precio = 300)

        cliente.cargarEnCuenta(450)
        cliente.comprarPaquete(paquete_basico, crearFecha("01/01/2024"))
        cliente.consume(crearConsumo(datos = 0, minutos = 100, crearFecha("01/01/2024")))

        expect(cliente.comprarPaquete(paquete_intermedio, crearFecha("01/01/2024"))).toEqual("Paquete comprado: 2000 MB, 500 minutos, 7 dias, 300 pesos.")
        expect(cliente.saldoEnCuenta()).toEqual(0)
    })

    test("Cliente adquiere un paquete, ya han pasado los dias y ha vencido, adquiere otro paquete.", () => {
        const cliente = crearCliente(nombre = "Pepe", linea = 1123456789)
        const paquete_basico = crearPaquete(datos = 1000, minutos = 100, dias = 7, precio = 150)
        const paquete_intermedio = crearPaquete(datos = 2000, minutos = 500, dias = 7, precio = 300)

        cliente.cargarEnCuenta(450)
        cliente.comprarPaquete(paquete_basico, crearFecha("01/01/2024"))
        cliente.consume(crearConsumo(datos = 0, minutos = 0, crearFecha("01/08/2024")))


        expect(cliente.comprarPaquete(paquete_intermedio, crearFecha("01/08/2024"))).toEqual("Paquete comprado: 2000 MB, 500 minutos, 7 dias, 300 pesos.")
        expect(cliente.saldoEnCuenta()).toEqual(0)
    })

    test("Se intenta consumir más de lo que permite el paquete, no se puede.", () => {
        const cliente = crearCliente(nombre = "Pepe", linea = 1123456789)
        const paquete_basico = crearPaquete(datos = 1000, minutos = 100, dias = 7, precio = 150)

        cliente.cargarEnCuenta(450)
        cliente.comprarPaquete(paquete_basico, crearFecha("01/01/2024"))

        expect(() => cliente.consume(crearConsumo(datos = 0, minutos = 110, fecha = crearFecha("01/01/2024")))).toThrow(new Error("No se puede consumir esa cantidad de minutos."))
        expect(() => cliente.consume(crearConsumo(datos = 0, minutos = 0, fecha = crearFecha("01/09/2024")))).toThrow(new Error("No se puede consumir esa cantidad de dias."))
    })

    test("Se compra un paquete que se renueva cuando termina el tiempo, llegada la fecha este se renueva si alcanza el dinero en cuenta.", () => {
        const cliente = crearCliente(nombre = "Pepe", linea = 1123456789)
        const paquete_basico = crearPaquete(datos = 1000, minutos = 100, dias = 7, precio = 150)

        cliente.cargarEnCuenta(300)
        cliente.comprarPaquete(paquete_basico, crearFecha("01/01/2024"), renueva = true)

        expect(cliente.consume(crearConsumo(datos = 100, minutos = 0, fecha = crearFecha("01/08/2024")))).toEqual("Has consumido 100 MB, y 0 minutos, en la fecha Mon Jan 08 2024 00:00:00 GMT-0300 (hora estándar de Argentina).")
        expect(cliente.resumenDeSaldo()).toEqual("Le quedan: 1000 MB y 100 minutos. Vence en 7 días.")
        expect(cliente.saldoEnCuenta()).toEqual(0)
    })

    test("Se compra un paquete que se renueva cuando termina el tiempo, llegada la fecha este no se renueva puesto que no alcanza el saldo", () => {
        const cliente = crearCliente(nombre = "Pepe", linea = 1123456789)
        const paquete_basico = crearPaquete(datos = 1000, minutos = 100, dias = 7, precio = 150)

        cliente.cargarEnCuenta(160)
        cliente.comprarPaquete(paquete_basico, crearFecha("01/01/2024"), renueva = true)

        expect(() => cliente.consume(crearConsumo(datos = 100, minutos = 0, fecha = crearFecha("01/08/2024")))).toThrow(new Error("No fue posible comprar el paquete, falta dinero en cuenta."))
        expect(cliente.saldoEnCuenta()).toEqual(10)
    })
})

describe("Historial de consumo.", () => {
    test("Se quiere obtener el historial entero de consumo para un cliente.", () => {
        const cliente = crearCliente(nombre = "Pepe", linea = 1123456789)
        const paquete_basico = crearPaquete(datos = 10000, minutos = 100, dias = 7, precio = 150)

        cliente.cargarEnCuenta(150)
        cliente.comprarPaquete(paquete_basico, crearFecha("01/01/2024"))
        cliente.consume(crearConsumo(datos = 100, minutos = 0, fecha = crearFecha("01/01/2024")))
        cliente.consume(crearConsumo(datos = 300, minutos = 10, fecha = crearFecha("01/02/2024")))
        cliente.consume(crearConsumo(datos = 200, minutos = 0, fecha = crearFecha("01/03/2024")))
        cliente.consume(crearConsumo(datos = 700, minutos = 20, fecha = crearFecha("01/04/2024")))
        cliente.consume(crearConsumo(datos = 500, minutos = 0, fecha = crearFecha("01/05/2024")))

        expect(cliente.consumosHastaLaFecha()).toEqual([
            { datos: 100, minutos: 0, fecha: crearFecha("01/01/2024") },
            { datos: 300, minutos: 10, fecha: crearFecha("01/02/2024") },
            { datos: 200, minutos: 0, fecha: crearFecha("01/03/2024") },
            { datos: 700, minutos: 20, fecha: crearFecha("01/04/2024") },
            { datos: 500, minutos: 0, fecha: crearFecha("01/05/2024") },
        ])
    })

    test("Se quiere obtener el historial de consumo para un cliente, entre dos fechas.", () => {
        const cliente = crearCliente(nombre = "Pepe", linea = 1123456789)
        const paquete_basico = crearPaquete(datos = 10000, minutos = 100, dias = 7, precio = 150)

        cliente.cargarEnCuenta(150)
        cliente.comprarPaquete(paquete_basico, crearFecha("01/01/2024"))
        cliente.consume(crearConsumo(datos = 100, minutos = 0, fecha = crearFecha("01/01/2024")))
        cliente.consume(crearConsumo(datos = 300, minutos = 10, fecha = crearFecha("01/02/2024")))
        cliente.consume(crearConsumo(datos = 200, minutos = 0, fecha = crearFecha("01/03/2024")))
        cliente.consume(crearConsumo(datos = 700, minutos = 20, fecha = crearFecha("01/04/2024")))
        cliente.consume(crearConsumo(datos = 500, minutos = 0, fecha = crearFecha("01/05/2024")))

        expect(cliente.consumosAcotados(inicial = crearFecha("01/02/2024"), final = crearFecha("01/04/2024"))).toEqual([
            { datos: 300, minutos: 10, fecha: crearFecha("01/02/2024") },
            { datos: 200, minutos: 0, fecha: crearFecha("01/03/2024") },
            { datos: 700, minutos: 20, fecha: crearFecha("01/04/2024") },
        ])
    })

})