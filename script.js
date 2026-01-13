document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       INTRO FLOATING HEARTS
       ========================= */
    const intro = document.getElementById("intro");
    let introHeartsInterval = null;

    if (intro) {
        introHeartsInterval = setInterval(() => {
            // Stop hearts when intro leaves viewport
            if (intro.getBoundingClientRect().bottom < 0) {
                clearInterval(introHeartsInterval);
                return;
            }

            for (let i = 0; i < 5; i++) {
                const heart = document.createElement("div");
                heart.className = "heart";
                heart.innerHTML = "❤️";

                heart.style.left = Math.random() * 100 + "%";
                heart.style.fontSize = (16 + Math.random() * 20) + "px";
                heart.style.animationDuration =
                    (3 + Math.random() * 3) + "s";

                intro.appendChild(heart);
                setTimeout(() => heart.remove(), 6000);
            }
        }, 500);
    }

    /* =========================
       HEART BURST
       ========================= */
    function heartBurst() {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;

        for (let i = 0; i < 25; i++) {
            const h = document.createElement("div");
            h.className = "burst-heart";
            h.innerHTML = ["❤️", "💖", "💕"][Math.floor(Math.random() * 3)];

            const x = (Math.random() - 0.5) * 700;
            const y = (Math.random() - 0.5) * 700;

            h.style.left = cx + "px";
            h.style.top = cy + "px";
            h.style.setProperty("--x", x + "px");
            h.style.setProperty("--y", y + "px");

            document.body.appendChild(h);
            setTimeout(() => h.remove(), 1200);
        }
    }

    /* =========================
       GENTLE PETAL FALL
       ========================= */
    let petalsStarted = false;

    function startPetals() {
        if (petalsStarted) return;
        petalsStarted = true;

        setInterval(() => {
            const petal = document.createElement("div");
            petal.className = "petal";
            petal.innerHTML = "🌸";

            petal.style.left = Math.random() * 100 + "vw";
            petal.style.animationDuration =
                (7 + Math.random() * 5) + "s";

            document.body.appendChild(petal);
            setTimeout(() => petal.remove(), 12000);
        }, 1200); // slow & gentle
    }

    /* =========================
       SAFE SECTION TRANSITIONS
       ========================= */
    const sections = [
        document.getElementById("timeline"),
        document.getElementById("message"),
        document.getElementById("outro")
    ];

    const triggered = new Set();

    function revealOnScroll() {
        const triggerPoint = window.innerHeight * 0.8;

        sections.forEach(section => {
            if (
                section &&
                !triggered.has(section) &&
                section.getBoundingClientRect().top < triggerPoint
            ) {
                section.classList.add("active");

                // 💥 Heart burst for timeline & message only
                if (section.id === "timeline" || section.id === "message") {
                    heartBurst();
                }

                // 🌸 Start petals when timeline appears
                if (section.id === "timeline") {
                    startPetals();
                }

                triggered.add(section);
            }
        });
    }

    // Initial check
    revealOnScroll();

    // Scroll listener
    window.addEventListener("scroll", revealOnScroll);
});

/* =========================
   FULLSCREEN IMAGE
   ========================= */
function openFullscreen(img) {
    const fs = document.getElementById("fullscreen");
    const fsImg = document.getElementById("fullscreen-img");

    fsImg.src = img.src;
    fs.style.display = "flex";
}

function closeFullscreen() {
    document.getElementById("fullscreen").style.display = "none";
}
