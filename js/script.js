//Hämtar elementen till klocka och datum
const clockElement = document.getElementById('clock');
const dateElement = document.getElementById('date');

//Skapar funktionen som uppdaterar tiden varje sekund
function updateTime() {
    const now = new Date();
    const time = now.toLocaleTimeString('sv-SE');
    const date = now.toLocaleDateString('sv-SE', {year: 'numeric', month: 'long', day: 'numeric'});
    
    clockElement.textContent = `${time}`;
    dateElement.textContent = `${date}`;
}

//Kallar på funktionen och att den ska uppdateras varje sekund
setInterval(updateTime, 1000);

//Hämtar element för titel på sida
const title = document.getElementById('title');

//Funktion för att ändra titel
title.addEventListener('input', () => {
    const newTitle = title.innerText;
    localStorage.setItem('title', newTitle);
});

//Funktion som hämtar inskriven title vid laddning av sida
window.addEventListener('load', () => {
    const savedTitle = localStorage.getItem('title');
    if (savedTitle){
        title.innerText = savedTitle; 
    }
});

//Hämtar element för anteckningar
const notes = document.getElementById('notes');

//Lägger till eventlyssnare vid input som sparar texten i localstorage
notes.addEventListener('input', () => {
    const notesContent = notes.value;
    localStorage.setItem('notes', notesContent);
});

//Funktion för att hämta och visa tidigare anteckningar när sidan laddar
window.addEventListener('load', () => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
        notes.value = savedNotes;
    }
});
