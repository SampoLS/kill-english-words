const root = document.getElementById("root");
const timer = 100;
const elSize = 0;
const wordsSize = 23;

const numsOfWords = [];

const words = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

function main() {
  const input = renderInput();
  countsNumsOfWords();
  renderCountsWhenTypeIntoBar(input);

  for (let i = 0; i < 3; i++) {
    const span = renderNodes(i);
    moveNodes(span, i);
  }
}

main();

function renderInput() {
  const input = document.createElement("input");
  input.className = "input";
  input.placeholder = 'enter something here...';
  document.body.appendChild(input);

  return input;
}

function renderCountsWhenTypeIntoBar(input) {
  const span = document.getElementsByTagName("span");
  input.addEventListener("input", (e) => {
    const counts = document.getElementById("counts");
    for (let i = 0; i < span.length; i++) {
      if (e.target.value === span[i].textContent && e.target.value !== "") {
        span[i].textContent = "";
        numsOfWords.push(span[i].textContent);
        counts.textContent = `how many words you've killed: ${numsOfWords.length}`;
        e.target.value = "";
      }
    }
  });
}

function countsNumsOfWords() {
  const span = document.createElement("span");
  span.id = "counts";
  span.textContent = `how many words you've killed: 0`;
  document.body.appendChild(span);
}

function renderNodes(i) {
  const span = document.createElement("span");
  span.textContent =
    words[Math.floor(Math.random() * 26)] +
    words[Math.floor(Math.random() * 26)] +
    words[Math.floor(Math.random() * 26)] +
    words[Math.ceil(Math.random() * 26)] +
    words[Math.ceil(Math.random() * 26)];
  span.className = "slipping-words";
  span.style.top = i * 100 + "px";
  root.appendChild(span);

  return span;
}

function moveNodes(span, i) {
  let count = 0;

  const id = setInterval(() => {
    count += 10;
    span.style.right = count + "px";
    const right = Number(span.style.right.slice(0, -2));

    if (right === 400) {
      const span = renderNodes(i);
      moveNodes(span, i);
    }

    if (right > screen.width + 50) {
      clearInterval(id);
      root.removeChild(span);
    }
  }, timer);
}
