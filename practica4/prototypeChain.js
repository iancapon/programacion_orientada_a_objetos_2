function prototypeChain(obj) {
    console.log(obj.constructor.name);
    console.log(" ║ >>> " + JSON.stringify(obj));
    var proto = Object.getPrototypeOf(obj);
    while(proto!=null){
    if(Object.getPrototypeOf(proto)==null) {
    console.log(" ╚═ " + proto.constructor.name);
    console.log(" >>> " + JSON.stringify(proto));
    }
    else {
    console.log(" ╠═ " + proto.constructor.name);
    console.log(" ║ >>> " + JSON.stringify(proto));
    }
    proto = Object.getPrototypeOf(proto);
    }
}
module.exports=prototypeChain