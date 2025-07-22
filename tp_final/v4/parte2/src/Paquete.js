const Paquete = function (nombre, precio, gb, minutos, duracion, appsIlimitadas) {
    this.nombre = () => nombre
    this.gb = () => gb
    this.minutos = () => minutos
    this.duracion = () => duracion
    this.precio = () => precio
    this.appsIlimitadas = () => appsIlimitadas

    this.informacionDelPaquete = function () {
        return {
            "GB disponibles: ": this.gb(),
            "minutos disponibles: ": this.minutos(),
            "Dias hasta que venza: ": this.duracion(),
            "apps ilimitadas": this.appsIlimitadas()
        }
    }

    this.soyElMismoPaquete = function (paqueteAChequear) {
        return this.nombre() == paqueteAChequear.nombre()
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

    this.duplicado = (fecha) => this.crearPaqueteActivo(this.gb(), this.minutos(), fecha.fechaActual(), fecha)
}

const PaqueteActivo = function (nombre, precio, gb, minutos, duracion, fechaDeCompra, fechaActual, appsIlimitadas) {
    Paquete.call(this, nombre, precio, gb, minutos, duracion, appsIlimitadas)
    this.fechaDeCompra = () => fechaDeCompra
    this.fechaActual = fechaActual
    this.diasHastaQueVenza = () => {
        return this.duracion() - (this.fechaActual.fechaActual() - this.fechaDeCompra()) / (1000 * 60 * 60 * 24)
    }

    this.informacionDelPaquete = function () {
        return {
            "Fecha de compra: ": this.fechaDeCompra().toUTCString(),
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

    this.prestarDatosMinutos = function (datos, minutos) {
        if (this.gb() < datos || this.minutos() < minutos) {
            throw new Error("No alcanzan los datos / minutos que se desean prestar")
        }
        if (datos < 0 || minutos < 0) {
            throw new Error("Se tiene que ingresar una cantidad positiva a los datos / minutos prestados")
        }

        const resultado = {
            "datosResultantesDelQuePresta":
                this.crearPaqueteActivo(
                    this.gb() - datos,
                    this.minutos() - minutos,
                    this.fechaDeCompra(),
                    this.fechaActual
                ),
            "datosResultantesPrestados":
                this.crearPaqueteActivo(
                    datos,
                    minutos,
                    this.fechaDeCompra(),
                    this.fechaActual
                )
        }
        return resultado
    }


    this.sumarPlanCambiandoVencimiento = function (otroPlan) {
        return this.crearPaqueteActivo(
            this.gb() + otroPlan.gb(),
            this.minutos() + otroPlan.minutos(),
            otroPlan.fechaDeCompra(),
            this.fechaActual,
        )
    }



    this.chequearAppUsoIlimitado = function (consumo) {
        if (this.appsIlimitadas().includes(consumo.app())) {
            return 0
        }
        return consumo.datos()
    }

    this.consumir = function (consumo) {
        if (this.gb() < consumo.datos()) {
            throw new Error("Cliente no puede consumir datos que no tiene.")
        }
        if (this.minutos() < consumo.minutos()) {
            throw new Error("Cliente no puede consumir minutos que no tiene.")
        }
        return this.crearPaqueteActivo(
            this.gb() - this.chequearAppUsoIlimitado(consumo),
            this.minutos() - consumo.minutos(),
            this.fechaDeCompra(),
            this.fechaActual,
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