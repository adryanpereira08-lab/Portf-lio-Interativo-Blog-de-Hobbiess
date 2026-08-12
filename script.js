document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const hobbyCards = document.querySelectorAll('.card');
    const navLinks = document.querySelectorAll('.nav-links a, .hero .btn');

    // --- 1. LÓGICA DE FILTRAGEM COM ANIMAÇÃO ---
    function applyFilter(filterValue) {
        hobbyCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const shouldShow = filterValue === 'all' || filterValue === cardCategory;

            if (shouldShow) {
                card.classList.remove('hide');
                // Pequeno delay para acionar a transição de opacidade/escala
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                // Esconde o elemento do layout após a animação de saída
                setTimeout(() => {
                    card.classList.add('hide');
                }, 300);
            }
        });
    }

    // Evento de clique nos botões de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');

            // Atualiza o estado ativo dos botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Salva a preferência do usuário no navegador
            localStorage.setItem('selectedFilter', filterValue);

            // Aplica o filtro
