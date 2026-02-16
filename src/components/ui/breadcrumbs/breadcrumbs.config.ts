// Названия для сегментов URL
export const BREADCRUMB_LABELS: Record<string, string> = {
	design: "Дизайн",
	"design-systems": "Дизайн-системы",
	communications: "Коммуникационный дизайн",
	branding: "Брендинг",
	webdev: "Веб-разработка",
	video: "Видео",
	photo: "Фото",
	articles: "Тексты",
	about: "Обо мне",
};

// Ссылки для сегментов, у которых нет своих страниц (якоря на главную)
export const BREADCRUMB_ANCHORS: Record<string, string> = {
	"design": "/#design",
	"design-systems": "/#design-systems",
  "communications": "/#communication-design",
};