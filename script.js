document.addEventListener('DOMContentLoaded', () => {

  // --- SELETORES DE ELEMENTOS ---
  const inputTarefa = document.getElementById('nova-tarefa-input');
  const btnAdicionar = document.getElementById('adicionar-tarefa-btn');
  const listaTarefas = document.getElementById('lista-de-tarefas');
  const btnTodas = document.getElementById('filter-todas');
  const btnAtivas = document.getElementById('filter-ativas');
  const btnConcluidas = document.getElementById('filter-concluidas');

  // --- FUNÇÕES ---

  function salvarTarefas() {
    const tarefas = [];
    document.querySelectorAll('#lista-de-tarefas li').forEach(itemLista => {
      tarefas.push({
        texto: itemLista.querySelector('span').textContent,
        concluida: itemLista.classList.contains('concluida')
      });
    });
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }

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

    spanTexto.addEventListener('click', () => {
      itemLista.classList.toggle('concluida');
      salvarTarefas();
    });

    btnApagar.addEventListener('click', () => {
      listaTarefas.removeChild(itemLista);
      salvarTarefas();
    });
  }
  
  function carregarTarefas() {
    const tarefasSalvas = localStorage.getItem('tarefas');
    if (tarefasSalvas) {
      const tarefas = JSON.parse(tarefasSalvas);
      tarefas.forEach(tarefa => {
        criarElementoTarefa(tarefa.texto, tarefa.concluida);
      });
    }
  }

  function adicionarTarefaPeloInput() {
    const textoTarefa = inputTarefa.value.trim();
    if (textoTarefa === '') {
      alert("Por favor, escreva uma tarefa.");
      return;
    }
    criarElementoTarefa(textoTarefa, false);
    inputTarefa.value = '';
    salvarTarefas();
  }

  function filtrarTarefas(filtro) {
    const tarefas = document.querySelectorAll('#lista-de-tarefas li');
    
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`filter-${filtro}`).classList.add('active');
    
    tarefas.forEach(tarefa => {
      switch (filtro) {
        case 'ativas':
          tarefa.style.display = tarefa.classList.contains('concluida') ? 'none' : 'flex';
          break;
        case 'concluidas':
          tarefa.style.display = tarefa.classList.contains('concluida') ? 'flex' : 'none';
          break;
        default: // 'todas'
          tarefa.style.display = 'flex';
          break;
      }
    });
  }

  // --- EVENTOS PRINCIPAIS ---
  
  btnAdicionar.addEventListener('click', adicionarTarefaPeloInput);
  
  inputTarefa.addEventListener('keypress', (evento) => {
    if (evento.key === 'Enter') {
      adicionarTarefaPeloInput();
    }
  });

  btnTodas.addEventListener('click', () => filtrarTarefas('todas'));
  btnAtivas.addEventListener('click', () => filtrarTarefas('ativas'));
  btnConcluidas.addEventListener('click', () => filtrarTarefas('concluidas'));
  
  // --- INICIALIZAÇÃO ---

  carregarTarefas();
});