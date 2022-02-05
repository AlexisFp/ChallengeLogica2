// Selectores
var botonNuevaPalabra = document.getElementById('nueva-palabra');
var botonInicio = document.getElementById("iniciar-juego");


// Repertorio de palabras

var palabras = ['Alura','Oracle','Challenge','Ahorcado'];

// variables globales

var palabraAleatoria = "";
var errores = 0;
var letrasCorrectas = [];
var letrasIncorrectas = [];

// funcion para elegir palabra aleatoria
function elegirPalabra(){ 
  var palabraAlAzar= palabras[Math.floor(Math.random()*palabras.length)];
	return palabraAlAzar;
}
// funcion para separar en caracteres la palabra elegida
function deletrearPalabra() {
var palabraAleatoria = elegirPalabra();
var deletrear = palabraAleatoria.split('');
return deletrear
}
// funcion para validar que se haya apretado una letra
function validarLetra(letraIngresada){
  const pattern = new RegExp('^[a-z\u00d1]+$', 'i');
  if(!pattern.test(letraIngresada)|| letraIngresada.length > 1){
    return false;
  }
  else {
    return true;
  }
}
// funcion para confirmar si la tecla apretada es correcta
function verificarLetra(Letra, palabraElegida){
  if(palabraElegida.includes(letra)){
    return  true; 
  }
  else {
    return false;
  }
}
// funcion para corroborar la posicion de las letras correctas
function localizarLetra(letra, palabra){
  indicesPosicion=[];
  for (var i = 0; i < palabra.length; i++){
      if(palabra[i] == letra){
          indicesPosicion.push(i);
      }
  }
  return indicesPosicion;
}
// funcion para confirmar la condicion de victoria 
function victoria(letrasCorrectas,palabraElegida){
  if(letrasCorrectas.length == palabraElegida.length && errores < 9 ){
    return true;
  }
}


botonInicio.addEventListener("click", function(event){
  var palabraElegida = deletrearPalabra();
  pantalla();
  generarTablero(palabraElegida.length);
  document.addEventListener("keydown", (event)=>{
    var letra = event.key;
    var alturaIncorrectas = 500;
    var baseIncorrectas = 500;
    var xInicial = 240;
    var acumulacionIncorrectas = 0;
    if(validarLetra(letra) = true && errores < 9){
      var posicionesLetrasIngresadas = localizarLetra(letra,palabraElegida);
      if(verificarLetra(letra,palabraElegida) = true ){
        for(var i = 0; i < posicionesLetrasIngresadas.length; i++){
          dibujarLetras(letra,(xInicial + 100*posicionesLetrasIngresadas[i]), 690);
          letrasCorrectas.push(letra);
        }
      }
      else if(verificarLetra(letra,palabraElegida) = false){
        dibujarLetras(letra, baseIncorrectas + acumulacionIncorrectas, alturaIncorrectas);
          acumulacionIncorrectas += 60;
          errores++;
          letrasIncorrectas.push(letra);
          dibujarAhorcado(errores);
      }
      if(victoria() = true){
        dibujarCreditos("Felicidades adivinaste la palabra", "green");
        errores = 0;
        return;
      }
      if (errores >= 9){
        dibujarCreditos("Fin del Juego", "red");
        return;
      }
    }
  }, false);
})


