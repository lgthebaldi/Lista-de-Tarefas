// Espera que todo o HTML da página seja carregado antes de executar o código
document.addEventListener('DOMContentLoaded', () => {

  // 1. Encontrar os elementos HTML com que vamos interagir
  const inputTarefa = document.getElementById('nova-tarefa-input');
  const btnAdicionar = document.getElementById('adicionar-tarefa-btn');
  const listaTarefas = document.getElementById('lista-de-tarefas');

  // 2. Função para adicionar uma nova tarefa
  function adicionarTarefa() {
    // Pega o texto do campo de input e remove espaços em branco no início e no fim
    const textoTarefa = inputTarefa.value.trim();

    // Se não houver texto, não faz nada
    if (textoTarefa === '') {
      alert("Por favor, escreva uma tarefa.");
      return;
    }

    // Cria um novo item de lista (o elemento <li>)
    const itemLista = document.createElement('li');

    // Cria o texto da tarefa
    const spanTexto = document.createElement('span');
    spanTexto.textContent = textoTarefa;

    // Cria o botão de apagar
    const btnApagar = document.createElement('button');
    btnApagar.textContent = 'Apagar';
    btnApagar.className = 'delete-btn'; // Adiciona a classe CSS

    // Adiciona o texto e o botão ao item da lista
    itemLista.appendChild(spanTexto);
    itemLista.appendChild(btnApagar);

    // Adiciona o item completo à lista visível na tela
    listaTarefas.appendChild(itemLista);

    // Limpa o campo de input para a próxima tarefa
    inputTarefa.value = '';

    // --- Lógica dos botões dentro da tarefa ---

    // Adiciona um evento de clique para marcar como concluída
    spanTexto.addEventListener('click', () => {
      itemLista.classList.toggle('concluida');
    });

    // Adiciona um evento de clique para o botão de apagar
    btnApagar.addEventListener('click', () => {
      listaTarefas.removeChild(itemLista);
    });
  }

  // 3. Adicionar os eventos principais
  
  // Quando o botão "Adicionar" for clicado, chama a função adicionarTarefa
  btnAdicionar.addEventListener('click', adicionarTarefa);

  // Permite também adicionar a tarefa ao pressionar a tecla "Enter"
  inputTarefa.addEventListener('keypress', (evento) => {
    if (evento.key === 'Enter') {
      adicionarTarefa();
    }
  });

});