const container = document.querySelector(".container");
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

function showLoader() {
  loader.classList.add("active");
  container.classList.add("hide");
}

function removeLoader() {
  loader.classList.remove("active");
  container.classList.remove("hide");
}

newQuoteBtn.addEventListener("click", getApiData);
twitterBtn.addEventListener("click", twitterLink);

let infoData = [];

async function getApiData() {
  showLoader();

  try {
    const apiUrl = "https://type.fit/api/quotes";

    const response = await fetch(apiUrl);
    const data = await response.json();

    infoData = data;

    console.log(infoData);
    getRandomData(infoData);
  } catch (err) {
    console.log(err);
    throw new Error("Error!");
  }
}

function getRandomData(data) {
  const randomData = infoData[Math.floor(Math.random() * data.length)];

  newPickData(randomData);
}

function newPickData(pickData) {
  quote.textContent = pickData.text;
  author.textContent = pickData.author;
  removeLoader();
}

function twitterLink() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${author.textContent}`;
  window.open(twitterUrl, "_blank");
}

getApiData();
