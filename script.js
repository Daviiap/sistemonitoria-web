const inputMatrculaEl = document.getElementById('matricula')
const form = document.getElementById('form')
const inputNomeEl = document.getElementById('nome')
const inputTelefoneEl = document.getElementById('telefone')
const inputDescriptionEl = document.getElementById('description')
const imageInputEl = document.getElementById('image')
const submitButtonEl = document.getElementById('submit-button')

const requester = new XMLHttpRequest()

submitButtonEl.addEventListener('click', (event) => {
  event.preventDefault()

  const matricula = inputMatrculaEl.value
  const nome = inputNomeEl.value
  const contato = inputTelefoneEl.value
  const description = inputDescriptionEl.value
  const image = imageInputEl.files[0]

  requester.open("POST", "http://localhost:8080/submit", true);

  requester.setRequestHeader("Content-Type", "application/json");

  requester.send(JSON.stringify({ matricula, nome, contato, description, image }))

  requester.onreadystatechange = function () {
    if (requester.readyState == 4 && requester.status == 200) {
      const today = new Date();
      const weekDay = today.getDay()
      if (weekDay < 3
        || (weekDay === 3 && today.getHours() < 14)
        || (weekDay === 5 && today.getHours() >= 16)
        || weekDay === 6) {
        window.alert(`Formulário enviado com sucesso!\nVocê será respondido na próxima quarta-feira`)
      } else {
        window.alert(`Formulário enviado com sucesso!\nVocê será respondido na próxima sexta-feira!`)
      }
    }
  }
})
