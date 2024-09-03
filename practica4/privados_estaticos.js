const prototypeChain=require("./prototypeChain")

const Persona = (function () {
    let contador = 0;
    const newPersona = function (nombre,edad){
        this.nombre=nombre
        this.edad=edad
        contador++
    }
    newPersona.prototype.saludar = function(){
        console.log("hola, mi nombre es " + this.nombre + " y tengo " + this.edad + " años.")
    };
    newPersona.prototype.getCantidad = function(){
        console.log("hay " + contador + " personas")
    };
    return newPersona
}())

const juan = new Persona("juan",23)
const jose = new Persona("juan",23)
console.log(juan)
console.log("---------")
prototypeChain(juan)
juan.saludar()
juan.getCantidad()