// js/main.js

document.addEventListener("DOMContentLoaded", () => {
  const textTags = [
    "p",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "li",
    "span",
    "time",
  ];

  // Назначаем contenteditable на подходящие элементы
  textTags.forEach((tag) => {
    document.querySelectorAll(tag).forEach((el) => {
      if (
        el.childNodes.length === 1 &&
        el.childNodes[0].nodeType === Node.TEXT_NODE &&
        el.textContent.trim() !== ""
      ) {
        el.setAttribute("contenteditable", "true");
      }
    });
  });

  // Теперь найдём все contenteditable элементы и подключим логику сохранения
  const editableElements = document.querySelectorAll(
    '[contenteditable="true"]',
  );

  editableElements.forEach((el, index) => {
    const key = `editable-${index}`;

    // Подставить сохранённый текст из localStorage
    const saved = localStorage.getItem(key);
    if (saved !== null) {
      el.innerText = saved;
    }

    // Сохранять при потере фокуса
    el.addEventListener("blur", () => {
      localStorage.setItem(key, el.innerText);
    });
  });
});

// Кнопка для сохранения в PDF
document.getElementById("download-pdf").addEventListener("click", () => {
  const btn = document.getElementById("download-pdf");
  btn.style.display = "none"; // скрыть кнопку

  const element = document.body; // или другой контейнер

  const opt = {
    filename: "resume.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf()
    .set(opt)
    .from(element)
    .save()
    .then(() => {
      btn.style.display = ""; // вернуть кнопку
    });
});
