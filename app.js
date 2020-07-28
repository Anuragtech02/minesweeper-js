document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  let width = 10;
  let squares = [];
  let bombAmount = 20;
  let isGameOver = false;

  //Create a board
  const createBoard = () => {
    //Random bombs
    const bombs = Array(bombAmount).fill("bomb");
    const emptyArray = Array(width * width - bombAmount).fill("valid");
    const gameArray = emptyArray.concat(bombs);
    const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.setAttribute("id", i);
      square.classList.add(shuffledArray[i]);
      grid.appendChild(square);
      squares.push(square);

      //Click listener
      square.addEventListener("click", (e) => {
        click(square);
      });
    }

    //add Numbers
    for (let i = 0; i < squares.length; i++) {
      let total = 0;
      const isLeftEdge = i % width === 0;
      const isRightEdge = i % width === width - 1;

      if (squares[i].classList.contains("valid")) {
        if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains("bomb"))
          total++;

        if (
          i > 9 &&
          !isRightEdge &&
          squares[i + 1 - width].classList.contains("bomb")
        )
          total++;

        if (i > 10 && squares[i - width].classList.contains("bomb")) total++;

        if (
          i > 11 &&
          !isLeftEdge &&
          squares[i - 1 - width].classList.contains("bomb")
        )
          total++;

        if (i < 98 && !isRightEdge && squares[i + 1].classList.contains("bomb"))
          total++;

        if (
          i < 90 &&
          !isLeftEdge &&
          squares[i - 1 + width].classList.contains("vaild")
        )
          total++;

        if (
          i < 88 &&
          !isRightEdge &&
          squares[i + 1 + width].classList.contains("bomb")
        )
          total++;

        if (i < 89 && squares[i + width].classList.contains("bomb")) total++;

        squares[i].setAttribute("data", total);
      }
    }
  };

  createBoard();

  //Action when square clicked
  const click = (square) => {
    let currentId = square.id;

    if (isGameOver) return;
    if (
      square.classList.contains("checked") ||
      square.classList.contains("flag")
    )
      return;

    if (square.classList.contains("bomb")) {
      console.log("Game Over !");
    } else {
      let total = square.getAttribute("data");
      if (total) {
        square.classList.add("checked");
        square.innerHTML = total;
        return;
      }
      checkSquare(square, currentId);
    }
    square.classList.add("checked");
  };

  //Check neighboring squares once square is clicked (Using recursion)
  const checkSquare = (square, currentId) => {
    const isLeftEdge = currentId % width === 0;
    const isRightEdge = currentId % width === width - 1;

    setTimeout(() => {
      if (currentId > 0 && !isLeftEdge) {
        const newId = squares[parseInt(currentId - 1)].id;
        const newSquare = document.getElementById(newId);

        click(newSquare);
      }
    }, 10);
  };
});
