const Rover=require("../src/rover")

////////////
describe("Recibe secuencia para moverse un solo lugar",()=>{
    beforeEach(()=>{
        rover=new Rover(100,100)
    })
    test("Secuencia para mover un lugar con 'w' ",()=>{
        rover.mover("w")
        expect(rover.posicionActualDelRover()).toEqual({x:50,y:51})
    })
    test("Secuencia para mover un lugar con 'a' ",()=>{
        rover.mover("a")
        expect(rover.posicionActualDelRover()).toEqual({x:49,y:50})
    })
    test("Secuencia para mover un lugar con 's' ",()=>{
        rover.mover("s")
        expect(rover.posicionActualDelRover()).toEqual({x:50,y:49})
    })
    test("Secuencia para mover un lugar con 'd' ",()=>{
        rover.mover("d")
        expect(rover.posicionActualDelRover()).toEqual({x:51,y:50})
    })
})
////////////
describe("Recibe secuencia para moverse, maximo de 10 casillas",()=>{
    beforeEach(()=>{
        rover=new Rover(100,100)
    })
    test("Recibe una secuencia de 12 movimientos, lanza un error",()=>{
        expect(()=>rover.mover("wasdwasdwasd")).toThrow(new Error("Maximo de 10 casillas"))
    })
    test("Recibe una secuencia de 10 movimientos, termina en el lugar correcto",()=>{
        const inicial=rover.posicionActualDelRover()
        rover.mover("wwwaassddd")
        expect(rover.posicionActualDelRover()).toEqual({
            x:inicial.x+=  2-3,
            y:inicial.y+= -2+3
        })
    })
    test("Recibe mas de dos comandos, termina en el lugar correcto",()=>{
        const inicial=rover.posicionActualDelRover()
        rover.mover("www")
        rover.mover("aaa")
        expect(rover.posicionActualDelRover()).toEqual({
            x:inicial.x+= -3,
            y:inicial.y+= +3
        })
    })
})
////////////
test("Recibe secuencia que intenta desplazarlo fuera del mapa, se queda en el lugar",()=>{
    const rover=new Rover(8,8)//mapa de 8x8, rover aparece en 4x4
    rover.mover("ddddd")
    expect(rover.posicionActualDelRover()).toEqual({
        x:4,
        y:4
    })
})
