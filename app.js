const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const path = require("path")
const search = require('./routes/search');
const user = require('./routes/user');
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const url = require('url')
const SearchInDatabase = require('./robots/search/SearchInDatabase')
const SearchModule = require('./models/Search')

/*SearchModule.create({
	title: 'Jair Bolsonaro',
	main: `Jair Messias Bolsonaro (Glicério,[7][8][nota 2] 21 de março de 1955) é um capitão reformado, político e atual presidente do Brasil. Foi deputado federal por sete mandatos entre 1991 e 2018, sendo eleito através de diferentes partidos ao longo de sua carreira.[3] Elegeu-se à presidência pelo Partido Social Liberal (PSL), ao qual foi filiado até novembro de 2019. Três de seus filhos também são políticos: Carlos Bolsonaro (vereador do Rio de Janeiro pelo Partido Social Cristão). Flávio Bolsonaro.`,
	content: `Jair Messias Bolsonaro (Glicério,[7][8][nota 2] 21 de março de 1955) é um capitão reformado, político e atual presidente do Brasil. Foi deputado federal por sete mandatos entre 1991 e 2018, sendo eleito através de diferentes partidos ao longo de sua carreira.[3] Elegeu-se à presidência pelo Partido Social Liberal (PSL), ao qual foi filiado até novembro de 2019. Três de seus filhos também são políticos: Carlos Bolsonaro (vereador do Rio de Janeiro pelo Partido Social Cristão), Flávio Bolsonaro (senador fluminense pelo PSL e comandante da legenda no estado) e Eduardo Bolsonaro (deputado federal por São Paulo, também pelo PSL).[10][11]

Formou-se na Academia Militar das Agulhas Negras em 1977 e serviu nos grupos de artilharia de campanha e paraquedismo do Exército Brasileiro. Tornou-se conhecido do público em 1986, quando escreveu um artigo para a revista Veja no qual criticava salários de oficiais militares. Por causa disso, foi preso por quinze dias, apesar de ter recebido cartas de apoio de colegas do exército. Foi absolvido dois anos depois.[12]

Bolsonaro ingressou na reserva em 1988, com o posto de capitão, após ser eleito para a Câmara Municipal do Rio de Janeiro naquele ano. Foi eleito vereador pelo Partido Democrata Cristão (PDC), partido que seria extinto em 1993. Em 1990, candidatou-se a deputado federal pelo estado do Rio de Janeiro. Foi o candidato mais votado, com apoio de 6% do eleitorado fluminense (464 mil votos),[13] sendo reeleito por seis vezes. Durante seus 27 anos na Câmara dos Deputados, ficou conhecido por ser uma personalidade controversa,[14] por conta de declarações classificadas como discurso de ódio[15] e de suas visões políticas geralmente caracterizadas como populistas[16] e de extrema-direita,[17] que incluem a simpatia pela ditadura militar brasileira[18][19][20][21][22] e a defesa das práticas de tortura por aquele regime.[23][24][25] Em março de 2015, deixou de ser militar da reserva e passou a ser capitão reformado do exército.[26]

Bolsonaro foi anunciado como pré-candidato à Presidência do Brasil em março de 2016 pelo PSC.[27] Somente em janeiro de 2018, no entanto, anunciou sua filiação ao PSL, o nono partido político de sua carreira desde que foi eleito vereador em 1988.[28][29][30][31] Sua campanha presidencial foi lançada em agosto de 2018, com o general reformado Hamilton Mourão como seu vice na chapa. Ele se apresentou como um candidato conservador,[32] defensor de valores familiares e de políticas mais rigorosas na área da segurança pública.[33] Sofreu um atentado durante ato de campanha no dia 6 de setembro, recebendo um golpe de faca no abdômen. Em 7 de outubro, Bolsonaro ficou em primeiro lugar no primeiro turno das eleições presidenciais de 2018, com o candidato Fernando Haddad, do Partido dos Trabalhadores (PT), em segundo.[34] Foi eleito Presidente da República no segundo turno, em 28 de outubro, com 55,13% dos votos válidos.[35]`
})*/


//handlebars
app.engine('handlebars', handlebars({
	defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

//pastas
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'text_search_content')))
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')))

//socket.io
io.on('connection', (socket) => {
	const ruoter = url.parse(socket.handshake.headers.referer).pathname


	//socket.io search
	if (ruoter.match('/search') !== null) {
		SearchModule.findAll({
			raw: true
		}).then(searches => {
			
			socket.on('searchValue', (searchValue) => {
				SearchInDatabase(searchValue, searches).then((response) => {
					socket.emit('responseToSearch', response)
				}).catch((error) => {
					socket.emit('responseToSearch', error)
				})
			})
			
		})
	}

	//outros sockets

})

//Rotas
app.get('/', function(req, res) {
	res.render('index');
});

app.get('/sitemap', (req, res) => {
	res.sendfile('./sitemaps/sitemap.xml')
})

app.get('/404', (req, res) => {
	res.render('error/404')
})

app.use('/search', search)
app.use('/user', user)

app.get('*', function(req, res) {
	res.redirect('/404')
})

const port = 3000

http.listen(port, () => {
	console.log('servidor rodando na porta: '+port)
});