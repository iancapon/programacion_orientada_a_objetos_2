const ian={
    nombre:"ian",
    edad: 22.9
}
ian.saludar1 = () =>"hola, soy "+this.nombre;
ian.saludar2 = function(){return "hola, soy "+this.nombre};

const pedro= Object.create(ian)
pedro.nombre="San Pedrito"
pedro.edad=23

//console.log(pedro.saludar2())

ian.obtenerEdad= function (){
    return this.edad
}

console.log(ian.obtenerEdad())
console.log(pedro.obtenerEdad())//<<esto anda