// Select necessary elements
const flashcardForm = document.getElementById("flashcard-form");
const flashcardTitle = document.getElementById("question");
const flashcardDefinition = document.getElementById("answer");
const flashcardList = document.getElementById("flashcard-list");
const clearAllButton = document.getElementById("clear-btn");

// Initialize flashcards array
let flashcards = [];

// Function to load flashcards from localStorage
function loadFlashcards() {
    const savedFlashcards = JSON.parse(localStorage.getItem("flashcards"));
    if (savedFlashcards) {
        flashcards = savedFlashcards;
    }
    renderFlashcards();
}

// Function to save flashcards to localStorage
function saveFlashcards() {
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
}

// Function to create a new flashcard
function createFlashcard(question, answer) {
    return {
        question,
        answer
    };
}

// Function to render flashcards to the page
function renderFlashcards() {
    flashcardList.innerHTML = ""; // Clear current flashcards
    flashcards.forEach((flashcard, index) => {
        const flashcardElement = document.createElement("div");
        flashcardElement.classList.add("flashcard");
        flashcardElement.innerHTML = `
            <div class="flashcard-inner">
                <div class="flashcard-front">
                    <h3>${flashcard.question}</h3>
                </div>
                <div class="flashcard-back">
                    <p>${flashcard.answer}</p>
                </div>
            </div>
        `;
        flashcardElement.addEventListener('click', () => {
            flashcardElement.classList.toggle('flipped'); // Toggle flip effect on click
        });
        flashcardList.appendChild(flashcardElement);
    });
    saveFlashcards();
}

// Add flashcard via form submission
flashcardForm.addEventListener("submit", function (event) {
    event.preventDefault();
    
    // Validate Inputs
    if (flashcardTitle.value.trim() === "" || flashcardDefinition.value.trim() === "") {
        alert("Please fill out both the question and answer.");
        return;
    }

    const newFlashcard = createFlashcard(flashcardTitle.value.trim(), flashcardDefinition.value.trim());
    flashcards.push(newFlashcard);
    renderFlashcards();
    flashcardForm.reset();
});

// Clear all flashcards
clearAllButton.addEventListener("click", function () {
    flashcards.length = 0; // Clears the array
    renderFlashcards();
});

// Initialize flashcards on page load
document.addEventListener("DOMContentLoaded", function () {
    loadFlashcards();
});
