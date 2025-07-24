const Cuenta = function () {
    this.saldo = 0

    this.cargar = function(monto){
        if(monto < 0){
            throw new Error("No se puede ingresar un monto negativo")
        }
        this.saldo += monto
    }

    this.debitar = function (monto) {
        if (this.saldo < monto) { 
            throw new Error("Cliente no tiene saldo suficiente.")
        }
        this.saldo -= monto
    }

}

module.exports = Cuenta