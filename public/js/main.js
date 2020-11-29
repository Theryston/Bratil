var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var VoiceRecognition = new SpeechRecognition()
const utterance = new window.SpeechSynthesisUtterance();
const bratilmessage = document.querySelector('.BratilMessage');
const bratilmedia = document.querySelector('.BratilMedia');
const bratiltext = document.querySelector('.text');
const creditosBox = document.querySelector('.credito-box')
const creditos = document.querySelector('.creditos')
const microphone = document.querySelector('.microphone');
var ClientHistoric = document.querySelector('.ClientHistoric');
var bratilalert = document.querySelector('.alert');
var ImgMicrophone = document.querySelector(' #microphone-home')

utterance.lang = 'pt-br';
utterance.rate = 1.4;
utterance.pitch = 1;
utterance.volume = 1;

VoiceRecognition.lang = 'pt-br';


window.addEventListener('load', () => {
  navigator.vibrate(100)
  bratilalert.play();
  bratiltext.innerHTML = ``
});



if (window.SpeechRecognition || window.webkitSpeechRecognition) {

  VoiceRecognition.addEventListener('start', function() {
    ImgMicrophone.src = '/img/microphone-cut.svg'
    bratilmedia.innerHTML = ''
    bratiltext.innerHTML = 'estou te ouvindo!'
  })

  VoiceRecognition.addEventListener('end', () => {
    ImgMicrophone.src = '/img/microphone.svg'

    if (bratiltext.innerText == 'estou te ouvindo!') {
      bratiltext.innerHTML = ''
      bratilmedia.innerHTML = `<div class="logo"></div>`
    }
  })

  microphone.addEventListener('click', () => {

    creditos.style.display = 'none'
    bratilmedia.innerHTML = ``

    if (bratiltext.innerText == 'estou te ouvindo!') {
      VoiceRecognition.stop();
    } else {
      VoiceRecognition.start();
    }


    if ($(document).height() <= 1000) {
      bratiltext.style.fontSize = '10pt'
    } else {
      bratiltext.style.fontSize = '11pt'
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

    bratilmedia.innerHTML = ''
    if (RandomNumber <= 0.5) {
      bratiltext.innerHTML = 'houve um erro, por favor tente novamente'
    } else {
      bratiltext.innerHTML = 'desculpe não entendi, por favor tente novamente'
    }

  })

  creditos.addEventListener('click',
    function() {
      window.open('https://pixabay.com')
    })

} else {
  bratilmedia.innerHTML = ''
  bratiltext.innerHTML = 'infelizmente o seu navegador não suporta a minha tecnologia. use o Google Chrome'
}

window.addEventListener('click', () => {
  speechSynthesis.cancel();
  VoiceRecognition.stop();
});