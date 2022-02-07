function pantalla(){
  return lienzo = document.querySelector("canvas");
}
function crearPincel(color){
  var lienzo = pantalla();
  var pincel = lienzo.getContext("2d");
  pincel.fillStyle = color;
  return pincel;
}

function crearTriangulo(x,y,base,color){
  var pincel = crearPincel(color);
  pincel.beginPath();
  pincel.moveTo(x,y);
  pincel.lineTo(x+base,y);
  pincel.lineTo((x+base/2),(y-base/4));
  pincel.fill();
}

function crearEspacios(largo,cantidad){
  var pincel = crearPincel("black");
  var casillas = 0;
  for(i = 0; i < cantidad; i++){
    pincel.fillRect(260+casillas,690,largo,7);
    casillas = casillas + largo + 50;
  }
}

function crearFondo(){
  var pincel = crearPincel("lightgrey");
  pincel.fillRect(0,0,1400,800);
}

function generarTablero(cantidadDeLetras){
  crearFondo();
  crearTriangulo(0,700,200, "black");
  crearTriangulo(30,693,140, "blue");
  crearEspacios(50,cantidadDeLetras);
}

function vaciarPantalla(){
  document.getElementById("nueva-palabra").style.display = "none";
  document.getElementById("iniciar-juego").style.display = "none";
  document.getElementById("input-nueva-palabra").style.display = "none";
  document.getElementById("margen-titulo").style.display = "none";
}

function dibujarLetras(letra,x,y){
  pincel = crearPincel("black");
  pincel.font = "30pt Georgia";
  pincel.fillText(letra,x,y);
}

function dibujarLinea(xInit,yInit,xFinal,yFinal){
  pincel = crearPincel("black");
  pincel.strokeStyle = "black";
  pincel.lineWidth = 7;
  pincel.beginPath();
  pincel.moveTo(xInit,yInit);
  pincel.lineTo(xFinal,yFinal);
  pincel.stroke();
}

function dibujarCirculo(x,y,radio){
  pincel = crearPincel("black");
  pincel.strokeStyle = "black";
  pincel.lineWidth = 7;
  pincel.beginPath();
  pincel.arc(x,y,radio,0,Math.PI*2,true);
  pincel.stroke();
}

function dibujarAhorcado(contador){
  if(contador == 1){
    dibujarLinea(100, 650, 100, 100);
  }
  else if(contador == 2){
    dibujarLinea(100, 100, 300, 100);
  }
  else if(contador == 3){
    dibujarLinea(300, 100, 300, 150);
  }
  else if(contador == 4){
    dibujarCirculo(300,200,50);
  }
  else if(contador == 5){
    dibujarLinea(300, 250, 300, 500);
  }
  else if(contador == 6){
    dibujarLinea(300, 300, 400, 200);
  }
  else if(contador == 7){
    dibujarLinea(300, 300, 200, 200);
  }
  else if(contador == 8){
    dibujarLinea(300, 500, 400, 600);
  }
  else if(contador == 9){
    dibujarLinea(300, 500, 200, 600);
  }
}

function dibujarCreditos(frase, color){
  pincel = crearPincel(color);
  pincel.font = "30pt Georgia";
  pincel.fillText(frase, 700, 400);
}