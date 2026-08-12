'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. GERENCIAMENTO DE TEMA (DARK / LIGHT MODE)
     ========================================================================== */
  const themeBtn = document.getElementById('themeToggle');
  const themeText = themeBtn.querySelector('.theme-text');
  const themeIcon = themeBtn.querySelector('.theme-icon');

  // Verifica tema salvo ou preferência do sistema operacional
  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    const isDark = theme === 'dark';
    
    // Atualiza a interface e estados de acessibilidade
    themeIcon.textContent = isDark ? '☀️' : '🌙';
    themeText.textContent = isDark ? 'Modo Claro' : 'Modo Escuro';
    themeBtn.setAttribute('aria-pressed', isDark);
    themeBtn.setAttribute('aria-label', `Alternar para ${isDark ? 'modo claro' : 'modo escuro'}`);
    
    localStorage.setItem('theme', theme);
  };

  // Inicializa o tema
  let currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  // Evento de clique para trocar tema
  themeBtn.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(currentTheme);
  });


  /* ==========================================================================
     2. FILTRO DE CARDS (DELEGAÇÃO DE EVENTOS)
     ========================================================================== */
  const filtersContainer = document.querySelector('.filters');
  const cards = document.querySelectorAll('.card');

  if (filtersContainer) {
    filtersContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;

      // Atualiza botão ativo e atributos ARIA
      filtersContainer.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('active');
        b.removeAttribute('aria-current');
      });

      btn.classList.add('active');
      btn.setAttribute('aria-current', 'page');

      const filterValue = btn.dataset.filter;

      // Exibe/oculta cards
      cards.forEach(card => {
        const isMatch = filterValue === 'all' || card.dataset.category === filterValue;
        card.hidden = !isMatch;
      });
    });
  }


  /* ==========================================================================
     3. MODAL DE DETALHES (USANDO A TAG NATIVA <dialog>)
     ========================================================================== */
  const modal = document.getElementById('infoModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalTag = document.getElementById('modalTag');
  const cardGrid = document.getElementById('cardGrid');

  const openModal = ({ title, desc, category }) => {
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalTag.textContent = category;
    modal.showModal(); // Método nativo HTML5
  };

  const closeModal = () => {
    modal.close(); // Método nativo HTML5
  };

  // Escuta cliques nos cards usando delegação de eventos no grid
  if (cardGrid) {
    cardGrid.addEventListener('click', (e) => {
      const actionBtn = e.target.closest('.card-action');
      if (!actionBtn) return;

      const { title, desc, category } = actionBtn.dataset;
      openModal({ title, desc, category });
    });
  }

  // Fechar no botão 'X'
  closeModalBtn?.addEventListener('click', closeModal);

  // Fechar ao clicar no backdrop (fora do conteúdo do modal)
  modal?.addEventListener('click', (e) => {
    const rect = modal.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX && e.clientX <= rect.left + rect.width
    );

    if (!isInDialog) closeModal();
  });


  /* ==========================================================================
     4. GERADOR ALEATÓRIO DE RECOMENDAÇÃO (EVITA REPETIÇÃO)
     ========================================================================== */
  const recommendations = [
    "🎮 Experimente jogar um RPG Indie hoje!",
    "📚 Leia 15 páginas de um livro de ficção científica.",
    "🎨 Tente desenhar um objeto da sua mesa em 5 minutos.",
    "🎧 Ouça uma playlist de Lofi enquanto toma um café.",
    "✍️ Escreva um mini diário sobre o que você aprendeu nesta semana."
  ];

  const suggestBtn = document.getElementById('suggestBtn');
  const recText = document.getElementById('recommendation-text');
  let lastIndex = -1;

  suggestBtn?.addEventListener('click', () => {
    let randomIndex;
    
    // Garante que a mesma recomendação não seja sorteada duas vezes seguidas
    do {
      randomIndex = Math.floor(Math.random() * recommendations.length);
    } while (randomIndex === lastIndex && recommendations.length > 1);

    lastIndex = randomIndex;
    recText.textContent = recommendations[randomIndex];
  });

});
