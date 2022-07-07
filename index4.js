const root = document.getElementById("root");
const timer = 100;
const elSize = 0;
const wordsSize = 23;
const numsOfWords = [];

const letters = [
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

function createBtnToStartGame() {
  const button = document.createElement("button");
  button.textContent = "go";
  button.className = "go";
  document.body.appendChild(button);

  button.addEventListener("click", () => {
    main();
    const id = setTimeout(() => {
      document.body.removeChild(root);
      clearTimeout(id);
    }, 60000);
    document.body.removeChild(button);
  });
}

createBtnToStartGame();

function main() {
  const input = renderInput();
  renderCountsBox();
  renderLeftTime();

  calcCountsWhenWordsMatched(input);
  for (let i = 0; i < 3; i++) {
    const span = renderNodes(i);
    moveNodes(span, i);
  }
}

function renderInput() {
  const input = document.createElement("input");
  input.className = "input";
  input.placeholder = "enter something here...";
  document.body.appendChild(input);

  return input;
}

function calcCountsWhenWordsMatched(input) {
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

function renderCountsBox() {
  const span = document.createElement("span");
  span.id = "counts";
  span.textContent = `how many words you've killed: 0`;
  document.body.appendChild(span);
}

function renderLeftTime() {
  const span = document.createElement("span");
  span.className = "left-time-box";
  span.textContent = "your left time is: 0";
  document.body.appendChild(span);
}

function renderNodes(i) {
  const span = document.createElement("span");
  span.textContent =
    letters[Math.floor(Math.random() * 26)] +
    letters[Math.floor(Math.random() * 26)] +
    letters[Math.floor(Math.random() * 26)] +
    letters[Math.ceil(Math.random() * 26)] +
    letters[Math.ceil(Math.random() * 26)];

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
    if (right === 400 && document.body.contains(root)) {
      const span = renderNodes(i);
      moveNodes(span, i);
    }
    if (right > screen.width + 50) {
      clearInterval(id);
      root.removeChild(span);
      console.log("stopped");
    }
  }, timer);

  return id;
}
