const pilotos = [
    "Verstappen",
    "Hamilton",
    "Russell",
    "Sainz",
    "Perez",
    "Leclerc",
    "Norris",
    "Alonso",
    "Ocon",
    "Vettel",
];

const ejercicioC = letra => pilotos.filter(x => x.includes(letra) || x.includes(letra.toUpperCase()));

//console.log(ejercicioC("a"))

const ejercicioD = check => check.map(x => pilotos.includes(x));

//console.log(ejercicioD(["Russell", "Bottas", "Perez"]))

const corregirPilotos = a_corregir => {
    let nuevo = a_corregir.concat()
    nuevo.splice(4, 1);
    nuevo.splice(1, 0, "Perez")
    return nuevo
};

//corregirPilotos(pilotos).forEach(element => console.log(element + " ; "))



const howManyTimesAppear = (array, number) => array.reduce((acumulador, esteValor) => acumulador + ((esteValor == number) ? 1 : 0))

const array = [3, 6, 9, 3, 1, 5, 2, 10];

console.log(howManyTimesAppear(array,8))