document.addEventListener("DOMContentLoaded", () => {
    const dropArea = document.getElementById("drop-area");
    const fileInput = document.getElementById("fileElem");

    let currentImage = null;
    let rotation = 0;
    let isGrayscale = false;
    let isBlurred = false;

    // ✅ AUTO-RESIZE TEXTAREA (AGGIUNTO QUI)
    document.querySelectorAll("textarea").forEach(textarea => {
        textarea.addEventListener("input", function () {
            this.style.height = "auto";
            this.style.height = this.scrollHeight + "px";
        });

        // per adattare anche eventuale testo già presente
        textarea.style.height = textarea.scrollHeight + "px";
    });

    // CLICK per aprire file
    dropArea.addEventListener("click", () => fileInput.click());

    // Selezione file
    fileInput.addEventListener("change", (e) => {
        handleFile(e.target.files[0]);
    });

    // DRAG OVER
    dropArea.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropArea.classList.add("hover");
    });

    // DRAG LEAVE
    dropArea.addEventListener("dragleave", () => {
        dropArea.classList.remove("hover");
    });

    // DROP
    dropArea.addEventListener("drop", (e) => {
        e.preventDefault();
        dropArea.classList.remove("hover");

        const file = e.dataTransfer.files[0];
        handleFile(file);
    });

    // CARICAMENTO IMMAGINE
    function handleFile(file) {
        if (!file || !file.type.startsWith("image/")) {
            alert("Carica un'immagine valida!");
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            dropArea.innerHTML = `<img id="previewImg" src="${e.target.result}" alt="preview">`;
            currentImage = document.getElementById("previewImg");
            resetEffects();
        };
        reader.readAsDataURL(file);
    }

    // RESET EFFETTI
    function resetEffects() {
        rotation = 0;
        isGrayscale = false;
        isBlurred = false;
        applyEffects();
    }

    // APPLICA EFFETTI
    function applyEffects() {
        if (!currentImage) return;

        let filter = "";
        if (isGrayscale) filter += "grayscale(100%) ";
        if (isBlurred) filter += "blur(5px) ";

        currentImage.style.transform = `rotate(${rotation}deg)`;
        currentImage.style.filter = filter;
    }

    // BOTTONI

    // Elimina
    document.getElementById("deleteBtn").addEventListener("click", () => {
        dropArea.innerHTML = "Trascina un'immagine qui oppure clicca per selezionarla dalla galleria";
        currentImage = null;
    });

    // Ruota
    document.getElementById("rotateBtn").addEventListener("click", () => {
        if (!currentImage) return;
        rotation += 90;
        applyEffects();
    });

    // Bianco e nero
    document.getElementById("grayscaleeBtn").addEventListener("click", () => {
        if (!currentImage) return;
        isGrayscale = !isGrayscale;
        applyEffects();
    });

    // Sfocatura
    document.getElementById("blurBtn").addEventListener("click", () => {
        if (!currentImage) return;
        isBlurred = !isBlurred;
        applyEffects();
    });
});