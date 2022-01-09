const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const author = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const btn = document.querySelector("#new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

btn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

//  Show New Quote
function newQuote() {
  try {
    showLoadingSpinner();
    //  Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // Check if Author field is blank and replace it with 'Unknown'
    if (!quote.author) {
      author.textContent = "Unknown";
    } else {
      author.textContent = quote.text;
    }

    // Check Quote length to determine styling
    if (quote.text.length > 50) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }

    quoteText.textContent = quote.text;
    author.textContent = author.textContent;
    removeLoadingSpinner();
  } catch (err) {
    console.log(err);
  }
}

// Get Quotes From API
const getQuotes = async () => {
  showLoadingSpinner();

  const apiUrl = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();

    newQuote(apiQuotes);

    console.log(apiQuotes);
  } catch (err) {
    console.log("Error!");
  }
};

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`;

  window.open(twitterUrl, "_blank");
}

getQuotes();
