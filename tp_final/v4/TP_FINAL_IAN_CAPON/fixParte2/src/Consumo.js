const Consumo = function (minutos, megabytes, duracion) {
    this.resumen = (horaDelRegistro) => {
        const MILISaSEGUNDOS = 1000

        return {
            url: null,
            minutos,
            megabytes,
            inicio: new Date(horaDelRegistro - duracion * MILISaSEGUNDOS),
            fin: horaDelRegistro
        }
    }

    this.aplicar = (paquete) => {
        paquete.consumirMinutos(minutos)
        paquete.consumirMegabytes(megabytes)
    }

}
const ConsumoDetalladoInternet = function (megabytes, url, duracion) {
    this.resumen = (horaDelRegistro) => {
        const MILISaSEGUNDOS = 1000

        return {
            url,
            minutos: 0,
            megabytes,
            inicio: new Date(horaDelRegistro - duracion * MILISaSEGUNDOS),
            fin: horaDelRegistro
        }
    }

    this.aplicar = (paquete) => {
        const dominio = url.toLowerCase().split('//')[1].split(/[/?]/)[0]
        paquete.consumirMegabytes(megabytes, dominio)
    }
}

module.exports = { Consumo, ConsumoDetalladoInternet }