const parallaxItems = new Map();
let virtualScroll = window.pageYOffset;
let smoothScroll = window.pageYOffset;

const LERP_FACTOR = 0.5;
const SPEED_DIVIDER = 0.5;

// 1. Оптимизированное чтение скролла (пассивный слушатель)
window.addEventListener(
	"scroll",
	() => {
		virtualScroll = window.pageYOffset;
	},
	{ passive: true },
);

const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			const el = entry.target;
			if (entry.isIntersecting) {
				// Читаем геометрию только ОДИН РАЗ при входе в кадр
				const rect = el.getBoundingClientRect();
				const speedValue = parseFloat(el.getAttribute("data-parallax")) || 0;

				parallaxItems.set(el, {
					entryPoint: window.pageYOffset + rect.top + rect.height / 2,
					speed: speedValue * SPEED_DIVIDER,
				});
			} else {
				parallaxItems.delete(el);
			}
		});
	},
	{ threshold: 0, rootMargin: "200px" },
);

function render() {
	// Плавная интерполяция
	if (Math.abs(virtualScroll - smoothScroll) > 0.01) {
		smoothScroll += (virtualScroll - smoothScroll) * LERP_FACTOR;
	} else {
		smoothScroll = virtualScroll;
	}

	const vhCenter = window.innerHeight / 2;

	// ФАЗА ЗАПИСИ (Mutations): В этом цикле НЕТ операций чтения геометрии
	parallaxItems.forEach((data, el) => {
		const relativePos = smoothScroll - (data.entryPoint - vhCenter);
		const yPos = relativePos * data.speed;

		// Используем строгую строку для исключения лишних вычислений внутри transform
		el.style.transform = `translate3d(0, ${yPos.toFixed(2)}px, 0)`;
	});

	requestAnimationFrame(render);
}

// 2. Инициализация (без изменений)
function init() {
	const els = document.querySelectorAll(".parallax-item:not(.is-init)");
	if (els.length === 0) return;

	els.forEach((el) => {
		el.classList.add("is-init");
		el.style.willChange = "transform";
		observer.observe(el);
	});
}

window.addEventListener("load", () => {
	init();
	requestAnimationFrame(render);
});

new MutationObserver(() => init()).observe(document.body, { childList: true, subtree: true });

// 3. Resize без forced reflow во время анимации
window.addEventListener(
	"resize",
	() => {
		// Просто очищаем карту, Observer сам пересчитает всё при следующем входе в кадр
		parallaxItems.clear();
	},
	{ passive: true },
);
