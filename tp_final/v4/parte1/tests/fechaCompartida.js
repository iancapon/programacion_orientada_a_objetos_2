const Sistema = require("../src/Sistema")
const Cliente = require("../src/Cliente")
const Paquete = require("../src/Paquete")

test("001 sistema se crea con una fecha inicial",()=>{
    const fecha = new Date("2025-07-18T12:00:00")
    const cliente = new Cliente(nombre = "ian", linea = 12345678)
    const sistema = new Sistema(fecha, [cliente], [])

    expect(sistema.fechaActual()).toBe("Fri, 18 Jul 2025 15:00:00 GMT")
    expect(sistema.encontrarCliente(cliente).fechaActual()).toBe("Fri, 18 Jul 2025 15:00:00 GMT")
})