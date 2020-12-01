var ContainerSearch = document.querySelector('#container-search');
var TextSearch = document.querySelector('#text-search')
var IconSearch = document.querySelector('.fa-search')
var section = document.querySelector('#section');
var header = document.querySelector('#header')
var title = document.querySelector('#title')
var containerSearchIllustration = document.querySelector('.container-search-illustration')

TextSearch.addEventListener('focus', () => {
  header.style.display = 'none'
  section.style.display = 'none'
  title.style.display = 'none'
  ContainerSearch.style.width = '95vw'
});
TextSearch.addEventListener('focusout', () => {
  header.style.display = 'block'
  section.style.display = 'block'
  title.style.display = 'flex'
  ContainerSearch.style.top = '50%'
  ContainerSearch.style.width = '80vw'
});

containerSearchIllustration.addEventListener('click', () => {
  TextSearch.focus()
});