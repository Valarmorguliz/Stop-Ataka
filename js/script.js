document.addEventListener("DOMContentLoaded", function () {
    // Отключение выделения текста
    document.body.style.userSelect = "none";

    // Отключение выделения изображений
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
        img.style.pointerEvents = "none";
    });

    // Скрипт для обработки отправки формы
    document.getElementById('application-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);

        fetch('https://formspree.io/f/mnnqyedw', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                window.location.href = 'page8.html'; // замените на URL следующей страницы
            } else {
                alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте ещё раз.');
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте ещё раз.');
        });
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
