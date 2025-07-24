const FechaCompartida = require("./FechaCompartida")

const Sistema = function (fecha, listaDeClientes , listaDePaquetes ) {
    this.clientes = listaDeClientes.map(cliente => cliente.duplicado(new FechaCompartida(fecha)))
    this.paquetes = listaDePaquetes.map(paquete => paquete.duplicadoInactivo())
    this.consumos = []

    this.activarRenovacionAutomaticaParaCliente = function (_cliente) {
        const cliente = this.encontrarCliente(_cliente)
        cliente.activarRenovacionAutomatica()
    }

    this.consumosDe = function(_cliente){
        const cliente = this.encontrarCliente(_cliente)
        const consumosDelCliente = this.consumos.filter(c => c.usuario.soyElMismoCliente(cliente))
        return consumosDelCliente.map(c => c.valor.datosImportantes())
    }

    this.clienteConsume = function (_cliente, consumo) {
        const cliente = this.encontrarCliente(_cliente)
        cliente.actualizarFecha(consumo.fechaDeInicio())
        cliente.actualizarFecha(consumo.fechaDeFin())
        cliente.consume(consumo)
        this.consumos.push({ "usuario": cliente, "valor": consumo })
    }

    this.clienteQuiereSaberCuantoLeQuedaDisponible = function (_cliente, fecha) {
        const cliente = this.encontrarCliente(_cliente)
        cliente.actualizarFecha(fecha)
        return cliente.quedaDisponible()
    }

    this.clientePrestaDatosAOtro = function(_clienteEmisor, _clienteReceptor, datos, minutos, fecha){
        const clienteEmisor = this.encontrarCliente(_clienteEmisor)
        const clienteReceptor = this.encontrarCliente(_clienteReceptor)
        clienteEmisor.actualizarFecha(fecha)
        clienteReceptor.actualizarFecha(fecha)
        clienteReceptor.recibirDatosMinutosEmprestados(clienteEmisor,datos,minutos)

    }

    this.clienteCargaDineroEnCuenta = function (_cliente, dinero, fecha) {
        const cliente = this.encontrarCliente(_cliente)
        cliente.actualizarFecha(fecha)
        cliente.cargaDineroEnCuenta(dinero)
    }

    this.clienteCompraPaquete = function (_cliente, _paquete, fecha) {
        const cliente = this.encontrarCliente(_cliente)
        const paquete = this.encontrarPaquete(_paquete)
        cliente.actualizarFecha(fecha)

        return cliente.compraPaquete(paquete)
    }

    this.encontrarCliente = function (cliente) {
        const encontrado = this.clientes.find(x => x.soyElMismoCliente(cliente))
        if (encontrado == undefined) {
            throw new Error("El cliente no se encuentra en el sistema.")
        }
        return encontrado
    }

    this.encontrarPaquete = function (paquete) {
        const encontrado = this.paquetes.find(x => x.soyElMismoPaquete(paquete))
        if (encontrado == undefined) {
            throw new Error("El paquete no se encuentra en el sistema.")
        }
        return encontrado
    }

}

module.exports = Sistema
