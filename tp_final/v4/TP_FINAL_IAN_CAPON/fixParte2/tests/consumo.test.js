const Cliente = require("../src/Cliente")
const { Consumo, ConsumoDetalladoInternet } = require("../src/Consumo")
const Cuenta = require("../src/Cuenta")
const { Paquete } = require("../src/Paquete")
beforeEach(() => {
    cuenta = new Cuenta()
    paquete = new Paquete(precio = 1000, minutos = 100, megabytes = 4000, dias = 30)
    relojMock = {
        ahora: jest.fn()
    }
    cliente = new Cliente("ian capon", 1133492294, cuenta, relojMock)
})
test("001 consumo detallado de una url", () => {
    relojMock.ahora.mockReturnValue(new Date("12/12/2012"))
    const consumoWhatsApp = new ConsumoDetalladoInternet(megabytes = 15, url = "http://whatsapp.com?algo", duracion = 60)

    cliente.cargar(1000)
    cliente.comprarPaquete(paquete)
    cliente.consume(consumoWhatsApp)

    expect(relojMock.ahora).toHaveReturnedWith(new Date("12/12/2012"))
    expect(cliente.estado()).toEqual({
        minutosRestantes: 100,
        megabytesRestantes: 3985,
        diasHastaVencimiento: 30,
        fechaDeActivacion: new Date("12/12/2012"),
    })

    expect(cliente.consumosHastaLaFecha()).toEqual([
        {
            minutos: 0,
            megabytes: 15,
            url: "http://whatsapp.com?algo",
            inicio: new Date("2012-12-12T02:59:00.000Z"),
            fin: new Date("2012-12-12T03:00:00.000Z")
        },
    ])
})

test("002 consumo de una app con una url de consumo ilimitado", () => {
    relojMock.ahora.mockReturnValueOnce(new Date("12/12/2012"))
    relojMock.ahora.mockReturnValueOnce(new Date("12/13/2012"))
    relojMock.ahora.mockReturnValueOnce(new Date("12/14/2012"))
    relojMock.ahora.mockReturnValue(new Date("12/15/2012"))

    const consumoWhatsApp = new ConsumoDetalladoInternet(megabytes = 30, url = "http://whatsapp.com?algo", duracion = 60)
    const consumoInstagram = new ConsumoDetalladoInternet(megabytes = 15, url = "http://instagram.com?algo", duracion = 60)
    const consumoNoDetallado = new Consumo(minutos = 10, megabytes = 30, duracion = 60)

    const urlsDeUsoIlimitado = ["instagram.com", "telegram.com"]

    const paqueteEspecial = new Paquete(precio = 1000, minutos = 100, megabytes = 4000, dias = 30, ilimitadas = urlsDeUsoIlimitado)

    cliente.cargar(1000)
    cliente.comprarPaquete(paqueteEspecial)
    cliente.consume(consumoWhatsApp)
    cliente.consume(consumoInstagram)
    cliente.consume(consumoNoDetallado)


    expect(cliente.estado()).toEqual({
        minutosRestantes: 90,
        megabytesRestantes: 3940,
        diasHastaVencimiento: 27,
        fechaDeActivacion: new Date("12/12/2012"),
    })

    expect(cliente.consumosHastaLaFecha()).toEqual([
        {
            minutos: 0,
            megabytes: 30,
            url: "http://whatsapp.com?algo",
            inicio: new Date("2012-12-13T02:59:00.000Z"),
            fin: new Date("2012-12-13T03:00:00.000Z")
        },
        {
            minutos: 0,
            megabytes: 15,
            url: "http://instagram.com?algo",
            inicio: new Date("2012-12-14T02:59:00.000Z"),
            fin: new Date("2012-12-14T03:00:00.000Z")
        },
        {
            minutos: 10,
            megabytes: 30,
            url: null,
            inicio: new Date("2012-12-15T02:59:00.000Z"),
            fin: new Date("2012-12-15T03:00:00.000Z")
        },
    ])
})