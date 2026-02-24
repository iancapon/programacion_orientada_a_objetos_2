const Consumo = function (minutos, megabytes, duracion) {
    this.resumen = (horaDelRegistro) => {
        const MILISaSEGUNDOS = 1000

        return {
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

module.exports = Consumo