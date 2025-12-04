window.addEventListener("DOMContentLoaded", () => {
	// Получаем мета-тег theme-color
	const metaThemeColor = document.querySelector('meta[name="theme-color"]');

	// Функция для получения текущего состояния темы
	function getThemeState() {
		return localStorage.getItem("theme") || "light";
	}

	// Функция для сохранения состояния темы
	function saveThemeState(theme) {
		localStorage.setItem("theme", theme);
	}

	// При загрузке страницы проверяем сохранённое состояние
	const currentTheme = getThemeState();
	document.documentElement.setAttribute("data-theme", currentTheme);

	// Устанавливаем начальный theme-color
	if (metaThemeColor) {
		metaThemeColor.setAttribute("content", currentTheme === "dark" ? "#151617" : "#f9f9f9");
	}

	document.addEventListener("click", (e) => {
		const icon = e.target.closest(".button_smilicon");
		if (!icon) return;

		const openAnim = icon.querySelector("animate.open");
		const closeAnim = icon.querySelector("animate.close");

		if (!openAnim || !closeAnim) return;

		const isOpen = icon.dataset.isOpen === "true";

		if (isOpen) {
			closeAnim.beginElement();
		} else {
			openAnim.beginElement();
		}

		icon.dataset.isOpen = !isOpen;

		if (icon.classList.contains("button_themetoggle")) {
			// Переключаем тему
			const current = document.documentElement.getAttribute("data-theme");
			const next = current === "dark" ? "light" : "dark";

			document.documentElement.setAttribute("data-theme", next);
			saveThemeState(next);

			// Обновляем theme-color
			if (metaThemeColor) {
				metaThemeColor.setAttribute("content", next === "dark" ? "#151617" : "#f9f9f9");
			}
		}

		if (icon.classList.contains("button_menu")) {
			const menu = document.querySelector("#menu");
      const headerButtons = document.querySelectorAll('.button_smilicon');
      const menuButton = document.querySelector("#button_menu");
      const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
			menu.classList.toggle("show_menu");
      menuButton.setAttribute('aria-expanded', !isExpanded);
      headerButtons.forEach(element => {
        element.classList.toggle('button_smilicon--onmenu');
      });
		}
	});
});
