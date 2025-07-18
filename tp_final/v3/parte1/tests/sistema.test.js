const Sistema = require("../src/Sistema")
const Cliente = require("../src/Cliente")
const Paquete = require("../src/Paquete")
const ConsumoDatos = require("../src/ConsumoDatos")
const ConsumoMinutos = require("../src/ConsumoMinutos")

/*

    HAY QUILOMBO CON LAS FECHAS....


*/
test("Cliente intenta comprar pero no es reconocido en el sistema", () => {
    const sistema = new Sistema(new Date("02/25/2025"))
    const cliente = new Cliente("pepito", 1234)
    const paquete = new Paquete(10, 1000, 30, 100)

    expect(() => (sistema.comprarPaquete(cliente, paquete, new Date("02/25/2025")))).toThrow(new Error("El cliente no se encuentra en el sistema."))
})

test("Cliente intenta comprar pero el paquete no es reconocido en el sistema", () => {
    const sistema = new Sistema(new Date("02/25/2025"))
    const cliente = new Cliente("pepito", 1234)
    const paquete = new Paquete(10, 1000, 30, 100)

    sistema.nuevoCliente(cliente, new Date("02/25/2025"))

    expect(() => (sistema.comprarPaquete(cliente, paquete, new Date("02/25/2025")))).toThrow(new Error("El paquete no se encuentra en el sistema."))
})

test("Cliente intenta comprar pero el paquete no tiene suficiente dinero en cuenta", () => {
    const sistema = new Sistema(new Date("02/25/2025"))
    const cliente = new Cliente("pepito", 1234)
    const paquete = new Paquete(10, 1000, 30, 100)

    sistema.nuevoCliente(cliente, new Date("02/25/2025"))
    sistema.nuevoPaquete(paquete, new Date("02/25/2025"))

    expect(() => (sistema.comprarPaquete(cliente, paquete, new Date("02/25/2025")))).toThrow(new Error("El cliente no tiene suficiente dinero en la cuenta."))
})

test("Cliente intenta comprar el paquete, pero ingresa como fecha actual una invalida", () => {
    const sistema = new Sistema(new Date("02/25/2025"))
    const cliente = new Cliente("pepito", 1234)
    const paquete = new Paquete(10, 1000, 30, 100)

    sistema.nuevoCliente(cliente, new Date("02/25/2025"))
    sistema.nuevoPaquete(paquete, new Date("02/25/2025"))

    expect(() => (sistema.comprarPaquete(cliente, paquete, new Date("02/24/2025")))).toThrow(new Error("Fecha invalida."))
})

test("Cliente carga dinero en la cuenta y compra un paquete", () => {
    const sistema = new Sistema(new Date("02/25/2025"))
    const cliente = new Cliente("pepito", 1234)
    const paquete = new Paquete(10, 1000, 30, 100)

    sistema.nuevoCliente(cliente,new Date("02/25/2025"))
    sistema.nuevoPaquete(paquete,new Date("02/25/2025"))
    sistema.ingresarSaldo(cliente, 1000,new Date("02/25/2025"))

    expect(sistema.comprarPaquete(cliente, paquete, new Date("02/25/2025"))).toBe("Se ha comprado un paquete.")

})

test("Cliente intenta comprar el paquete, pero el actual aun no ha vencido", () => {
    const sistema = new Sistema(new Date("02/25/2025"))
    const cliente = new Cliente("pepito", 1234)
    const paquete = new Paquete(10, 1000, 30, 100)

    sistema.nuevoCliente(cliente,new Date("02/25/2025"))
    sistema.nuevoPaquete(paquete,new Date("02/25/2025"))
    sistema.ingresarSaldo(cliente, 1000,new Date("02/25/2025"))
    sistema.comprarPaquete(cliente, paquete, new Date("02/25/2025"))

    expect(() => (sistema.comprarPaquete(cliente, paquete, new Date("02/26/2025")))).toThrow(new Error("El plan no está vencido ni agotado."))
})

test("Cliente compra un paquete despues que el actual haya vencido", () => {
    const sistema = new Sistema(new Date("02/25/2025"))
    const cliente = new Cliente("pepito", 1234)
    const paquete = new Paquete(10, 1000, 30, 100)

    sistema.nuevoCliente(cliente,new Date("02/25/2025"))
    sistema.nuevoPaquete(paquete,new Date("02/25/2025"))
    sistema.ingresarSaldo(cliente, 1000,new Date("02/25/2025"))
    sistema.comprarPaquete(cliente, paquete,new Date("02/25/2025"))

    expect(sistema.comprarPaquete(cliente, paquete, new Date("03/28/2025"))).toBe("Se ha comprado un paquete.")
})

