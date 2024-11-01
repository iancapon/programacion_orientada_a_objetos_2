const Calendario = function(){
    this.fechas = []
    this.nuevoFranco = function(fecha){
        this.fechas.push(fecha)
    }
    this.esFranco = function(fecha){
        const encuentra = this.fechas.find(franco => franco.soyLaMismaFecha(fecha))
        return encuentra !== undefined
    }
}

module.exports = Calendario