var res = document.getElementById('res');
var loading = document.getElementById('loading')
var searchForm = document.getElementById('searchForm')
var found = false

function FormSent(event) {
	event.preventDefault();
	textSearch.blur();
}

textSearch.focus();
let times = 0
setInterval(() => {
	if (res.innerText.indexOf('Continue digitando...') != -1  && times == 0) {
		textSearch.blur();
		times++
	}
}, 0)



textSearch.addEventListener('keyup', (event) => {
	socket.emit('searchValue', textSearch.value)
})

socket.on('responseToSearch', (responseToSearch) => {
	if (!responseToSearch[0].error) {
		found = true

		loading.style.display = 'none'
		res.innerHTML = ``
		responseToSearch.forEach((this_response) => {

			this_response.content = this_response.content.noHTML()

			res.innerHTML += `<div class="mt-4 card"><div class="card-body" style="background:rgb(32,33,37);">
			<h2 style="font-size:18pt;">${this_response.title}</h2>
			<hr style="background:white;">
			<p class="res">${this_response.main}</p>
			<a href="/search/term/${this_response.id}?title=${this_response.title}"><button class="mt-4 BratilButton">Veja mais</button></a>

			</div></div>`

		})
	} else {
		found = false

		res.innerHTML = ``
		loading.style.display = 'block'

		res.innerHTML += `<div class="mt-4 card"><div class="card-body" style="background:rgb(32,33,37);">

		<p>Continue digitando...</p>

		</div></div>`

	}

})

textSearch.addEventListener('focusout', () => {
	setTimeout(() => {
		if (found === false) {
			loading.style.display = 'none'
			res.innerHTML = `<div class="mt-4 card"><div class="card-body" style="background:rgb(32,33,37);">
			<label for="text-search"><p>Desculpe! Não encontrei nenhuma resposta para sua pesquisa. Experimente pesquisar com tags (ex: programação).</p></label>
			</div></div>`
		}
	},
		100)
})