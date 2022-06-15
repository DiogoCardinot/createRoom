import Modal from "./modal.js";

const modal = Modal();

//PARTE PARA MUDAR O MODAL DO EXCLUIR E DO MARCAR COMO LIDA(as duas são iguais, mudam apenas os textos)
const modalTitle = document.querySelector(".modal h2");
const modalDescription = document.querySelector(".modal p");
const modalButton = document.querySelector(".modal button");

//Pegar todos os botões marcar como lido(class=check)
const checkButtons = document.querySelectorAll(".actions a.check"); //check buttons é o button marcar como lida
//pega dentro da classe actions o check das tags "a"

//forEach percorre todos os checkButtons(como se fosse um for até o número de botões existentes)
checkButtons.forEach((button) => {
  //adicionar escuta
  button.addEventListener("click", handleClick); //(o que a gente quer escutar, o que fazer quando escutar)
});

const deleteButton = document.querySelectorAll(".actions a.delete"); //querySelectorAll para botões que tenham mais que 1
//deleteButton é o botão de excluir pergunta

deleteButton.forEach((button) => {
  button.addEventListener("click", (event) => handleClick(event, false));
});

function handleClick(event, check = true) {
  event.preventDefault();

  //Se o check for truee ele vira "Marcar como lido" se for falso "Excluir pergunta" (TEMPLATE STRING O NOME)
  const text = check ? "Marcar como lida" : "Excluir ";

  //Variável que pega se vai ser marcado como lida ou deletado
  const slug = check ? "check" : "delete";

  const questionId = event.target.dataset.id;

  //Variável que pega o id da sala para levar para o link
  const roomId = document.querySelector("#room-id").dataset.id;

  //seta o formulário em uma variável
  const form = document.querySelector(".modal form");
  //seta o atributo/variável rooId ao link quando a action marcar como lido e excluir enviar for realizada
  form.setAttribute("action", `/question/${roomId}/${questionId}/${slug}`); //envia os atributos para cada variável

  //Só funciona entre crases
  modalTitle.innerHTML = `${text} esta pergunta`;
  //BASICAMENTE O CHECK TRUE FUNCIONA PARA O MARCAR COMO LIDA E O FALSE PARA O DELETE BUTTON pois foi atribuido assim no código
  modalDescription.innerHTML = `Tem certeza que deseja ${text.toLowerCase()} esta pergunta?`;
  modalButton.innerHTML = `Sim, ${text.toLowerCase()}`;
  check
    ? modalButton.classList.remove("red")
    : modalButton.classList.add("red");
  //Abrir o modal
  modal.open();
}
