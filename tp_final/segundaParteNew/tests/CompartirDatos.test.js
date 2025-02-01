const { crearCliente, crearConsumo, crearConsumoDeApp, crearPaquete, crearFecha } = require("./factories")

test("Cliente presta datos a otro cliente.", () => {
    const Pepe = crearCliente(nombre = "Pepe", linea = 1123456789)
    const Moni = crearCliente(nombre = "Moni", linea = 1198765432)
    const paquete_basico = crearPaquete(datos = 1000, minutos = 100, dias = 7, precio = 150)

    Pepe.cargarEnCuenta(200)
    Moni.cargarEnCuenta(200)
    Pepe.comprarPaquete(paquete_basico, crearFecha("01/01/2001"))
    Moni.comprarPaquete(paquete_basico, crearFecha("01/01/2001"))
    Moni.consume(crearConsumo(1000, 0, crearFecha("01/03/2001")))

    Pepe.presta(Moni, 300, 0, crearFecha("01/04/2001"))

    expect(Moni.resumenDeSaldo()).toEqual("Le quedan: 300 MB y 100 minutos. Vence en 4 días.")
    expect(Pepe.resumenDeSaldo()).toEqual("Le quedan: 700 MB y 100 minutos. Vence en 4 días.")

})

test("Cliente intenta prestar datos a otro cliente, pero aun tiene un paquete activo.", () => {
    const Pepe = crearCliente(nombre = "Pepe", linea = 1123456789)
    const Moni = crearCliente(nombre = "Moni", linea = 1198765432)
    const paquete_basico = crearPaquete(datos = 1000, minutos = 100, dias = 7, precio = 150)

    Pepe.cargarEnCuenta(200)
    Moni.cargarEnCuenta(200)
    Pepe.comprarPaquete(paquete_basico, crearFecha("01/01/2001"))
    Moni.comprarPaquete(paquete_basico, crearFecha("01/01/2001"))
    Moni.consume(crearConsumo(100, 0, crearFecha("01/03/2001")))

    expect(() => Pepe.presta(Moni, 300, 0, crearFecha("01/03/2001"))).toThrow(new Error("Aún hay un paquete activo."))
})

test("Cliente presta datos a otro cliente. El intercambio se guarda.", () => {
    const Pepe = crearCliente(nombre = "Pepe", linea = 1123456789)
    const Moni = crearCliente(nombre = "Moni", linea = 1198765432)
    const paquete_basico = crearPaquete(datos = 1000, minutos = 100, dias = 7, precio = 150)

    Pepe.cargarEnCuenta(200)
    Moni.cargarEnCuenta(200)
    Pepe.comprarPaquete(paquete_basico, crearFecha("01/01/2001"))
    Moni.comprarPaquete(paquete_basico, crearFecha("01/01/2001"))
    Moni.consume(crearConsumo(1000, 100, crearFecha("01/03/2001")))

    Pepe.presta(Moni, 300, 50, crearFecha("01/04/2001"))

    expect(Pepe.prestamosHastaLaFecha()).toEqual([
        { datos: 300, minutos: 50, fecha: crearFecha("01/04/2001"), desdeLinea: 1123456789, haciaLinea: 1198765432 },
    ])
    expect(Moni.prestamosHastaLaFecha()).toEqual([
        { datos: 300, minutos: 50, fecha: crearFecha("01/04/2001"), desdeLinea: 1123456789, haciaLinea: 1198765432 },
    ])

})