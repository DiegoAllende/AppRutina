let bloques;
let bloquesCopy;
let numBloque = 1;

let ejercicios;
let ejerciciosCopy;
let numEjercicio = 1;

let timeEjercicio;
let timeEjercicioCopy;

let timeDescanso;
let timeDescansoCopy;

let auxIntervalInicio = null;
let auxIntervalDescanso = null;

const CONTENTTIEMPO = document.getElementById("content-tiempo");
const CONTENTFORMULARIO = document.getElementById("content-formulario");
mostrarOcultar('', 'none');

const SONIDO1 = document.createElement('audio');
const SONIDOFONDO = document.createElement('audio');

const VIDEO1 = document.createElement('video');

const TIEMPO = document.getElementById("tiempo");
const CONTENTTIME = document.getElementById("content-time");
const BLOQUE = document.getElementById("bloque");
const BLOQUEEJER = document.getElementById("bloque-ejer");
const FORMU = document.getElementById("formu");

FORMU.onsubmit = (e) => {
  e.preventDefault();

  bloques = FORMU.bloque.value;
  bloquesCopy = bloques;
  ejercicios = FORMU.ejercicio.value;
  ejerciciosCopy = ejercicios;

  timeEjercicio = FORMU.tiempo.value;
  timeEjercicioCopy = timeEjercicio;

  timeDescanso = FORMU.descanso.value;
  timeDescansoCopy = timeDescanso;

  mostrarOcultar('none', '');
  sonar(VIDEO1, 'assets/media/video2.mp4', true);

  inicioI();
}

function inicio() {
  BLOQUE.textContent = numBloque + '  de ' + bloques;
  BLOQUEEJER.textContent = numEjercicio + '  de ' + ejercicios;
  CONTENTTIME.style.backgroundColor = 'rgb(30, 120, 204)';
  TIEMPO.innerHTML = timeEjercicioCopy;
  --timeEjercicioCopy;
  if (timeEjercicioCopy === 0) {
    clearInterval(auxIntervalInicio);
    timeEjercicioCopy = timeEjercicio;
    descansoI();
  }
}

function descanso() {
  CONTENTTIME.style.backgroundColor = 'rgb(218, 206, 47)';
  TIEMPO.innerHTML = timeDescansoCopy;
  --timeDescansoCopy;
  if (timeDescansoCopy === 0) {
    clearInterval(auxIntervalDescanso);
    timeDescansoCopy = timeDescanso;
    if (--ejerciciosCopy !== 0) {
      numEjercicio++;
      inicioI();
    }

    if (ejerciciosCopy === 0) {
      numBloque++;
      if (--bloquesCopy !== 0) {
        numEjercicio = 1;
        ejerciciosCopy = ejercicios;
        inicioI();
      }

      if (bloquesCopy === 0) {
        numBloque = 1;
        numEjercicio = 1;
        sonarOf(VIDEO1)
        resetContentTime('Completado', 'Completado', 'Ok');
        setTimeout(() => {
          mostrarOcultar('', 'none');
          resetContentTime('', '', '');
        }, 2000);
      }
    }
  }
}

function inicioI() {
  sonar(SONIDO1, 'assets/media/sonido2.mp3', false);
  auxIntervalInicio = setInterval(() => inicio(), 1000);
}

function descansoI() {
  sonar(SONIDO1, 'assets/media/sonido3.mp3', false);

  auxIntervalDescanso = setInterval(() => descanso(), 1000);
}

function mostrarOcultar(formu, tiempo) {
  CONTENTFORMULARIO.style.display = formu;
  CONTENTTIEMPO.style.display = tiempo;
}

function sonar(MEDIA, ruta, reload) {
  MEDIA.src = ruta;
  if (reload) {
    MEDIA.play();
    MEDIA.loop = true;
    MEDIA.volume = 0.8;
  } else {
    MEDIA.play();
    MEDIA.volume = 1;
  }
}

function sonarOf(MEDIA) {
  MEDIA.pause();
}

function resetContentTime(textbloque, textEjercicio, textTiempo) {
  BLOQUE.textContent = textbloque;
  BLOQUEEJER.textContent = textEjercicio;
  TIEMPO.textContent = textTiempo;
}

function back() {
  clearInterval(auxIntervalInicio);
  clearInterval(auxIntervalDescanso);
  sonarOf(VIDEO1)
  mostrarOcultar('', 'none');
  resetContentTime('', '', '');
  numBloque = 1;
  numEjercicio = 1;
}
