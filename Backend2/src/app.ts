// import express, { Request, Response } from 'express';
// import cors from 'cors';
// import fs from 'fs';

// const app = express();
// const PORT = process.env.PORT || 3000;
// const filePath = '../data/Customer_Type.json'; // Adjust the file path as needed
// const filePath1 = '../data/Account_Industry.json';
// const filePath2 = '../data/ACV_Range.json';
// const filePath3 = '../data/Team.json';

// app.use(cors()); // Enable CORS middleware

// // Define a sample route
// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello from Express server!');
// });

// // Route to fetch data from JSON file
// app.get('/fetchData', (req: Request, res: Response) => {
//   // Read the JSON file asynchronously
//   fs.readFile(filePath, 'utf8', (err, data) => {
//     if (err) {
//       console.error('Error reading JSON file:', err);
//       return res.status(500).json({ error: 'Error reading JSON file' });
//     }

//     try {
//       const jsonData = JSON.parse(data); // Parse JSON data
//       res.status(200).json(jsonData); // Send JSON data as response
//     } catch (error) {
//       console.error('Error parsing JSON data:', error);
//       res.status(500).json({ error: 'Error parsing JSON data' });
//     }
//   });
// });

// app.get('/fetchData1', (req: Request, res: Response) => {
//     // Read the JSON file asynchronously
//     fs.readFile(filePath1, 'utf8', (err, data) => {
//       if (err) {
//         console.error('Error reading JSON file:', err);
//         return res.status(500).json({ error: 'Error reading JSON file' });
//       }
  
//       try {
//         const jsonData = JSON.parse(data); // Parse JSON data
//         res.status(200).json(jsonData); // Send JSON data as response
//       } catch (error) {
//         console.error('Error parsing JSON data:', error);
//         res.status(500).json({ error: 'Error parsing JSON data' });
//       }
//     });
//   });

// app.get('/fetchData2', (req: Request, res: Response) => {
//     // Read the JSON file asynchronously
//     fs.readFile(filePath2, 'utf8', (err, data) => {
//       if (err) {
//         console.error('Error reading JSON file:', err);
//         return res.status(500).json({ error: 'Error reading JSON file' });
//       }
  
//       try {
//         const jsonData = JSON.parse(data); // Parse JSON data
//         res.status(200).json(jsonData); // Send JSON data as response
//       } catch (error) {
//         console.error('Error parsing JSON data:', error);
//         res.status(500).json({ error: 'Error parsing JSON data' });
//       }
//     });
//   });

// app.get('/fetchData3', (req: Request, res: Response) => {
//     // Read the JSON file asynchronously
//     fs.readFile(filePath3, 'utf8', (err, data) => {
//       if (err) {
//         console.error('Error reading JSON file:', err);
//         return res.status(500).json({ error: 'Error reading JSON file' });
//       }
  
//       try {
//         const jsonData = JSON.parse(data); // Parse JSON data
//         res.status(200).json(jsonData); // Send JSON data as response
//       } catch (error) {
//         console.error('Error parsing JSON data:', error);
//         res.status(500).json({ error: 'Error parsing JSON data' });
//       }
//     });
//   });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;

// Define an array of file paths
const filePaths = [
  '../data/Customer_Type.json',
  '../data/Account_Industry.json',
  '../data/ACV_Range.json',
  '../data/Team.json',
];

app.use(cors()); // Enable CORS middleware

// Define a sample route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express server!');
});

// Route to fetch data from JSON files
filePaths.forEach((filePath, index) => {
  app.get(`/fetchData${index}`, (req: Request, res: Response) => {
    // Read the JSON file asynchronously
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading JSON file ${filePath}:`, err);
        return res.status(500).json({ error: `Error reading JSON file ${filePath}` });
      }

      try {
        const jsonData = JSON.parse(data); // Parse JSON data
        res.status(200).json(jsonData); // Send JSON data as response
      } catch (error) {
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
