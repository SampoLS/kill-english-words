const root = document.getElementById("root");
const leftTimer = 60000;
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

function startGame() {
  const button = renderStartBtn();
  button.addEventListener("click", () => {
    renderUI();
    clearSlideWordsWhenTimeoutAndStartGameAgain();
    document.body.removeChild(button);
  });
}

startGame();

function removeScore() {
  const score = document.querySelector(".score-box");
  document.body.removeChild(score);
}

function clearSlideWordsWhenTimeoutAndStartGameAgain() {
  const id = setTimeout(() => {
    document.body.removeChild(root);
    clearTimeout(id);
    // console.log("removed all nodes in root");
    showScore();

    const button = renderStartBtn();
    button.textContent = 'RESTART';
    button.addEventListener("click", () => {
      const counts = document.getElementById("counts");
      const input = document.querySelector("input");

      numsOfWords.length = 0;
      counts.textContent = 0;

      document.body.removeChild(button);
      document.body.appendChild(root);

      calcCountsWhenWordsMatched(input);
      renderAndMoveNodes();
      countLeftTime();

      removeScore();

      clearSlideWordsWhenTimeoutAndStartGameAgain();
    });
  }, leftTimer);
}

function renderStartBtn() {
  const button = document.createElement("button");
  button.textContent = "Go";
  button.className = "go";
  document.body.appendChild(button);

  return button;
}

function renderUI() {
  const input = renderInput();
  renderCountsBox();
  renderLeftTime();
  calcCountsWhenWordsMatched(input);
  renderAndMoveNodes();
  countLeftTime();
}

function renderAndMoveNodes() {
  for (let i = 0; i < 3; i++) {
    const span = renderNodes(i);
    moveNodes(span, i);
  }
}

function showScore() {
  const [box, span] = createEls("section", "span");
  const counts = document.getElementById("counts");
  box.className = "score-box";
  box.textContent = "Congrats, your last SCORE is: ";
  span.className = "score";
  span.textContent = Number(counts.textContent) * 15;
  box.appendChild(span);
  document.body.appendChild(box);
}

function countLeftTime() {
  const leftTime = document.querySelector(".left-time");
  let count = 59;
  const id = setInterval(() => {
    leftTime.textContent = count;
    count--;
    if (count < 0) {
      clearInterval(id);
      // console.log("time stopped");
    }
  }, 1000);
}

function renderInput() {
  const [box, input] = createEls("section", "input");
  box.className = "input-box";
  input.className = "input";
  input.placeholder = "enter something here...";
  box.appendChild(input);
  document.body.appendChild(box);

  return input;
}

function calcCountsWhenWordsMatched(input) {
  const span = document.getElementsByTagName("span");
  const counts = document.getElementById("counts");
  input.addEventListener("input", (e) => {
    for (let i = 0; i < span.length; i++) {
      if (e.target.value === span[i].textContent && e.target.value !== "") {
        span[i].textContent = "";
        numsOfWords.push(span[i].textContent);
        counts.textContent = numsOfWords.length;
        e.target.value = "";
      }
    }
  });
}

function renderCountsBox() {
  const [box, span] = createEls("section", "span");
  box.className = "count-box";
  box.textContent = "how many words you've killed: ";
  box.appendChild(span);
  span.id = "counts";
  span.textContent = 0;
  document.body.appendChild(box);
}

function renderLeftTime() {
  const [box, span] = createEls("section", "span");
  box.className = "left-time-box";
  box.textContent = "your left time is: ";
  span.className = "left-time";
  span.textContent = "60";
  box.appendChild(span);
  document.body.appendChild(box);
}

function renderNodes(i) {
  const span = document.createElement("span");
  span.textContent =
    letters[Math.floor(Math.random() * 25)] +
    letters[Math.floor(Math.random() * 25)] +
    letters[Math.floor(Math.random() * 25)] +
    letters[Math.ceil(Math.random() * 25)] +
    letters[Math.ceil(Math.random() * 25)];
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
      // console.log("stopped");
    }
  }, timer);

  return id;
}

function createEls(el1, el2) {
  const parent = document.createElement(el1);
  const child = document.createElement(el2);
  return [parent, child];
}
