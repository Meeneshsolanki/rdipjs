class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            case '%':
                computation = (prev / 100) * current
                break
            case '√':
                computation = Math.sqrt(25)
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})


function validateform() {
    var name = document.myForm.name.value;
    var phonenumber = document.myForm.phonenumber.value;
    var email = document.myForm.email.value;
    var letters = /^[a-zA-Z_ ]*$/;

    if (name == "" && email == "" && phonenumber == "") {
        alert("Please Fill all the fields.");
        return false;
    } else if (!myForm.name.value.match(letters)) {
        alert('Please Fill Name Field in which Starting letter should be letter only..!');
        return false;
    } else if (phonenumber.length < 10) {
        alert("Please enter 10 digits in phone number field.");
        return false;
    } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.email.value))) {
        alert("You have entered an invalid email address!")
        return (false)
    }
}

function palindrome() {
    revString = "";
    inpString = document.getElementById("word").value;
    i = inpString.length;
    for (var j = inpString.length; j >= 0; j--) {
        revString = revString + inpString.charAt(j);
    }
    if (inpString === revString) {
        alert(inpString + " is a Palindrome");
    } else {
        alert(inpString + " is not a Palindrome");

    }
}

function anagram() {
    stringA = document.getElementById("stringofwords").value;
    stringB = document.getElementById("word1").value;
    stringA = stringA.replace(/[^\w]/g, '').toLowerCase()
    stringB = stringB.replace(/[^\w]/g, '').toLowerCase()

    if (sortString(stringA) === sortString(stringB)) {
        alert(stringB + " is Anagram of the string " + stringA)
    } else {
        alert(stringB + " is not Anagram of the string " + stringA)
    }
}

function sortString(string) {
    return string.split('').sort().join('');
}

function game() {
    let pScore = 0;
    let cScore = 0;

    function startGame() {
        const playBtn = document.querySelector(".start");
        const introScreen = document.querySelector(".intro");
        const matchScreen = document.querySelector(".match");

        playBtn.addEventListener("click", function() {
            introScreen.classList.add("fadeOut");
            matchScreen.classList.remove("fadeOut");
        })
    }


    function playMatch() {
        const options = document.querySelectorAll(".options button");
        const pHand = document.querySelector(".player-hand");
        const cHand = document.querySelector(".computer-hand");
        const hands = document.querySelectorAll('.hands img')

        hands.forEach(hand => {
            hand.addEventListener("animationend", function() {
                this.style.animation = "";
            });
        });

        const computerOption = ['Nuclear Bomb', 'Cockroach', 'Human'];

        options.forEach(option => {
            option.addEventListener("click", function() {
                const random = Math.floor(Math.random() * 3);
                const computerChoice = computerOption[random];

                setTimeout(() => {

                    compareHands(this.textContent, computerChoice);


                }, 2000);

                pHand.style.animation = "playerShake 2s ease";
                cHand.style.animation = "computerShake 2s ease";


            })
        });
    };

    function updateScore() {
        const playerScore = document.querySelector(".player-score p");
        const computerScore = document.querySelector(".computer-score p");
        playerScore.textContent = pScore;
        computerScore.textContent = cScore;
    }



    function compareHands(playerChoice, computerChoice) {
        const winner = document.querySelector('.winner');

        if (playerChoice === computerChoice) {
            winner.textContent = "It is a tie";
            return;
        }
        if (playerChoice === 'Human') {
            if (computerChoice === 'Cockroach') {
                winner.textContent = "Players Win";
                pScore++;
                updateScore();
                return;
            } else {
                winner.textContent = "Computer Wins";
                cScore++;
                updateScore();
                return;
            }
        }
        if (playerChoice === 'Cockroach') {
            if (computerChoice === 'Nuclear Bomb') {
                winner.textContent = "Computer Win";
                cScore++;
                updateScore();
                return;
            } else {
                winner.textContent = "Player Wins";
                pScore++;
                updateScore();
                return;
            }
        }
        if (playerChoice === 'Human') {
            if (computerChoice === 'Nuclear Bomb') {
                winner.textContent = "Computer Win";
                cScore++;
                updateScore();
                return;
            } else {
                winner.textContent = "Player Wins";
                pScore++;
                updateScore();
                return;
            };
        };
    };


    startGame();
    playMatch();
}