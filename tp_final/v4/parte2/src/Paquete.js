const Paquete = function (nombre, precio, gb, minutos, duracion, appsIlimitadas) {
    this.nombre = () => nombre
    this.id = () => nombre
    this.gb = () => gb
    this.minutos = () => minutos
    this.duracion = () => duracion
    this.precio = () => precio
    this.appsIlimitadas = () => appsIlimitadas

    this.mismaId = (id) => id == this.id()

    this.informacionDelPaquete = function () {
        return {
            "GB disponibles: ": this.gb(),
            "minutos disponibles: ": this.minutos(),
            "Dias hasta que venza: ": this.duracion(),
            "apps ilimitadas": this.appsIlimitadas()
        }
    }

    this.soyElMismoPaquete = function (otro) {
        return otro.mismaId(this.id())
    }

    this.duplicadoInactivo = function () {
        return new Paquete(
            this.nombre(),
            this.precio(),
            this.gb(),
            this.minutos(),
            this.duracion(),
            this.appsIlimitadas()
        )
    }

    this.crearPaqueteActivo = function (datos, minutos, fechaDeCompra, fechaActual) {
        return new PaqueteActivo(
            this.nombre(),
            this.precio(),
            datos,
            minutos,
            this.duracion(),
            fechaDeCompra,
            fechaActual,
            this.appsIlimitadas()
        )
    }

    this.duplicadoActivo = (fecha) => this.crearPaqueteActivo(this.gb(), this.minutos(), fecha.fechaActual(), fecha)
}

const PaqueteActivo = function (nombre, precio, gb, minutos, duracion, fechaDeCompra, fechaActual, appsIlimitadas) {
    Paquete.call(this, nombre, precio, gb, minutos, duracion, appsIlimitadas)
    this.fechaDeCompra = () => fechaDeCompra
    this.fecha = () => fechaActual
    this.diasHastaQueVenza = () => {
        return this.duracion() - (this.fecha().fechaActual() - this.fechaDeCompra()) / (1000 * 60 * 60 * 24)
    }

    this.informacionDelPaquete = function () {
        return {
            "Fecha de compra: ": this.fechaDeCompra(),
            "GB disponibles: ": this.gb(),
            "minutos disponibles: ": this.minutos(),
            "Dias hasta que venza: ": this.diasHastaQueVenza(),
            "apps ilimitadas": this.appsIlimitadas()
        }
    }


    this.vencido = () => this.diasHastaQueVenza() <= 0

    this.agotado = () => this.gb() <= 0 || this.minutos() <= 0

    this.vencidoAgotado = () => this.vencido() || this.agotado()

    this.chequearVencidoAgotado = function () {
        if (!this.vencidoAgotado()) {
            throw new Error("No se puede renovar un paquete hasta que este vencido o agotado")
        }
    }

    this.chequearSiSePuedePrestar = function (datos, minutos) {
        if (datos < 0 || minutos < 0) {
            throw new Error("Se tiene que ingresar una cantidad positiva a los datos / minutos prestados")
        }
        if (this.gb() < datos || this.minutos() < minutos) {
            throw new Error("No alcanzan los datos / minutos que se desean prestar")
        }
    }

    this.prestarDatosMinutos = function (datos, minutos) {
        this.chequearSiSePuedePrestar(datos, minutos)
        return {
            "sobrantes":
                this.crearPaqueteActivo(
                    this.gb() - datos,
                    this.minutos() - minutos,
                    this.fechaDeCompra(),
                    this.fecha()
                ),
            "prestados":
                this.crearPaqueteActivo(
                    datos,
                    minutos,
                    this.fechaDeCompra(),
                    this.fecha()
                )
        }
    }


    this.sumarDatosMinutosCambiarVencimiento = function (otroPlan) {
        return this.crearPaqueteActivo(
            this.gb() + otroPlan.gb(),
            this.minutos() + otroPlan.minutos(),
            otroPlan.fechaDeCompra(),
            this.fecha(),
        )
    }

    this.chequearSiSePuedeConsumir = function (datos, minutos) {
        if (this.gb() < datos) {
            throw new Error("Cliente no puede consumir datos que no tiene.")
        }
        if (this.minutos() < minutos) {
            throw new Error("Cliente no puede consumir minutos que no tiene.")
        }
    }

    this.consumir = function (consumo) {
        this.chequearSiSePuedeConsumir(consumo.datos(), consumo.minutos())
        return this.crearPaqueteActivo(
            this.gb() - consumo.datos(this.appsIlimitadas()),
            this.minutos() - consumo.minutos(),
            this.fechaDeCompra(),
            this.fecha(),
        )
    }
}

PaqueteActivo.prototype = Object.create(Paquete.prototype);
PaqueteActivo.prototype.constructor = PaqueteActivo;

const PaqueteNulo = function () {
    this.chequearVencidoAgotado = function () {
        return
    }

    this.consumir = function () {
        throw new Error("Para usar los datos primero debe comprar un paquete.")
    }

    this.informacionDelPaquete = function () {
        throw new Error("Para usar los datos primero debe comprar un paquete.")
    }
}

module.exports = { Paquete, PaqueteNulo, PaqueteActivo }