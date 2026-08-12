document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. ALTERNÂNCIA DE TEMA (DARK / LIGHT MODE)
  // ==========================================
  const themeBtn = document.getElementById('themeToggle');
  
  // Detecta preferência do SO caso o localStorage esteja vazio
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let currentTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeBtn) {
      themeBtn.textContent = theme === 'dark' ? '☀️ Modo Claro' : '🌙 Modo Escuro';
      themeBtn.setAttribute('aria-label', `Alternar para ${theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}`);
    }
    localStorage.setItem('theme', theme);
  }

  // Aplica tema inicial
  applyTheme(currentTheme);

  themeBtn?.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(currentTheme);
  });


  // ==========================================
  // 2. FILTRO DE CARDS
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Atualiza estado do botão
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      // Exibe/Oculta com classe CSS (preserva layouts flex/grid)
      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        const isMatch = filterValue === 'all' || category === filterValue;
        
        card.classList.toggle('hidden', !isMatch);
      });
    });
  });


  // ==========================================
  // 3. MODAL DE DETALHES
  // ==========================================
  const modal = document.getElementById('infoModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalTag = document.getElementById('modalTag');

  function openModal(title, desc, tag) {
    if (!modal) return;
    if (modalTitle) modalTitle.textContent = title;
    if (modalDesc) modalDesc.textContent = desc;
    if (modalTag) modalTag.textContent = tag;
    
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }

  // Evento global para fechar no clique fora ou pressionando 'ESC'
  window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('active')) {
      closeModal();
    }
  });


  // ==========================================
  // 4. GERADOR ALEATÓRIO DE RECOMENDAÇÃO
  // ==========================================
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
    
    // Evita repetir a mesma frase duas vezes seguidas
    do {
      randomIndex = Math.floor(Math.random() * recommendations.length);
    } while (randomIndex === lastIndex && recommendations.length > 1);

    lastIndex = randomIndex;
    if (recText) recText.textContent = recommendations[randomIndex];
  });

});
