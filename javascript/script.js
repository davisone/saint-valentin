document.addEventListener("DOMContentLoaded", function () {
    const heartsContainer = document.querySelector(".hearts-container");

    function createHeart() {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = Math.random() * 3 + 2 + "s";
        heart.style.transform = `rotate(${Math.random() * 360}deg)`;
        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }

    setInterval(createHeart, 300);
});

// Ajout de la classe dynamique pour l'animation
document.addEventListener("DOMContentLoaded", function () {
    const style = document.createElement("style");
    style.innerHTML = `
        .heart {
            position: absolute;
            top: -10px;
            width: 25px;
            height: 25px;
            background-color: red;
            clip-path: polygon(50% 0%, 100% 35%, 85% 100%, 50% 85%, 15% 100%, 0% 35%);
            opacity: 0.8;
            animation: fall linear infinite;
        }

        @keyframes fall {
            from {
                transform: translateY(-10px);
            }
            to {
                transform: translateY(100vh);
            }
        }
    `;
    document.head.appendChild(style);
});