const baitmessage = document.querySelector('.BaitMessage');
const baitmedia = document.querySelector('.BaitMedia');
const baittext = document.querySelector('.text');
const creditosBox = document.querySelector('.credito-box')
const creditos = document.querySelector('.creditos')
const microphone = document.querySelector('.microphone');
var ClientHistoric = document.querySelector('.ClientHistoric');
var baitalert = document.querySelector('.alert');
var ClickNumber = 0
var GetTime = new Date();
var hour = GetTime.getHours();
var minutes = GetTime.getMinutes();
var seconds = GetTime.getSeconds();
var url = document.URL

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

console.log(name)


window.addEventListener('load', () => {
  navigator.vibrate(100)
  baitalert.play();
  baittext.innerHTML = ``
});


if (window.SpeechRecognition || window.webkitSpeechRecognition) {

  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
  var VoiceRecognition = new SpeechRecognition()

  VoiceRecognition.addEventListener('start', function() {
    baitmedia.innerHTML = ''
    baittext.innerHTML = 'estou te ouvindo!'
  })

  VoiceRecognition.lang = 'pt-br' || 'en'
  microphone.addEventListener('click', function () {

    VoiceRecognition.start()
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

        let copiou = text.toLowerCase()

        copiou = copiou.replace('passarinhos', 'pássaro')
        copiou = copiou.replace('passarinho', 'pássaro')
        copiou = copiou.replace('pássaros', 'pássaro')

        $.getJSON('text_search_content/published_research.json', function (search) {


          let checarSearch = copiou.indexOf(search)

          for (i = 0; search.length -1 >= i && checarSearch == -1; i++) {
            checarSearch = copiou.indexOf(search[i])
          }


          while (copiou.indexOf('.') != -1) {
            copiou = copiou.replace('.', '')
          }

          copiou = copiou.replace(copiou.substring(0, checarSearch), '')

          while (copiou.indexOf(' ') != -1) {
            copiou = copiou.replace(copiou.substring(copiou.indexOf(' '), copiou.length), '')
          }



          if (checarSearch != -1) {

            let copiouNew = copiou.normalize('NFD').replace(/[\u0300-\u036f]/g, '');


            $.getJSON('text_search_content/' + copiouNew + '.json', function (searchRes) {

              let indiceSearch = Math.floor(Math.random() * searchRes.length)

              $.getJSON('https://pixabay.com/api/?key=18237703-a292f73502f41766dae0f356c&q=' + encodeURIComponent(copiou) + '&per_page=40', function(searchPhoto) {

                let indice = Math.floor(Math.random() * 40)

                baitmedia.innerHTML = `<br><br><img src="` + searchPhoto.hits[indice].largeImageURL + `" class="media"> <br> <br>`
                baittext.innerHTML = `${searchRes[indiceSearch]} (essa é uma resposta automática) <br><br><br>`

                creditosBox.innerHTML = '<img src="assets/img/txt-pixabay.png" class="creditos"></a>'
              })
            })
          }
        })

      })
    }

  },
    false)


  VoiceRecognition.addEventListener('result',
    function(evt) {


      var ClientMessage = evt.results[0][0].transcript.toLowerCase()

      const ClientMessageNoChange = ClientMessage;

      ClickNumber++

      ClientHistoric.innerHTML += `${ClickNumber}ª&nbsp;&nbsp;${ClientMessageNoChange}. <br /> <br />`


      const RandomNumber = Math.random()
      console.log('numero aleatorio: ' + RandomNumber)
      console.log('numero do click ' + ClickNumber)

      creditosBox.innerHTML = ''


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


          } else if (ClientMessage.match('você') && ClientMessage.match('mora') || ClientMessage.match('onde') && ClientMessage.match('você')) {

            baitmedia.innerHTML = ``
            if (RandomNumber <= 0.5) {
              baittext.innerHTML = `digamos que eu more nas nuvens!`
            } else {
              baittext.innerHTML = `eu moro nas nuvens e tenho o poder de estar em vários lugares ao mesmo tempo! incrível não?`
            }

          } else if (ClientMessage.match('país') && ClientMessage.match('meu') && ClientMessage.match('você')) {
            if (RandomNumber <= 0.5) {
              baitmedia.innerHTML = ``
              baittext.innerHTML = `eu adoro o ${data.country}`
            } else {
              baitmedia.innerHTML = ``
              baittext.innerHTML = `gosto muito do ${data.country}`
            }
          }
        })

      if (ClientMessage.match('termos')) {

        window.open('/termos')

      } else if (ClientMessage.match('seu') && ClientMessage.match('nome') && ClientMessage.match('bonito')) {
        baitmedia.innerHTML = ''

        if (RandomNumber <= 0.5) {
          baittext.innerHTML = 'obridado! ' + nome + 'é um nome muito lindo também'
        } else {
          baittext.innerHTML = 'muito obridado!'
        }

      } else if (ClientMessage.match('seu') && ClientMessage.match('nome')) {

        baitmedia.innerHTML = ''

        if (RandomNumber <= 0.5) {
          baittext.innerHTML = 'eu sou o Bait'
        } else {
          baittext.innerHTML = 'meu nome é Bait'
        }

      } else if (ClientMessage.match('resposta') && ClientMessage.match('automática') || ClientMessage.match('pesquisa') && ClientMessage.match('automática')) {

        baitmedia.innerHTML = ''
        baittext.innerHTML = `as resposta automática são respostas baseadas nos textos em que você copiou (em qualquer lugar). quando você clicar no microfone abaixo irei verificar se existe alguma palavra-chave no texto que você copiou, se tiver vou fazer uma pesquisa por ela`



      } else if (ClientMessage.match('onde') && ClientMessage.match('foto')) {

        baitmedia.innerHTML = '<img src="assets/img/txt-pixabay.png" class="logo">'

        if (RandomNumber <= 0.5) {
          baittext.innerHTML = 'eu uso o banco de imagem Pixabay.com <br><br>'
        } else {
          baittext.innerHTML = 'o Pixabay.com é o meu banco de imagens <br><br>'
        }

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
          function (fotos) {
            let indice = Math.floor(Math.random() * 200)
            creditosBox.innerHTML = '<img src="assets/img/txt-pixabay.png" class="creditos">'
            baitmedia.innerHTML = '<br><br><img src="' + fotos.hits[indice].largeImageURL + '" class="media"><br><br>'
            if (RandomNumber <= 0.3) {
              baittext.innerHTML = 'aqui esta!'
            } else if (RandomNumber <= 0.6) {
              baittext.innerHTML = 'confira essa foto!'
            } else if (RandomNumber <= 1) {
              baittext.innerHTML = 'veja o que eu encontrei!'
            }
            console.log(fotos)
            console.log(indice)
          })
        setTimeout(() => {
          if (baittext.innerText == 'estou te ouvindo!') {
            baitmedia.innerHTML = ''
            creditosBox.innerHTML = ''
            if (RandomNumber <= 0.5) {
              baittext.innerHTML = 'infelizmente não encontrei essa foto'
            } else {
              baittext.innerHTML = 'não tenho esta imagem'
            }
          }
        },
          2000)
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


      } else if (ClientMessage.match('histórico')) {
        baitmedia.innerHTML = ``
        baittext.innerHTML = `aqui está o seu histórico! <br /><br />`
        ClientHistoric.style.display = 'block'


      } else if (ClientMessage.match('país') && ClientMessage.match('meu') && ClientMessage.match('bom') || ClientMessage.match('país') && ClientMessage.match('meu') && ClientMessage.match('bonito') || ClientMessage.match('país') && ClientMessage.match('meu') && ClientMessage.match('gostar')) {} else if (ClientMessage.match('você') && ClientMessage.match('mora') || ClientMessage.match('onde') && ClientMessage.match('você')) {} else if (ClientMessage.match('país') && ClientMessage.match('meu') && ClientMessage.match('você')) {} else if (ClientMessage.match('pesquisar')) {
        ClientMessage = ClientMessage.replace(/para mim/gi, '')
        let clientCut = ClientMessage.replace(/pesquisar/gi, '')
        baitmedia.innerHTML = ``

        if (RandomNumber <= 0.2) {
          baittext.innerHTML = `Ok! buscando por ${clientCut}`
        } else if (RandomNumber <= 0.4) {
          baittext.innerHTML = `Ok! pesquisando por ${clientCut}`
        } else if (RandomNumber <= 0.6) {
          baittext.innerHTML = `pesquisando...`
        } else if (RandomNumber <= 0.8) {
          baittext.innerHTML = `certo vou pesquisar no Google`
        } else if (RandomNumber <= 1) {
          baittext.innerHTML = `Ok!`
        }
        setTimeout(() => {
          window.open('https://www.google.com/search?q=' + clientCut)
          navigator.vibrate(100)
          setTimeout(() => {
            baittext.innerHTML = ``
            baitmedia.innerHTML = ` <img src="assets/img/logo.png" alt="" class="logo" />`
          }, 100)
        }, 1000)

      } else if (ClientMessage.match('obrigad') || ClientMessage.match('valeu') || ClientMessage.match('ajudou muito')) {
        baitmedia.innerHTML = ``
        if (RandomNumber <= 0.5) {
          baittext.innerHTML = `que nada! eu que tenho que te agradecer por min acessar`
        } else {
          baittext.innerHTML = `eu que agradeço!`
        }


      } else if (ClientMessage.match('bom') && ClientMessage.match('você') && ClientMessage.match('e')) {
        baitmedia.innerHTML = ``
        if (RandomNumber <= 0.5) {
          baittext.innerHTML = `eu estou ótimo!`
        } else {
          baittext.innerHTML = `eu tô muito bem!`
        }

      } else if (ClientMessage.match('estou') && ClientMessage.match('bom') || ClientMessage.match('vou') && ClientMessage.match('bom')) {
        if (RandomNumber <= 0.5) {
          baitmedia.innerHTML = ``
          baittext.innerHTML = `Ah que bom! que esta tudo bem com você`
        } else {
          baitmedia.innerHTML = ``
          baittext.innerHTML = `Ok! fico alegre por saber`
        }

      } else if (ClientMessage.match('como') && ClientMessage.match('você') || ClientMessage.match('como') && ClientMessage.match('vai')) {
        baitmedia.innerHTML = ``
        baittext.innerHTML = 'eu estou bem e você?'


      } else if (ClientMessage.match('oi') || ClientMessage.match('olá')) {

        baitmedia.innerHTML = ''

        if (RandomNumber <= 0.2 && ClickNumber == 1) {
          baittext.innerHTML = `olá ${name} como você está?`
        } else if (RandomNumber <= 0.4 && ClickNumber == 1) {
          baittext.innerHTML = `oi ${name} como vai?`
        } else if (RandomNumber <= 0.6 && ClickNumber == 1) {
          baittext.innerHTML = `olá! como vai?`
        } else if (RandomNumber <= 0.8 && ClickNumber == 1) {
          baittext.innerHTML = `Oi! ${name} como está as coisas?`
        } else if (RandomNumber <= 1 && ClickNumber == 1) {
          baittext.innerHTML = `Olá! ${name},
          e aí como você está?`
        } else if (RandomNumber <= 0.2) {
          baittext.innerHTML = `oi ${name}`
        } else if (RandomNumber <= 0.4) {
          baittext.innerHTML = `Olà!`
        } else if (RandomNumber <= 0.6) {
          baittext.innerHTML = `Um oi especial para você!`
        } else if (RandomNumber <= 0.8) {
          baittext.innerHTML = `hello!`
        } else if (RandomNumber <= 1) {
          baittext.innerHTML = `Um olá especial para você!`
        }


      } else if (ClientMessage.match('padrão') || ClientMessage.match('início') || ClientMessage.match('inicial') || ClientMessage.match('hibern')) {
        baittext.innerHTML = `certo,
        indo para o modo inicial`
        setTimeout(()=> {
          baitalert.play();
          baittext.innerHTML = ``
          baitmedia.innerHTML = ` <img src="assets/img/logo.png" alt="" class="logo" />`
          navigator.vibrate(100)
        }, 1000)

      } else if (ClientMessage.match('segundos')) {
        baittext.style.fontSize = '80px'
        baittext.innerHTML = `${hour}: ${
        minutes}: ${seconds}`

      } else if (ClientMessage.match('hora')) {
        if ($(document).height() <= 1000) {
          baittext.style.fontSize = '100px'
        } else {
          baittext.style.fontSize = '200px'
        }
        baittext.innerHTML = `${hour}:${minutes}`


      } else if (ClientMessage.match('queimadura') && ClientMessage.match('que') || ClientMessage.match('me') && ClientMessage.match('queimei') || ClientMessage.match('queimou') && ClientMessage.match('se') || ClientMessage.match('se') && ClientMessage.match('queimar') || ClientMessage.match('nos') && ClientMessage.match('queimamos')) {
        baitmedia.innerHTML = '<br><br><video poster="assets/img/queimadura_capa.png" src="assets/media/queimadura.mp4" class="media" controls><br>'
        if (RandomNumber <= 0.5) {
          baittext.innerHTML = '<br> mantenha a calma e siga as instruções do vídeo acima'
        } else {
          baittext.innerHTML = '<br> mantenha a calma. Este video vai te ajudar! <br> <br>'
        }

      } else {
        function DontKnow() {
          return true
        }
      }

      if (DontKnow()) {

        var copiou = ClientMessage;

        $.getJSON('text_search_content/published_research.json', function (search) {



          let checarSearch = copiou.indexOf(search)

          for (i = 0; search.length -1 >= i && checarSearch == -1; i++) {
            checarSearch = copiou.indexOf(search[i])

          }
          // alert(checarSearch)
          while (copiou.indexOf('.') != -1) {
            copiou = copiou.replace('.', '')
          }

          copiou = copiou.replace(copiou.substring(0, checarSearch), '')

          while (copiou.indexOf(' ') != -1) {
            copiou = copiou.replace(copiou.substring(copiou.indexOf(' '), copiou.length), '')
          }

          if (checarSearch != -1) {

            let copiouNew = copiou.normalize('NFD').replace(/[\u0300-\u036f]/g, '');


            $.getJSON('text_search_content/' + copiouNew + '.json', function (searchRes) {


              let indiceSearch = Math.floor(Math.random() * searchRes.length)

              $.getJSON('https://pixabay.com/api/?key=18237703-a292f73502f41766dae0f356c&q=' + encodeURIComponent(copiou) + '&per_page=40', function(searchPhoto) {

                let indice = Math.floor(Math.random() * 40)

                baitmedia.innerHTML = `<br><br><img src="` + searchPhoto.hits[indice].largeImageURL + `" class="media"> <br> <br>`
                baittext.innerHTML = `${searchRes[indiceSearch]} <br><br><br>`

                creditosBox.innerHTML = '<img src="assets/img/txt-pixabay.png" class="creditos"></a>'
              })
            })
          } else {
            baitmedia.innerHTML = ''
            baittext.innerHTML = `estou em desenvolvimento,
            ainda não sei oque significa "${ClientMessageNoChange}" ${name}`
          }
        })
      }

      console.log('com alteração: ' + ClientMessage)
      //  console.log(inputHistoric)
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

  creditosBox.addEventListener('click',
    function () {
      window.open('https://pixabay.com')
    })

} else {
  baitmedia.innerHTML = ''
  baittext.innerHTML = 'infelizmente o seu navegador não suporta a minha tecnologia. use o Google Chrome'
}