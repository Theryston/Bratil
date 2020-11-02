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
var ClickNumber = 0
var GetTime = new Date();
var hour = GetTime.getHours();
var minutes = GetTime.getMinutes();
var seconds = GetTime.getSeconds();
var url = document.URL

utterance.lang = 'pt-br';
utterance.rate = 1.3;
utterance.pitch = 1.1;
utterance.volume = 1;



/*
//para programação
var name = 'Theryston'
var autores = window.confirm('quer ativar as respostas automáticas? (baseadas nos textos em que você copiar)')
*/

if (url.match('https')) {
  var name = window.prompt('qual é seu nome?')
  var autores = window.confirm('quer ativar as respostas automáticas? (baseadas nos textos em que você copiar)')
} else {
  url = url.replace(/http/gi, 'https')
  window.location = url;
}
//autores = true

window.addEventListener('load', () => {
  navigator.vibrate(100)
  baitalert.play();
  baittext.innerHTML = ``
});



if (window.SpeechRecognition || window.webkitSpeechRecognition) {

  VoiceRecognition.addEventListener('start', function() {
    ImgMicrophone.src = 'assets/img/cut-microphone.png'
    baitmedia.innerHTML = ''
    baittext.innerHTML = 'estou te ouvindo!'
  })

  VoiceRecognition.addEventListener('end', () => {
    ImgMicrophone.src = 'assets/img/microphone.png'

    if (baittext.innerText == 'estou te ouvindo!') {
      baittext.innerHTML = ''
      baitmedia.innerHTML = ` <img src="assets/img/logo.png" alt="" class="logo" />`
    } else {}
  })

  microphone.addEventListener('click',
    function() {

      creditos.style.display = 'none'

      VoiceRecognition.start();


      baitmedia.innerHTML = ``


      if ($(document).height() <= 1000) {
        baittext.style.fontSize = '15px'
      } else {
        baittext.style.fontSize = '30px'
      }

      navigator.vibrate(40)

      ClientHistoric.style.display = 'none'

      const RandomNumber = Math.random()

      if (autores) {
        navigator.clipboard.readText().then((text) => {
          $.getJSON('text_search_content/id.json', function(id) {

            let ClientText = text.toLowerCase();

            let HaveSearch = null

            for (let IndexKeyWord = 0; IndexKeyWord < id.length && !HaveSearch; IndexKeyWord++) {

              for (let i = 0; id[IndexKeyWord].length > i && !HaveSearch; i++) {

                HaveSearch = ClientText.match(id[IndexKeyWord][i])

              }

              if (HaveSearch) {
                $.getJSON('text_search_content/' + id[IndexKeyWord][0] + '.json', function(res) {

                  $.getJSON('https://pixabay.com/api/?key=18237703-a292f73502f41766dae0f356c&q=' + encodeURIComponent(id[IndexKeyWord][1]) + '&per_page=40', function(searchPhoto) {

                    creditos.style.display = 'block'

                    let IndexPhoto = Math.floor(Math.random() * 40)

                    let IndexRes = Math.floor(Math.random() * res.length)
                    baitmedia.innerHTML = '<br><br><br> <img src="' + searchPhoto.hits[IndexPhoto].largeImageURL + '" class="media"> <br><br><br>'
                    baittext.innerHTML = res[IndexRes] + '<br><br><br>'

                  })

                })
              }
            }
          })

        })
      }

    })


  VoiceRecognition.lang = 'pt-br';


  VoiceRecognition.addEventListener('result',
    function(evt) {




      var ClientMessage = evt.results[0][0].transcript.toLowerCase()

      const ClientMessageNoChange = ClientMessage;

      ClickNumber++

      ClientHistoric.innerHTML += `${ClickNumber}ª&nbsp;&nbsp;${ClientMessageNoChange}. <br /> <br />`


      const RandomNumber = Math.random()
      console.log('numero aleatorio: ' + RandomNumber)
      console.log('numero do click ' + ClickNumber)


      ClientMessage = ClientMessage.replace(/gosto/gi,
        'gostar')

      ClientMessage = ClientMessage.replace(/tô/gi,
        'estou')

      ClientMessage = ClientMessage.replace(/legal/gi,
        'bom')
      ClientMessage = ClientMessage.replace(/ótimo/gi,
        'bom')
      ClientMessage = ClientMessage.replace(/ótima/gi,
        'bom')
      ClientMessage = ClientMessage.replace(/excelente/gi,
        'bom')
      ClientMessage = ClientMessage.replace(/bem/gi,
        'bom')
      ClientMessage = ClientMessage.replace(/boa/gi,
        'bom')
      ClientMessage = ClientMessage.replace(/ok/gi,
        'bom')
      ClientMessage = ClientMessage.replace(/incrível/gi,
        'bom')
      ClientMessage = ClientMessage.replace(/sensacional/gi,
        'bom')

      ClientMessage = ClientMessage.replace(/busque no google sobre/gi,
        'pesquisar')
      ClientMessage = ClientMessage.replace(/pesquise no google sobre/gi,
        'pesquisar')
      ClientMessage = ClientMessage.replace(/pesquisar  no google sobre/gi,
        'pesquisar')
      ClientMessage = ClientMessage.replace(/buscar no google sobre/gi,
        'pesquisar')
      ClientMessage = ClientMessage.replace(/busque no google/gi,
        'pesquisar')
      ClientMessage = ClientMessage.replace(/pesquise no google/gi,
        'pesquisar')
      ClientMessage = ClientMessage.replace(/pesquisar  no google/gi,
        'pesquisar')
      ClientMessage = ClientMessage.replace(/buscar no google/gi,
        'pesquisar')
      ClientMessage = ClientMessage.replace(/faça uma busca sobre/gi,
        'pesquisar')
      ClientMessage = ClientMessage.replace(/faça uma busca/gi,
        'pesquisar')
      ClientMessage = ClientMessage.replace(/faça uma pesquisa sobre/gi,
        'pesquisar')
      ClientMessage = ClientMessage.replace(/faça uma pesquisa/gi,
        'pesquisar')
      ClientMessage = ClientMessage.replace(/pesquise para mim/gi,
        'pesquisar')
      ClientMessage = ClientMessage.replace(/pesquise para mim sobre/gi,
        'pesquisar')
      ClientMessage = ClientMessage.replace(/pesquise sobre/gi,
        'pesquisar')
      ClientMessage = ClientMessage.replace(/busque para mim/gi,
        'pesquisar')
      ClientMessage = ClientMessage.replace(/busque para mim sobre/gi,
        'pesquisar')
      ClientMessage = ClientMessage.replace(/busque sobre/gi,
        'pesquisar')
      ClientMessage = ClientMessage.replace(/busque por/gi,
        'pesquisar')
      ClientMessage = ClientMessage.replace(/busca sobre/gi,
        'pesquisar')
      ClientMessage = ClientMessage.replace(/buscar sobre/gi,
        'pesquisar')
      ClientMessage = ClientMessage.replace(/pesquisa sobre/gi,
        'pesquisar')
      ClientMessage = ClientMessage.replace(/pesquisar sobre/gi,
        'pesquisar')
      ClientMessage = ClientMessage.replace(/buscar por/gi,
        'pesquisar')
      ClientMessage = ClientMessage.replace(/pesquisar por/gi,
        'pesquisar')
      ClientMessage = ClientMessage.replace(/pesquise por/gi,
        'pesquisar')
      ClientMessage = ClientMessage.replace(/pesquise/gi,
        'pesquisar')
      ClientMessage = ClientMessage.replace(/buscar/gi,
        'pesquisar')
      ClientMessage = ClientMessage.replace(/busca/gi,
        'pesquisar')
      ClientMessage = ClientMessage.replace(/pesquisa/gi,
        'pesquisar')
      ClientMessage = ClientMessage.replace(/busque/gi,
        'pesquisar')
      ClientMessage = ClientMessage.replace(/pesquisarr/gi,
        'pesquisar')

      ClientMessage = ClientMessage.replace(/pra/gi,
        'para')

      ClientMessage = ClientMessage.replace(/lindo/gi,
        'bonito')
      ClientMessage = ClientMessage.replace(/linda/gi,
        'bonito')
      ClientMessage = ClientMessage.replace(/belo/gi,
        'bonito')
      ClientMessage = ClientMessage.replace(/bela/gi,
        'bonito')
      ClientMessage = ClientMessage.replace(/bonita/gi,
        'bonito')

      ClientMessage = ClientMessage.replace(/tá/gi,
        'está')

      ClientMessage = ClientMessage.replace(/cê/gi,
        'você')

      ClientMessage = ClientMessage.replace(/imagem/gi,
        'foto')
      ClientMessage = ClientMessage.replace(/imagens/gi,
        'foto')
      ClientMessage = ClientMessage.replace(/retrato/gi, 'foto')
      ClientMessage = ClientMessage.replace(/fotos/gi, 'foto')

      ClientMessage = ClientMessage.replace(/teu/gi, 'seu')

      ClientMessage = ClientMessage.replace(/passarinhos/gi, 'pássaro')
      ClientMessage = ClientMessage.replace(/passarinho/gi, 'pássaro')
      ClientMessage = ClientMessage.replace(/pássaros/gi, 'pássaro')
      ClientMessage = ClientMessage.replace(/pássaro/gi, 'pássaro')


      //traduções
      // ClientMessage = ClientMessage.replace(/hi/i, 'oi')
      ClientMessage = ClientMessage.replace(/hello/gi,
        'olá')


      $.getJSON('http://ip-api.com/json/?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,offset,currency,isp,org,as,asname,reverse,mobile,proxy,hosting,query',
        function(data) {
          var IP = data.query

          if (ClientMessage.match('país') && ClientMessage.match('meu') && ClientMessage.match('bom') || ClientMessage.match('país') && ClientMessage.match('meu') && ClientMessage.match('bonito') || ClientMessage.match('país') && ClientMessage.match('meu') && ClientMessage.match('gostar')) {
            if (RandomNumber <= 0.5) {
              baitmedia.innerHTML = ``
              baittext.innerHTML = `o ${data.country} é muito incrível!`
            } else {
              baitmedia.innerHTML = ``
              baittext.innerHTML = `${data.country} é o melhor pais do mundo! (minha opinião)`
            }


            utterance.text = baittext.innerText
            speechSynthesis.speak(utterance);

          } else if (ClientMessage.match('você') && ClientMessage.match('mora') || ClientMessage.match('onde') && ClientMessage.match('você')) {

            baitmedia.innerHTML = ``
            if (RandomNumber <= 0.5) {
              baittext.innerHTML = `digamos que eu moro nas nuvens!`
            } else {
              baittext.innerHTML = `eu moro nas nuvens e tenho o poder de estar em vários lugares ao mesmo tempo?`
            }


            utterance.text = baittext.innerText
            speechSynthesis.speak(utterance);

          } else if (ClientMessage.match('país') && ClientMessage.match('meu') && ClientMessage.match('você')) {
            if (RandomNumber <= 0.5) {
              baitmedia.innerHTML = ``
              baittext.innerHTML = `eu adoro o ${data.country}`
            } else {
              baitmedia.innerHTML = ``
              baittext.innerHTML = `gosto muito do ${data.country}`
            }


            utterance.text = baittext.innerText
            speechSynthesis.speak(utterance);

          }
        })

      if (ClientMessage.match('termos')) {

        window.open('/termos')

        setTimeout(() => {
          baittext.innerHTML = ``
          baitmedia.innerHTML = ` <img src="assets/img/logo.png" alt="" class="logo" />`
        }, 100)

      } else if (ClientMessage.match('seu') && ClientMessage.match('nome') && ClientMessage.match('bonito')) {
        baitmedia.innerHTML = ''

        if (RandomNumber <= 0.5) {
          baittext.innerHTML = 'obridado! ' + nome + 'é um nome muito lindo também'
        } else {
          baittext.innerHTML = 'muito obridado!'
        }

        utterance.text = baittext.innerText
        speechSynthesis.speak(utterance);

      } else if (ClientMessage.match('seu') && ClientMessage.match('nome')) {

        baitmedia.innerHTML = ''

        if (RandomNumber <= 0.5) {
          baittext.innerHTML = 'eu sou o Bait'
        } else {
          baittext.innerHTML = 'meu nome é Bait'
        }

        utterance.text = baittext.innerText
        speechSynthesis.speak(utterance);

      } else if (ClientMessage.match('resposta') && ClientMessage.match('automática') || ClientMessage.match('pesquisa') && ClientMessage.match('automática')) {

        baitmedia.innerHTML = ''
        baittext.innerHTML = `as resposta automática são respostas baseadas nos textos em que você copiou (em qualquer lugar). quando você clicar no microfone abaixo irei verificar se existe alguma palavra-chave no texto que você copiou, se tiver vou fazer uma pesquisa por ela`


        utterance.text = baittext.innerText
        speechSynthesis.speak(utterance);

      } else if (ClientMessage.match('onde') && ClientMessage.match('foto')) {

        baitmedia.innerHTML = '<img src="assets/img/txt-pixabay.png" class="logo">'

        if (RandomNumber <= 0.5) {
          baittext.innerHTML = 'eu uso o banco de imagem Pixabay.com <br><br>'
        } else {
          baittext.innerHTML = 'o Pixabay.com é o meu banco de imagens <br><br>'
        }


        utterance.text = baittext.innerText
        speechSynthesis.speak(utterance);

      } else if (ClientMessage.match('foto')) {
        ClientMessage = ClientMessage.replace(/foto/gi, '')
        ClientMessage = ClientMessage.replace(/mostre/gi, '')
        ClientMessage = ClientMessage.replace(/mostra/gi, '')
        ClientMessage = ClientMessage.replace(/um/i, '')
        ClientMessage = ClientMessage.replace(/quero/gi, '')
        ClientMessage = ClientMessage.replace(/ver/i, '')
        ClientMessage = ClientMessage.replace(/me/gi, '')
        ClientMessage = ClientMessage.replace(/de/gi, '')
        ClientMessage = ClientMessage.replace(/do/gi, '')
        ClientMessage = ClientMessage.replace(/da/gi, '')

        $.getJSON('https://pixabay.com/api/?key=18237703-a292f73502f41766dae0f356c&q=' + encodeURIComponent(ClientMessage) + '&per_page=200',
          function(fotos) {
            let indice = Math.floor(Math.random() * 200)
            creditos.style.display = 'block'

            baitmedia.innerHTML = '<br><br><img src="' + fotos.hits[indice].largeImageURL + '" class="media"><br><br>'
            if (RandomNumber <= 0.3) {
              baittext.innerHTML = 'aqui está!'
            } else if (RandomNumber <= 0.6) {
              baittext.innerHTML = 'confira essa foto!'
            } else if (RandomNumber <= 1) {
              baittext.innerHTML = 'veja o que eu encontrei!'
            }
            console.log(fotos)
            console.log(indice)
          })
        setTimeout(() => {
            if (baittext.innerText != '') {
              utterance.text = baittext.innerText
              speechSynthesis.speak(utterance);
            }
          },
          50)
        setTimeout(() => {
            if (baittext.innerText == '') {
              baitmedia.innerHTML = ''
              creditos.style.display = 'none'
              if (RandomNumber <= 0.5) {
                baittext.innerHTML = 'infelizmente não encontrei essa foto'
              } else {
                baittext.innerHTML = 'não tenho esta imagem'
              }
              utterance.text = baittext.innerText
              speechSynthesis.speak(utterance);
            }
          },
          1500)


      } else if (ClientMessage.match('copi') && ClientMessage.match('histórico')) {
        var inputHistoric = document.createElement("input");
        inputHistoric.value = ClientHistoric.innerText;
        document.body.appendChild(inputHistoric);
        inputHistoric.select();
        document.execCommand('copy');
        document.body.removeChild(inputHistoric);
        baitmedia.innerHTML = ''
        if (RandomNumber <= 0.5) {
          baittext.innerHTML = 'pronto! seu histórico foi copiado!'
        } else {
          baittext.innerHTML = 'pronto!'
        }


        utterance.text = baittext.innerText
        speechSynthesis.speak(utterance);

      } else if (ClientMessage.match('histórico') && ClientMessage.match('limpa') || ClientMessage.match('histórico') && ClientMessage.match('limpe')) {

        function limphistoric() {
          ClickNumber = 0
          ClientHistoric.innerHTML = ''
          return true
        }

        if (limphistoric()) {
          if (RandomNumber <= 0.5) {
            baittext.innerHTML = 'pronto! já limpei o seu histórico!'
          } else {
            baittext.innerHTML = 'pronto!'
          }
        }


        utterance.text = baittext.innerText
        speechSynthesis.speak(utterance);

      } else if (ClientMessage.match('histórico')) {

        baitmedia.innerHTML = ``
        baittext.innerHTML = `aqui está o seu histórico! <br /><br />`
        ClientHistoric.style.display = 'block'


      } else if (ClientMessage.match('país') && ClientMessage.match('meu') && ClientMessage.match('bom') || ClientMessage.match('país') && ClientMessage.match('meu') && ClientMessage.match('bonito') || ClientMessage.match('país') && ClientMessage.match('meu') && ClientMessage.match('gostar')) {} else if (ClientMessage.match('você') && ClientMessage.match('mora') || ClientMessage.match('onde') && ClientMessage.match('você')) {} else if (ClientMessage.match('país') && ClientMessage.match('meu') && ClientMessage.match('você')) {} else if (ClientMessage.match('pesquisar')) {
        ClientMessage = ClientMessage.replace(/para mim/gi, '')
        let clientCut = ClientMessage.replace(/pesquisar/gi, '')
        baitmedia.innerHTML = ``

        if (RandomNumber <= 0.2) {
          baittext.innerHTML = `Ok! buscando por ${clientCut} 🕵🏻‍♀️`
        } else if (RandomNumber <= 0.4) {
          baittext.innerHTML = `Ok! pesquisando por ${clientCut} 🕵🏻‍♀️`
        } else if (RandomNumber <= 0.6) {
          baittext.innerHTML = `pesquisando... 🕵🏻‍♀️`
        } else if (RandomNumber <= 0.8) {
          baittext.innerHTML = `certo vou pesquisar no Google 🕵🏻‍♀️`
        } else if (RandomNumber <= 1) {
          baittext.innerHTML = `Ok! 🕵🏻‍♀️`
        }
        setTimeout(() => {
          window.open('https://www.google.com/search?q=' + clientCut)
          navigator.vibrate(100)
          setTimeout(() => {
            baittext.innerHTML = ``
            baitmedia.innerHTML = ` <img src="assets/img/logo.png" alt="" class="logo" />`
          }, 100)
        }, 1000)


        utterance.text = baittext.innerText.replace(/🕵🏻‍♀️/gi,
          '')
        speechSynthesis.speak(utterance);

      } else if (ClientMessage.match('obrigad') || ClientMessage.match('valeu') || ClientMessage.match('ajudou muito')) {
        baitmedia.innerHTML = ``
        if (RandomNumber <= 0.5) {
          baittext.innerHTML = `que nada! eu que tenho que te agradecer por min acessar`
        } else {
          baittext.innerHTML = `eu que agradeço!`
        }


        utterance.text = baittext.innerText
        speechSynthesis.speak(utterance);

      } else if (ClientMessage.match('bom') && ClientMessage.match('você') && ClientMessage.match('e')) {
        baitmedia.innerHTML = ``
        if (RandomNumber <= 0.5) {
          baittext.innerHTML = `eu estou ótimo!`
        } else {
          baittext.innerHTML = `eu tô muito bem!`
        }


        utterance.text = baittext.innerText
        speechSynthesis.speak(utterance);

      } else if (ClientMessage.match('estou') && ClientMessage.match('bom') || ClientMessage.match('vou') && ClientMessage.match('bom')) {
        if (RandomNumber <= 0.5) {
          baitmedia.innerHTML = ``
          baittext.innerHTML = `Ah que bom! que está tudo bem com você`
        } else {
          baitmedia.innerHTML = ``
          baittext.innerHTML = `Ok! fico alegre por saber`
        }

        utterance.text = baittext.innerText
        speechSynthesis.speak(utterance);

      } else if (ClientMessage.match('como') && ClientMessage.match('você') || ClientMessage.match('como') && ClientMessage.match('vai') || ClientMessage.match('e aí') && ClientMessage.match('como')) {


        baitmedia.innerHTML = ``
        baittext.innerHTML = 'eu estou bem e você?'


        utterance.text = baittext.innerText
        speechSynthesis.speak(utterance);

      } else if (ClientMessage.match('oi ') || ClientMessage.match('olá ') || ClientMessage == 'oi' || ClientMessage == 'olá') {

        baitmedia.innerHTML = ''

        if (RandomNumber <= 0.2 && ClickNumber == 1) {
          baittext.innerHTML = `Olá ${name} como você está?`
        } else if (RandomNumber <= 0.4 && ClickNumber == 1) {
          baittext.innerHTML = `oi ${name} como vai?`
        } else if (RandomNumber <= 0.6 && ClickNumber == 1) {
          baittext.innerHTML = `Olá! como vai?`
        } else if (RandomNumber <= 0.8 && ClickNumber == 1) {
          baittext.innerHTML = `Oi! ${name} como está as coisas?`
        } else if (RandomNumber <= 1 && ClickNumber == 1) {
          baittext.innerHTML = `Olá! ${name},
          e aí como você está?`
        } else if (RandomNumber <= 0.2) {
          baittext.innerHTML = `oi ${name}`
        } else if (RandomNumber <= 0.4) {
          baittext.innerHTML = `Olá!`
        } else if (RandomNumber <= 0.6) {
          baittext.innerHTML = `Um oi especial para você!`
        } else if (RandomNumber <= 0.8) {
          baittext.innerHTML = `hello!`
        } else if (RandomNumber <= 1) {
          baittext.innerHTML = `Um olá especial para você!`
        }


        utterance.text = baittext.innerText
        speechSynthesis.speak(utterance);

      } else if (ClientMessage.match('padrão') || ClientMessage.match('início') || ClientMessage.match('inicial') || ClientMessage.match('hibern')) {
        baittext.innerHTML = `certo,
        indo para o modo inicial`
        setTimeout(() => {
          baitalert.play();
          baittext.innerHTML = ``
          baitmedia.innerHTML = ` <img src="assets/img/logo.png" alt="" class="logo" />`
          navigator.vibrate(100)
        }, 3000)


        utterance.text = baittext.innerText
        speechSynthesis.speak(utterance);

      } else if (ClientMessage.match('segundos')) {
        baittext.style.fontSize = '80px'
        baittext.innerHTML = `${hour}: ${
        minutes}: ${seconds}`

        utterance.text = baittext.innerText
        speechSynthesis.speak(utterance);

      } else if (ClientMessage.match('hora')) {
        if ($(document).height() <= 1000) {
          baittext.style.fontSize = '100px'
        } else {
          baittext.style.fontSize = '200px'
        }
        baittext.innerHTML = `${hour}:${minutes}`

        utterance.text = 'segundo o seu aparelho é ' + baittext.innerText
        speechSynthesis.speak(utterance);

      } else if (ClientMessage.match('pare ') || ClientMessage.match('parar') || ClientMessage.match('para ') || ClientMessage.match('stop') || ClientMessage.match('não fale') || ClientMessage == 'pare' || ClientMessage == 'para') {

        baitmedia.innerHTML = ''

        if (RandomNumber <= 0.5) {
          baittext.innerHTML = 'já parei'
        } else {
          baittext.innerHTML = 'parei'
        }

        utterance.text = baittext.innerText
        speechSynthesis.speak(utterance);


      } else if (ClientMessage.match('queimadura') && ClientMessage.match('que') || ClientMessage.match('me') && ClientMessage.match('queimei') || ClientMessage.match('queimou') && ClientMessage.match('se') || ClientMessage.match('se') && ClientMessage.match('queimar') || ClientMessage.match('nos') && ClientMessage.match('queimamos')) {
        baitmedia.innerHTML = '<br><br><video poster="assets/img/queimadura_capa.png" src="assets/media/queimadura.mp4" class="media" controls><br>'
        if (RandomNumber <= 0.5) {
          baittext.innerHTML = '<br> mantenha a calma e siga as instruções do vídeo acima'
        } else {
          baittext.innerHTML = '<br> mantenha a calma. Este video vai te ajudar! <br> <br>'
        }

        utterance.text = baittext.innerText
        speechSynthesis.speak(utterance);

      } else if (ClientMessage.match('tempo') || ClientMessage.match('temperatura') || ClientMessage.match('clima')) {

        $.getJSON('http://apiadvisor.climatempo.com.br/api/v1/anl/synoptic/locale/BR?token=984000203d9f9830a354a1b2a9e03bd4', function (tempo) {

          tempo[0].text = tempo[0].text.replace(/AC/g, 'Acre')
          tempo[0].text = tempo[0].text.replace(/AL/g, 'Alagoas')
          tempo[0].text = tempo[0].text.replace(/AP/g, 'Amapá')
          tempo[0].text = tempo[0].text.replace(/AM/g, 'Amazonas')
          tempo[0].text = tempo[0].text.replace(/BA/g, 'Bahia')
          tempo[0].text = tempo[0].text.replace(/CE/g, 'Ceará')
          tempo[0].text = tempo[0].text.replace(/DF/g, 'Distrito Federal')
          tempo[0].text = tempo[0].text.replace(/ES/g, 'Espírito Santo')
          tempo[0].text = tempo[0].text.replace(/GO/g, 'Goiás')
          tempo[0].text = tempo[0].text.replace(/MA/g, 'Maranhão')
          tempo[0].text = tempo[0].text.replace(/MT/g, 'Mato Grosso')
          tempo[0].text = tempo[0].text.replace(/MS/g, 'Mato Grosso do Sul')
          tempo[0].text = tempo[0].text.replace(/MG/g, 'Minas Gerais')
          tempo[0].text = tempo[0].text.replace(/PA/g, 'Pará')
          tempo[0].text = tempo[0].text.replace(/PB/g, 'Paraíba')
          tempo[0].text = tempo[0].text.replace(/PR/g, 'Paraná')
          tempo[0].text = tempo[0].text.replace(/PE/g, 'Pernambuco')
          tempo[0].text = tempo[0].text.replace(/PI/g, 'Piauí')
          tempo[0].text = tempo[0].text.replace(/RR/g, 'Roraima')
          tempo[0].text = tempo[0].text.replace(/RO/g, 'Rondônia')
          tempo[0].text = tempo[0].text.replace(/RJ/g, 'Rio de Janeiro')
          tempo[0].text = tempo[0].text.replace(/RN/g, 'Rio Grande do Norte')
          tempo[0].text = tempo[0].text.replace(/RS/g, 'Rio Grande do Sul')
          tempo[0].text = tempo[0].text.replace(/SC/g, 'Santa Catarina')
          tempo[0].text = tempo[0].text.replace(/SP/g, 'São Paulo')
          tempo[0].text = tempo[0].text.replace(/SE/g, 'Sergipe')
          tempo[0].text = tempo[0].text.replace(/TO/g, 'Tocantins')


          baitmedia.innerHTML = ''
          baittext.innerHTML = '<br><br>' + tempo[0].text + '<br><br>';

          utterance.text = baittext.innerText
          speechSynthesis.speak(utterance);

        })

      } else {
        function DontKnow() {
          return true
        }
      }

      if (DontKnow()) {

        $.getJSON('text_search_content/id.json', function(id) {

          let ClientText = ClientMessage;

          let HaveSearch = null

          for (let IndexKeyWord = 0; IndexKeyWord < id.length && !HaveSearch; IndexKeyWord++) {

            for (let i = 0; id[IndexKeyWord].length > i && !HaveSearch; i++) {

              HaveSearch = ClientText.match(id[IndexKeyWord][i])

            }

            if (HaveSearch) {
              $.getJSON('text_search_content/' + id[IndexKeyWord][0] + '.json', function(res) {

                $.getJSON('https://pixabay.com/api/?key=18237703-a292f73502f41766dae0f356c&q=' + encodeURIComponent(id[IndexKeyWord][1]) + '&per_page=40', function(searchPhoto) {

                  creditos.style.display = 'block'

                  let IndexPhoto = Math.floor(Math.random() * 40)

                  let IndexRes = Math.floor(Math.random() * res.length)
                  baitmedia.innerHTML = '<br><br><br> <img src="' + searchPhoto.hits[IndexPhoto].largeImageURL + '" class="media"> <br><br><br>'
                  baittext.innerHTML = res[IndexRes] + '<br><br><br>'

                })

              })


            } else if (IndexKeyWord == id.length - 1) {

              baitmedia.innerHTML = ''
              baittext.innerHTML = 'estou em desenvolvimento não sei o que significa "' + ClientMessageNoChange + '" '

            }
          }
        })

        setTimeout(() => {
            utterance.text = baittext.innerText
            speechSynthesis.speak(utterance);
          },
          500)

      }

    })

  VoiceRecognition.addEventListener('error',
    function(error) {
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