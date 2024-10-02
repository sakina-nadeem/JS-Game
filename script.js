let btns = document.querySelectorAll(".btn");
let resetBtn = document.querySelector("#reset-btn");
let turnO = true;  //playerX, playerO
let msg = document.querySelector(".msg");
let msgContainer = document.querySelector(".msg_container");
let newGameBtn = document.querySelector("#new-game");
let newContainer = document.querySelector(".new_container");
let newMsg = document.querySelector(".new-msg");
let over = document.querySelector("#over");

let winPatterns = [ [0,1,2], [0,3,6], [0,4,8], [1,4,7], [2,5,8], [2,4,6], [3,4,5], [6,7,8] ];

btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (turnO) {
            btn.innerText = "O";
            turnO = false;
        } else {
            btn.innerText = "X";
            turnO = true;
        }
        btn.disabled = true;

        checkWinner();
    });
});

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let position1 = btns[pattern[0]].innerText;
        let position2 = btns[pattern[1]].innerText;
        let position3 = btns[pattern[2]].innerText;

        if (position1 !== "" && position2 !== "" && position3 !== "") {
            if (position1 === position2 && position2 === position3) {
                displayWinner(position1);
                return;  // Exit function if we have a winner
            }
        }
    }

    // Check for a full board
    if ([...btns].every(btn => btn.innerText !== "")) {
        gameOver();
    }
};

const displayWinner = (winner) => {
    msg.innerText = `Congratulations! The winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBtns();
};

const gameOver = () => {
    newMsg.innerText = "Alas! It's a draw!";
    newContainer.classList.remove("new");
    disableBtns();
};

const disableBtns = () => {
    for (let btn of btns) {
        btn.disabled = true;
    }
};

const enableBtns = () => {
    for (let btn of btns) {
        btn.disabled = false;
        btn.innerText = "";
    }
};

const resetGame = () => {
    turnO = true;
    enableBtns();
    msgContainer.classList.add("hide");
    newContainer.classList.add("new");
};

const newGame = () => {
    turnO = true;
    enableBtns();
    newContainer.classList.add("new");
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
over.addEventListener("click", newGame);
