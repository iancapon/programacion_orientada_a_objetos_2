const FechaExacta = require("./tiposDeFechas/FechaExacta")
const FechaRepetidaAnio = require("./tiposDeFechas/FechaRepetidaAnio")
const DiaCadaMesAnioEspecifico = require("./tiposDeFechas/DiaCadaMesAnioEspecifico")
const DiaSemanaAnioEspecifico = require("./tiposDeFechas/DiaSemanaAnioEspecifico")
const DiaSemanaMesEspecificoTodosLosAnios = require("./tiposDeFechas/DiaSemanaMesEspecificoTodosLosAnios")
const DiaSemanaTodosLosAnios = require("./tiposDeFechas/DiaSemanaTodosLosAnios")
const MesAnioEspecifico = require("./tiposDeFechas/MesAnioEspecifico")
const FechaInvalida = require("./tiposDeFechas/FechaInvalida")

const crearFecha = function (dia, mes, anio) {
    const tiposDeFecha = [
        new FechaExacta(dia, mes, anio),
        new FechaRepetidaAnio(dia, mes, anio),
        new DiaSemanaAnioEspecifico(dia, mes, anio),
        new DiaSemanaTodosLosAnios(dia, mes, anio),
        new MesAnioEspecifico(dia, mes, anio),
        new DiaCadaMesAnioEspecifico(dia, mes, anio),
        new DiaSemanaMesEspecificoTodosLosAnios(dia, mes, anio),
        new FechaInvalida(dia, mes, anio)
    ]
    return tiposDeFecha.find(tipo => tipo.tipoCorrecto())
}


module.exports = {
    crearFecha: crearFecha,
}