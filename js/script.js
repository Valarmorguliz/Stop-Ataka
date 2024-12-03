let numButtonClicks = 0;
function buttonClicked() {
    numButtonClicks += 1;
    const mainDiv = document.getElementById("mainDiv");
    if (mainDiv) {
        mainDiv.textContent = "Button Clicked times: " + numButtonClicks;
    }
}

// Отключение правого клика на всей странице
document.addEventListener("contextmenu", (e) => e.preventDefault());

// Отключение перетаскивания изображений
document.addEventListener("dragstart", (e) => {
    if (e.target.tagName === "IMG") {
        e.preventDefault();
    }
});

// Отключение выделения текста и изображений
document.addEventListener("selectstart", (e) => {
    if (e.target.tagName === "IMG") {
        e.preventDefault();
    }
});

document.getElementById("data-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    // Проверка телефона
    const phoneInput = document.getElementById("phone");
    const phonePattern = /^\+?[0-9\s\-()]{10,15}$/;
    if (!phonePattern.test(phoneInput.value)) {
        alert("Введите корректный номер телефона, например: +1234567890 или 123-456-7890");
        return;
    }

    // Отправка данных
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const googleScriptURL = "ВАШ_URL_ВЕБ-ПРИЛОЖЕНИЯ";

    try {
        const response = await fetch(googleScriptURL, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();
        if (result.success) {
            alert("Форма успешно отправлена!");
        } else {
            alert("Ошибка при отправке формы.");
        }
    } catch (error) {
        console.error("Ошибка:", error);
        alert("Не удалось отправить форму.");
    }
});

const iframe = document.querySelector(".responsive-iframe");

// Функция для обновления высоты iframe
function resizeIframe() {
    if (iframe.contentWindow) {
        try {
            const newHeight = iframe.contentWindow.document.body.scrollHeight;
            iframe.style.height = `${newHeight}px`;
        } catch (error) {
            console.warn("Нет доступа к содержимому iframe:", error);
        }
    }
}

// Событие загрузки iframe
iframe.addEventListener("load", () => {
    try {
        resizeIframe();

        // Наблюдение за изменениями внутри iframe
        const observer = new MutationObserver(resizeIframe);
        observer.observe(iframe.contentDocument.body, { childList: true, subtree: true });
    } catch (error) {
        console.warn("Нет доступа к содержимому iframe:", error);
    }
});
