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

			// for (let h = 0; h < lines.length; h++) {
			// 	console.log(`lines[${h}]==> ${lines[h]}`)
			// }

			function backendTermSearch() {
				if (searchBookPost !== undefined) {
					// let SRO = {}
					console.log(`lines[6]==> ${lines[6]}`)
					let testWords = lines[6].split(/(?<=.+)\s+(?=.+)/)
					console.log(`testWords==> ${testWords}`)
					for (let x = 0; x < testWords.length; x++) {
						console.log(`testWords[${x}]==> ${testWords[x]}`)
					}
					for (let i = 0; i < lines.length; i++) {
						/**javascript Lookahead (from https://javascript.info/regexp-lookahead-lookbehind)
						 * X(?=Y) 	Positive lookahead 	X if followed by Y
						 * (?<=Y)X 	Positive lookbehind 	X if after Y
						 * ==t0d==>you can combine the 2==> (?<=A)X(?=B) to yield: "X if after A and followed by B" <==t0d==*/
						// let words = lines[i].split(/(?<=\w+)\s+(?=\w+)/) //supposed to split on [any # of spaces] only if after [any # of word chars]
						// //AND followed by [any # of word chars] (in other words, we only want to split on spaces BETWEEN words, not any LEADING
						// //or TRAILING spaces)
						let words = lines[i].split(/(?<=.+)\s+(?=.+)/) //supposed to split on [any # of spaces] only if after [any # of word chars]
						//AND followed by [any # of word chars] (in other words, we only want to split on spaces BETWEEN words, not any LEADING
						//or TRAILING spaces)
						for (let j = 0; j < words.length; j++) {
							if (words[j].toLowerCase().includes(`${searchBookPost}`)) {
								let SRO = {}
								SRO[`line#`] = i
								console.log(`search term '${searchBookPost}' found in line#: ${i}`)
								console.log(`${words[j-1]}_<<${words[j]}>>_${words[j+1]}`)
								SRO[`word#`] = j
								console.log(`within line# ${i}, search term '${searchBookPost}' found in word#: ${j}`)
								SRArr.push(SRO)
							}
						}
					}
					// console.log(`SRarr==> ${SRArr}`)
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
					fsReadFileResultsSRArr: SRArr,
					searchBookPost: searchBookPost
					// fsReadFileResultsFoundTerm: foundTerm,
					// lineCache: lineCache
				},
			})
		})

	})
}