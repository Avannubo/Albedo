const fs = require('fs');

// Function to generate a random string ID
function generateRandomId(length = 30) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Function to update 'id' and 'ALBEDOcodigo' in a JSON object
function updateIds(obj) {
    if (Array.isArray(obj)) {
        // If it's an array, recursively update each element
        obj.forEach(updateIds);
    } else if (typeof obj === 'object' && obj !== null) {
        // If it's an object, check and update 'id' and 'ALBEDOcodigo'
        if (obj.hasOwnProperty('id')) {
            obj['id'] = generateRandomId();
        }
        if (obj.hasOwnProperty('ALBEDOcodigo')) {
            obj['ALBEDOcodigo'] = generateRandomId();
        }
        // Recursively update nested objects or arrays
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                updateIds(obj[key]);
            }
        }
    }
}

// Main function to read, modify, and save the JSON file
function updateJsonFile(filePath) {
    try {
        // Read the file
        const data = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(data);

        // Update 'id' and 'ALBEDOcodigo'
        updateIds(jsonData);

        // Write the updated data back to the file
        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 4), 'utf8');

        console.log(`Successfully updated 'id' and 'ALBEDOcodigo' in ${filePath}.`);
    } catch (err) {
        console.error(`Error updating JSON file: ${err.message}`);
    }
}

// Specify the path to the JSON file
const filePath = './public/data/Products.json'; // Replace with your file path

// Run the script
updateJsonFile(filePath);
