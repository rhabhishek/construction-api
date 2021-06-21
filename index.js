const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

// Get our API routes
const api = require('./routes/api');
// Set our routes routes
app.use('/api', api);

app.use(express.static(path.join(__dirname, './public')));

app.listen('3000', () => {console.log('listening on PORT 3000!')});


