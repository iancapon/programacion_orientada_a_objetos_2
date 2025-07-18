const Cuenta = function () {
    this.saldo = 0

    this.cargar = function(monto){
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