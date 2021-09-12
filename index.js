let tiempoTotal;
let bloques;
let TimeBloque;
let ejercicios;
let ejerciciosCopy;
let timeDescanso;
let timeDescansoCopy;
let timeEjercicio;
let timeEjercicioCopy;

let auxIntervalInicio = null;
let auxIntervalDescanso = null;

const CONTENTTIEMPO = document.getElementById("content-tiempo");
const CONTENTFORMULARIO = document.getElementById("content-formulario");
mostrarOcultar('', 'none');

const SONIDO1 = document.createElement('audio'); 
const SONIDOFONDO = document.createElement('audio');

const TIEMPO = document.getElementById("tiempo");
const CONTENTTIME = document.getElementById("content-time");
const BLOQUE = document.getElementById("bloque");
const BLOQUEEJER = document.getElementById("bloque-ejer");
const FORMU = document.getElementById("formu");

FORMU.onsubmit = (e) => {
  e.preventDefault();

  tiempoTotal = FORMU.tiempo.value * 60;
  bloques = FORMU.bloque.value;
  TimeBloque = tiempoTotal/bloques;

  ejercicios = FORMU.ejercicio.value;
  ejerciciosCopy = ejercicios;

  timeDescanso = FORMU.descanso.value;
  timeDescansoCopy = timeDescanso;

  timeEjercicio = Math.round(((TimeBloque/ejercicios) - timeDescanso));
  timeEjercicioCopy = Math.round(((TimeBloque/ejercicios) - timeDescanso));

  mostrarOcultar('none', '');
  sonar(SONIDOFONDO, 'assets/media/sonidoM2.mp3', true);
  inicioI();
}

function inicio(){
  BLOQUE.textContent = bloques;
  BLOQUEEJER.textContent = ejerciciosCopy;
  CONTENTTIME.style.backgroundColor = 'rgb(30, 120, 204)';
  TIEMPO.innerHTML = timeEjercicioCopy;
  --timeEjercicioCopy;
  if(timeEjercicioCopy === 0){
    clearInterval(auxIntervalInicio);
    timeEjercicioCopy = timeEjercicio;
    descansoI();
  }
}

function descanso(){
  CONTENTTIME.style.backgroundColor = 'rgb(218, 206, 47)';
  TIEMPO.innerHTML = timeDescansoCopy;
  --timeDescansoCopy;
  if(timeDescansoCopy === 0){
    clearInterval(auxIntervalDescanso);
    timeDescansoCopy = timeDescanso;
    if(--ejerciciosCopy !== 0){
      inicioI();
    }

    if(ejerciciosCopy === 0){
      if(--bloques !== 0){
        ejerciciosCopy = ejercicios;
        inicioI();
      }

      if(bloques === 0){
        BLOQUE.textContent = 'Completado';
        BLOQUEEJER.textContent = 'Completado';
        sonarOf(SONIDOFONDO)
        setTimeout(() => {
          mostrarOcultar('', 'none');
        }, 3000);
      }
    }
  }
}

function inicioI(){
  sonar(SONIDO1, 'assets/media/sonido2.mp3', false);
  auxIntervalInicio = setInterval(() => inicio(), 1000);
}

function descansoI(){
  sonar(SONIDO1, 'assets/media/sonido3.mp3', false);

  auxIntervalDescanso = setInterval(() => descanso(), 1000);
}

function mostrarOcultar(formu, tiempo){
  CONTENTFORMULARIO.style.display = formu;
  CONTENTTIEMPO.style.display = tiempo;
}

function sonar(AUDIO, ruta, reload){
  AUDIO.src = ruta;
  if(reload){
    AUDIO.play();
    AUDIO.loop = true;
    AUDIO.volume = 0.4;
  }else{
    AUDIO.play();
    AUDIO.volume = 1;
  }
}

function sonarOf(AUDIO){
  AUDIO.pause();
}
