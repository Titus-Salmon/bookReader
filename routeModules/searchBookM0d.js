const express = require('express')
const router = express.Router()

const fs = require('fs')


module.exports = {
	searchBook: router.post('/searchBookPost', (req, res, next) => {

		let fileReadPost = req.body['fileReadPost']
		let searchBookPost = req.body['searchBookPost']
		let SRArr = []

		fs.readFile(`${process.cwd()}/public/bookFiles/${fileReadPost}`, 'utf8', function (err, data) {
			if (err) throw err

			const lines = data.split(/\r?\n/) //splits on carriage return & new line; ? = "once or none"
			// const lines = data.split(/\r\n/)
			// const lines = data.split(/\n/)
			// const lines = data.split(/\r/)
			// const lines = data.split(/\s/)

			// console.log(`lines.indexOf(\n)==> ${lines.indexOf(/\n/)}`)
			// console.log(`lines.indexOf('   BOOK I')==> ${lines.indexOf('   BOOK I')}`)

			for (let h = 0; h < lines.length; h++) {
				console.log(`lines[${h}]==> ${lines[h]}`)
			}

			function backendTermSearch() {
				if (searchBookPost !== undefined) {
					// let SRO = {}
					for (let i = 0; i < lines.length; i++) {
						// let SRO = {}

						/**javascript Lookahead (from https://javascript.info/regexp-lookahead-lookbehind)
						The syntax is: X(?=Y), it means "look for X, but match only if followed by Y". There may be any pattern instead of X and Y. */
						let words = lines[i].split(/\s+(?=\w+)/) //supposed to split on [any # of spaces] only if followed by [any # of word chars]
						for (let j = 0; j < words.length; j++) {
							if (words[j].toLowerCase() == searchBookPost) {
								let SRO = {}
								SRO[`line#`] = i
								console.log(`search term '${searchBookPost}' found in line#: ${i}`)
								SRO[`word#`] = j
								console.log(`within line# ${i}, search term '${searchBookPost}' found in word#: ${j}`)
								SRArr.push(SRO)
							}
						}
					}
					console.log(`SRarr==> ${SRArr}`)
					console.log(`JSON.stringify(SRarr)==> ${JSON.stringify(SRArr)}`)
				}
			}
			backendTermSearch()


			//try creating an object that matches same shape as DOM data, in order to pass targeted search results back to
			//frontend for DOM manipulation (highlighting, passing to database, etc...) 

			res.render('vw-searchBook', {
				title: 'vw-searchBook from searchBookM0d.js',
				fsReadFileResults: {
					fileReadPost: fileReadPost,
					fsReadFileResultsData: data,
					fsReadFileResultsLines: lines,
					// fsReadFileResultsFoundTerm: foundTerm,
					// lineCache: lineCache
				},
			})
		})

	})
}