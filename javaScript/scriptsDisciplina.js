// disciplinaModal.open = true // funciona para abrir o dialog
// disciplinaModal.open = false// funciona para fechar o dialog
// disciplinaModal.setAttribute('open', true) // funciona para abrir o dialog
// disciplinaModal.setAttribute('open', false) // não funciona para fechar o dialog
// disciplinaModal.removeAttribute('open') funciona para fechar o dialog
// disciplinaModal.showModal() // funciona para abrir o dialog
// disciplinaModal.close() funciona para fechar o dialog

const disciplinaModal = document.querySelector('#disciplina-modal');
const disciplinaForm = document.querySelector('#disciplina-form');
const disciplinaModalTitle = document.querySelector('#disciplina-modal-title')
const savedisciplinaButton = document.querySelector('#save-disciplina')

/**
 * Função responsável abrir o modal de estudante
 */
const opendisciplinaModal = () => disciplinaModal.showModal();

/**
 * Função responsável fechar o modal de estudante
 */
const closedisciplinaModal = () => disciplinaModal.close();

/**
 * Função responsável por criar linhas na tabela disciplina-table
 * @param {nome} string
 * @param {cargaHoraria} string
 * @param {professor} string
 * @param {status} string
 * @param {observacos} string
 * @param {id} string
 * 
 * nome, cargaHoraria, professor, status,observacos
 */
const createdisciplinaTableRow = (nome, cargaHoraria, professor, status,observacos,id) => {
  const disciplinaList = document.querySelector('.subject-list')
  const disc = document.createElement('tr');
  disc.innerHTML = `<div class="subject-card">
            <h3 class="subject-card__title">${nome}</h3>
            <hr />
            <ul class="subject-card__list">
              <li>carga horária: ${cargaHoraria}</li>
              <li>Professor:${professor}</li>
              <li>Status <span class="tag tag--success">${status}</span></li>
            </ul>            
            <p>${observacos}</p>
            <button class="button button--danger" onclick=deletedisciplinaTable(${id})>Apagar</button>
            <button class="button button--success" onclick="editddisciplinaModal(${id})">Editar</button>
          </div>`;
  disciplinaList.appendChild(disc);
}

/**
 * Função responsável savar os dados de um estudante
 * @param {url} string
 * @param {method} string
 */
const savedisciplinaData = (url, method) => {
    const inputs = document.querySelectorAll('input') // pega todos os iputs
     console.log(inputs[0].value) // acessa o primeiro indice do array de inputs
  disciplinaForm.addEventListener('submit', (event)=> {
    event.preventDefault();
    const formData = new FormData(disciplinaForm);
    const payload = new URLSearchParams(formData);
    fetch(url, {
        method: method,
        body: payload
    })
    .catch(error => {
        closedisciplinaModal();
        alert('ocorreu um erro tente mais tarde')
        console.error(error);
    })
     
  });
}

/**
 * Função responsável abrir o modal de aluno e salvar um novo aluno
 * @param {disciplinaId} string
 */
const createdisciplina = () => {
  opendisciplinaModal();
  disciplinaModalTitle.textContent = 'Nova Disciplina';
  savedisciplinaButton.textContent = 'Criar';
  savedisciplinaData('http://localhost:3000/disciplinas',  'POST');
}

/**
 * Função responsável abrir o modal de edição e carregar os dados de um estudante e salvar os dados da edição
 * @param {disciplinaId} string
 */
 const editddisciplinaModal = async (disciplinaId)  => {
  const url = `http://localhost:3000/disciplinas/${disciplinaId}`;
  opendisciplinaModal();
  disciplinaModalTitle.textContent='Editar disciplina';
  savedisciplinaButton.textContent = 'Editar';
  const [name, matricula] = document.querySelectorAll('input');
  const selectCurso =  document.querySelector("#curso");
  fetch(url)
  .then(resp => resp.json())
  .then(data => {
    name.value = data.nome
    cargaHoraria.value = data.cargaHoraria
    professor.value = data.professor
    status.value = data.status
    observacos.value = data.observacos
  })
  savedisciplinaData(url,  'PUT');
 };

/**
 * Função responsável por apagar dados de um estutande
 * @param {disciplinaId} string
 */
const deletedisciplinaTable = async (disciplinaId)  =>  
  fetch(`http://localhost:3000/disciplinas/${disciplinaId}`, {method : 'DELETE'});

/**
 * Função responsável por carregar os dados da disciplina-table
 */
const loaddisciplinaTable = () => {
  fetch('http://localhost:3000/disciplinas')
  .then(resp => resp.json())
  .then(data => {
    data.forEach(item => {
      createdisciplinaTableRow(item.nome, item.cargaHoraria, item.professor, item.status,item.observacos,item.id)
    })
  }).catch((error) => {
    alert('ocorreu um erro tente mais tarde')
    console.error(error);
  });
};

loaddisciplinaTable();





