const prototypeChain=require("./prototypeChain")
const Persona = function(nombre,edad){
    this.nombre=nombre
    this.edad=edad
};
Persona.prototype.saludar = function(){
    console.log("hola, mi nombre es " + this.nombre + " y tengo " + this.edad + " años.")
};
const Musico = function(nombre,edad,instrumento){
    Persona.call(this, nombre, edad);
    this.instrumento = instrumento
}
Musico.prototype = Object.create(Persona.prototype);
Musico.prototype.constructor = Musico;
Musico.prototype.tocarInstrumento = function(){
    console.log("Estoy tocando " + this.instrumento)
}

const juan = new Musico("juan",23,"la flauta");

prototypeChain(juan)
juan.tocarInstrumento()








module.exports=Musico