document.addEventListener("DOMContentLoaded", () => {
    const word = "BORDEAUX"; // Le mot à deviner
    const lives = 3; // Nombre de vies limité à 3
    let guessedLetters = [];
    let remainingLives = lives;

    const wordContainer = document.getElementById("word-container");
    const livesContainer = document.getElementById("lives-container");
    const keyboard = document.getElementById("keyboard");
    const gameContainer = document.querySelector(".game-container");

    // Initialiser le jeu
    function initializeGame() {
        guessedLetters = [];
        remainingLives = lives;
        wordContainer.innerHTML = ""; // Réinitialiser l'affichage du mot
        keyboard.innerHTML = ""; // Réinitialiser le clavier
        displayWord();
        updateLives();
        createKeyboard();
        removeMessage(); // Supprimer les anciens messages
    }

    // Afficher le mot avec les lettres devinées
    function displayWord() {
        wordContainer.innerHTML = word
            .split("")
            .map(letter => (guessedLetters.includes(letter) ? letter : "_"))
            .join(" ");
    }

    // Mettre à jour l'affichage des vies
    function updateLives() {
        livesContainer.innerText = "❤️".repeat(remainingLives) + "🖤".repeat(lives - remainingLives);
    }

    // Créer le clavier virtuel
    function createKeyboard() {
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(letter => {
            const key = document.createElement("button");
            key.classList.add("key");
            key.innerText = letter;
            key.addEventListener("click", () => handleGuess(letter, key));
            keyboard.appendChild(key);
        });
    }

    // Gérer une tentative de lettre
    function handleGuess(letter, keyElement) {
        if (guessedLetters.includes(letter) || remainingLives <= 0) return;

        guessedLetters.push(letter);

        if (word.includes(letter)) {
            displayWord();
            checkVictory();
        } else {
            remainingLives--;
            updateLives();
            checkDefeat();
        }

        keyElement.classList.add("disabled");
        keyElement.disabled = true;
    }

    // Vérifier si le joueur a gagné
    function checkVictory() {
        if (word.split("").every(letter => guessedLetters.includes(letter))) {
            displayMessage(`
                <p>Bravo ! Vous avez deviné le mot : <strong>BORDEAUX</strong> 🎉</p>
                <p>L'indice suivant est : <strong>"WEEK"</strong></p>
                <a href="../html/final.html" class="success-link">Cliquez ici pour continuer vers le prochain jeu</a>
            `, "success", true);
        }
    }

    // Vérifier si le joueur a perdu
    function checkDefeat() {
        if (remainingLives === 0) {
            displayMessage(`Dommage, vous avez perdu ! Le jeu va recommencer.`, "error");
            setTimeout(() => initializeGame(), 2000); // Redémarrer le jeu après 2 secondes
        }
    }

    // Afficher un message
    function displayMessage(message, type, isHTML = false) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", type);
    
        if (isHTML) {
            messageDiv.innerHTML = message; // Insère le contenu comme du HTML
        } else {
            messageDiv.innerText = message; // Insère le contenu comme du texte brut
        }
    
        gameContainer.appendChild(messageDiv);
    }

    // Supprimer les messages
    function removeMessage() {
        const existingMessage = document.querySelector(".message");
        if (existingMessage) {
            existingMessage.remove();
        }
    }

    initializeGame();
});