test("Cliente consume datos de internet", () => {
    const sistema = new Sistema(new Date("02/25/2025"))
    const cliente = new Cliente("pepito", 1234)
    const paquete = new Paquete(10, 1000, 30, 100)
    const consumo = new ConsumoDatos(0.1, new Date("02/25/2025"))

    sistema.nuevoCliente(cliente,new Date("02/25/2025"))
    sistema.nuevoPaquete(paquete,new Date("02/25/2025"))
    sistema.ingresarSaldo(cliente, 1000,new Date("02/25/2025"))
    sistema.comprarPaquete(cliente, paquete,new Date("02/25/2025"))
    sistema.nuevoConsumo(cliente, consumo,new Date("02/25/2025"))

    expect(sistema.consumosDe(cliente)).toEqual([
        {
            datos: 0.1,
            fecha: new Date("02/25/2025"),
        },
    ])
})



test("Cliente gasta sus datos, puede comprar un nuevo paquete", () => {
    const sistema = new Sistema(new Date("02/25/2025"))
    const cliente = new Cliente("pepito", 1234)
    const paquete = new Paquete(10, 1000, 30, 100)
    const consumo = new ConsumoDatos(10, new Date("02/25/2025"))

    sistema.nuevoCliente(cliente,new Date("02/25/2025"))
    sistema.nuevoPaquete(paquete,new Date("02/25/2025"))
    sistema.ingresarSaldo(cliente, 1000,new Date("02/25/2025"))
    sistema.comprarPaquete(cliente, paquete)
    sistema.nuevoConsumo(cliente, consumo)

    expect(sistema.comprarPaquete(cliente, paquete, new Date("02/26/2025"))).toBe("Se ha comprado un paquete.")
})

test("Cliente gasta sus minutos, puede comprar un nuevo paquete", () => {
    const sistema = new Sistema(new Date("02/25/2025"))
    const cliente = new Cliente("pepito", 1234)
    const paquete = new Paquete(10, 1000, 30, 100)
    const consumo = new ConsumoMinutos(1000, new Date("02/25/2025"))

    sistema.nuevoCliente(cliente)
    sistema.nuevoPaquete(paquete)
    sistema.ingresarSaldo(cliente, 1000)
    sistema.comprarPaquete(cliente, paquete)
    sistema.nuevoConsumo(cliente, consumo)

    expect(sistema.comprarPaquete(cliente, paquete, new Date("02/26/2025"))).toBe("Se ha comprado un paquete.")
})

test("Cliente consume datos y minutos, sabe cuando consumió cada dia y cuanto le queda ", () => {
    const sistema = new Sistema(new Date("02/25/2025"))
    const cliente = new Cliente("pepito", 1234)
    const paquete = new Paquete(10, 1000, 30, 100)

    sistema.nuevoCliente(cliente)
    sistema.nuevoPaquete(paquete)
    sistema.ingresarSaldo(cliente, 1000)
    sistema.comprarPaquete(cliente, paquete)
    sistema.nuevoConsumo(cliente, new ConsumoDatos(1, new Date("02/15/2025")))
    sistema.nuevoConsumo(cliente, new ConsumoDatos(1, new Date("02/16/2025")))
    sistema.nuevoConsumo(cliente, new ConsumoDatos(1, new Date("02/17/2025")))
    sistema.nuevoConsumo(cliente, new ConsumoMinutos(1, new Date("02/25/2025")))
    sistema.nuevoConsumo(cliente, new ConsumoMinutos(1, new Date("02/26/2025")))
    sistema.nuevoConsumo(cliente, new ConsumoMinutos(1, new Date("02/27/2025")))


    expect(sistema.leQueda(cliente)).toEqual({ datos: 7, minutos: 997, dias: 28 })
    expect(sistema.consumosDe(cliente)).toEqual([
        {
            datos: 1,
            fecha: new Date("02/15/2025"),
        },
        {
            datos: 1,
            fecha: new Date("02/16/2025"),
        },
        {
            datos: 1,
            fecha: new Date("02/17/2025"),
        },
        {
            minutos: 1,
            fecha: new Date("02/25/2025"),
        },
        {
            minutos: 1,
            fecha: new Date("02/26/2025"),
        },
        {
            minutos: 1,
            fecha: new Date("02/27/2025"),
        },
    ])
})