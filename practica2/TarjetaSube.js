class TarjetaSube {
    static SALDO_MINIMO=-600
    constructor(mi_id){
        this.mi_id=mi_id
        this.mi_saldo=0
        
    }

    obtenerSaldo(){
        return this.mi_saldo
    }

    cargarSaldo(saldo_a_cargar){
        this.mi_saldo+=saldo_a_cargar
    }

    pagarViaje(monto_a_descontar){
        this.verificarSaldoSuficienteParaViajar(monto_a_descontar)
        this.mi_saldo -= monto_a_descontar
    }

    verificarSaldoSuficienteParaViajar(monto_a_descontar) {
        if (this.mi_saldo - monto_a_descontar < TarjetaSube.SALDO_MINIMO) {
            throw new Error("Saldo insuficiente.")
        }
    }
}

module.exports = TarjetaSube;
