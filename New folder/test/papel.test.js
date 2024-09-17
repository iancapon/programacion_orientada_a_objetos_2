const Piedra= require("../src/piedra")
const Papel= require("../src/papel")
const Tijera= require("../src/tijera")


test("Papel contra papel es empate.",()=>{
    // setup
    const papel1 = new Papel()
    const papel2 = new Papel()
    // act
    const resultado = papel1.contra(papel2)
    // assert
    expect(resultado).toBe("Empate")
})

test("Papel contra tijera es Derrota.",()=>{
    // setup
    const papel = new Papel()
    const tijera = new Tijera()
    // act
    const resultado = papel.contra(tijera)
    // assert
    expect(resultado).toBe("Derrota")
})

test("Papel contra piedra es Victoria.",()=>{
    // setup
    const papel = new Papel()
    const piedra = new Piedra()
    // act
    const resultado = papel.contra(piedra)
    // assert
    expect(resultado).toBe("Victoria")
})