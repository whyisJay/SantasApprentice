// JavaScript for Santa's Apprentice Game
let currentScene = "scene-intro";
let decisions = [];

// Function to navigate between scenes
function nextScene(sceneId) {
    document.getElementById(currentScene).classList.remove("active");
    document.getElementById(sceneId).classList.add("active");
    currentScene = sceneId;
}

// Function to record decisions and navigate
function makeDecision(decision, nextSceneId) {
    decisions.push(decision);
    nextScene(nextSceneId);
}

// Function to generate a summary card
function generateSummaryCard() {
    const summaryCard = document.getElementById("summary-card");
    const summaryContent = document.getElementById("summary-content");

    let summaryText = "<strong>Your Journey:</strong><br><br>";
    decisions.forEach((decision, index) => {
        summaryText += `Step ${index + 1}: ${decision}<br>`;
    });

    summaryText += "<br><strong>Outcome:</strong> ";
    if (currentScene === "scene-perfect-end") {
        summaryText += "You saved Christmas and became Chief Apprentice!";
    } else if (currentScene === "scene-good-end") {
        summaryText += "You saved Christmas but are on probation.";
    } else {
        summaryText += "You were reassigned to a less glamorous job.";
    }

    summaryContent.innerHTML = summaryText;
    summaryCard.classList.remove("hidden");
}

// Function to restart the game
function restartGame() {
    decisions = [];
    nextScene("scene-intro");
    document.getElementById("summary-card").classList.add("hidden");
}

// Adding ARIA live region for better screen reader support
const liveRegion = document.createElement("div");
liveRegion.setAttribute("aria-live", "polite");
liveRegion.style.position = "absolute";
liveRegion.style.left = "-9999px";
document.body.appendChild(liveRegion);

function updateLiveRegion(message) {
    liveRegion.textContent = message;
}

// Notify users of scene changes
function nextSceneWithNotification(sceneId) {
    updateLiveRegion(`Navigating to ${sceneId.replace(/-/g, " ")}`);
    nextScene(sceneId);
}