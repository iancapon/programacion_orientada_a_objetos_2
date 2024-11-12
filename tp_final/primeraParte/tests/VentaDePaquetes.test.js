const Cliente = require("../src/Cliente")
const Paquete = require("../src/Paquete")

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

test("Cliente adquiere un paquete, se consumen los datos, adquiere otro paquete.", () => {
    const cliente = new Cliente(nombre = "Pepe", linea = 1123456789)
    const paquete_basico = new Paquete(gigabytes = 1, minutos = 100, dias = 7, precio = 150)
    const paquete_intermedio = new Paquete(gigabytes = 2, minutos = 500, dias = 7, precio = 300)

    cliente.cargarEnCuenta(450)
    cliente.comprarPaquete(paquete_basico, fechaDeCompra = new Date("01/01/2024"))
    cliente.consume(datos = 1, minutos = 0, fechaDeCompra = new Date("01/08/2024"))

    expect(cliente.comprarPaquete(paquete_intermedio, fechaDeCompra = new Date("01/08/2024"))).toEqual("Paquete comprado: 2 GB, 500 minutos, 7 dias, 300 pesos.")
    expect(cliente.saldoEnCuenta()).toEqual(0)
})

test("Cliente adquiere un paquete, se consumen los minutos, adquiere otro paquete.", () => {
    const cliente = new Cliente(nombre = "Pepe", linea = 1123456789)
    const paquete_basico = new Paquete(gigabytes = 1, minutos = 100, dias = 7, precio = 150)
    const paquete_intermedio = new Paquete(gigabytes = 2, minutos = 500, dias = 7, precio = 300)

    cliente.cargarEnCuenta(450)
    cliente.comprarPaquete(paquete_basico, new Date("01/01/2024"))
    cliente.consume(datos = 0, minutos = 100, new Date("01/01/2024"))

    expect(cliente.comprarPaquete(paquete_intermedio, new Date("01/01/2024"))).toEqual("Paquete comprado: 2 GB, 500 minutos, 7 dias, 300 pesos.")
    expect(cliente.saldoEnCuenta()).toEqual(0)
})

test("Cliente adquiere un paquete, ya han pasado los dias y ha vencido, adquiere otro paquete.", () => {
    const cliente = new Cliente(nombre = "Pepe", linea = 1123456789)
    const paquete_basico = new Paquete(gigabytes = 1, minutos = 100, dias = 7, precio = 150)
    const paquete_intermedio = new Paquete(gigabytes = 2, minutos = 500, dias = 7, precio = 300)

    cliente.cargarEnCuenta(450)
    cliente.comprarPaquete(paquete_basico, new Date("01/01/2024"))
    cliente.consume(datos = 0, minutos = 0, new Date("01/08/2024"))


    expect(cliente.comprarPaquete(paquete_intermedio, new Date("01/08/2024"))).toEqual("Paquete comprado: 2 GB, 500 minutos, 7 dias, 300 pesos.")
    expect(cliente.saldoEnCuenta()).toEqual(0)
})

test("Se intenta consumir más de lo que permite el paquete, no se puede.", () => {
    const cliente = new Cliente(nombre = "Pepe", linea = 1123456789)
    const paquete_basico = new Paquete(gigabytes = 1, minutos = 100, dias = 7, precio = 150)

    cliente.cargarEnCuenta(450)
    cliente.comprarPaquete(paquete_basico, new Date("01/01/2024"))

    expect(() => cliente.consume(datos = 2, minutos = 0, fecha = new Date("01/01/2024"))).toThrow(new Error("No se puede consumir esa cantidad de datos."))
    expect(() => cliente.consume(datos = 0, minutos = 110, fecha = new Date("01/01/2024"))).toThrow(new Error("No se puede consumir esa cantidad de minutos."))
    expect(() => cliente.consume(datos = 0, minutos = 0, fecha = new Date("01/09/2024"))).toThrow(new Error("No se puede consumir esa cantidad de dias."))
})