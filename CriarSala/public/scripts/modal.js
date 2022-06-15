export default function Modal() {
  const modalWrapper = document.querySelector(".modal-wrapper");

  const cancelButton = document.querySelector(".button.cancel");

  cancelButton.addEventListener("click", close); //qnd ouvir o cancel button sendo clicado aciona a funcão close

  function open() {
    //funcionalidade de atribuir a classe active para a modal
    //pega a classe modal-wrapper e adiciona a classe active nela
    modalWrapper.classList.add("active");
  }
  function close() {
    //funcionalidade de remover a classe active para a modal
    modalWrapper.classList.remove("active");
  }
  return {
    open,
    close,
  };
}
