//Hämta container till skämt samt knapp
const jokeHolder = document.getElementById("jokeholder");
const generateButton = document.getElementById("generatebutton");

// Funktion för att hämta skämtet från apin och spara det i localstorage
async function getJoke() {
  try {
    const response = await fetch(
      "https://v2.jokeapi.dev/joke/Programming"
    );
    if (!response.ok) {
      throw new Error("Problem med nätverket");
    }
    const data = await response.json();

    let jokeData = {};
    //Om det är ett enradsskämt och kategorin inte är mörk
    if (data.type === "single") {
      jokeData = {
        type: data.type,
        joke: data.joke,
      };
      //Om det är ett tvåmeningsskämt och kategorin inte är mörk
    } else {
      jokeData = {
        type: data.type,
        setup: data.setup,
        delivery: data.delivery,
      };
    }

    // Spara skämtet och datum i localstorage
    localStorage.setItem(
      "savedJoke",
      JSON.stringify({
        date: new Date().toLocaleDateString(),
        joke: jokeData,
      })
    );

    displayJoke(jokeData);
  } catch (error) {
    console.error("Ett fel uppstod:", error);
  }
}

// Funktion för att visa skämtet
function displayJoke(jokeData) {
  if (jokeData.type === "single") {
    jokeHolder.innerHTML = `<p id="joke">${jokeData.joke}</p>`;
  } else {
    jokeHolder.innerHTML = `
      <p id="setup">${jokeData.setup}</p>
      <p id="delivery">${jokeData.delivery}</p>
    `;
  }
}


// Funktion för att skicka ett nytt skämt vid klick
generateButton.addEventListener("click", getJoke);

// Kontrollera om det finns ett sparat skämt för dagens datum i localstorage vid sidans laddning
document.addEventListener("DOMContentLoaded", () => {
  const savedJoke = JSON.parse(localStorage.getItem("savedJoke"));

  if (savedJoke && savedJoke.date === new Date().toLocaleDateString()) {
    displayJoke(savedJoke.joke);
  } else {
    getJoke();
  }
});
