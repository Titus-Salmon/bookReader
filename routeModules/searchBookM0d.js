const express = require('express')
const router = express.Router()

const fs = require('fs')


module.exports = {
	searchBook: router.post('/searchBookPost', (req, res, next) => {

		let fileReadPost = req.body['fileReadPost']
		let searchBookPost = req.body['searchBookPost']

		fs.readFile(`${process.cwd()}/public/bookFiles/${fileReadPost}`, 'utf8', function (err, data) {
			if (err) throw err

			const lines = data.split(/\r?\n/)

			if (searchBookPost !== undefined) {
				for (let i = 0; i < lines.length; i++) {
					let words = lines[i].split(/\s/)
					for (let j = 0; j < words.length; j++) {
						if (words[j].toLowerCase() == searchBookPost) {
							console.log(`search term '${searchBookPost}' found in line#: ${i}`)
							console.log(`within line# ${i}, search term '${searchBookPost}' found in word#: ${j}`)
						}
					}
				}
			}

			// if (searchBookPost !== undefined) {
			// 	lines.forEach((line) => {
			// 		let words = line.split(/\s/)
			// 		words.forEach((word) => {
			// 			if (word.toLowerCase() == searchBookPost) {
			// 				console.log(`search term '${searchBookPost}' found in location ${line}`)
			// 				console.log(`typeof line==> ${typeof line}`)
			// 			}
			// 		})
			// 	})
			// }


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