const Cuenta = function () {
    this.fondos = 0

    this.cargar = (nuevosFondos) => this.fondos += nuevosFondos

    this.debitar = function(fondosADebitar) {
        if(this.fondos < fondosADebitar){
            throw new Error("Fondos insuficientes.")
        }
        this.fondos -= fondosADebitar
    }
}

module.exports = Cuenta