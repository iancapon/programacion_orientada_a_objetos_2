const Cliente = require("../src/Cliente")
const Registro = require("../src/Registro")
const Cuenta = require("../src/Cuenta")
const { Paquete, PaqueteActivo } = require("../src/Paquete")
const {Consumo} = require("../src/Consumo")

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
    const relojMock = { ahora: () => new Date("12/12/2012") }

    const ian = new Cliente(nombre = "ian capon", linea = 1133492294, cuenta = cuentaMock, reloj = relojMock)

    expect(() => ian.comprarPaquete(paqueteMock)).toThrow(new Error("Fondos insuficientes."))

})

test("004 cliente tiene saldo, compra un paquete", () => {
    const paqueteBasico = new Paquete(precio = 1000, minutos = 100, megabytes = 4000, dias = 30)
    const relojMock = {
        ahora: () => new Date("12/12/2012")
    }
    const cuentaMock = {
        debitar: jest.fn().mockReturnValue(1000)
    }
    const ian = new Cliente(nombre = "ian capon", linea = 1133492294, cuenta = cuentaMock, reloj = relojMock)

    ian.comprarPaquete(paqueteBasico)

    expect(cuentaMock.debitar).toHaveBeenCalledWith(1000);
    expect(ian.estado()).toEqual({
        fechaDeActivacion: new Date("12/12/2012"),
        minutosRestantes: 100,
        megabytesRestantes: 4000,
        diasHastaVencimiento: 30,
    });
})

test("005 cliente carga dinero en cuenta, y compra un paquete", () => {
    const relojMock = {
        ahora: () => new Date("12/12/2012")
    }
    const cuentaReal = new Cuenta()
    const paqueteBasico = new Paquete(precio = 1000, minutos = 100, megabytes = 4000, dias = 30)
    const ian = new Cliente(nombre = "ian capon", linea = 1133492294, cuenta = cuentaReal, reloj = relojMock)

    ian.cargar(2000)
    ian.comprarPaquete(paqueteBasico)

    expect(ian.estado()).toEqual({
        fechaDeActivacion: new Date("12/12/2012"),
        minutosRestantes: 100,
        megabytesRestantes: 4000,
        diasHastaVencimiento: 30,
    });
})

test("006 cliente ve su estado de linea, sin tener un paquete", () => {
    const relojMock = {
        ahora: () => new Date("12/12/2012")
    }
    const cuentaReal = new Cuenta()
    const ian = new Cliente(nombre = "ian capon", linea = 1133492294, cuenta = cuentaReal, reloj = relojMock)

    expect(ian.estado()).toEqual({
        minutosRestantes: 0,
        megabytesRestantes: 0,
        diasHastaVencimiento: 0,
    })

})

test("007 cliente efectua un consumo, lo ve reflejado en el estado de su linea", () => {
    const relojMock = {
        ahora: jest.fn()
            .mockReturnValueOnce(new Date("12/12/2012"))
            .mockReturnValue(new Date("12/24/2012"))
    }
    const cuentaReal = new Cuenta()
    const paqueteBasico = new Paquete(precio = 1000, minutos = 100, megabytes = 4000, dias = 30)
    const ian = new Cliente(nombre = "ian capon", linea = 1133492294, cuenta = cuentaReal, reloj = relojMock)
    const consumoReal = new Consumo(minutos = 10, megabytes = 20, duracion = 60)

    ian.cargar(2000)
    ian.comprarPaquete(paqueteBasico)

    ian.consume(consumoReal)

    expect(relojMock.ahora).toHaveReturnedWith(new Date("12/12/2012"))
    expect(relojMock.ahora).toHaveReturnedWith(new Date("12/24/2012"))
    expect(ian.estado()).toEqual({
        minutosRestantes: 90,
        megabytesRestantes: 3980,
        diasHastaVencimiento: 18,
        fechaDeActivacion: new Date("12/12/2012"),
    })

})

