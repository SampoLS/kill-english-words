const root = document.getElementById("root");
const timer = 100;
const elSize = 0;
const wordsSize = 23;

const main = () => {
  const span = renderNodes();
  moveNodes(span);
}
main();

function renderNodes() {
  const span = document.createElement('span')
  span.textContent = 'hell';
  span.style.position = 'absolute';
  span.style.top = '0px';
  span.style.fontSize = '20px';
  span.style.right = '0px';
  span.style.transition = "all linear 600ms";
  root.appendChild(span);

  return span;
}

function moveNodes(span) {
  let count = 0;

  const id = setInterval(() => {
    count += 10;
    span.style.right = count + "px";
    const right = Number(span.style.right.slice(0, -2));

    if (right === 400) main();

    if (right > screen.width + 50) {
      clearInterval(id);
      root.removeChild(span);
    }
  }, timer)
}
