function Persona (nombre,edad){
    this.nombre=nombre
    this.edad=edad
}

const juan= new Persona("juam",20)
const pedro= new Persona("pedro",30)

Persona.prototype.intereses = ["js","java"]
pedro.intereses = ["js","java","python"]

console.log(juan.intereses)
console.log(pedro.intereses)

juan.saludar = function(){
    return this.edad;
}
console.log(juan)
console.log(juan.saludar())
//console.log(pedro.saludar()) //<<esto da error

class PersonaClass{
    constructor(nombre,apellido){
        this.nombre=nombre
        this.apellido=apellido
    }
}

class PersonaConEdad extends PersonaClass{
    constructor(nombre,apellido,edad){
        super(nombre,apellido)
        this.edad=edad
    }
}

const john = new PersonaConEdad("john","connor",28)
console.log(john)