test("008 cliente no puede efectuar un consumo mayor de lo que tenga disponible el paquete", () => {
    const relojMock = {
        ahora: jest.fn()
            .mockReturnValueOnce(new Date("12/12/2012"))
            .mockReturnValue(new Date("12/24/2012"))
    }
    const cuentaReal = new Cuenta()
    const paqueteBasico = new Paquete(precio = 1000, minutos = 100, megabytes = 4000, dias = 30)
    const ian = new Cliente(nombre = "ian capon", linea = 1133492294, cuenta = cuentaReal, reloj = relojMock)

    const consumoMinutosDeMas = new Consumo(minutos = 200, megabytes = 0, duracion = 60)
    const consumoMegabytesDeMas = new Consumo(minutos = 0, megabytes = 8000, duracion = 60)

    ian.cargar(2000)
    ian.comprarPaquete(paqueteBasico)

    expect(() => ian.consume(consumoMinutosDeMas)).toThrow(new Error("No se puede consumir esa cantidad."))
    expect(() => ian.consume(consumoMegabytesDeMas)).toThrow(new Error("No se puede consumir esa cantidad."))


})

test("009 cliente efectua varios consumos, los ve reflejados en el registro de consumos", () => {
    const relojMock = {
        ahora: jest.fn()
            .mockReturnValueOnce(new Date("12/12/2012"))
            .mockReturnValueOnce(new Date("12/24/2012"))
            .mockReturnValueOnce(new Date("12/25/2012"))
            .mockReturnValueOnce(new Date("12/26/2012"))
    }
    const cuentaReal = new Cuenta()
    const paqueteBasico = new Paquete(precio = 1000, minutos = 100, megabytes = 4000, dias = 30)
    const ian = new Cliente(nombre = "ian capon", linea = 1133492294, cuenta = cuentaReal, reloj = relojMock)
    const consumoReal = new Consumo(minutos = 10, megabytes = 20, duracion = 60)

    ian.cargar(2000)
    ian.comprarPaquete(paqueteBasico)

    ian.consume(consumoReal)
    ian.consume(consumoReal)
    ian.consume(consumoReal)

    expect(relojMock.ahora).toHaveReturnedWith(new Date("12/12/2012"))
    expect(relojMock.ahora).toHaveReturnedWith(new Date("12/24/2012"))
    expect(relojMock.ahora).toHaveReturnedWith(new Date("12/25/2012"))
    expect(relojMock.ahora).toHaveReturnedWith(new Date("12/26/2012"))

    expect(ian.consumosHastaLaFecha(inicio = new Date("12/23/12"), fin = new Date("12/27/12"))).toEqual([
        {
            minutos: 10,
            megabytes: 20,
            url: null,
            inicio: new Date("2012-12-24T02:59:00.000Z"),
            fin: new Date("2012-12-24T03:00:00.000Z")
        },
        {
            minutos: 10,
            megabytes: 20,
            url: null,
            inicio: new Date("2012-12-25T02:59:00.000Z"),
            fin: new Date("2012-12-25T03:00:00.000Z")
        },
        {
            minutos: 10,
            megabytes: 20,
            url: null,
            inicio: new Date("2012-12-26T02:59:00.000Z"),
            fin: new Date("2012-12-26T03:00:00.000Z")
        }
    ])

})

test("010 cliente no puede comprar paquete antes de que se venza el actual", () => {
    const relojMock = {
        ahora: jest.fn()
            .mockReturnValueOnce(new Date("12/12/2012"))
            .mockReturnValueOnce(new Date("12/24/2012"))
    }
    const cuentaReal = new Cuenta()
    const paqueteBasico = new Paquete(precio = 1000, minutos = 100, megabytes = 4000, dias = 30)
    const ian = new Cliente(nombre = "ian capon", linea = 1133492294, cuenta = cuentaReal, reloj = relojMock)

    ian.cargar(2000)
    ian.comprarPaquete(paqueteBasico)

    expect(relojMock.ahora).toHaveReturnedWith(new Date("12/12/2012"))

    expect(() => ian.comprarPaquete(paqueteBasico)).toThrow(new Error("El paquete sigue activo."))
    expect(relojMock.ahora).toHaveReturnedWith(new Date("12/24/2012"))
})

