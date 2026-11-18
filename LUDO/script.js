
let diceNumber = 0;
let selectedToken = null;
let canSelectToken = false;
let redPath = [];

let redTokens = document.querySelectorAll(".red-token");
redTokens.forEach(function (token) {
    token.dataset.entered = "false";
    token.dataset.position = "-1";
});

redTokens.forEach(function (token) {
    token.addEventListener("click", SelectRedToken);
});

function SelectRedToken(event) {

    let token = event.currentTarget;

    if (!canSelectToken) {
        return;
    }

    if (token.dataset.entered === "true") {
        return;
    }

    if (diceNumber !== 6) {
        return;
    }

    // Store selected token
    selectedToken = token;

    // Get token's original position
    let oldPosition = selectedToken.getBoundingClientRect();

    // Get starting cell
    let startCell = document.getElementById("redStartCell");

    // Move token to starting cell
    startCell.appendChild(selectedToken);

    // Get token's new position
    let newPosition = selectedToken.getBoundingClientRect();

    // Calculate movement distance
    let moveX = oldPosition.left - newPosition.left;
    let moveY = oldPosition.top - newPosition.top;

    // Animate token movement
    let animation = selectedToken.animate(
        [
            {
                transform: `translate(${moveX}px, ${moveY}px)`
            },
            {
                transform: "translate(0px, 0px)"
            }
        ],
        {
            duration: 1000,
            easing: "ease-in-out"
        }
    );

    // Update token information
    selectedToken.dataset.entered = "true";
    selectedToken.dataset.position = "0";

    // Reset selection
    selectedToken.classList.remove("selected-token");
    canSelectToken = false;

    console.log("Token entered the board!");
}
function RollDice() {

    let dice = document.getElementById("dice");

    // Prevent clicking while animation is running
    if (dice.classList.contains("rolling")) {
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
