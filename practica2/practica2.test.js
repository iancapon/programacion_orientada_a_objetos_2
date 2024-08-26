const TarjetaSube = require('./TarjetaSube');
const SistemaCentralizado = require("./SistemaCentralizado");

describe("Sistema Centralizado",() => {
  let sistema = null;
  
  beforeEach(()=>{
    sistema=new SistemaCentralizado()
  })

  test("1",()=>{
    let tarjeta1 = new TarjetaSube(213)
    let tarjeta2 = new TarjetaSube(454)

    sistema.cargarTarjeta(tarjeta1.mi_id,2000)
    sistema.cargarTarjeta(tarjeta1.mi_id,3000)
    expect(sistema.cantidadRecargasPendientes(tarjeta1)).toEqual(2)
  })
})

describe("Tarjeta Sube", () => {
  let tarjeta = null;

  beforeEach(() => {
    tarjeta = new TarjetaSube(123);
  });

  test("Saldo inicial igual a cero", () => {
    expect(tarjeta.obtenerSaldo()).toEqual(0);
  });

  test("Cargar saldo", () => {
    tarjeta.cargarSaldo(1000);
    expect(tarjeta.obtenerSaldo()).toEqual(1000);
    tarjeta.cargarSaldo(120);
    expect(tarjeta.obtenerSaldo()).toEqual(1120);
  });

  test("Pagar viaje", () => {
    tarjeta.cargarSaldo(1000);
    tarjeta.pagarViaje(400)
    expect(tarjeta.obtenerSaldo()).toEqual(600);
  });

  test("Saldo insuficiente para viajar", () => {
    /////// USAR ARROW FUNCTION ACÁ ES IMPORTANTE
    expect(()=>tarjeta.pagarViaje(800)).toThrow(new Error("Saldo insuficiente."));
    expect(()=>tarjeta.pagarViaje(1200)).toThrow(new Error("Saldo insuficiente."));
  });

  test("Pagar viaje y alcanzar el saldo minimo", () => {
    tarjeta.pagarViaje(600)
    expect(tarjeta.obtenerSaldo()).toEqual(-600);
  });

  test("Saldo insuficiente para viajar por superar los $ -600", () => {
    expect(()=>tarjeta.pagarViaje(601)).toThrow(new Error("Saldo insuficiente."));
  });

});
