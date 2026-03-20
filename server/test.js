const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get('/api/data', (req, res) => {
    const data = {
        message: 'This is some sample data from the API'
    };
    res.json(data);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});