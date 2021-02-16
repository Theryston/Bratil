var ContainerSearch = document.querySelector('#container-search');
var ContainerFormSearch = document.querySelector('#ContainerFormSearch')
var TextSearch = document.querySelector('#text-search')
var IconSearch = document.querySelector('.fa-search')
var section = document.querySelector('#section');
var header = document.querySelector('#header')
var title = document.querySelector('#title')
var autocomplete = document.querySelector('#autocomplete')
var AutocompleteText = document.querySelector('#AutocompleteText')
var MycrowayNavbar = document.querySelector('.MycrowayNavbar')
var found = false
var TopsContainerFormSearch = []

TextSearch.addEventListener('focus', () => {
	//setTimeout(function() {
	autocomplete.style.display = "block"
	header.style.display = 'none'
	section.style.display = 'none'
	//title.style.display = 'none'
	MycrowayNavbar.style.display = 'none'
	//alert(ContainerFormSearch.offsetTop)
	TopsContainerFormSearch.push(ContainerFormSearch.offsetTop+'px')
	ContainerFormSearch.style.top = '20%'
	ContainerSearch.style.width = '95vw'
	//document.body.style.background = 'rgb(32, 33, 37)'
	//}, 1000);
});
TextSearch.addEventListener('focusout', () => {
	setTimeout(function() {
		autocomplete.style.display = "none"
		header.style.display = 'block'
		section.style.display = 'block'
		MycrowayNavbar.style.display = 'block'
		//title.style.display = 'flex'
		ContainerFormSearch.style.top = TopsContainerFormSearch[0]
		ContainerSearch.style.width = '80vw'
		//document.body.style.background = 'rgb(0,80,128)'
	}, 1000);
});

TextSearch.addEventListener('keyup', (event) => {
	socket.emit('searchValue', TextSearch.value)
})

socket.on('responseToSearch', (responseToSearch) => {
	if (!responseToSearch[0].error) {
		found = true
		AutocompleteText.innerHTML = ''

		responseToSearch.forEach((this_response) => {
			AutocompleteText.innerHTML += `
			<li>
			<a href="/search/response/page?question=${this_response.title}">
			<i class="bi bi-search" style="color:rgb(0, 140, 255); font-size: 18pt; margin-right: 10px;"></i>
			${this_response.title}
			</a>
			<a target="_blank" href="/search/term/${this_response.id}?title=${this_response.title}">
			<i class="bi bi-arrow-up-right"></i>
			</a>
			</li>
			<hr>`
		})
	} else {
		AutocompleteText.innerHTML = `
		<li>
		<i class="bi bi-bug"></i>
		${responseToSearch[0].error}
		<hr>
		</li>
		`
	}
})
/*
var scrollY = [100]
window.onscroll = (event) => {

	if (window.pageYOffset > 100) {
		document.body.style.background = 'rgb(32, 33, 37)'
	} else {
		document.body.style.background = 'rgb(0,80,128)'
	}
	//alert('ok')

	scrollY.push(window.scrollY)
}*/