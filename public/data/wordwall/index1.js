const container = document.querySelector(".js-wordwall-tasks");

const items = [];

function prepareUrl(url, themeId = 55) {
  return url + `?themeId=${themeId}&templateId=5&fontStackId=0`;
}

function itemTemplate(url) {
  const fullUrl = prepareUrl(url);

  return `<iframe
            style="max-width: 100%"
            src="${fullUrl}"
            width="${500 * 2}"
            height="${380 * 2}"
            frameborder="0"
            allowfullscreen
          ></iframe>`;
}

function itemsTemplate(arr) {
  return arr.map(itemTemplate).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  const markup = itemsTemplate(items);
  container?.innerHTML = markup;
});
