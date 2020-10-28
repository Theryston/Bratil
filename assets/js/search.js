var ContainerSearch = document.querySelector('#container-search');
var TextSearch = document.querySelector('#text-search')
var IconSearch = document.querySelector('.fa-search')
var section = document.querySelector('#section');
var header = document.querySelector('#header')

TextSearch.addEventListener('focus', () => {
  header.style.display = 'none'
  section.style.display = 'none'
  ContainerSearch.style.top = '3em'
  ContainerSearch.style.width = '95vw'
});
TextSearch.addEventListener('focusout', () => {
   header.style.display = 'block'
  section.style.display = 'block'
  ContainerSearch.style.top = '50%'
  ContainerSearch.style.width = '80vw'
})