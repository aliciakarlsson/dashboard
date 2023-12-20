//Hämtar container från HTML
const jokeHolder = document.getElementById('jokeholder');

//Tar skämtet från apin
async function getJoke(){
try {
  const response = await fetch("https://v2.jokeapi.dev/joke/Any");
  if (!response.ok) {
    throw new Error("Problem med nätverket");
  }
  const data = await response.json();
//Om det är ett enradskämt 
  if (data.type === "single") {
    jokeHolder.innerHTML = `
    <p id="joke">${data.joke}</p>
    `
  } else {
    //Om det är ett tvåmeningsskämt
    jokeHolder.innerHTML = `
    <p id="setup">${data.setup}</p>
    <p id="delivery">${data.delivery}</p>
    `

  }
} catch (error) {
  console.error("Ett fel uppstod:", error);
}
}

//Kallar på funktionen
getJoke();

