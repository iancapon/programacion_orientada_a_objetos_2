const Rover=require("../src/rover")

describe("Movimiento simple desde el centro(50x,50y) por un casillero",()=>{
    test("Mueve +1 en y",()=>{
        const rover=new Rover()
        const inicial=rover.miPosicion()
        const nueva={
            x:inicial.x,
            y:inicial.y+1
        }
        rover.mover("w")
        expect(rover.miPosicion()).toEqual(nueva)
    })
    test("Mueve -1 en y",()=>{
        const rover=new Rover()
        const inicial=rover.miPosicion()
        const nueva={
            x:inicial.x,
            y:inicial.y-1
        }
        rover.mover("s")
        expect(rover.miPosicion()).toEqual(nueva)
    })
    //
    test("Mueve +1 en x",()=>{
        const rover=new Rover()
        const inicial=rover.miPosicion()
        const nueva={
            x:inicial.x+1,
            y:inicial.y
        }
        rover.mover("d")
        expect(rover.miPosicion()).toEqual(nueva)
    })
    test("Mueve -1 en x",()=>{
        const rover=new Rover()
        const inicial=rover.miPosicion()
        const nueva={
            x:inicial.x-1,
            y:inicial.y
        }
        rover.mover("a")
        expect(rover.miPosicion()).toEqual(nueva)
    })
})

describe("Mover una secuencia de lugares desde el centro(50x,50y)",()=>{
    test("Mueve +5 en y",()=>{
        const rover=new Rover()
        const inicial=rover.miPosicion()
        const nueva={
            x:inicial.x,
            y:inicial.y+5
        }
        rover.mover("wwwww")
        expect(rover.miPosicion()).toEqual(nueva)
    })
    test("Mueve +5 en y, -5 en x",()=>{
        const rover=new Rover()
        const inicial=rover.miPosicion()
        const nueva={
            x:inicial.x-5,
            y:inicial.y+5
        }
        rover.mover("wwwwwaaaaa")
        expect(rover.miPosicion()).toEqual(nueva)
    })
    test("Mueve +1 en x, -1 en x, +1 en y, -1 en y",()=>{
        const rover=new Rover()
        const inicial=rover.miPosicion()
        rover.mover("wasd")
        expect(rover.miPosicion()).toEqual(inicial)
    })
})
describe("Se manda una secuencia que se sale del mapa, no se mueve",()=>{
    test("Intenta moverse desde (50x, 95y) +10 en y, se queda en el lugar",()=>{
        const rover=new Rover()
        rover.mover("wwwwwwwwww")
        rover.mover("wwwwwwwwww")
        rover.mover("wwwwwwwwww")
        rover.mover("wwwwwwwwww")
        rover.mover("wwwww")
        const inicial=rover.miPosicion()
        rover.mover("wwwwwwwwww")
        expect(rover.miPosicion()).toEqual(inicial)
    })
})