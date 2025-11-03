
import config from "../conf/index.js";

//let Filter_KEY = "filterKey";
//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
 

  const params = new URLSearchParams(search);
  const city = params.get("city");
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let adventure = await fetch(config.backendEndpoint+ "/adventures?city=" + city);
    let formatData = await adventure.json();
    // console.log(formatData);
    return formatData;

    } catch (error) {
      return null;
    }
  }


//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  let idSelect = document.querySelector("#data");

  idSelect.innerHTML = "";  

  adventures.forEach(element => {
    let createDiv = document.createElement("a");
    createDiv.setAttribute("href", `detail/?adventure=${element["id"]}`);
    createDiv.setAttribute("id", `${element["id"]}`);
    createDiv.setAttribute("category", `${element["category"]}`);
    createDiv.setAttribute("class", "col-6 col-lg-3 mb-3");
    createDiv.innerHTML = `
      <div class="activity-card">
        <img src="${element["image"]}" alt="" class="img-responsive">
        <div class = "category-banner">
        <h6>${element["category"]}</h6>
        </div>
        <div class="card-text mx-2 my-2">
          <div class="d-flex justify-content-between gap-5">
            <h6>${element["name"]}</h6>
            <h6>${element["currency"]} ${element["costPerHead"]}</h6>
          </div>
          <div class="d-flex justify-content-between">
            <h6>Duration</h6>
            <h6>${element["duration"]} Hours</h6>
          </div>
        </div>
      </div>
    `;
    idSelect.append(createDiv);
  });
}


//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filterArray = list.filter((adventure) => {
    let adventureDuration = adventure["duration"];
    if(adventureDuration> low && adventureDuration<= high){
      return true;
    }else{
      return false;
    }
  })
    return filterArray;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filterArray = list.filter((adventure) => {
    let adventureCategory = adventure["category"];
    if(categoryList.includes(adventureCategory)){
      return true;
    }else{
      return false;
    }
  })
    return filterArray;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  console.log("filters",filters);
  let {duration, category} = filters;
  let isDurationPresent = duration.length;
  let isCategoryPresent = category.length;

  if(isDurationPresent && isCategoryPresent){

    let durationArray = duration.split("-");
    let low = durationArray[0];
    let high = durationArray[1];

    let filterByDurationList = filterByDuration(list, low, high);
    
    let filterByCategoryList = filterByCategory(filterByDurationList, category);
    return filterByCategoryList;
  }
    else if(isDurationPresent){
      
      let durationArray = duration.split("-");
      let low = durationArray[0];
      let high = durationArray[1];

    let filterByDurationList = filterByDuration(list, low, high);
    return filterByDurationList
  }
  else if(isCategoryPresent){
    let filterByCategoryList = filterByCategory(list, category);
    return filterByCategoryList;
  }
  else{
    return list;
  }

}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters))

  return true;

  
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let stringFilter = localStorage.getItem("filters");
  
  if(stringFilter){
    let parseFilter = JSON.parse(stringFilter);
   
    return parseFilter;
  }
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
    let categoryFilter = filters["category"];
    categoryFilter.forEach((key) => {
      let newEle = document.createElement("div");
      newEle.className = "category-filter";
      newEle.innerHTML = `
        <div>${key}</div>
      `
      document.getElementById("category-list").appendChild(newEle);
    })
}

export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
