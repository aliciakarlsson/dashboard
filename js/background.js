const key = "wxkOwFjjRJOPHzzcS9k3dNAqhwc1P15q0rEROTSoIXA";
const baseUrl =
  `https://api.unsplash.com/photos/random?client_id=${key}`;

const body = document.body;
const randomizeBackground = document.getElementById('randombackground')

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

setBackground();

randomizeBackground.addEventListener('click', () => {
    localStorage.removeItem('background');
    setBackground();
})
