let speechBtn = document.querySelector(".speechButton");
let copyQuoteBtn = document.querySelector(".copyQuoteButton");
let generateQuoteBtn = document.querySelector(".generateQuoteButton");
let quoteDetail = document.querySelector(".quoteDetail");
let authorDetail = document.querySelector(".authorDetail");
let textToSpeech = new SpeechSynthesisUtterance();

let createRandomQuote = () => {
  window.speechSynthesis.cancel(textToSpeech);
  fetch("https://api.quotable.io/random")
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      quoteDetail.textContent = result.content;
      authorDetail.textContent = `~ ${result.author}`;
    });
};

createRandomQuote();

generateQuoteBtn.addEventListener("click", createRandomQuote);

copyQuoteBtn.addEventListener("click", () => {
  let textValue = quoteDetail.innerText;
  navigator.clipboard.writeText(textValue);
});

speechBtn.addEventListener("click", () => {
  if (!"speechSynthesis" in window) {
    return alert("Your System Not Support This Feature");
  }

  let voices = window.speechSynthesis.getVoices();
  textToSpeech.lang = "en";
  textToSpeech.text = quoteDetail.innerText;
  textToSpeech.volume = 1;
  textToSpeech.rate = 0.8;
  textToSpeech.pitch = 1;
  textToSpeech.voice = voices[4];
  window.speechSynthesis.speak(textToSpeech);
});

textToSpeech.onstart = () => {
  document.querySelector(".fa-volume-high").style.color = "#ffff00";
};

textToSpeech.onend = () => {
  document.querySelector(".fa-volume-high").style.color = "#ffffff";
};
