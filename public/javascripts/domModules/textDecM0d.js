let fsResults = document.getElementsByClassName('fsResults')
// let fsResults = document.querySelectorAll('fsResults')
let searchTerm = document.getElementById('searchTerm')
let searchBookBtn = document.getElementById('searchBookBtn')
let parsedSearchResBtn = document.getElementById('parsedSearchResBtn')
let parsedSearchRes = document.getElementById('parsedSearchRes')

// console.log(`typeof fsResults==> ${typeof fsResults}`)
// console.log(`fsResults==> ${fsResults}`)
// console.log(`fsResults.length==> ${fsResults.length}`)
// console.log(`JSON.stringify(fsResults)==> ${JSON.stringify(fsResults)}`)
// console.log(`fsResults[4].innerHTML==> ${fsResults[4].innerHTML}`)
// console.log(`JSON.stringify(fsResults[4])==> ${JSON.stringify(fsResults[4])}`)
// console.log(`typeof fsResults[4]==> ${typeof fsResults[4]}`)

// let splitTest1 = fsResults[6].innerHTML.split((/(?<=.+)\s+(?=.+)/))

// console.log(`splitTest1==> ${splitTest1}`)

let regex1 = /(,)|(\.)|(-)/g

searchBookBtn.addEventListener("click", function () {
  for (let i = 0; i < fsResults.length; i++) {
    let fsResultsSplit = fsResults[i].innerHTML.split((/(?<=.+)\s+(?=.+)/))

    for (var j = 0; j < fsResultsSplit.length; j++) {
      if (fsResultsSplit[j].toLowerCase().includes((searchTerm.value).toLowerCase())) {
        fsResultsSplit[j] = '<span style="background-color: #32cd32">' + fsResultsSplit[j] + "</span>";
        fsResults[i].innerHTML = fsResultsSplit.join(' ');
      } else {

      }
    }

    // fsResults[i].innerHTML = fsResults[i].innerHTML.replace(`${searchTerm.value}`, `<span style="background-color: #32cd32">${searchTerm.value}</span>`)

  }
})

/**javascript Lookahead (from https://javascript.info/regexp-lookahead-lookbehind)
 * X(?=Y) 	Positive lookahead 	X if followed by Y
 * (?<=Y)X 	Positive lookbehind 	X if after Y
 * ==t0d==>you can combine the 2==> (?<=A)X(?=B) to yield: "X if after A and followed by B" <==t0d==*/

let saniRegex1 = /(\[)|(\])/g
let splitRegex1 = /(?<=}),(?={)/g
let saniParsedSearchRes = parsedSearchRes.value.replace(saniRegex1, '')
let saniParsedSearchResSplit = saniParsedSearchRes.split(splitRegex1)
console.log(`saniParsedSearchResSplit[0]==> ${saniParsedSearchResSplit[0]}`)

// let frontEndWords = lines[i].split(/(?<=.+)\s+(?=.+)/)

for (let x = 0; x < saniParsedSearchResSplit.length; x++) {
  let lineHilite = fsResults[0].parentNode.childNodes[JSON.parse(saniParsedSearchResSplit[x])['line#'] + 10] //the # you add at the end here
  //may vary, depending on the position of the childNodes that the 1st fsResults class element starts (i.e., if you add more DOM elements
  //before it, it will increase by however many DOM elements you've added. Currently, the value is 10, but if you added 1 additional DOM
  //element before it, such as a button, you'd have to change the # to 11)
  lineHilite.style.backgroundColor = "red"

}

console.log(`searchTerm.value==> ${searchTerm.value}`)

for (let y = 0; y < fsResults[0].parentNode.childNodes.length; y++) {
  // let frontEndWords = fsResults[0].parentNode.childNodes[y + 10].split(/(?<=.+)\s+(?=.+)/)
  // let frontEndWords = fsResults[0].parentNode.childNodes[y + 10]
  let frontEndWords = fsResults[0].parentNode.childNodes[y].innerHTML
  let frontEndWordsSplit = frontEndWords.split(/(?<=.+)\s+(?=.+)/)
  for (let z = 0; z < frontEndWordsSplit.length; z++) {
    // console.log(`frontEndWordsSplit==> ${frontEndWordsSplit}`)
    if (frontEndWordsSplit[z].includes(searchTerm.value))
      fsResults[0].parentNode.childNodes[y].innerHTML.replace(`${searchTerm.value}`, `<span style="background-color: #32cd32">${searchTerm.value}</span>`)
  }
}

let clickCount = 0

parsedSearchResBtn.addEventListener("click", function () {
  console.log(`saniParsedSearchRes==> ${saniParsedSearchRes}`)
  // for (let i = 0; i < fsResults.length; i++) {
  //   // fsResults[i].innerHTML = fsResults[i].innerHTML.toLowerCase()
  //   if (fsResults[i].innerHTML.includes(`${searchTerm.value}`)) {
  //     fsResults[i].innerHTML = fsResults[i].innerHTML.replace(`${searchTerm.value}`, `<span style="color: red">${searchTerm.value}</span>`)
  //   }
  // }

  // clickCount++

  let lineZoom = fsResults[0].parentNode.childNodes[JSON.parse(saniParsedSearchResSplit[clickCount])['line#'] + 10] //the # you add at the end here
  //may vary, depending on the position of the childNodes that the 1st fsResults class element starts (i.e., if you add more DOM elements
  //before it, it will increase by however many DOM elements you've added. Currently, the value is 10, but if you added 1 additional DOM
  //element before it, such as a button, you'd have to change the # to 11)

  console.log(`clickCount==> ${clickCount}`)

  lineZoom.scrollIntoView()

  clickCount++

})

console.log(`fsResults[0].parentNode.childNodes[7].innerHTML==> ${fsResults[0].parentNode.childNodes[7].innerHTML}`)
console.log(`fsResults[0].parentNode.childNodes[8].innerHTML==> ${fsResults[0].parentNode.childNodes[8].innerHTML}`)
console.log(`fsResults[0].parentNode.childNodes[9].innerHTML==> ${fsResults[0].parentNode.childNodes[9].innerHTML}`)
console.log(`fsResults[0].parentNode.childNodes[10].innerHTML==> ${fsResults[0].parentNode.childNodes[10].innerHTML}`)

console.log(`fsResults[0].parentNode.childNodes[13].innerHTML==> ${fsResults[0].parentNode.childNodes[13].innerHTML}`)