const inputMatrculaEl = document.getElementById('matricula')
const form = document.getElementById('form')
const inputNomeEl = document.getElementById('nome')
const inputTelefoneEl = document.getElementById('contact')
const inputDescriptionEl = document.getElementById('description')
const imageInputEl = document.getElementById('image-input')
const submitButtonEl = document.getElementById('submit-button')
const telCheckBox = document.getElementById('check-phone-number')
const emailCheckBox = document.getElementById('check-email')

function onlyOne(checkbox) {
  var checkboxes = document.getElementsByName('check')
  checkboxes.forEach((item) => {
    if (item !== checkbox)
      item.checked = false
    else
      item.checked = true
  })

  if(checkbox.id == 'check-phone-number'){
    inputTelefoneEl.setAttribute('placeholder', 'Telefone')
    inputTelefoneEl.setAttribute('type', 'number')
  } else {
    inputTelefoneEl.setAttribute('placeholder', 'E-mail')
    inputTelefoneEl.setAttribute('type', 'email')
  }

}

telCheckBox.onclick = () => onlyOne(telCheckBox)
emailCheckBox.onclick = () => onlyOne(emailCheckBox)

const requester = new XMLHttpRequest()

submitButtonEl.addEventListener('click', (event) => {
  event.preventDefault()

  const matricula = inputMatrculaEl.value
  const nome = inputNomeEl.value
  const contato = inputTelefoneEl.value
  const description = inputDescriptionEl.value
  const image = imageInputEl.files[0]

  requester.open("POST", "https://api-monitoria-fmccii.herokuapp.com/submit", true);

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
