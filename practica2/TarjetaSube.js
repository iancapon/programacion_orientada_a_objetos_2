const TarjetaSube = function(mi_id){//// ahora es una funcion constructora
    const SALDO_MINIMO=-600
    this.mi_id=mi_id
    this.mi_saldo=0
        
    this.obtenerSaldo = function(){
        return this.mi_saldo
    }
    this.obtenerId=function(){
        return this.mi_id
    }

    this.cargarSaldo=function(saldo_a_cargar){
        this.mi_saldo+=saldo_a_cargar
    }

    this.pagarViaje=function(monto_a_descontar){
        this.verificarSaldoSuficienteParaViajar(monto_a_descontar)
        this.mi_saldo -= monto_a_descontar
    }

    this.verificarSaldoSuficienteParaViajar=function(monto_a_descontar) {
        if (this.mi_saldo - monto_a_descontar < SALDO_MINIMO) {
            throw new Error("Saldo insuficiente.")
        }
    }
}

module.exports = TarjetaSube;
