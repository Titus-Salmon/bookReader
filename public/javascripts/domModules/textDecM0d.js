let fsResults = document.getElementsByClassName('fsResults')
let searchTerm = document.getElementById('searchTerm')
let searchBookBtn = document.getElementById('searchBookBtn')

searchBookBtn.addEventListener("click", function () {
  for (let i = 0; i < fsResults.length; i++) {
    // fsResults[i].innerHTML = fsResults[i].innerHTML.toLowerCase()
    if (fsResults[i].innerHTML.includes(`${searchTerm.value}`)) {
      fsResults[i].innerHTML = fsResults[i].innerHTML.replace(`${searchTerm.value}`, `<span style="color: red">${searchTerm.value}</span>`)
    }
  }
})