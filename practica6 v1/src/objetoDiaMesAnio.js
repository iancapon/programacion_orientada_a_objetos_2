const dia = function (dato) {
    const _dias = [
        "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
        "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
        "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
    ]
    const _semana = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
    if (typeof dato == "number") {
        return dato
    }
    if (typeof dato == "string") {
        const valor = _dias.indexOf(dato)
        if (valor >= 0) {
            return valor + 1
        }
        return _semana.indexOf(dato)
    }
    return undefined
}

const mes = function (dato) {
    const _meses = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
        "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"
    ];
    if (typeof dato == "number") {
        return dato - 1
    }
    if (typeof dato == "string") {
        const valor = _meses.indexOf(dato) % 12
        if (valor >= 0) {
            return valor
        }
    }
    return undefined
}

const anio = function (dato) {
    if (typeof dato == "number") {
        return dato
    }
    if (typeof dato == "string") {
        return Number(dato)
    }
    return undefined
}

const diaDeSemanaValido = function (dato) {
    const _semana = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
    return _semana.includes(dato)
}

const diaDeSemanaSegunIndice = function (dato) {
    const _semana = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
    return _semana[dato]
}

const mesSegunIndice = function (dato) {
    const _meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    return _meses[dato]
}

module.exports = {
    diaValido: dia,
    mesValido: mes,
    anioValido: anio,
    diaDeSemanaValido: diaDeSemanaValido,
    diaDeSemanaSegunIndice: diaDeSemanaSegunIndice,
    mesSegunIndice: mesSegunIndice
}
