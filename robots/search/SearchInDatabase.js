const SearchInDatabase = (question) => {
	const SearchModule = require('../../models/Search')
	const FuzzySearch = require('fuzzy-search')


	return new Promise((resolve, reject) => {

		SearchModule.findAll({
			raw: true
		}).then(searches => {


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
						error: "Desculpe! Não encontrei nenhuma resposta para sua pesquisa. Experimente pesquisar com tags (ex: programação)."
					}])
				} else {
					resolve(response)
				}
			}()

		}).catch(() => {
			reject([{
				error: "Houve um erro ao se conectar com o banco de dados!"
			}])
		})
	})
}

module.exports = SearchInDatabase;