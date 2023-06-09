const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
require('dotenv').config();
const config = require('./config/config');
const router = require('./routes/routes');
const db = require('./database/db');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

app.get('/healthCheck', (req, res) => {
  res.status(200).json({ message: 'Working' });
});

// app.all('*',(req,res)=>{
//   res.status(404).json({message: 'not found'})
// })
app.use(router);

app.listen(config.PORT || 3000, () => {
  console.log(`Server is running on port ${config.PORT}`);
});