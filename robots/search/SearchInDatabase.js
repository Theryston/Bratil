const SearchInDatabase = (question) => {
	const SearchModule = require('../../models/Search')


	return new Promise((resolve, reject) => {

		SearchModule.findAll({
			raw: true
		}).then(searches => {

			async	function treatText(text) {
				if (text && typeof text != null && text != undefined) {

					text = text.toLowerCase();

					return text.split(' ')
				} else {
					return	[{
						error: "Nenhuma texti foi inserido!"
					}]
				}
			}

			async function searchTitle() {

				var questionTreated = await treatText(question)
				var foundTitle = []
				var orderTitle
				var times = 0
				var foundWord = 0
				var pasSearchTitle = ''


				questionTreated.forEach((questionIndex) => {
					searches.forEach((searchesIndex) => {
						var titleTreated = searchesIndex.title.toLowerCase().split(' ')

						if (titleTreated.indexOf(questionIndex) != -1) {

							foundTitle.forEach((InfoundTitle) => {
								if (InfoundTitle.response.title == searchesIndex.title) {
									foundTitle.splice(foundTitle.indexOf(searchesIndex.title), 1)
								}
							})
							foundWord++
							times++

							foundTitle.push({
								response: searchesIndex,
								foundWord: foundWord
							})

						}
					})
				})

				return foundTitle
			}


			void async function() {
				var total = await searchTitle()
				console.log(total)
			}()




		}).catch(() => {
			reject([{
				error: "Houve um erro ao se conectar com o banco de dados!"
			}])
		})
	})
}

module.exports = SearchInDatabase;