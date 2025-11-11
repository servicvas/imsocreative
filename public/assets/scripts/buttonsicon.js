window.addEventListener("DOMContentLoaded", () => {
	document.addEventListener("click", (e) => {
		const icon = e.target.closest(".button_smilicon");
		if (!icon) return;

		const openAnim = icon.querySelector("animate.open");
		const closeAnim = icon.querySelector("animate.close");

		if (!openAnim || !closeAnim) return;

		// Получаем текущее состояние из dataset (по умолчанию — false)
		const isOpen = icon.dataset.isOpen === "true";

		if (isOpen) {
			closeAnim.beginElement();
		} else {
			openAnim.beginElement();
		}

		// Сохраняем новое состояние в dataset
		icon.dataset.isOpen = !isOpen;

		if (icon.classList.contains("button_themetoggle")) {
			document.body.classList.toggle("dark-mode");
		}
	});
});
