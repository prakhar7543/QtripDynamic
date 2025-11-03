import config from "../conf/index.js";

async function init() {
  
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const response = await fetch(config.backendEndpoint + "/cities");
    
  
    
    // Parse the response as JSON
    const data = await response.json();
    
    return data;
  } catch (error) {
    return null;
    // Optionally, return a default value or rethrow the error
     // Rethrowing for the calling function to handle it
  }
}


//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const idSelector = document.getElementById("data");
  const anchorTag = document.createElement("a");
  anchorTag.setAttribute("href",` pages/adventures/?city=${id}`);
  anchorTag.setAttribute("id", id);
  anchorTag.setAttribute("class", "col-6 col-lg-3 mb-4");
  anchorTag.innerHTML = `
    <div class="tile">
      <div class="tile-text text-center">
        <h4>${city}</h4>
        <p>${description}</p>
      </div>
      <img src="${image}" alt="" class="img-responsive">
    </div>
  `;
  idSelector.append(anchorTag);


}

export { init, fetchCities, addCityToDOM };
