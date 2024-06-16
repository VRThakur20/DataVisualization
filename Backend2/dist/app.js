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
// Define an array of file paths
const filePaths = [
    '../data/Customer_Type.json',
    '../data/Account_Industry.json',
    '../data/ACV_Range.json',
    '../data/Team.json',
];
app.use((0, cors_1.default)()); // Enable CORS middleware
// Define a sample route
app.get('/', (req, res) => {
    res.send('Hello from Van Raj Thakur');
});
// Route to fetch data from JSON files
filePaths.forEach((filePath, index) => {
    app.get(`/fetchData${index}`, (req, res) => {
        // Read the JSON file asynchronously
        fs_1.default.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading JSON file ${filePath}:`, err);
                return res.status(500).json({ error: `Error reading JSON file ${filePath}` });
            }
            try {
                const jsonData = JSON.parse(data); // Parse JSON data
                res.status(200).json(jsonData); // Send JSON data as response
            }
            catch (error) {
                console.error(`Error parsing JSON data from ${filePath}:`, error);
                res.status(500).json({ error: `Error parsing JSON data from ${filePath}` });
            }
        });
    });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
