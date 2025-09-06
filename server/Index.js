const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Server is running!</h1><p>Welcome to the SynergeSphere API</p>');
});

app.listen(8000, () => {
    console.log('Server listening on port 8000');
});