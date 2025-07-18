const Paquete = function (datos, minutos, dias, costo) {
    this.datos = () => datos
    this.minutos = () => minutos
    this.dias = () => dias
    this.costo = () => costo

    this.soy = function (paquete) {
        if (paquete instanceof Paquete) {// ?
            return this.datos() === paquete.datos() && this.minutos() === paquete.minutos() && this.dias() === paquete.dias() && this.costo() === paquete.costo() 
        }
        return false
    }
}

module.exports = Paquete