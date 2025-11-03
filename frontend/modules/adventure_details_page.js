import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  
  let params = new URLSearchParams(search);
  let id = params.get("adventure");
  return id;

  // Place holder for functionality to work in the Stubs
  
  //return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  //console.log(adventureId);
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    let rawData = await fetch(config.backendEndpoint + "/adventures/detail?adventure="+ adventureId);
    let formatData = await rawData.json();
    console.log(formatData);
    return formatData;
  }catch (error){
    return null;
  };
 
  // Place holder for functionality to work in the Stubs
  //return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let adventureName = document.getElementById("adventure-name");
  adventureName.innerHTML = adventure["name"];

  let adventureSubtitle = document.getElementById("adventure-subtitle");
  adventureSubtitle.innerHTML = adventure["subtitle"];

  let adventureContent = document.getElementById("adventure-content");
  adventureContent.innerHTML = adventure["content"];

  let photoGalllery = document.getElementById("photo-gallery");
  
  adventure["images"].forEach(element => {

    let container = document.createElement("div");
  container.className = "col-lg-12 col-md-6 col-sm-3";
  container.innerHTML = `
    <img     
    src = ${element}
    alt = "img"
    class = "activity-card-image";
    />
  `
  photoGalllery.append(container);
  });
  
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // 1. Add the bootstrap carousel to show the Adventure images
  let photoGalllery = document.getElementById("photo-gallery");
  photoGalllery.innerHTML = `
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
      </div>
      <div id="carousel-inner" class="carousel-inner">
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  `;

  let carouselIndicators = document.querySelector(".carousel-indicators");
  let carouselInner = document.getElementById("carousel-inner");

  // these indicators dynamically based on the images array length prakhar
  images.forEach((image, index) => {
    let indicator = document.createElement("button");
    indicator.setAttribute("type", "button");
    indicator.setAttribute("data-bs-target", "#carouselExampleIndicators");
    indicator.setAttribute("data-bs-slide-to", index);
    indicator.setAttribute("aria-label", `Slide ${index + 1}`);
    if (index === 0) {
      indicator.classList.add("active");
      indicator.setAttribute("aria-current", "true");
    }
    carouselIndicators.appendChild(indicator);

    // Create the carousel item for each image
    let item = document.createElement("div");
    item.classList.add("carousel-item");
    if (index === 0) item.classList.add("active");

    let img = document.createElement("img");
    img.setAttribute("src", image);
    img.setAttribute("class", "d-block w-100");

    item.appendChild(img);
    carouselInner.appendChild(item);
  });
}


//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  // console.log("is available "+adventure.available);
  if(adventure["available"]){
    // Hide the reservation-panel-sold-out panel
    document.getElementById("reservation-panel-sold-out").style.display="none";
    // Show the reservation-panel-available panel
    document.getElementById("reservation-panel-available").style.display="block";
    //Update the appropriate element to show the cost per head using the costPerHead field of the input adventure.
    document.getElementById("reservation-person-cost").innerHTML=adventure["costPerHead"]; //or adventure.costPerHead
 }
 else{
  // show the reservation-panel-sold-out panel
  document.getElementById("reservation-panel-sold-out").style.display="block";
    // dont Show the reservation-panel-available panel
    document.getElementById("reservation-panel-available").style.display="none";
 }
}


//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  var total= persons*adventure["costPerHead"]; //adventure.costPerHead is'nt passing the test.

  document.getElementById("reservation-cost").innerHTML=total; 

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const Form=document.getElementById("myForm");

  Form.addEventListener("submit",async(e)=>{
    e.preventDefault();
  console.log(Form.elements["date"].value); //convert this string date to date obj taki usse date/month/year etc extract ho ske
  

  const data={

    // name : document.getElementById("id_of_input").value; //this is also right
    name:Form.elements["name"].value,
    date:new Date(Form.elements["date"].value),
    person:Form.elements["person"].value,
    adventure:adventure["id"]
 }
 console.log(data);
 try{
   //const url=`${config.backendEndpoint}/reservations/new`; //also right
   const url=config.backendEndpoint+"/reservations/new";

   const res=await fetch(url,{
     method:"POST",
    headers: {'Content-Type': 'application/json'},
     body:JSON.stringify(data)
   });
  alert("success");
  window.location.reload(); //The window object represents an open window in a browser and The reload() method does the same as the reload button in your browser.
//The location object contains information about the current URL.The location object is a property of the window object.

 }
 catch(error){
   console.log(error);
   alert("failed");

 }
    })

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById("reserved-banner").style.display="block";
  }
    else{
      document.getElementById("reserved-banner").style.display="none";
    }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
