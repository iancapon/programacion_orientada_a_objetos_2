/*
    POO2 - Práctica 2: Clases – Parte 2
        Enunciado
            Incorporamos ahora una nueva forma de cargar saldo a una tarjeta sube.
        Existe una nueva clase llamada SistemaCentralizado que recibe cargas de tarjetas. Esto lo realiza a
        través de un mensaje llamado cargarTarjeta que recibe el identificador de una tarjeta sube junto al
        monto a cargar.
            Para completar la carga, se le debe enviar el mensaje acreditarSaldo a la instancia de
        SistemaCentralizado con el objeto TarjetaSube correspondiente como parámetro.
        Un sistema centralizado debe saber responder al mensaje cantidadRecargasPendientes donde
        devuelve un entero que representa todas las cargas pendientes.
            I. Desarrollar el sistema para cumplir con el enunciado.
            II. Agregar los tests necesarios para validar que el sistema funciona como se espera.

    +CargarTarjeta
    +acreditarSaldo(TarjetaSube)
    +cantidadRecargasPnendientes
*/
class SistemaCentralizado{
    constructor(){
        this.tarjetas=[]
    }
    cargarTarjeta(id,monto){
        index=this.tarjetas.findIndex(user=> user[0]==id)
        if(index>=0){
            this.tarjetas[index][1].push(monto)
        }else{
            this.tarjetas.push([id,[monto]])
        }
    }
    cantidadRecargasPendiente(tarjeta){
        id=tarjeta.mi_id
        pendinente=this.tarjetas.find(user=> user[0]==id)
        if (pendiente!=undefined){
            return pendiente[1].length
        }
        return -1
    }
    acreditarSaldo(tarjeta){
        id=tarjeta.mi_id
        index=this.tarjetas.findIndex(user=> user[0]==id)
        if(index>=0){
            monto=this.tarjetas[index][1].pop()
            tarjeta.cargarSaldo(monto)
        }
    }
}

module.exports=SistemaCentralizado;