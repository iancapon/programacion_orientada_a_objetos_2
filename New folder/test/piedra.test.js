const Piedra= require("../src/piedra")
const Papel= require("../src/papel")
const Tijera= require("../src/tijera")


test("Piedra contra piedra es empate.",()=>{
    // setup
    const piedra1 = new Piedra()
    const piedra2 = new Piedra()
    // act
    const resultado = piedra1.contra(piedra2)
    // assert
    expect(resultado).toBe("Empate")
})

test("Piedra contra tijera es Victoria.",()=>{
    // setup
    const piedra = new Piedra()
    const tijera = new Tijera()
    // act
    const resultado = piedra.contra(tijera)
    // assert
    expect(resultado).toBe("Victoria")
})

test("Piedra contra papel es Derrota.",()=>{
    // setup
    const piedra = new Piedra()
    const papel = new Papel()
    // act
    const resultado = piedra.contra(papel)
    // assert
    expect(resultado).toBe("Derrota")
})