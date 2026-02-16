const Registro = function(clientes = []){
    this.clientes = clientes

    this.esCliente = function(aEncontrar){
        return this.clientes.includes(aEncontrar)
    }
}

module.exports = Registro