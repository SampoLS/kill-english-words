const root = document.getElementById("root");
const span = document.createElement("span");
const words = ["a", "b", "c", "d", "e"];
const dom = [];
let timer = 100;

function renderWords() {
  for (let i = 0; i < 5; i++) {
    dom[i] = document.createElement("span");
    dom[i].textContent = "hello";
    dom[i].style.position = "absolute";
    dom[i].style.right = "0px";
    dom[i].style.top = i * 20 + "px";
    dom[i].style.transition = "all linear 200ms";
    root.appendChild(dom[i]);
  }
}

function moveWords() {
  let count = 0;
  const id = setInterval(() => {
    count += 10;
    for (let i = 0; i < dom.length; i++) {
      dom[i].style.right = count + "px";
      const right = dom[i].style.right.slice(0, -2);
      if (Number(right) > screen.width) {
        clearInterval(id);
        root.removeChild(dom[i]);
        console.log("stopped");
      }
    }
  }, timer);
}

setInterval(() => {
  if (root.children.length === 0) {
    renderWords();
    moveWords();
  }
}, 0);
