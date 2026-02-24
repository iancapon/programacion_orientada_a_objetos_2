const Cuenta = require("../src/Cuenta")
const Cliente = require("../src/Cliente")

beforeEach(() => {
    cuenta = new Cuenta()

    clienteMock = {
        cargar: jest.fn().mockImplementation((monto) => {
            cuenta.cargar(monto)
        }),
        comprarPaquete: jest.fn().mockImplementation((paquete) => {
            cuenta.debitar(paquete.precio())
        })
    }
})

test("001 ingresar dinero en cuenta", () => {
    const montoAcargar = 1000

    clienteMock.cargar(montoAcargar)

    expect(clienteMock.cargar).toHaveBeenCalledWith(montoAcargar)
    expect(cuenta.fondos).toBe(montoAcargar)
})

test("002 no se puede debitar dinero si no hay suficiente saldo", () => {
    const montoIngresado = 500

    const paqueteMock = {
        precio: jest.fn().mockReturnValue(1000),
    }

    clienteMock.cargar(montoIngresado)

    expect(() => clienteMock.comprarPaquete(paqueteMock)).toThrow(new Error("Fondos insuficientes."))
    expect(cuenta.fondos).toBe(500)

})

test("003 debitar dinero en cuenta al comprar paquete", () => {
    const monto = 1000

    const paqueteMock = {
        precio: jest.fn().mockReturnValue(monto),
    }

    clienteMock.cargar(monto)
    clienteMock.comprarPaquete(paqueteMock)

    expect(clienteMock.comprarPaquete).toHaveBeenCalledWith(paqueteMock)
    expect(cuenta.fondos).toBe(0)

})