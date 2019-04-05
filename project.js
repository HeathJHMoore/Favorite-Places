let places = [];
let southCities = [];
let notSouthCities = [];


function executeThisCodeAfterFilesLoads() {
    const data = JSON.parse(this.responseText);
    places = data.places;
    domStringBuilder(places);
    places.forEach((coolPlace) => {
        if (coolPlace.cityName === 'Nashville' || coolPlace.cityName === 'Huntsville') {
            southCities.push(coolPlace);
        } else {
            notSouthCities.push(coolPlace);
        };
    })
}

function executeThisCodeifXHRFails() {
    console.log("oh no");
}

const getPlacesData = () => {
    const myRequest = new XMLHttpRequest();
    myRequest.addEventListener('load', executeThisCodeAfterFilesLoads);
    myRequest.addEventListener('error', executeThisCodeifXHRFails);
    myRequest.open('GET', './db/places.json');
    myRequest.send();
}

const printToDom = (divId, textToPrint) => {
    const selectedDiv = document.getElementById(divId);
    selectedDiv.innerHTML = textToPrint;
};

const domStringBuilder = (arrayToPrint) => {
    let domString = ``;
    arrayToPrint.forEach((city) => {
        domString += `<div class="card col-12 col-md-6 col-lg-4 col-xl-4 text-center">`;
        domString +=`      <img height="300px" src="${city.cityImage}" class="card-img-top" alt="...">`;
        domString +=`      <div class="card-body">`;
        domString +=`         <h5 class="card-title">${city.cityName}, ${city.cityState}</h5>`;
        domString +=`         <p class="card-text">Favorite Restaurant: ${city.favoriteRestaurant}</p>`;
        domString +=`         <p class="card-text">Favorite Bar: ${city.favoriteBar}</p>`;
        domString +=`         <p class="card-text">Favorite Hotel: ${city.favoriteHotel}</p>`;
        domString +=`         <a href="#" class="btn btn-primary">Visit This City!</a>`;
        domString +=`      </div>`;
        domString +=` </div>`;
    });
    printToDom("cityContainerRow", domString);
};

const buttonEvents = () => {
    document.getElementById("southButton").addEventListener("click", function() {
        domStringBuilder(southCities);
    })
    document.getElementById("notTheSouthButton").addEventListener("click", function() {
        domStringBuilder(notSouthCities);
    })
    document.getElementById("allButton").addEventListener("click", function() {
        domStringBuilder(places);
    })
}

const init = () => {
    getPlacesData();
    buttonEvents();
};

init()