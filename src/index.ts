import express from 'express';

export const app = express();
const port = 3000;

// כאן נגדיר את הנתיבים (routes)
app.get('/', (req, res) => {
    res.send('Hello from server!');
});



    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
