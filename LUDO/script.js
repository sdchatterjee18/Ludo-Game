
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

        let number = Math.floor(Math.random() * 6) + 1;

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

            if (dicePatterns[number].includes(index + 1)) {
                dot.classList.add("active");
            }
            else {
                dot.classList.remove("active");
            }

        });

        console.log("Dice Number:", number);

        // Stop animation
        dice.classList.remove("rolling");

    }, 600);
}
