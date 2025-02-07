document.addEventListener("DOMContentLoaded", () => {
    const game = document.getElementById('memory-game');
    const cards = document.querySelectorAll('.memory-card');
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let matchedCards = 0;

    // Fonction pour mélanger les cartes
    function shuffleCards() {
        const cardsArray = Array.from(cards); // Convertit NodeList en tableau
        cardsArray.forEach(card => {
            const randomPos = Math.floor(Math.random() * cards.length);
            card.style.order = randomPos; // Utilise la propriété `order` CSS pour mélanger
        });
    }

    // Fonction pour retourner une carte
    function flipCard() {
        if (lockBoard || this === firstCard) return;

        this.classList.add('flip');

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        lockBoard = true;

        checkForMatch();
    }

    // Vérifier si deux cartes correspondent
    function checkForMatch() {
        const isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

        if (isMatch) {
            disableCards();
            matchedCards += 2;

            if (matchedCards === cards.length) {
                showVictoryPopup(); // Afficher le popup de victoire
            }
        } else {
            unflipCards();
        }
    }

    // Désactiver les cartes appariées
    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
    }

    // Retourner les cartes si elles ne correspondent pas
    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 1000);
    }

    // Réinitialiser les variables pour le prochain tour
    function resetBoard() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }

    // Afficher le popup de victoire
    function showVictoryPopup() {
        const popup = document.createElement('div');
        popup.classList.add('popup');
        popup.innerHTML = `
            <h2>Victoire ! 🎉</h2>
            <p>Le message caché est : <strong>END</strong></p>
            <p><a href="../html/jeux_2.html" style="color: #e6005c; text-decoration: none; font-weight: bold;">Clique ici pour continuer vers le dernier jeu</a></p>
        `;
        document.body.appendChild(popup);

        // Afficher le popup
        popup.style.display = 'block';

        // Fermer le popup lorsqu'on clique sur le bouton
        document.getElementById('close-popup').addEventListener('click', () => {
            popup.style.display = 'none';
        });
    }

    // Initialisation du jeu
    shuffleCards(); // Mélanger les cartes
    cards.forEach(card => card.addEventListener('click', flipCard)); // Ajouter les écouteurs d'événements
});
