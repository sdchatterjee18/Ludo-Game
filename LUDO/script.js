let leftCells = document.querySelectorAll(".left-path .path-cell");
let topCells = document.querySelectorAll(".top-path .path-cell");
let rightCells = document.querySelectorAll(".right-path .path-cell");
let bottomCells = document.querySelectorAll(".bottom-path .path-cell");
let redPath = [

    // Starting position and remaining left-path top row
    leftCells[1],
    leftCells[2],
    leftCells[3],
    leftCells[4],
    leftCells[5],

    // Top path (bottom to top, then right and down)
    topCells[15],
    topCells[12],
    topCells[9],
    topCells[6],
    topCells[3],
    topCells[0],
    topCells[1],
    topCells[2],
    topCells[5],
    topCells[8],
    topCells[11],
    topCells[14],
    topCells[17],

    // Right path
    rightCells[0],
    rightCells[1],
    rightCells[2],
    rightCells[3],
    rightCells[4],
    rightCells[5],
    rightCells[11],
    rightCells[17],
    rightCells[16],
    rightCells[15],
    rightCells[14],
    rightCells[13],
    rightCells[12],

    // Bottom path
    bottomCells[2],
    bottomCells[5],
    bottomCells[8],
    bottomCells[11],
    bottomCells[14],
    bottomCells[17],
    bottomCells[16],
    bottomCells[15],
    bottomCells[12],
    bottomCells[9],
    bottomCells[6],
    bottomCells[3],
    bottomCells[0],

    // Remaining left path
    leftCells[17],
    leftCells[16],
    leftCells[15],
    leftCells[14],
    leftCells[13],
    leftCells[12],
    leftCells[6],
    leftCells[7],
    leftCells[8],
    leftCells[9],
    leftCells[10],
    leftCells[11]

];

let diceNumber = 0;
let canSelectToken = false;
let isTokenMoving = false;
// Store the current position of each Red token
let redTokenPositions = {
    redToken1: -1,
    redToken2: -1,
    redToken3: -1,
    redToken4: -1
};
let selectedToken = null;
console.log("Total Red Path Cells:", redPath.length);
console.log("Starting Cell:", redPath[0]);




async function SelectRedToken(token) {

    // 1. Prevent clicking any token while movement is in progress
    if (isTokenMoving) {
        return;
    }

    let tokenId = token.id;
    let position = redTokenPositions[tokenId];

    // Check whether dice has been rolled
    if (diceNumber === 0) {
        return;
    }

    // Remove previous selection
    document.querySelectorAll(".red-token").forEach(function (t) {
        t.classList.remove("selected-token");
    });

    // Token is inside home
    if (position === -1) {

        if (diceNumber !== 6) {
            console.log("You need a 6!");
            return;
        }

        // 2. Lock dice while entering the board
        isTokenMoving = true;

        // Move token to starting cell
        await MoveToken(token, redPath[0]);

        redTokenPositions[tokenId] = 0;

        // 3. Unlock dice
        isTokenMoving = false;

    }

    // Token is already on the board
    else {

        // Calculate target position
        let targetPosition = position + diceNumber;

        // Check whether token exceeds the outer path
        if (targetPosition >= redPath.length) {
            console.log("Cannot move beyond the outer path yet!");
            return;
        }

        // 2. Lock dice during path movement
        isTokenMoving = true;

        // Move token one cell at a time
        for (let i = position + 1; i <= targetPosition; i++) {

            await MoveToken(token, redPath[i]);

            // Update current position
            redTokenPositions[tokenId] = i;

        }

        // 3. Unlock dice
        isTokenMoving = false;

    }

    // Reset selection
    selectedToken = null;

    // Reset dice
    diceNumber = 0;
    canSelectToken = false;

    console.log("New Position:", redTokenPositions[tokenId]);
}


function MoveToken(token, targetCell) {

    // Get current position
    let oldPosition = token.getBoundingClientRect();

    // Move token to target cell
    targetCell.appendChild(token);

    // Get new position
    let newPosition = token.getBoundingClientRect();

    // Calculate movement distance
    let moveX = oldPosition.left - newPosition.left;
    let moveY = oldPosition.top - newPosition.top;

    // Animate token
    return token.animate(
        [
            {
                transform: `translate(${moveX}px, ${moveY}px)`
            },
            {
                transform: "translate(0px, 0px)"
            }
        ],
        {
            duration: 400,
            easing: "ease-in-out"
        }
    ).finished;
}

function RollDice() {

    let dice = document.getElementById("dice");

    // Prevent clicking while animation is running
    if (dice.classList.contains("rolling") || isTokenMoving) {
        return;
    }

    // Start animation
    dice.classList.add("rolling");

    // Generate number after animation
    setTimeout(function () {

        diceNumber = Math.floor(Math.random() * 6) + 1;
        canSelectToken = (diceNumber === 6);
        let dots = document.querySelectorAll(".dot");

        let dicePatterns = {
            1: [5],
            2: [1, 9],
            3: [1, 5, 9],
            4: [1, 3, 7, 9],
            5: [1, 3, 5, 7, 9],
            6: [1, 3, 4, 6, 7, 9]
        };

        dots.forEach(function (dot, index) {

            if (dicePatterns[diceNumber].includes(index + 1)) {
                dot.classList.add("active");
            }
            else {
                dot.classList.remove("active");
            }

        });

        console.log("Dice Number:", diceNumber);

        // Stop animation
        dice.classList.remove("rolling");

    }, 600);
}