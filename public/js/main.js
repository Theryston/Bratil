var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var VoiceRecognition = new SpeechRecognition()
const utterance = new window.SpeechSynthesisUtterance();
const Mycrowaymessage = document.querySelector('.MycrowayMessage');
const Mycrowaymedia = document.querySelector('.MycrowayMedia');
const Mycrowaytext = document.querySelector('.text');
const creditosBox = document.querySelector('.credito-box')
const creditos = document.querySelector('.creditos')
const microphone = document.querySelector('.microphone');
var ClientHistoric = document.querySelector('.ClientHistoric');
var Mycrowayalert = document.querySelector('.alert');
var ImgMicrophone = document.querySelector('#microphone-home')
var InputSwitch = document.querySelector('#switch')

utterance.lang = 'pt-br';
utterance.rate = 1.4;
utterance.pitch = 1;
utterance.volume = 1;

VoiceRecognition.lang = 'pt-br';


window.addEventListener('load', () => {
	navigator.vibrate(100)
	Mycrowayalert.play();
	Mycrowaytext.innerHTML = ``
});


if (window.SpeechRecognition || window.webkitSpeechRecognition) {
	InputSwitch.addEventListener('change', (req, res) => {
		if (InputSwitch.checked) {
			VoiceRecognition.start();
		} else {
			VoiceRecognition.stop();
		}
	})
}

/*

if (window.SpeechRecognition || window.webkitSpeechRecognition) {

  VoiceRecognition.addEventListener('start', function() {
    ImgMicrophone.src = '/img/microphone-cut.svg'
    Mycrowaymedia.innerHTML = ''
    Mycrowaytext.innerHTML = 'estou te ouvindo!'
  })

  VoiceRecognition.addEventListener('end', () => {
    ImgMicrophone.src = '/img/microphone.svg'

    if (Mycrowaytext.innerText == 'estou te ouvindo!') {
      Mycrowaytext.innerHTML = ''
      Mycrowaymedia.innerHTML = `<div class="logo"></div>`
    }
  })

  microphone.addEventListener('click', () => {

    creditos.style.display = 'none'
    Mycrowaymedia.innerHTML = ``

    if (Mycrowaytext.innerText == 'estou te ouvindo!') {
      VoiceRecognition.stop();
    } else {
      VoiceRecognition.start();
    }


    if ($(document).height() <= 1000) {
      Mycrowaytext.style.fontSize = '10pt'
    } else {
      Mycrowaytext.style.fontSize = '11pt'
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

    Mycrowaymedia.innerHTML = ''
    if (RandomNumber <= 0.5) {
      Mycrowaytext.innerHTML = 'houve um erro, por favor tente novamente'
    } else {
      Mycrowaytext.innerHTML = 'desculpe não entendi, por favor tente novamente'
    }

  })

  creditos.addEventListener('click',
    function() {
      window.open('https://pixabay.com')
    })

} else {
  Mycrowaymedia.innerHTML = ''
  Mycrowaytext.innerHTML = 'infelizmente o seu navegador não suporta a minha tecnologia. use o Google Chrome'
}

window.addEventListener('click', () => {
  speechSynthesis.cancel();
  VoiceRecognition.stop();
});
*/