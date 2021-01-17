const SearchInDatabase = (question, searches) => {
	const FuzzySearch = require('fuzzy-search')

	//clearing question
	question = question.replace('@', '')
	question = question.replace('#', '')
	question = question.replace('$', '')
	question = question.replace('_', '')
	question = question.replace('&', '')
	question = question.replace('-', '')
	question = question.replace('+', '')
	question = question.replace('(', '')
	question = question.replace(')', '')
	question = question.replace('/', '')
	question = question.replace('*', '')
	question = question.replace('"', '')
	question = question.replace(`'`, '')
	question = question.replace('"', '')
	question = question.replace(':', '')
	question = question.replace(';', '')
	question = question.replace('!', '')
	question = question.replace('?', '')
	question = question.replace(',', '')
	question = question.replace('.', '')
	question = question.replace('~', '')
	question = question.replace('`', '')
	question = question.replace('|', '')
	question = question.replace('{', '')
	question = question.replace('}', '')
	question = question.replace('%', '')
	question = question.replace('[', '')
	question = question.replace(']', '')

	return new Promise((resolve, reject) => {

		const dataTrated = async () => {
			return new FuzzySearch(searches, ['title', 'main', 'content'], {
				caseSensitive: false,
				sort: true
			})
		}

		void async function() {
			let dataTratedRes = await dataTrated()
			const response = dataTratedRes.search(question)

			if (response.length === 0) {
				reject([{
					error: "Desculpe! Não encontrei nenhuma resposta para sua pesquisa. Experimente pesquisar com palavras-chaves"
				}])
			} else {
				resolve(response)
			}
		}()

	})
}

module.exports = SearchInDatabase;