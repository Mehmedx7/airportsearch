// const csvFilePath = 'https://raw.githubusercontent.com/lxndrblz/Airports/main/airports.csv';
const csvFilePath = 'airports.csv';
let airportsData = [];
const departureInput = document.getElementById('departureInput');
const airportList = document.getElementById('airportList');

function fetchCSV() {
    fetch(csvFilePath)
        .then(response => response.text())
        .then(data => {
            airportsData = Papa.parse(data, { header: true }).data;
            initFuse();
        })
        .catch(error => console.error('Error fetching CSV file:', error));
}

function initFuse() {
    const fuseOptions = {
        keys: ['code', 'name'], // Properties to search for (code and name in this case)
        threshold: 0.3, // Adjust this value to control the sensitivity of the search
        shouldSort: true
    };

    const fuse = new Fuse(airportsData, fuseOptions);

    departureInput.addEventListener('input', () => {
        const inputValue = departureInput.value.trim();
        if (inputValue.length >= 2) {
            showAirportSuggestions(fuse.search(inputValue));
        } else {
            airportList.style.display = 'none';
        }
    });

    departureInput.addEventListener('focus', () => {
        showAirportSuggestions([]);
    });

    departureInput.addEventListener('blur', () => {
        setTimeout(() => {
            airportList.style.display = 'none';
        }, 200);
    });
}

function showAirportSuggestions(results) {
    airportList.style.display = 'block';
    airportList.innerHTML = '';
    results.forEach(result => {
        const airport = result.item; // Access the "item" property to get the airport object
        const li = document.createElement('li');
        li.textContent = `${airport.name} (${airport.code})`;
        li.addEventListener('click', () => {
            departureInput.value = `${airport.name} (${airport.code})`;
            airportList.style.display = 'none';
            console.log('Selected Airport:', airport);
        });
        airportList.appendChild(li);
    });
}

fetchCSV();
