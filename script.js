// Espera que todo o HTML da página seja carregado antes de executar o código
document.addEventListener('DOMContentLoaded', () => {

  // 1. Encontrar os elementos HTML com que vamos interagir
  const inputTarefa = document.getElementById('nova-tarefa-input');
  const btnAdicionar = document.getElementById('adicionar-tarefa-btn');
  const listaTarefas = document.getElementById('lista-de-tarefas');

  // --- NOVA FUNÇÃO: Salvar as tarefas no localStorage ---
  function salvarTarefas() {
    const tarefas = [];
    // Percorre todos os <li> que estão na lista
    document.querySelectorAll('#lista-de-tarefas li').forEach(itemLista => {
      // Para cada item, guarda o texto e se está concluído ou não
      tarefas.push({
        texto: itemLista.querySelector('span').textContent,
        concluida: itemLista.classList.contains('concluida')
      });
    });
    // Converte o array de tarefas para texto (JSON) e guarda no localStorage
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }

  // --- NOVA FUNÇÃO: Criar uma tarefa na tela (refatorada) ---
  // Separei a lógica de criar o elemento para poder reutilizá-la
  function criarElementoTarefa(texto, concluida) {
    const itemLista = document.createElement('li');
    if (concluida) {
      itemLista.classList.add('concluida');
    }

    const spanTexto = document.createElement('span');
    spanTexto.textContent = texto;

    const btnApagar = document.createElement('button');
    btnApagar.textContent = 'Apagar';
    btnApagar.className = 'delete-btn';

    itemLista.appendChild(spanTexto);
    itemLista.appendChild(btnApagar);
    listaTarefas.appendChild(itemLista);

    // Adiciona os eventos para o novo item
    spanTexto.addEventListener('click', () => {
      itemLista.classList.toggle('concluida');
      salvarTarefas(); // MODIFICAÇÃO: Salva sempre que o estado muda
    });

    btnApagar.addEventListener('click', () => {
      listaTarefas.removeChild(itemLista);
      salvarTarefas(); // MODIFICAÇÃO: Salva sempre que uma tarefa é apagada
    });
  }
  
  // --- NOVA FUNÇÃO: Carregar as tarefas do localStorage ---
  function carregarTarefas() {
    const tarefasSalvas = localStorage.getItem('tarefas');
    if (tarefasSalvas) {
      // Converte o texto guardado de volta para um array
      const tarefas = JSON.parse(tarefasSalvas);
      // Para cada tarefa guardada, cria o elemento na tela
      tarefas.forEach(tarefa => {
        criarElementoTarefa(tarefa.texto, tarefa.concluida);
      });
    }
  }

  // 2. Função principal para adicionar uma nova tarefa (agora mais simples)
  function adicionarTarefaPeloInput() {
    const textoTarefa = inputTarefa.value.trim();
    if (textoTarefa === '') {
      alert("Por favor, escreva uma tarefa.");
      return;
    }

    criarElementoTarefa(textoTarefa, false); // Usa a nova função para criar o elemento
    inputTarefa.value = ''; // Limpa o campo
    salvarTarefas(); // MODIFICAÇÃO: Salva a lista atualizada
  }

  // 3. Adicionar os eventos principais
  btnAdicionar.addEventListener('click', adicionarTarefaPeloInput);
  inputTarefa.addEventListener('keypress', (evento) => {
    if (evento.key === 'Enter') {
      adicionarTarefaPeloInput();
    }
  });
  
  // 4. FINALMENTE, CARREGAR AS TAREFAS GUARDADAS QUANDO A PÁGINA ABRE
  carregarTarefas();
});