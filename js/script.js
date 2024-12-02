let numButtonClicks = 0;
function buttonClicked() {
    numButtonClicks = numButtonClicks + 1;
    document.getElementById("mainDiv").textContent =
        "Button Clicked times: " + numButtonClicks;
}
// Отключение правого клика на всей странице
document.addEventListener("contextmenu", function (e) {
    e.preventDefault(); // Блокируем стандартное контекстное меню
});

// Отключение перетаскивания изображений
document.querySelectorAll("img").forEach(function (img) {
    img.addEventListener("dragstart", function (e) {
        e.preventDefault(); // Блокируем возможность перетаскивания изображений
    });
});

// Отключение выделения текста и изображений
document.addEventListener("selectstart", function (e) {
    if (e.target.tagName === "IMG") {
        e.preventDefault(); // Блокируем выделение изображений
    }
});


document.getElementById("data-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const googleScriptURL = "ВАШ_URL_ВЕБ-ПРИЛОЖЕНИЯ";

    try {
        const response = await fetch(googleScriptURL, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
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
