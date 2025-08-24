import express from 'express';

const app = express();
const port = 3000;

console.log('Starting the server...sssss');

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});