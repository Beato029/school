document.addEventListener("DOMContentLoaded", () => {
    const dropArea = document.getElementById("drop-area");
    const fileInput = document.getElementById("fileElem");

    dropArea.addEventListener("click", () => fileInput.click());

    fileInput.addEventListener("change", (e) => {
    handleFile(e.target.files[0]);
    });

    dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("hover");
    });

    dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("hover");
    });

    dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    dropArea.classList.remove("hover");

    const file = e.dataTransfer.files[0];
    handleFile(file);
    });

    function handleFile(file) {
    if (!file || !file.type.startsWith("image/")) {
        alert("Carica un'immagine valida!");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        dropArea.innerHTML = `<img src="${e.target.result}" alt="preview">`;
    };
    reader.readAsDataURL(file);
    }
});