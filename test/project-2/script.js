const container = document.querySelector(".container");
const loader = document.querySelector(".loader");
const imgBox = document.querySelector(".img-box");

let apiKey = "AXP6pL6bHQmJH6jRgvSXqDZj581yvhOoG_nZS0_btx8";
let count = 10;
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

window.addEventListener("scroll", () => {
  const windowHeight = window.innerHeight;
  const bodyHeight = document.body.offsetHeight - 200;

  if (windowHeight + bodyHeight <= window.scrollY) {
    getApiData();
  }
});

const getApiData = async () => {
  const response = await fetch(apiUrl);
  const data = await response.json();

  console.log(data);

  makeImgData(data);
};

getApiData();

function makeImgData(imgs) {
  imgs.forEach((img) => {
    const linkTag = document.createElement("a");
    linkTag.setAttribute("href", img.links.html);
    linkTag.setAttribute("target", "_blank");

    const imgEl = document.createElement("img");
    imgEl.setAttribute("src", img.urls.regular);

    linkTag.appendChild(imgEl);
    imgBox.appendChild(linkTag);
    container.appendChild(imgBox);
    loading();
  });
}

function loading() {
  loader.classList.add("active");

  setTimeout(() => {
    loader.classList.remove("active");
  }, 1500);
}
