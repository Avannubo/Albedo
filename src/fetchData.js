const fs = require('fs');

export function fetchData() {
  try {
    const rawData = fs.readFileSync('data.json');
    const data = JSON.parse(rawData);
    return data;
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return null;
  }
}
