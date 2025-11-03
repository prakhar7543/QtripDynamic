import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    let url = config.backendEndpoint + "/reservations/";
  let data = await fetch(url);
  let response = await data.json();
  console.log(response);
  return response;
  }catch(error){
    return null;
  }
  
  // Place holder for functionality to work in the Stubs
  
}


function addReservationToTable(reservations) {
  let reservationParent = document.getElementById("reservation-table-parent");
  let noReservationBanner = document.getElementById("no-reservation-banner");

  if (!reservations.length) {
    reservationParent.style.display = "none";
    noReservationBanner.style.display = "block";
  } else {
    reservationParent.style.display = "block";
    noReservationBanner.style.display = "none";
  }

  let reservationTable = document.getElementById("reservation-table");
  reservationTable.innerHTML = ""; // Clear the table before appending new rows

  reservations.forEach((reservation) => {
    let { id, name, date, price, time, person, adventureName, adventure } = reservation;

    // Format the date in D/MM/YYYY format
    let formattedDate = new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });

    // Format the time in the required format
    let formattedTime = new Date(time).toLocaleString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    }).replace(" at", ",");

    let tableRow = document.createElement("tr");
    tableRow.innerHTML = `
      <td>${id}</td>
      <td>${name}</td>
      <td>${adventureName}</td>
      <td>${person}</td>
      <td>${formattedDate}</td>
      <td>${price}</td>
      <td>${formattedTime}</td>
      <td>
        <div class="reservation-visit-button" id="${id}">
          <a href="../detail/?adventure=${adventure}">Visit</a>
        </div>
      </td>
    `;
    reservationTable.appendChild(tableRow);
  });
}


export { fetchReservations, addReservationToTable };
