var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var VoiceRecognition = new SpeechRecognition()
const utterance = new window.SpeechSynthesisUtterance();
const baitmessage = document.querySelector('.BaitMessage');
const baitmedia = document.querySelector('.BaitMedia');
const baittext = document.querySelector('.text');
const creditosBox = document.querySelector('.credito-box')
const creditos = document.querySelector('.creditos')
const microphone = document.querySelector('.microphone');
var ClientHistoric = document.querySelector('.ClientHistoric');
var baitalert = document.querySelector('.alert');
var ImgMicrophone = document.querySelector(' #microphone-home')

utterance.lang = 'pt-br';
utterance.rate = 1.4;
utterance.pitch = 1;
utterance.volume = 1;

VoiceRecognition.lang = 'pt-br';


window.addEventListener('load', () => {
  navigator.vibrate(100)
  baitalert.play();
  baittext.innerHTML = ``
});



if (window.SpeechRecognition || window.webkitSpeechRecognition) {

  VoiceRecognition.addEventListener('start', function() {
    ImgMicrophone.src = '/img/microphone-cut.svg'
    baitmedia.innerHTML = ''
    baittext.innerHTML = 'estou te ouvindo!'
  })

  VoiceRecognition.addEventListener('end', () => {
    ImgMicrophone.src = '/img/microphone.svg'

    if (baittext.innerText == 'estou te ouvindo!') {
      baittext.innerHTML = ''
      baitmedia.innerHTML = `<div class="logo"></div>`
    }
  })

  microphone.addEventListener('click', () => {

    creditos.style.display = 'none'
    baitmedia.innerHTML = ``

    if (baittext.innerText == 'estou te ouvindo!') {
      VoiceRecognition.stop();
    } else {
      VoiceRecognition.start();
    }


    if ($(document).height() <= 1000) {
      baittext.style.fontSize = '10pt'
    } else {
      baittext.style.fontSize = '11pt'
    }

    navigator.vibrate(40)

    ClientHistoric.style.display = 'none'

    //autores

  })

  VoiceRecognition.addEventListener('result', (evt) => {

    let ClientMessage = new Promise((resolve, reject) => {

      if (evt.results[0][0].transcript.toLowerCase() != '') {
        resolve(evt.results[0][0].transcript.toLowerCase())

      } else {
        reject('Houve um erro, tente novamente!')
      }

    })

    async function speak() {

      utterance.text = await ClientMessage;
      speechSynthesis.speak(utterance);

    }

    speak()

  })

  VoiceRecognition.addEventListener('error', (error) => {
    const RandomNumber = Math.random()

    baitmedia.innerHTML = ''
    if (RandomNumber <= 0.5) {
      baittext.innerHTML = 'houve um erro, por favor tente novamente'
    } else {
      baittext.innerHTML = 'desculpe não entendi, por favor tente novamente'
    }

  })

  creditos.addEventListener('click',
    function() {
      window.open('https://pixabay.com')
    })

} else {
  baitmedia.innerHTML = ''
  baittext.innerHTML = 'infelizmente o seu navegador não suporta a minha tecnologia. use o Google Chrome'
}

window.addEventListener('click', () => {
  speechSynthesis.cancel();
  VoiceRecognition.stop();
});