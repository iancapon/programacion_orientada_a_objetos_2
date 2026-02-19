const Consumo = function (minutos, megabytes, duracion) {
    this.resumen = (horaDelRegistro) => { //el consumo llega al sistema una vez terminó
        const MILISaSEGUNDOS = 1000

        return {
            minutos,
            megabytes,
            inicio: new Date(horaDelRegistro - duracion * MILISaSEGUNDOS),
            fin: horaDelRegistro
        }
    }
}

module.exports = Consumo