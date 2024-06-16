"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const filePath = '../data/Customer_Type.json'; // Adjust the file path as needed
const filePath1 = '../data/Account_Industry.json';
const filePath2 = '../data/ACV_Range.json';
const filePath3 = '../data/Team.json';
app.use((0, cors_1.default)()); // Enable CORS middleware
// Define a sample route
app.get('/', (req, res) => {
    res.send('Hello from Express server!');
});
// Route to fetch data from JSON file
app.get('/fetchData', (req, res) => {
    // Read the JSON file asynchronously
    fs_1.default.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return res.status(500).json({ error: 'Error reading JSON file' });
        }
        try {
            const jsonData = JSON.parse(data); // Parse JSON data
            res.status(200).json(jsonData); // Send JSON data as response
        }
        catch (error) {
            console.error('Error parsing JSON data:', error);
            res.status(500).json({ error: 'Error parsing JSON data' });
        }
    });
});
app.get('/fetchData1', (req, res) => {
    // Read the JSON file asynchronously
    fs_1.default.readFile(filePath1, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return res.status(500).json({ error: 'Error reading JSON file' });
        }
        try {
            const jsonData = JSON.parse(data); // Parse JSON data
            res.status(200).json(jsonData); // Send JSON data as response
        }
        catch (error) {
            console.error('Error parsing JSON data:', error);
            res.status(500).json({ error: 'Error parsing JSON data' });
        }
    });
});
app.get('/fetchData2', (req, res) => {
    // Read the JSON file asynchronously
    fs_1.default.readFile(filePath2, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return res.status(500).json({ error: 'Error reading JSON file' });
        }
        try {
            const jsonData = JSON.parse(data); // Parse JSON data
            res.status(200).json(jsonData); // Send JSON data as response
        }
        catch (error) {
            console.error('Error parsing JSON data:', error);
            res.status(500).json({ error: 'Error parsing JSON data' });
        }
    });
});
app.get('/fetchData3', (req, res) => {
    // Read the JSON file asynchronously
    fs_1.default.readFile(filePath3, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return res.status(500).json({ error: 'Error reading JSON file' });
        }
        try {
            const jsonData = JSON.parse(data); // Parse JSON data
            res.status(200).json(jsonData); // Send JSON data as response
        }
        catch (error) {
            console.error('Error parsing JSON data:', error);
            res.status(500).json({ error: 'Error parsing JSON data' });
        }
    });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
