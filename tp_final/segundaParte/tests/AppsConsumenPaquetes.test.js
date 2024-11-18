const { crearCliente, crearConsumo, crearPaquete, crearFecha } = require("./factories")

test("Consumo por parte de Whatsapp", () => {
    const cliente = crearCliente(nombre = "Pepe", linea = 1123456789)
    const paquete_basico = crearPaquete(datos = 1000, minutos = 100, dias = 7, precio = 150)
    const consumo = crearConsumo(datos = 100, minutos = 0, fecha = crearFecha("01/01/2024"), app = "Whatsapp")
    
    cliente.cargarEnCuenta(200)
    cliente.comprarPaquete(paquete_basico, crearFecha("01/01/2024"))
    
    expect(cliente.consume(consumo)).toEqual("Has consumido 100 MB, y 0 minutos, en la fecha Mon Jan 01 2024 00:00:00 GMT-0300 (hora estándar de Argentina).")
})