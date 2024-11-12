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

    expect(() => cliente.comprarPaquete(paquete_basico)).toThrow(new Error("No fue posible comprar el paquete, falta dinero."))
    expect(cliente.saldoEnCuenta()).toEqual(100)
})