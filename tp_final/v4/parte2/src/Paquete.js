const PaqueteNulo = function () {
    this.chequearVencidoAgotado = function () {
        return
    }

    this.consumir = function (consumo) {
        throw new Error("Para usar los datos primero debe comprar un paquete.")
    }

    this.informacionDelPaquete = function () {
        throw new Error("Para usar los datos primero debe comprar un paquete.")
    }
}

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

    this.duplicado = function (fecha) {
        return new PaqueteActivo(
            this.nombre(),
            this.precio(),
            this.gb(),
            this.minutos(),
            this.duracion(),
            fecha.fechaActual(),
            fecha,
            this.appsIlimitadas()
        )
    }
}

const PaqueteActivo = function (nombre, precio, gb, minutos, duracion, fechaDeCompra, fechaActual, appsIlimitadas) {
    this.nombre = () => nombre
    this.gb = () => gb
    this.minutos = () => minutos
    this.duracion = () => duracion
    this.precio = () => precio
    this.fechaDeCompra = () => fechaDeCompra
    this.fechaActual = fechaActual
    this.appsIlimitadas = () => appsIlimitadas

    this.vencido = () => this.duracion() <= (this.fechaActual.fechaActual() - this.fechaDeCompra()) / (1000 * 60 * 60 * 24)

    this.agotado = () => this.gb() <= 0 || this.minutos() <= 0

    this.chequearVencidoAgotado = function () {
        if (!this.vencido() && !this.agotado()) {
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
                new PaqueteActivo(
                    this.nombre(),
                    this.precio(),
                    this.gb() - datos,
                    this.minutos() - minutos,
                    this.duracion(),
                    this.fechaDeCompra(),
                    this.fechaActual,
                    this.appsIlimitadas()
                ),
            "datosResultantesPrestados":
                new PaqueteActivo(
                    this.nombre(),
                    this.precio(),
                    datos,
                    minutos,
                    this.duracion(),
                    this.fechaDeCompra(),
                    this.fechaActual,
                    this.appsIlimitadas()
                )
        }
        return resultado
    }

    this.sumarPlanCambiandoVencimiento = function (otroPlan) {
        return new PaqueteActivo(
            this.nombre(),
            this.precio(),
            this.gb() + otroPlan.gb(),
            this.minutos() + otroPlan.minutos(),
            this.duracion(),
            otroPlan.fechaDeCompra(),
            this.fechaActual,
            this.appsIlimitadas()
        )
    }

    this.informacionDelPaquete = function () {
        return {
            "Fecha de compra: ": this.fechaDeCompra().toUTCString(),
            "GB disponibles: ": this.gb(),
            "minutos disponibles: ": this.minutos(),
            "Dias hasta que venza: ": this.duracion() - (this.fechaActual.fechaActual() - this.fechaDeCompra()) / (1000 * 60 * 60 * 24),
            "apps ilimitadas": this.appsIlimitadas()
        }
    }

    this.soyElMismoPaquete = function (paqueteAChequear) {
        return this.nombre() == paqueteAChequear.nombre()
    }

    this.duplicado = function (fecha) {
        return new PaqueteActivo(
            this.nombre(),
            this.precio(),
            this.gb(),
            this.minutos(),
            this.duracion(),
            fecha.fechaActual(),
            fecha,
            this.appsIlimitadas()
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
        this.chequearAppUsoIlimitado(consumo)
        return new PaqueteActivo(
            this.nombre(),
            this.precio(),
            this.gb() - this.chequearAppUsoIlimitado(consumo),//consumo.datos(),
            this.minutos() - consumo.minutos(),
            this.duracion(),
            this.fechaDeCompra(),
            this.fechaActual,
            this.appsIlimitadas()
        )
    }
}

module.exports = { Paquete, PaqueteNulo, PaqueteActivo }