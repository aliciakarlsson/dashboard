// Hämtar idn från html
const linkContainer = document.getElementById("linkcontainer");
const headlineInput = document.getElementById("headlineinput");
const urlInput = document.getElementById("urlinput");
const plus = document.getElementById("plus");

//Funktion för att lägga till titel och url
function addLink(title, url) {
  const listElement = document.createElement("li");
  const linkElement = document.createElement("a");
  linkElement.href = url;
  linkElement.textContent = title;
  listElement.appendChild(linkElement);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("deletebutton");
  deleteButton.textContent = 'x';
  deleteButton.addEventListener("click", () => {
    listElement.remove();
    saveLinks();
  });

  listElement.appendChild(deleteButton);
  linkContainer.appendChild(listElement);
  saveLinks();
}

//Sparar länken i en array och sedan skickar upp dem i localstorage
function saveLinks() {
  const links = [];
  const linkItems = linkContainer.querySelectorAll("li");
  linkItems.forEach((item) => {
    const link = {
      title: item.querySelector("a").textContent,
      url: item.querySelector("a").href,
    };
    links.push(link);
  });
  localStorage.setItem("savedlinks", JSON.stringify(links));
}


//När skärmen laddas så hömtar den länkarna från localstorage
window.addEventListener("load", () => {
  const savedLinks = localStorage.getItem("savedlinks");
  if (saveLinks) {
    const links = JSON.parse(savedLinks);
    links.forEach((link) => {
      addLink(link.title, link.url);
    });
  }
});

//När man klickar på plus så läggs länken till i listan
plus.addEventListener("click", (event) => {
  event.preventDefault();
  const title = headlineInput.value;
  const url = urlInput.value;
  if (title && url) {
    addLink(title, url);
    headlineInput.value = "";
    urlInput.value = "";
  } else {
    alert("Fyll i både titel och korrekt URL för att lägga till länk.");
  }
});
