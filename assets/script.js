const directorsListElement = document.getElementById("directors");
const moviesSection = document.getElementById("movies");

const directorsData = [
  {
    name: "Стивен Спилберг",
    career: "Продюсер, Режиссёр, Актёр, Сценарист, Монтажёр",
    films:
      "https://ru.wikipedia.org/wiki/%D0%A4%D0%B8%D0%BB%D1%8C%D0%BC%D0%BE%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%8F_%D0%A1%D1%82%D0%B8%D0%B2%D0%B5%D0%BD%D0%B0_%D0%A1%D0%BF%D0%B8%D0%BB%D0%B1%D0%B5%D1%80%D0%B3%D0%B0",
    top_rated_film: "Список Шиндлера",
  },
  {
    name: "Кристофер Нолан",
    career:
      "Сценарист, Продюсер, Режиссёр, Оператор, Монтажёр, Актёр, Композитор",
    films:
      "https://www.film.ru/compilation/vse-filmy-kristofera-nolana-ot-luchshego-k-horoshemu",
    top_rated_film: "Начало",
  },
  {
    name: "Мартин МакДона",
    career: "Сценарист, Режиссёр, Продюсер",
    films: "https://www.film.ru/person/martin-makdonah",
    top_rated_film: "Три билборда на границе Эббинга, Миссури",
  },
  {
    name: "Алексей Балабанов",
    career: "Режиссёр, Сценарист, Актёр, Продюсер",
    films: "https://www.film.ru/person/aleksey-balabanov",
    top_rated_film: "Брат",
  },
  {
    name: "Питер Фаррелли",
    career: "Продюсер, Режиссёр, Сценарист, Актёр",
    films: "https://www.film.ru/person/piter-farrelli",
    top_rated_film: "Зелёная книга",
  },
  {
    name: "Юрий Быков",
    career: "Актёр, Режиссёр, Сценарист, Композитор, Монтажёр, Продюсер",
    films: "https://www.film.ru/person/yuriy-bykov",
    top_rated_film: "Дурак",
  },
  {
    name: "Жан-Марк Валле",
    career: "Режиссер, Продюсер, Монтажёр, Актёр, Сценарист",
    films: "https://www.film.ru/person/zhan-mark-valle",
    top_rated_film: "Далласский клуб покупателей",
  },
];

function createElementWithClass(tag, className, textContent = "") {
  const newElem = document.createElement(tag);
  newElem.classList.add(className);
  if (textContent) {
    newElem.textContent = textContent;
  }
  return newElem;
}

function createLinkItem(listItemClassName, linkClassName, textContent, href) {
  const listItem = createElementWithClass("li", listItemClassName);
  const linkElem = createElementWithClass("a", linkClassName, textContent);
  linkElem.href = href;
  listItem.append(linkElem);
  return listItem;
}

function createDirectorInfoList(name, roles, filmLink) {
  const infoContainer = createElementWithClass("ul", "director__info");
  const nameElement = createElementWithClass("li", "director__name", name);
  const rolesElement = createElementWithClass("li", "director__roles", roles);
  const linkElement = createLinkItem(
    "director__link-container",
    "director__link",
    "Фильмография",
    filmLink
  );
  infoContainer.append(nameElement, rolesElement, linkElement);
  return infoContainer;
}

function createDirectorItem(name, roles, filmLink) {
  const directorContainer = createElementWithClass("li", "director");
  const infoContainer = createDirectorInfoList(name, roles, filmLink);
  directorContainer.append(infoContainer);
  return directorContainer;
}

function processDirectorsData() {
  const directorElements = [];
  const topMovies = [];
  directorsData.forEach(({ name, career, films, top_rated_film }) => {
    const directorItem = createDirectorItem(name, career, films);
    directorElements.push(directorItem);
    topMovies.push(top_rated_film);
  });
  return [directorElements, topMovies];
}

function renderDirectors(directorElements) {
  directorElements.forEach((director) => directorsListElement.append(director));
}

function generateMoviesSectionContent(topMovies) {
  const titleElem = createElementWithClass(
    "h2",
    "movies__title",
    "Лучшие фильмы этих режиссеров"
  );
  const paragraphText = topMovies.join(", ");
  const paragraphElem = createElementWithClass(
    "p",
    "movies__paragraph",
    paragraphText
  );
  return [titleElem, paragraphElem];
}

function renderMoviesSectionContent(titleElem, paragraphElem) {
  moviesSection.append(titleElem, paragraphElem);
}

function main() {
  const [directorElements, topMovies] = processDirectorsData();
  renderDirectors(directorElements);
  const [titleElem, paragraphElem] = generateMoviesSectionContent(topMovies);
  renderMoviesSectionContent(titleElem, paragraphElem);
}

main();

// function createAndrenderDirectors() {
//   directorsData.forEach(({ name, career, films, top_rated_film }) => {
//     const directorItem = createDirectorItem(name, career, films);
//     directorsListElement.append(directorItem);
//     topFilmsList.push(top_rated_film);
//   });
// }
