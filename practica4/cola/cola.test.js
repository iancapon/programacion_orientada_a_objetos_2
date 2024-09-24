/*
Modelar utilizando objetos una Cola o Queue; recordar:
    1. La cola funciona FIFO (Primero que entra es el primero en salir)
    2. Se debe poder encolar y desencolar elementos
    3. La solución debe seguir los criterios vistos en la materia
    4. Sumado a esto, no se puede utilizar arrays para llegar a la solución.
    5. Nos interesa que el objeto sepa responder a los mensajes:
        i. Encolar -> Añade un elemento a la cola
        ii. Desencolar -> Devuelve el primer elemento encolado (FIFO), y lo elimina. Al
            desencolar si no hay elemento se debe lanzar un error.
*/
const Cola = require("./src/cola")

test("Desencolar falla al estar la cola vacia",()=>{
    const cola = new Cola()

    expect(()=>cola.desencolar()).toThrow(new Error(cola.mensajeDeError()))
})

test("Cuando la cola tiene un elemento, al desencolarlo lo obtengo",()=>{
    const cola = new Cola()
    const elemento = 1

    cola.encolar(elemento)
    
    expect(cola.desencolar()).toBe(elemento)
})

test("encolo 1, desencolo 2 y falla al segundo",()=>{
    const cola = new Cola()
    const elemento = 1

    cola.encolar(elemento)
    cola.desencolar()
    expect(()=>cola.desencolar()).toThrow(new Error(cola.mensajeDeError()))
})
test("Encolo 2 elementos, desencolo y obtengo el primero",()=>{
    const cola = new Cola()
    const elemento1 = 1
    const elemento2 = 2

    cola.encolar(elemento1)
    cola.encolar(elemento2)

    expect(cola.desencolar()).toBe(elemento1)
    
})
test("Encolo 2 elementos, desencolo 2 veces y obtengo el segundo",()=>{
    const cola = new Cola()
    const elemento1 = 1
    const elemento2 = 2

    cola.encolar(elemento1)
    cola.encolar(elemento2)

    expect(cola.desencolar()).toBe(elemento2)
    
})
        ///////
    //////////////
  ////// //// ///////
////////_////_/////////
///////////////////////
 /////_  //// _//////
   /////_____//////
       ////////