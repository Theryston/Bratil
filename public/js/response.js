var res = document.getElementById('res');
var loading = document.getElementById('loading')
var searchForm = document.getElementById('searchForm')

function FormSent(event) {
	event.preventDefault();
	textSearch.blur();
}

textSearch.focus();
let times = 0
setInterval(() => {
	if (res.innerText.indexOf('Continue digitando...') != -1 && times == 0) {
		textSearch.blur();
		times++
	}
}, 0)



textSearch.addEventListener('keydown', () => {
	socket.emit('searchValue', textSearch.value)
})

socket.on('responseToSearch', (responseToSearch) => {

	if (responseToSearch.message == 'OK') {

		loading.style.display = 'none'
		res.innerHTML = ``
		responseToSearch.result.forEach((this_response) => {

			this_response.content = this_response.content.noHTML()

			res.innerHTML += `<div class="mt-4 card"><div class="card-body" style="background:rgb(32,33,37);">
			<h2 style="font-size:18pt;">${this_response.title}</h2>
			<hr style="background:white;">
			<p class="res">${this_response.content}</p>
			<a href="/search/response/${this_response.id}"><button class="mt-4 btn btn-outline-primary">Continuar lendo!</button></a>

			</div></div>`

		})
	} else {
		res.innerHTML = ``
		loading.style.display = 'block'
		res.innerHTML += `<div class="mt-4 card"><div class="card-body" style="background:rgb(32,33,37);">

		<p>Continue digitando...</p>

		</div></div>`
	}

})

textSearch.addEventListener('focusout', () => {
	setTimeout(function() {
		if (res.innerText.indexOf('Continue digitando...') != -1) {
			loading.style.display = 'none'
			res.innerHTML = `<div class="mt-4 card"><div class="card-body" style="background:rgb(32,33,37);">
			<label for="text-search"><p>Desculpe! Não encontrei nenhuma resposta para sua pesquisa. Experimente pesquisar com tags (ex: programação).</p></label>
			</div></div>`
		}
	},
		100)
})