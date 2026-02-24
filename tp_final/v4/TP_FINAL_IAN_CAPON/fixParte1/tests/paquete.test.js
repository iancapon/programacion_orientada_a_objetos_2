const { Paquete, PaqueteActivo } = require("../src/Paquete")

test("001 se activa un paquete", () => {
    const relojMock = {
        ahora: () => new Date("12/12/2012")
    }
    const paqueteBasico = new Paquete(precio = 1000, minutos = 100, megabytes = 4000, dias = 30)

    const paqueteActivado = paqueteBasico.activo(relojMock.ahora())

    expect(paqueteActivado.estado(new Date("12/12/2012"))).toEqual({
        minutosRestantes: 100,
        megabytesRestantes: 4000,
        diasHastaVencimiento: 30,
        fechaDeActivacion: new Date("12/12/2012"),
    })
})

test("002 confirmar que un paquete está vencido", () => {
    const relojMock = {
        ahora: jest.fn()
            .mockReturnValueOnce(new Date("12/12/2012"))
            .mockReturnValueOnce(new Date("12/24/2012"))
            .mockReturnValueOnce(new Date("12/01/2013"))
    }
    const paqueteBasico = new Paquete(precio = 1000, minutos = 100, megabytes = 4000, dias = 30)

    const paqueteActivado = paqueteBasico.activo(relojMock.ahora())

    expect(paqueteActivado.estado(new Date("12/24/2012"))).toEqual({
        minutosRestantes: 100,
        megabytesRestantes: 4000,
        diasHastaVencimiento: 18,
        fechaDeActivacion: new Date("12/12/2012"),
    })
    expect(relojMock.ahora).toHaveReturnedWith(new Date("12/12/2012"))

    expect(paqueteActivado.vencido(relojMock.ahora())).toBe(false)
    expect(relojMock.ahora).toHaveReturnedWith(new Date("12/24/2012"))

    expect(paqueteActivado.vencido(relojMock.ahora())).toBe(true)
    expect(relojMock.ahora).toHaveReturnedWith(new Date("12/01/2013"))
})

test("003 confirmar que un paquete está agotado", () => {
    const relojMock = {
        ahora: jest.fn()
            .mockReturnValue(new Date("12/12/2012"))
    }
    const consumoMock = {
        aplicar: (paquete) => {
            paquete.consumirMinutos(100)
            paquete.consumirMegabytes(4000)
        }
    }
    const paqueteBasico = new Paquete(precio = 1000, minutos = 100, megabytes = 4000, dias = 30)

    const paqueteActivado = paqueteBasico.activo(relojMock.ahora())

    expect(paqueteActivado.estado(new Date("12/12/2012"))).toEqual({
        minutosRestantes: 100,
        megabytesRestantes: 4000,
        diasHastaVencimiento: 30,
        fechaDeActivacion: new Date("12/12/2012"),
    })
    expect(relojMock.ahora).toHaveReturnedWith(new Date("12/12/2012"))

    expect(paqueteActivado.agotado()).toBe(false)

    consumoMock.aplicar(paqueteActivado)

    expect(paqueteActivado.agotado()).toBe(true)

})