test("011 cliente compra un paquete nuevo cuando ya se venció el anterior", () => {
    const relojMock = {
        ahora: jest.fn()
            .mockReturnValueOnce(new Date("12/12/2012"))
            .mockReturnValueOnce(new Date("12/01/2013"))
    }
    const cuentaReal = new Cuenta()
    const paqueteBasico = new Paquete(precio = 1000, minutos = 100, megabytes = 4000, dias = 30)
    const ian = new Cliente(nombre = "ian capon", linea = 1133492294, cuenta = cuentaReal, reloj = relojMock)

    ian.cargar(2000)
    ian.comprarPaquete(paqueteBasico)

    expect(relojMock.ahora).toHaveReturnedWith(new Date("12/12/2012"))

    expect(() => ian.comprarPaquete(paqueteBasico)).not.toThrow(new Error("El paquete sigue activo."))
    expect(relojMock.ahora).toHaveReturnedWith(new Date("12/01/2013"))
})

test("012 cliente compra un paquete nuevo cuando ya se agotó el actual", () => {
    const relojMock = {
        ahora: jest.fn()
            .mockReturnValueOnce(new Date("12/12/2012"))
            .mockReturnValueOnce(new Date("12/24/2012"))
    }
    const consumoReal = new Consumo(minutos = 100, megabytes = 4000, duracion = 120)
    const cuentaReal = new Cuenta()
    const paqueteBasico = new Paquete(precio = 1000, minutos = 100, megabytes = 4000, dias = 30)
    const ian = new Cliente(nombre = "ian capon", linea = 1133492294, cuenta = cuentaReal, reloj = relojMock)

    ian.cargar(2000)
    ian.comprarPaquete(paqueteBasico)

    expect(relojMock.ahora).toHaveReturnedWith(new Date("12/12/2012"))

    expect(() => ian.comprarPaquete(paqueteBasico)).toThrow(new Error("El paquete sigue activo."))
    expect(relojMock.ahora).toHaveReturnedWith(new Date("12/24/2012"))

    ian.consume(consumoReal)

    expect(relojMock.ahora).toHaveReturnedWith(new Date("12/24/2012"))
    expect(() => ian.comprarPaquete(paqueteBasico)).not.toThrow(new Error("El paquete sigue activo."))
})

test("013 configurar un paquete para renovarse automáticamente", () => {
    const relojMock = {
        ahora: jest.fn()
            .mockReturnValueOnce(new Date("12/12/2012"))
            .mockReturnValueOnce(new Date("01/11/2013"))
            .mockReturnValueOnce(new Date("01/12/2013"))
    }

    const cuentaReal = new Cuenta()
    const paqueteBasico = new Paquete(precio = 1000, minutos = 100, megabytes = 4000, dias = 30)
    const ian = new Cliente(nombre = "ian capon", linea = 1133492294, cuenta = cuentaReal, reloj = relojMock)

    ian.cargar(2000)

    ian.comprarPaquete(paqueteBasico, autorenovado = true)
    expect(relojMock.ahora).toHaveReturnedWith(new Date("12/12/2012"))

    expect(ian.estado()).toEqual({
        minutosRestantes: 100,
        megabytesRestantes: 4000,
        diasHastaVencimiento: 0,
        fechaDeActivacion: new Date("12/12/2012"),
    })
    expect(relojMock.ahora).toHaveReturnedWith(new Date("01/11/2013"))


    expect(ian.estado()).toEqual({
        minutosRestantes: 100,
        megabytesRestantes: 4000,
        diasHastaVencimiento: 30,
        fechaDeActivacion: new Date("01/12/2013"),
    })

    expect(relojMock.ahora).toHaveReturnedWith(new Date("01/11/2013"))

})