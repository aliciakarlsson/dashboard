//API-key
const key = "wxkOwFjjRJOPHzzcS9k3dNAqhwc1P15q0rEROTSoIXA";

//API url
const baseUrl =
  `https://api.unsplash.com/photos/random?client_id=${key}`;

//Hämtar bodyn från htmlen för att kunna alägga bild som bakgrund
const body = document.body;

//Knapp för att generera ny bild
const randomizeBackground = document.getElementById('randombackground')

//Asynkron funktion som tar fram länk till bild
async function getBackground(){
  try{
    let response = await fetch(baseUrl);
  if(!response.ok){
    throw new Error('Fel vid hämtning');
  } else {
    const data = await response.json();
    return data.urls.regular;
  }}
  catch(error){
    console.error('Nåt blev knas:', error);
  }
}

/*Asynkron funktion som tar länken från funktion ovan och kollar om 
det finns sparad länk i localStorage, samt sätter bakgrundsbilden */
async function setBackground(){
  let url = localStorage.getItem('background');

  if(!url){
    url = await getBackground();
    localStorage.setItem('background', url);
  }

  if(url){
  body.style.backgroundImage = `url('${url}')`;
  body.style.backgroundSize = "cover";
  } else {
    console.log('Fel vid hämtning.')
  }
}

//Kallar på funktioner
setBackground();

//Knappen som genererar en ny bild med hjälp av att ta bort den sparade och generera en ny
randomizeBackground.addEventListener('click', () => {
    localStorage.removeItem('background');
    setBackground();
})
