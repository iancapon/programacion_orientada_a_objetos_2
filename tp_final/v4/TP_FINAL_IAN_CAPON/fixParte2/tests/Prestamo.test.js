const Cliente = require("../src/Cliente")
const { Consumo, ConsumoDetalladoInternet } = require("../src/Consumo")
const Cuenta = require("../src/Cuenta")
const { Paquete } = require("../src/Paquete")
beforeEach(() => {
    paquete = new Paquete(precio = 1000, minutos = 100, megabytes = 4000, dias = 10)
    relojMock = {
        ahora: jest.fn()
    }
    ian = new Cliente("ian capon", 1133492294, new Cuenta(), relojMock)
    nico = new Cliente("nico las", 1122943349, new Cuenta(), relojMock)
    ian.cargar(1000)
    nico.cargar(1000)
})

test("001 el paquete de un cliente que recibe un préstamo no está ni vencido ni agotado", () => {
    relojMock.ahora.mockReturnValueOnce(new Date("01/01/2012"))
    relojMock.ahora.mockReturnValueOnce(new Date("01/06/2012"))
    relojMock.ahora.mockReturnValue(new Date("01/08/2012"))

    ian.comprarPaquete(paquete)
    nico.comprarPaquete(paquete)

    expect(() => nico.prestaMegabytesA(ian, megabytes = 500)).toThrow(new Error("El cliente que recibe el prestamo no tiene un paquete vencido o agotado."))
    expect(() => nico.prestaMinutosA(ian, minutos = 50)).toThrow(new Error("El cliente que recibe el prestamo no tiene un paquete vencido o agotado."))

})

test("002 un cliente intenta prestar una cantidad que no posee", () => {
    relojMock.ahora.mockReturnValueOnce(new Date("01/01/2012"))
    relojMock.ahora.mockReturnValueOnce(new Date("01/06/2012"))
    relojMock.ahora.mockReturnValue(new Date("01/12/2012"))

    ian.comprarPaquete(paquete)
    nico.comprarPaquete(paquete)

    expect(() => nico.prestaMegabytesA(ian, megabytes = 5000)).toThrow(new Error("El cliente no posee la cantidad que desea prestar."))
    expect(() => nico.prestaMinutosA(ian, minutos = 200)).toThrow(new Error("El cliente no posee la cantidad que desea prestar."))

})

test("003 No se puede prestar si el cliente que recibe no compró un paquete en primer lugar", () => {
    nico.comprarPaquete(paquete)

    expect(() => nico.prestaMegabytesA(ian, megabytes = 5000)).toThrow(new Error("El cliente no puede aceptar un prestamo si no compró un paquete."))
    expect(() => nico.prestaMinutosA(ian, minutos = 200)).toThrow(new Error("El cliente no puede aceptar un prestamo si no compró un paquete."))

})

test("004 Un cliente presta datos, y minutos a otro.", () => {
    relojMock.ahora.mockReturnValueOnce(new Date("01/01/2012"))
    relojMock.ahora.mockReturnValueOnce(new Date("01/06/2012"))
    relojMock.ahora.mockReturnValue(new Date("01/12/2012"))

    ian.comprarPaquete(paquete)
    nico.comprarPaquete(paquete)

    nico.prestaMegabytesA(ian, megabytes = 1000)
    nico.prestaMinutosA(ian, minutos = 50)

    expect(nico.estado()).toEqual({
        minutosRestantes: 50,
        megabytesRestantes: 3000,
        diasHastaVencimiento: 4,
        fechaDeActivacion: new Date("01/06/2012"),
    })
    expect(ian.estado()).toEqual({
        minutosRestantes: 150,
        megabytesRestantes: 5000,
        diasHastaVencimiento: 4,
        fechaDeActivacion: new Date("01/06/2012"),
    })
})