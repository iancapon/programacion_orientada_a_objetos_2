const Cliente = require("../src/Cliente")
const Registro = require("../src/Registro")
const Cuenta = require("../src/Cuenta")

test("001 cliente no registrado", () => {
    const ian = new Cliente(nombre = "ian capon", linea = 1133492294)
    const registro = new Registro(clientes = [])

    expect(registro.esCliente(ian)).toEqual(false)
})

test("002 cliente registrado", () => {
    const ian = new Cliente(nombre = "ian capon", linea = 1133492294)
    const registro = new Registro(clientes = [ian])

    expect(registro.esCliente(ian)).toEqual(true)
})

test("003 cliente intenta comprar paquete, no tiene saldo", () => {
    const paqueteMock = {
        precio: jest.fn().mockReturnValue(1000)
    }
    const cuentaMock = {
        debitar: jest.fn().mockImplementation(() => {
            throw new Error("Fondos insuficientes.")
        })
    }

    const ian = new Cliente(nombre = "ian capon", linea = 1133492294, cuenta = cuentaMock)

    expect(() => ian.comprarPaquete(paqueteMock)).toThrow(new Error("Fondos insuficientes."))

})

test("004 cliente tiene saldo, compra un paquete", () => {
    const paqueteActivadoMock = { paqueteActivo: true }
    const paqueteMock = {
        precio: jest.fn().mockReturnValue(1000),
        activo: jest.fn().mockReturnValue(paqueteActivadoMock)
    }
    const cuentaMock = {
        debitar: jest.fn().mockReturnValue(1000)
    }
    const ian = new Cliente(nombre = "ian capon", linea = 1133492294, cuenta = cuentaMock)

    ian.comprarPaquete(paqueteMock)

    expect(cuentaMock.debitar).toHaveBeenCalledWith(1000);
    expect(paqueteMock.activo).toHaveBeenCalled();
    expect(ian.paqueteActivo).toEqual(paqueteActivadoMock);
})

test("005 cliente carga dinero en cuenta, y compra un paquete", () => {
    const relojMock = {
        ahora: () => new Date("12/12/2012")
    }
    
    const cuentaReal = new Cuenta()
    const ian = new Cliente(nombre = "ian capon", linea = 1133492294, cuenta = cuentaReal, reloj = relojMock)
    
    const paqueteActivadoMock = { paqueteActivo: true, fechaDeActivacion: new Date("12/12/2012") }
    const paqueteMock = {
        precio: jest.fn().mockReturnValue(1000),
        activo: jest.fn().mockImplementation(() => {
            return {
                paqueteActivo: true,
                fechaDeActivacion: relojMock.ahora()
            }
        })
    }

    ian.cargar(2000)
    ian.comprarPaquete(paqueteMock)

    expect(paqueteMock.activo).toHaveBeenCalled();
    expect(ian.paqueteActivo).toEqual(paqueteActivadoMock);
})