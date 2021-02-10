const express = require('express');
const path = require('path');
const petsRouter = require('./routes/pets.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/pets', petsRouter);


app.listen(3000, () => console.log('Listening on port 3000'));
