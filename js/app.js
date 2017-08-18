var Calculadora = {
  init: function() {
    this.variables()
    this.pulsarTeclas()
    this.cargarPagina()
  },
   cargarPagina: function()
  { alert("Esta Calculadora permite realizar operaciones basicas como: Sumar, Restar, Multiplicar y Dividir.");
},

  //cambiar tamaño de las teclas
pulsarTeclas: function() {
    var boton = document.getElementsByClassName('tecla');
    for (var i = 0; i < boton.length; i++) {
      boton[i].onmousedown = this.botonPulsado;
      boton[i].onmouseup = this.botonArriba;
    }
},

botonPulsado: function(evento) {
  evento.target.style.transform="scale(0.92, 0.92)";
},

botonArriba: function(evento) {
  evento.target.style.transform="scale(1,1)";
},


variables: function(){
  var tecl = this
  document.getElementById('0').addEventListener('click', function() {
    tecl.asignarValores(0)})

  document.getElementById('1').addEventListener('click', function() {
    tecl.asignarValores(1) })

  document.getElementById('2').addEventListener('click', function() {
    tecl.asignarValores(2) })
  document.getElementById('3').addEventListener('click', function() {
    tecl.asignarValores(3) })

  document.getElementById('4').addEventListener('click', function() {
    tecl.asignarValores(4) })

  document.getElementById('5').addEventListener('click', function() {
    tecl.asignarValores(5) })

  document.getElementById('6').addEventListener('click', function() {
    tecl.asignarValores(6) })

  document.getElementById('7').addEventListener('click', function() {
    tecl.asignarValores(7) })

  document.getElementById('8').addEventListener('click', function() {
    tecl.asignarValores(8) })

  document.getElementById('9').addEventListener('click', function() {
    tecl.asignarValores(9) })

  document.getElementById('sign').addEventListener('click', function() {
    tecl.signo() })

  document.getElementById('punto').addEventListener('click', function() {
    tecl.anadirPunto() })

  document.getElementById('on').addEventListener('click', function() {
    tecl.reset() })

  document.getElementById('mas').addEventListener('click', function() {
  tecl.operaciones('1') })

  document.getElementById('menos').addEventListener('click', function() {
  tecl.operaciones('2') })

  document.getElementById('por').addEventListener('click', function() {
  tecl.operaciones('3') })

  document.getElementById('dividido').addEventListener('click', function() {
  tecl.operaciones('4') })

  document.getElementById('igual').addEventListener('click', function() {
	tecl.teclaIgual() })
},//cierre llave varialbles

//asignar valores
asignarValores: function(valor){
  var tecl = this
  var element = document.getElementById('display')

   if(sessionStorage.result==1){
    element.innerHTML = valor;
    sessionStorage.result=0
  }else{
    if(element.innerHTML=='0'){
      element.innerHTML = valor;
    }else{
      var nuevaPantalla = element.innerHTML+valor
      var pantallalista = tecl.validacionNumeros(nuevaPantalla)
      element.innerHTML = pantallalista;
    }
  }
},//cierre llave asignar valores

validacionNumeros: function(valor){
  var valor = String(valor);
  return valor.substring(0, 8)
},

signo: function(){
  var element = document.getElementById('display')
  if(element.innerHTML.indexOf('-')<0 && element.innerHTML!='0' && element.innerHTML!=''){

    document.getElementById('display').innerHTML = '-'+element.innerHTML;
  }else if(element.innerHTML!=0 && element.innerHTML!=''){

    document.getElementById('display').innerHTML = element.innerHTML.substring(1);
  }
},// fin de la llave para los signo

// funcion para agregar punto
anadirPunto: function(){
  var punto = this
  var element = document.getElementById('display')
  if(element.innerHTML.indexOf('.')<0){
    var nuevaPantalla = element.innerHTML+'.';
    var pantallalista = punto.validacionNumeros(nuevaPantalla)
    element.innerHTML = pantallalista;

  }
}, //fin de la llave de añadir punto

operaciones: function(valor){
  var tecl = this
  var element = document.getElementById('display')
  var varDisplay = Number(element.innerHTML)
  var varOperacion = valor

  if(sessionStorage.result==1){
    sessionStorage.valor = sessionStorage.ultimoResultado
    sessionStorage.result = 0
  }else{
    if(sessionStorage.operacionActiva=='1'){
      sessionStorage.valor = tecl.resultado(sessionStorage.valor, varDisplay, sessionStorage.operacion, 1)
      sessionStorage.result = 0
      }else{
        sessionStorage.valor = Number(varDisplay);
    }
  }
  if(varDisplay!=''){
    sessionStorage.valorGuardado = Number(varDisplay);
  }
  sessionStorage.countOperadorIgual = 0
  sessionStorage.operacionActiva = 1;
  sessionStorage.operacion = varOperacion;
  element.innerHTML = '';
},// fin llave operaciones

teclaIgual: function(){
		var igual = this
		var element = document.getElementById('display');
		var varDisplay 	= sessionStorage.valor
		var varOperacion 	= sessionStorage.operacion
		var varDisplayNew	= element.innerHTML

		if(varDisplayNew==''){
			varDisplayNew = sessionStorage.varGuardado
		}else if(varDisplayNew!='' && sessionStorage.countOperadorIgual==0){
			sessionStorage.valor = varDisplayNew
			sessionStorage.countOperadorIgual = 1
		}
		element.innerHTML = igual.resultado(varDisplay, varDisplayNew, varOperacion, 0)
	},//fin de la llave igual

 // function de añadir signos
addSigno: function(){
  var element = document.getElementById('display')
  if(element.innerHTML.indexOf('-')<0 && element.innerHTML!='0' && element.innerHTML!=''){
    document.getElementById('display').innerHTML = '-'+element.innerHTML;
  }else if(element.innerHTML!=0 && element.innerHTML!=''){
    document.getElementById('display').innerHTML = element.innerHTML.substring(1);
  }
},//Fin de la llave signos

// function de resultado
resultado: function(valor1, valor2, operacion, tipo){
		var resul = this

		switch(operacion){
			case '1':
				var resultado = (Number(valor1)+Number(valor2))
				break;
			case '2':
				var resultado = (Number(valor1)-Number(valor2))
				break;
			case '3':
				var resultado = (Number(valor1)*Number(valor2))
				break;
			case '4':
				var resultado = (Number(valor1)/Number(valor2))
				break;
		}

		resultadoValidado = resul.validacionNumeros(resultado);
		sessionStorage.operacionActiva = tipo
		sessionStorage.result = 1
		sessionStorage.ultimoResultado = resultadoValidado
		return resultadoValidado;
	}, //fin llave de resultados

 // funcion de borrado
reset: function(){
  document.getElementById('display').innerHTML = '0';
    sessionStorage.result = 0;
		sessionStorage.ultimoResultado = 0
		sessionStorage.operacionActiva = 0
		sessionStorage.valorGuardado = 0
		sessionStorage.countOperadorIgual =0
    sessionStorage.valor = 0;
    sessionStorage.operacion = 0;
  }//cierre llave reset..

}//cierre llave var Calculadora

Calculadora.init()
