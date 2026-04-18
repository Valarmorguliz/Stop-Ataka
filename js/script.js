document.addEventListener("DOMContentLoaded", function () {
    // Отключение выделения текста
    document.body.style.userSelect = "none";

    // Отключение выделения изображений
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
        img.style.pointerEvents = "none";
    });

    const applicationForm = document.getElementById('application-form');

    // Функция для показа сообщения благодарности
    function showThankYouMessage() {
        applicationForm.style.display = 'none';
        
        const thankYouMessage = document.createElement('div');
        thankYouMessage.style.cssText = `
            background-color: #d4edda;
            border: 2px solid #28a745;
            color: #155724;
            padding: 30px;
            border-radius: 8px;
            text-align: center;
            font-size: 1.2rem;
            font-weight: bold;
            margin: 20px 0;
        `;
        thankYouMessage.innerHTML = 'Спасибо! Вы уже подали заявку.<br><br>Один пользователь = одна консультация.';
        applicationForm.parentNode.insertBefore(thankYouMessage, applicationForm);
    }

    // Проверяем, была ли форма уже отправлена
    if (localStorage.getItem('formSubmitted') === 'true') {
        showThankYouMessage();
    }

    // Скрипт для обработки отправки формы
    applicationForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Проверяем, не была ли форма уже отправлена
        if (localStorage.getItem('formSubmitted') === 'true') {
            alert('Ваша заявка уже была отправлена.');
            return;
        }

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
                // Сохраняем флаг отправки в localStorage
                localStorage.setItem('formSubmitted', 'true');
                
                // Показываем сообщение благодарности
                showThankYouMessage();
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
