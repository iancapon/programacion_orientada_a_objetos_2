const Cliente = require("../src/Cliente")
const Paquete = require("../src/Paquete")
const Consumo = require("../src/Consumo")

describe("Compra de paquetes", () => {
    test("Cliente compra un paquete, el sistema le debita de la cuenta", () => {
        const cliente = new Cliente(nombre = "Pepe", linea = 1123456789)
        const paquete_basico = new Paquete(gigabytes = 1, minutos = 100, dias = 7, precio = 150)

        cliente.cargarEnCuenta(200)

        expect(cliente.comprarPaquete(paquete_basico)).toEqual("Paquete comprado: 1 GB, 100 minutos, 7 dias, 150 pesos.")
        expect(cliente.saldoEnCuenta()).toEqual(50)
    })


    test("Cliente intenta compra un paquete, el sistema detecta faltante de dinero en la cuenta.", () => {
        const cliente = new Cliente(nombre = "Pepe", linea = 1123456789)
        const paquete_basico = new Paquete(gigabytes = 1, minutos = 100, dias = 7, precio = 150)

        cliente.cargarEnCuenta(100)

        expect(() => cliente.comprarPaquete(paquete_basico)).toThrow(new Error("No fue posible comprar el paquete, falta saldo."))
        expect(cliente.saldoEnCuenta()).toEqual(100)
    })

    test("Cliente adquiere un paquete, intenta adquirir otro antes de que se agote o termine el paquete actual, el sistema lo bloquea.", () => {
        const cliente = new Cliente(nombre = "Pepe", linea = 1123456789)
        const paquete_basico = new Paquete(gigabytes = 1, minutos = 100, dias = 7, precio = 150)
        const paquete_intermedio = new Paquete(gigabytes = 2, minutos = 500, dias = 7, precio = 300)

        cliente.cargarEnCuenta(450)
        cliente.comprarPaquete(paquete_intermedio)

        expect(() => cliente.comprarPaquete(paquete_basico)).toThrow(new Error("No fue posible comprar el paquete, ya hay un paquete activo."))
        expect(cliente.saldoEnCuenta()).toEqual(150)
    })

})

describe("Consumo de datos.", () => {

    test("Cliente consume algunos datos del paquete, sabe exactamente cuantos datos , minutos y dias le quedan.", () => {
        const cliente = new Cliente(nombre = "Pepe", linea = 1123456789)
        const paquete_basico = new Paquete(gigabytes = 1, minutos = 100, dias = 7, precio = 150)

        cliente.cargarEnCuenta(450)
        cliente.comprarPaquete(paquete_basico, fechaDeCompra = new Date("01/01/2024"))

        expect(cliente.consume(new Consumo(datos = 0.1, minutos = 20, fechaDeCompra = new Date("01/01/2024")))).toEqual("Le quedan: 0.9 GB y 80 minutos. Vence en 7 días.")
        expect(cliente.consume(new Consumo(datos = 0.1, minutos = 20, fechaDeCompra = new Date("01/02/2024")))).toEqual("Le quedan: 0.8 GB y 60 minutos. Vence en 6 días.")
    })

    test("Cliente adquiere un paquete, se consumen los datos, adquiere otro paquete.", () => {
        const cliente = new Cliente(nombre = "Pepe", linea = 1123456789)
        const paquete_basico = new Paquete(gigabytes = 1, minutos = 100, dias = 7, precio = 150)
        const paquete_intermedio = new Paquete(gigabytes = 2, minutos = 500, dias = 7, precio = 300)

        cliente.cargarEnCuenta(450)
        cliente.comprarPaquete(paquete_basico, fechaDeCompra = new Date("01/01/2024"))
        cliente.consume(new Consumo(datos = 1, minutos = 0, fechaDeCompra = new Date("01/08/2024")))

        expect(cliente.comprarPaquete(paquete_intermedio, fechaDeCompra = new Date("01/08/2024"))).toEqual("Paquete comprado: 2 GB, 500 minutos, 7 dias, 300 pesos.")
        expect(cliente.saldoEnCuenta()).toEqual(0)
    })

    test("Cliente adquiere un paquete, se consumen los minutos, adquiere otro paquete.", () => {
        const cliente = new Cliente(nombre = "Pepe", linea = 1123456789)
        const paquete_basico = new Paquete(gigabytes = 1, minutos = 100, dias = 7, precio = 150)
        const paquete_intermedio = new Paquete(gigabytes = 2, minutos = 500, dias = 7, precio = 300)

        cliente.cargarEnCuenta(450)
        cliente.comprarPaquete(paquete_basico, new Date("01/01/2024"))
        cliente.consume(new Consumo(datos = 0, minutos = 100, new Date("01/01/2024")))

        expect(cliente.comprarPaquete(paquete_intermedio, new Date("01/01/2024"))).toEqual("Paquete comprado: 2 GB, 500 minutos, 7 dias, 300 pesos.")
        expect(cliente.saldoEnCuenta()).toEqual(0)
    })

    test("Cliente adquiere un paquete, ya han pasado los dias y ha vencido, adquiere otro paquete.", () => {
        const cliente = new Cliente(nombre = "Pepe", linea = 1123456789)
        const paquete_basico = new Paquete(gigabytes = 1, minutos = 100, dias = 7, precio = 150)
        const paquete_intermedio = new Paquete(gigabytes = 2, minutos = 500, dias = 7, precio = 300)

        cliente.cargarEnCuenta(450)
        cliente.comprarPaquete(paquete_basico, new Date("01/01/2024"))
        cliente.consume(new Consumo(datos = 0, minutos = 0, new Date("01/08/2024")))


        expect(cliente.comprarPaquete(paquete_intermedio, new Date("01/08/2024"))).toEqual("Paquete comprado: 2 GB, 500 minutos, 7 dias, 300 pesos.")
        expect(cliente.saldoEnCuenta()).toEqual(0)
    })

    test("Se intenta consumir más de lo que permite el paquete, no se puede.", () => {
        const cliente = new Cliente(nombre = "Pepe", linea = 1123456789)
        const paquete_basico = new Paquete(gigabytes = 1, minutos = 100, dias = 7, precio = 150)

        cliente.cargarEnCuenta(450)
        cliente.comprarPaquete(paquete_basico, new Date("01/01/2024"))

        expect(() => cliente.consume(new Consumo(datos = 0, minutos = 110, fecha = new Date("01/01/2024")))).toThrow(new Error("No se puede consumir esa cantidad de minutos."))
        expect(() => cliente.consume(new Consumo(datos = 0, minutos = 0, fecha = new Date("01/09/2024")))).toThrow(new Error("No se puede consumir esa cantidad de dias."))
    })

    test("Se compra un paquete que se renueva cuando termina el tiempo, llegada la fecha este se renueva si alcanza el dinero en cuenta.", () => {
        const cliente = new Cliente(nombre = "Pepe", linea = 1123456789)
        const paquete_basico = new Paquete(gigabytes = 1, minutos = 100, dias = 7, precio = 150)

        cliente.cargarEnCuenta(300)
        cliente.comprarPaquete(paquete_basico, new Date("01/01/2024"), renueva = true)

        expect(cliente.consume(new Consumo(datos = 0.1, minutos = 0, fecha = new Date("01/08/2024")))).toEqual("Le quedan: 1 GB y 100 minutos. Vence en 7 días.")
        expect(cliente.saldoEnCuenta()).toEqual(0)
    })

    test("Se compra un paquete que se renueva cuando termina el tiempo, llegada la fecha este no se renueva puesto que no alcanza el saldo", () => {
        const cliente = new Cliente(nombre = "Pepe", linea = 1123456789)
        const paquete_basico = new Paquete(gigabytes = 1, minutos = 100, dias = 7, precio = 150)

        cliente.cargarEnCuenta(160)
        cliente.comprarPaquete(paquete_basico, new Date("01/01/2024"), renueva = true)

        expect(() => cliente.consume(new Consumo(datos = 0.1, minutos = 0, fecha = new Date("01/08/2024")))).toThrow(new Error("No fue posible comprar el paquete, falta saldo."))
        expect(cliente.saldoEnCuenta()).toEqual(10)
    })
})

