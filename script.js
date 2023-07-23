// const csvFilePath = 'https://raw.githubusercontent.com/lxndrblz/Airports/main/airports.csv';
const csvFilePath = 'airports.csv';
let airportsData = [];
const departureInput = document.getElementById('departureInput');

async function readCSV() {
    try {
        const response = await fetch(csvFilePath);
        const data = await response.text();
        airportsData = parseCSV(data);
        initAutocomplete();
        console.log('CSV data:', airportsData);
    } catch (error) {
        console.error('Error fetching CSV data:', error);
    }
}

function parseCSV(csvData) {
    const lines = csvData.split(/\r?\n/);
    const headers = lines[0].split(',');
    const airports = [];

    for (let i = 1; i < lines.length; i++) {
        const currentLine = lines[i].split(',');
        if (currentLine.length === headers.length) {
            const airport = {
                code: currentLine[0].trim(),
                name: currentLine[2].trim()
            };
            airports.push(airport);
        }
    }

    return airports;
}

function initAutocomplete() {
    const awesomplete = new Awesomplete(departureInput, {
        list: airportsData.map(airport => `${airport.name} (${airport.code})`)
    });

    departureInput.addEventListener('input', () => {
        awesomplete.evaluate();
    });
}

readCSV();
