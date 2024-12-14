document.addEventListener("DOMContentLoaded", function () {
    // Отключение выделения текста
    document.body.style.userSelect = "none";

    // Отключение выделения изображений
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
        img.style.pointerEvents = "none";
    });
});

// Отключение выделения текста через JavaScript
document.addEventListener("selectstart", function (e) {
    e.preventDefault();
});

// Отключение перетаскивания изображений через JavaScript
document.addEventListener("dragstart", function (e) {
    if (e.target.tagName === "IMG") {
        e.preventDefault();
    }
});

// Скрипт для отключения правого клика 
document.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    });