// Selectores
var botonNuevaPalabra = document.getElementById('nueva-palabra');
var botonInicio = document.getElementById("iniciar-juego");
var nuevaPalabra = document.getElementById("input-nueva-palabra");
var reinicio = document.getElementById("fin-de-juego");


// Repertorio de palabras

var palabras = ['ALURA','ORACLE','CHALLENGE','AHORCADO'];
// verifica que la localstorage no este creada, si no lo esta, la crea
if(!localStorage.getItem("palabras")){
    localStorage.setItem("palabras",JSON.stringify(palabras));
} else {
  palabras = JSON.parse(localStorage.getItem("palabras"));
}

// variables globales
var aciertos = 0;
var errores = 0;
var letrasCorrectas = [];
var letrasIncorrectas = [];
var acumulacionIncorrectas = 0;

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
// funcion para verificar que no se haya ingresado una letra repetida
function verificarRepeticion(letra) {
  var letraRepetida = false;
  var letraCorrectaRepetida = letrasCorrectas.includes(letra);
  var  letraIncorrectaRepetida = letrasIncorrectas.includes(letra);
  letraRepetida = letraCorrectaRepetida + letraIncorrectaRepetida;
  if (letra =! letraRepetida){
    return true;
  } else{
    return false;
  }
}
// funcion para verificar que no se haya ingresado una palabra repetida
function verificarPalabra(palabraIngresada){
  var palabraRepetida = false;
  palabraRepetida = palabras.includes(palabraIngresada)
  if(palabraIngresada =! palabraRepetida){
    return true;
  }else {
    return false;
  }
}
// funcion para crear el boton de reinicio.
function nuevoBoton(nombre) {
  var botonNuevo = '<button id='+nombre+' class="btn" type="button" onclick="location.reload()">'+nombre+'</button>'
  reinicio.innerHTML = botonNuevo + "<br>"
}


botonInicio.addEventListener("click", function(event){
  var palabraElegida = deletrearPalabra();
  pantalla();
  generarTablero(palabraElegida.length);
  document.addEventListener("keydown", (event)=>{
    var letra = event.key.toLocaleUpperCase();
    var alturaIncorrectas = 500;
    var baseIncorrectas = 500;
    var xInicial = 260;
    // funcion para confirmar si la tecla apretada es correcta
    function verificarLetra(Letra, palabraElegida){
      if(palabraElegida.includes(letra)){
        return  true; 
      }
      else {
        return false;
      }
    }
    if(validarLetra(letra) == true && errores < 9 && aciertos < palabraElegida.length){
      var posicionesLetrasIngresadas = localizarLetra(letra,palabraElegida);
      if(verificarLetra(letra,palabraElegida) == true && verificarRepeticion(letra) == true ){
        for(var i = 0; i < posicionesLetrasIngresadas.length; i++){
          dibujarLetras(letra,(xInicial + 100*posicionesLetrasIngresadas[i]), 690);
          aciertos ++;
          letrasCorrectas.push(letra);
        }
      }
      else if(verificarLetra(letra,palabraElegida) == false && verificarRepeticion(letra) == true ){
        dibujarLetras(letra, baseIncorrectas + acumulacionIncorrectas, alturaIncorrectas);
          acumulacionIncorrectas += 60;
          errores++;
          letrasIncorrectas.push(letra);
          dibujarAhorcado(errores);
      }
      if(aciertos == palabraElegida.length && errores < 9 ){
        dibujarCreditos("Felicidades adivinaste la palabra", "green");
        nuevoBoton('REJUGAR');
        return;
      }
      if (errores >= 9){
        dibujarCreditos("Fin del Juego", "red");
        nuevoBoton('REJUGAR');
        return;
      }
    }
  },);
})

botonNuevaPalabra.addEventListener("click",function(event){
  var palabraIngresada = nuevaPalabra.value.toLocaleUpperCase();
  if(verificarPalabra(palabraIngresada) == true){
    palabras.push(palabraIngresada);
    localStorage.setItem("palabras",JSON.stringify(palabras));
  }
  else{
    alert("palabra repetida");
  }
})


