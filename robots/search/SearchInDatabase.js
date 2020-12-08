const SearchInDatabase = (question) => {
	const SearchModule = require('../../models/Search')
	const dataSearch = require('data-search')


	return new Promise((resolve, reject) => {

		SearchModule.findAll({
			raw: true
		}).then(searches => {
			/*
			async	function treatText(text) {
				if (text && typeof text != null && text != undefined) {

					var textmin = text.toLowerCase();

					return textmin.split(' ')
				} else {
					return	[{
						error: "Nenhuma texti foi inserido!"
					}]
				}
			}

			async function searchTitle(array, init, value) {

				if (array[init]) {
					if (array[init].title.toLowerCase() == value.toLowerCase()) {
						return array[init]
					} else {
						return searchTitle(array, init+1, value)
					}
				} else {
					return {
						error: "Não achei nenhuma resposta parece sua pesquisa!"
					}
				}
			}



			async function orderTheRobotToSearch() {
				var questionTreated = await treatText(question)
				var response = []
				var rusults = ''

				for (let i = 0; i < questionTreated.length; i++) {
					rusults = await searchTitle(searches, 0, questionTreated[i]);
					response.push(rusults)
				}

				return response
			}

			void async function() {
				var res = await orderTheRobotToSearch()
				console.log(res)
			}()

*/

			const dbTrated = async () => {
				return dataSearch.dataSetGenerate({
					array: searches,
					wordSize: 2,
					nameId: 'id',
					attributes: ['title', 'content']
				})
			}
		

			const response = async () => {
				let dbTratedRes = await dbTrated()
				return dataSearch.search(dbTratedRes, question)
			}
			
			resolve(response())

		}).catch(() => {
			reject([{
				error: "Houve um erro ao se conectar com o banco de dados!"
			}])
		})
	})
}

module.exports = SearchInDatabase;