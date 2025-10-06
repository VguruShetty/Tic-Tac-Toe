let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset-btn");
let newGame = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8], 
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () =>{
        console.log("box was clicked");
        if(turnO){
            box.innerText = "O";
            box.classList.add("o");
            turnO = false;
        }
        else{
             box.innerText = "X";
             box.classList.add("x");
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    })    
});

const checkWinner = () =>{
    for(let pattern of winPatterns){
        //console.log(pattern[0], pattern[1], pattern[2]);
        //console.log(boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, boxes[pattern[2]].innerText);
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        let posAns = pos1 + pos2 + pos3;
        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(posAns == "OOO" || posAns == "XXX"){
                console.log("winner", pos1);                
                showWinner(pos1);
                pattern.forEach((index) => {
                    boxes[index].classList.add("winnerbox");
                });
            }
        }
        let allFilled = [...boxes].every((box) => box.innerText !== "");
        if (allFilled) {
            showDraw();
        }
    }
};

function showDraw() {
    msg.innerText = "😐 It's a Draw!";
    msgContainer.classList.remove("hide");
}

const showWinner = (winner) =>{
    msg.innerText = `Congratulations winner is ${winner}`;
    msgContainer.classList.remove("hide");    
    disableBoxes();
};
const disableBoxes = ()=>{
    for(let box of boxes)
        box.disabled = true;
};
const enableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("winnerbox");
    }        
};
const resetGame = ()=>{
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");    
};

newGame.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);