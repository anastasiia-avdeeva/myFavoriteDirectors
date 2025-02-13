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

function createDirectorInfoList(roles, filmLink) {
  const infoContainer = createElementWithClass("ul", "director__info");
  const rolesElement = createElementWithClass("li", "director__roles", roles);
  const linkElement = createLinkItem(
    "director__link-container",
    "director__link",
    "Фильмография",
    filmLink
  );
  infoContainer.append(rolesElement, linkElement);
  return infoContainer;
}

function createDirectorItem(name, roles, filmLink) {
  const directorContainer = createElementWithClass("li", "director", name);
  const infoContainer = createDirectorInfoList(roles, filmLink);
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

function isArrItemObject(director) {
  return typeof director === "object";
}

function checkDirectorData(director) {
  if (
    typeof director.name !== "string" ||
    typeof director.career !== "string" ||
    typeof director.films !== "string" ||
    typeof director.top_rated_film !== "string"
  )
    return false;
  return true;
}

function isURL(director) {
  try {
    new URL(director.films);
    return true;
  } catch (error) {
    return false;
  }
}

function checkDirectorsData() {
  if (!directorsData.length || !Array.isArray(directorsData)) {
    console.log("массив пуст или в переменной directorsData лежит не массив");
    return false;
  }

  if (!directorsData.every(isArrItemObject)) {
    console.log("Один или несколько элементов в массиве не являются объектами");
    return false;
  }

  if (!directorsData.every(checkDirectorData)) {
    console.log(
      "в каком-то из объектов массива лежит объект с нестрочным значением"
    );
    return false;
  }
  if (!directorsData.every(isURL)) {
    console.log(
      "у какого-то объекта массива значени ключа films не является ссылкой"
    );
    return false;
  }
  return true;
}

function changeTitleText(message) {
  const titleElement = document.querySelector(".title");
  titleElement.textContent = message;
  titleElement.classList.add("error");
}

function main() {
  if (!checkDirectorsData() || !directorsListElement || !moviesSection) {
    changeTitleText("Упс, что-то пошло не так =(");
    return;
  }
  const [directorElements, topMovies] = processDirectorsData();
  renderDirectors(directorElements);
  const [titleElem, paragraphElem] = generateMoviesSectionContent(topMovies);
  renderMoviesSectionContent(titleElem, paragraphElem);
}

main();
