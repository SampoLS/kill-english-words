const root = document.getElementById("root");
const timer = 100;
const elSize = 0;
const wordsSize = 23;

setInterval(() => {
  if (
    root.children.length === elSize ||
    root.children.length === 18
  ) {
    main();
  }
}, timer * 10);

function main() {
  for (let i = 0; i < wordsSize; i++) {
    const span = renderNodes(i);
    moveNodes(span, i);
  }
}

function renderNodes(i) {
  const span = document.createElement('span')
  span.textContent = 'hell';
  span.style.position = 'absolute';
  span.style.top = i * 30 + 'px';
  span.style.fontSize = '20px';
  span.style.right = '0px';
  span.style.transition = "all linear 600ms";
  root.appendChild(span);

  return span;
}

function moveNodes(span, i) {
  let count = 0;
  const id = setInterval(() => {
    count += 10;
    span.style.right = (i * 50) + count + "px";
    const right = span.style.right.slice(0, -2);

    if (Number(right) > screen.width + 100) {
      clearInterval(id);
      root.removeChild(span);
    }
  }, timer)
}
