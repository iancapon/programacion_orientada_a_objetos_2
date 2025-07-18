const Sistema = function (fechaActual) {
    this.clientes = []
    this.paquetes = []
    this.fechaActual = fechaActual // si al momento de un movimiento no se ingresa una fecha, 
    // el sistema asume que no cambió


    this.nuevoConsumo = function (cliente, consumo, fecha) {
        this.validarFecha(fecha)
        let cl = this.validarCliente(cliente)
        cl.consumir(consumo, fecha)
    }

    this.consumosDe = function (cliente) {
        let cl = this.validarCliente(cliente)
        return cl.resumenDeConsumos()
    }

    this.nuevoCliente = function (cliente, fecha) {
        this.validarFecha(fecha)
        this.clientes.push(cliente)
    }

    this.nuevoPaquete = function (paquete, fecha) {
        this.validarFecha(fecha)
        this.paquetes.push(paquete)
    }

    this.validarFecha = function (fecha) {
        if (fecha instanceof Date ) {
            if (fecha.getTime() < this.fechaActual.getTime()) {
                throw new Error("Fecha invalida.")
            }
            this.fechaActual = fecha
        }
    }

    this.validarCliente = function (cliente) {
        let cl = this.clientes.find(cl => cliente.soy(cl))// si lo encuentra devuelve el cliente que está en la lista,
        if (cl === undefined) {
            throw new Error("El cliente no se encuentra en el sistema.")
        }
        return cl
    }
    this.validarPaquete = function (paquete) {
        let pq = this.paquetes.find(pq => paquete.soy(pq))// si lo encuentra devuelve el paquete que está en la lista,
        if (pq === undefined) {
            throw new Error("El paquete no se encuentra en el sistema.")
        }
        return pq
    }

    this.ingresarSaldo = function (cliente, saldo, fecha) {
        this.validarFecha(fecha)
        let cl = this.validarCliente(cliente)
        cl.ingresarEnCuenta(saldo)
    }

    this.comprarPaquete = function (cliente, paquete, fecha) {
        this.validarFecha(fecha)

        let cl = this.validarCliente(cliente)
        let pq = this.validarPaquete(paquete)

        cl.validarQueHaVencidoElPlan(this.fechaActual)
        cl.validarDineroEnCuenta(pq.costo())
        cl.adquirirPaquete(pq, fecha)
        cl.debitarDeCuenta(pq.costo())

        return "Se ha comprado un paquete."
    }

    this.paqueteVigente = function (cliente) {
        let cl = this.validarCliente(cliente)
        return cl.paquete
    }

    this.leQueda = function (cliente) {
        let cl = this.validarCliente(cliente)
        return {
            datos: cl.planVigente.datos,
            minutos: cl.planVigente.minutos,
            dias: 28//( cl.paquete - cl.planVigente.tiempoDesdeAdquisicion(this.fechaActual) ) / (24 * 60 * 60 * 1000)
        }
    }


}

module.exports = Sistema