const SistemaCentralizado={//// ahora es un objeto literal
    tarjetas:[],
    
    cargarTarjeta:function(id,monto){
        this.tarjetas.push({id:id,monto:monto})
    },
    encontrarCargasPendientes:function(tarjeta){
        return this.tarjetas.filter(tarj=>tarj.id===tarjeta.obtenerId())
    },
    cantidadRecargasPendientes:function(tarjeta){
        let cargas=this.encontrarCargasPendientes(tarjeta)
        return cargas.length
    },
    acreditarSaldo:function(tarjeta){
        // VERSION 1
        let cargas=this.encontrarCargasPendientes(tarjeta) 
        cargas.map(carga=>{
            tarjeta.cargarSaldo(carga.monto)
            this.tarjetas.splice(this.tarjetas.indexOf(carga),1)
        })
        // VERSION 2
        //let cargas=this.encontrarCargasPendientes(tarjeta)
    }
}

module.exports=SistemaCentralizado;