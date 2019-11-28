const express = require('express')
const router = express.Router()

const fs = require('fs')

const CircularJSON = require('circular-json')


module.exports = {
	searchBook: router.post('/searchBookPost', (req, res, next) => {

		let fileReadPost = req.body['fileReadPost']
		let searchTerm = req.body['searchTermPost']

		fs.readFile(`${process.cwd()}/public/bookFiles/${fileReadPost}`, 'utf8', function (err, data) {
			if (err) throw err;
			console.log(`data==>${data}`);

			if (data.includes(`${searchTerm}`)) {
				console.log(`data includes ${searchTerm}`)
			} else {
				console.log(`data DOES NOT include ${searchTerm}`)
			}

			// if (data.includes('here')) {
			// 	console.log(`data includes "here!"`)
			// }

			res.render('vw-searchBook', {
				title: 'vw-searchBook from searchBookM0d.js',
				fsReadFileResults: {
					fsReadFileResultsData: data,
					// responseAlt: fs.ReadStream,
					// responseAlt2: stream.pipe(res)
				},
			})
		})

		// var stream = fs.createReadStream(process.cwd() + '/public/bookFiles/sampletext1.txt')
		// var stream = fs.createReadStream(`${process.cwd()}/public/bookFiles/${fileReadPost}`, 'utf8')

		// stream.on('error', function (error) {
		// 	res.writeHead(404, 'Not Found')
		// 	res.end()
		// })

		// stream.pipe(res)

		// stream.pipe(res.render('vw-searchBook', {
		//   title: 'vw-searchBook from searchBookM0d.js',
		//   streamPipe: {
		//     response: res,
		//     responseAlt: fs.ReadStream,
		//     // responseAlt2: stream.pipe(res)
		//   },
		// }))



		// console.log(`stream.pipe(res)~~~~>${stream.pipe(res)}`)
		// console.log(`CircularJSON.stringify(stream.pipe(res))~~~~>${CircularJSON.stringify(stream.pipe(res))}`)

		// console.log(`res==>${res}`)
		// console.log(`stream==>${stream}`)
		// // console.log(`JSON.stringify(stream)==>${JSON.stringify(stream)}`)
		// console.log(`CircularJSON.stringify(stream)==>${CircularJSON.stringify(stream)}`)
		// // console.log(`JSON.stringify(res)==>${JSON.stringify(res)}`)

		// res.render('vw-searchBook', {
		//   title: 'vw-searchBook from searchBookM0d.js',
		//   streamPipe: {
		//     response: res,
		//     responseAlt: fs.ReadStream,
		//     responseAlt2: stream.pipe(res)
		//   },
		// })


	})
}