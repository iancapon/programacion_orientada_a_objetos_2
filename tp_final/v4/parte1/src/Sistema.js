const Sistema = function (fecha, listaDeClientes = [], listaDePaquetes = []) {
    this.fecha = fecha
    this.clientes = listaDeClientes.map(cliente => cliente.duplicado(this.fecha))
    this.paquetes = listaDePaquetes.map(paquete => paquete.duplicado(this.fecha))

    this.clienteQuiereSaberCuantoLeQuedaDisponible = function(_cliente, fecha){
        let cliente = this.encontrarCliente(_cliente)
        this.fecha= fecha
        return cliente.quedaDisponible(this.fecha)
    }

    this.clienteCargaDineroEnCuenta = function (_cliente, dinero, fecha) {
        let cliente = this.encontrarCliente(_cliente)
        this.fecha = fecha
        cliente.cargaDineroEnCuenta(dinero, this.fecha)
    }

    this.clienteCompraPaquete = function (_cliente, _paquete, fecha) {
        let cliente = this.encontrarCliente(_cliente)
        let paquete = this.encontrarPaquete(_paquete)
        this.fecha = fecha

        return cliente.compraPaquete(paquete, this.fecha)
    }

    this.encontrarCliente = function (cliente) {
        let encontrado = this.clientes.find(x => x.soyElMismoCliente(cliente))
        if (encontrado == undefined) {
            throw new Error("El cliente no se encuentra en el sistema.")
        }
        return encontrado
    }

    this.encontrarPaquete = function (paquete) {
        let encontrado = this.paquetes.find(x => x.soyElMismoPaquete(paquete))
        if (encontrado == undefined) {
            throw new Error("El paquete no se encuentra en el sistema.")
        }
        return encontrado
    }

}

module.exports = Sistema