describe("Historial de consumo.", () => {
    test("Se quiere obtener el historial entero de consumo para un cliente.", () => {
        const cliente = new Cliente(nombre = "Pepe", linea = 1123456789)
        const paquete_basico = new Paquete(gigabytes = 10, minutos = 100, dias = 7, precio = 150)

        cliente.cargarEnCuenta(150)
        cliente.comprarPaquete(paquete_basico, new Date("01/01/2024"))
        cliente.consume(new Consumo(datos = 0.1, minutos = 0, fecha = new Date("01/01/2024")))
        cliente.consume(new Consumo(datos = 0.3, minutos = 10, fecha = new Date("01/02/2024")))
        cliente.consume(new Consumo(datos = 0.2, minutos = 0, fecha = new Date("01/03/2024")))
        cliente.consume(new Consumo(datos = 0.7, minutos = 20, fecha = new Date("01/04/2024")))
        cliente.consume(new Consumo(datos = 0.5, minutos = 0, fecha = new Date("01/05/2024")))

        expect(cliente.consumosHastaLaFecha()).toEqual([
            { datos: 0.1, minutos: 0, fecha: new Date("01/01/2024") },
            { datos: 0.3, minutos: 10, fecha: new Date("01/02/2024") },
            { datos: 0.2, minutos: 0, fecha: new Date("01/03/2024") },
            { datos: 0.7, minutos: 20, fecha: new Date("01/04/2024") },
            { datos: 0.5, minutos: 0, fecha: new Date("01/05/2024") },
        ])
    })

    test("Se quiere obtener el historial de consumo para un cliente, entre dos fechas.", () => {
        const cliente = new Cliente(nombre = "Pepe", linea = 1123456789)
        const paquete_basico = new Paquete(gigabytes = 10, minutos = 100, dias = 7, precio = 150)

        cliente.cargarEnCuenta(150)
        cliente.comprarPaquete(paquete_basico, new Date("01/01/2024"))
        cliente.consume(new Consumo(datos = 0.1, minutos = 0, fecha = new Date("01/01/2024")))
        cliente.consume(new Consumo(datos = 0.3, minutos = 10, fecha = new Date("01/02/2024")))
        cliente.consume(new Consumo(datos = 0.2, minutos = 0, fecha = new Date("01/03/2024")))
        cliente.consume(new Consumo(datos = 0.7, minutos = 20, fecha = new Date("01/04/2024")))
        cliente.consume(new Consumo(datos = 0.5, minutos = 0, fecha = new Date("01/05/2024")))

        expect(cliente.consumosHastaLaFecha(inicial = new Date("01/02/2024"), final = new Date("01/04/2024"))).toEqual([
            { datos: 0.3, minutos: 10, fecha: new Date("01/02/2024") },
            { datos: 0.2, minutos: 0, fecha: new Date("01/03/2024") },
            { datos: 0.7, minutos: 20, fecha: new Date("01/04/2024") },
        ])
    })

})