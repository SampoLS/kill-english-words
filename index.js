const main = () => {
  const root = document.getElementById("root");
  const dom = [];
  const timerArr = [];

  const input = renderInput();

  renderWords();
  moveWords();
  // clearWords();

  function renderInput() {
    const input = document.createElement("input");
    root.appendChild(input);
    return input;
  }

  function renderWords() {
    const words = ["hello", "world", "how", "are", "you"];
    for (let i = 0; i < words.length; i++) {
      dom[i] = document.createElement("span");
      dom[i].textContent = words[i];
      dom[i].style.position = "absolute";
      dom[i].style.top = (i + 1) * 50 + "px";
      dom[i].style.right = "0px";
      dom[i].style.transition = "all linear 600ms";

      root.appendChild(dom[i]);
    }
  }

  function moveWords() {
    let count = 0;
    for (let i = 0; i < dom.length; i++) {
      const timer = setInterval(() => {
        dom[i].style.right = count + i * 10 + "px";
        const width = dom[i].style.right.slice(0, -2);
        if (Number(width) > screen.width) {
          clearInterval(timer);
          // const removedItem = root.removeChild(dom[i]);
          dom[i].textContent = null
          dom[i].style.right = "0px";
          console.log("stopped");
        }
        count += 20;
      }, 500);
      timerArr.push(timer);
    }
  }

  function clearWords() {
    input.addEventListener("keyup", (e) => {
      for (let i = 0; i < dom.length; i++) {
        if (e.target.value === dom[i].textContent) {
          clearInterval(timerArr[i]);
          const removedItem = root.removeChild(dom[i]);
          e.target.value = "";
          if (removedItem) renderSingleWordWhenCleard(i);
        }
      }
    });
  }

  function renderSingleWordWhenCleard(i) {
    root.appendChild(dom[i]);
    dom[i].style.position = "absolute";
    dom[i].style.right = "0px";
    dom[i].style.transition = "all linear 500ms";

    let count = 0;
    const timerId = setInterval(() => {
      dom[i].style.right = (count + 10) * 10 + "px";
      count += 20;

      const width = dom[i].style.right.slice(0, -2);
      if (Number(width) > screen.width) {
        clearInterval(timerId);
        const removedItem = root.removeChild(dom[i]);
        console.log("stopped");
      }
    }, 500);
  }
};

main();
