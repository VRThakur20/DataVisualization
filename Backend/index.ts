// import express, { Request, Response } from 'express';
// import cors from 'cors';
// import fs from 'fs';

// const app = express();

// // Use CORS middleware
// app.use(cors());

// // Define a sample route
// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello from Express server!');
// });

// app.get('/fetchData', (req: Request, res: Response) => {
//   // Define the path to your JSON file
//   const filePath = '../data/Customer_Type.json';

//   // Read the JSON file
//   fs.readFile(filePath, 'utf8', (err, data) => {
//     if (err) {
//       console.error('Error reading JSON file:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//       return;
//     }

//     try {
//       // Parse the JSON data
//       const jsonData = JSON.parse(data);

//       // console.log(jsonData);

//       // Send the JSON data as response with status code 200
//       res.status(200).json(jsonData);
//     } catch (error) {
//       console.error('Error parsing JSON data:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
