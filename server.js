const express = require('express');
const app = express();
const path = require('path');
app.locals.moment = require('moment');

const {
  generalCovid19Info,
  dataCovid19,
} = require('./utils/api');

const PORT = process.env.PORT || 3000;

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine to ejs
app.set('view engine', 'ejs')
app.use('/leaflet', express.static(path.join(__dirname, '/node_modules/leaflet/dist/')));

app.get('/', async (req, res) => {
  const general = await generalCovid19Info();
  const data = await dataCovid19();

  res.render('index', {
    general,
    data
  });
});

app.listen(PORT, () => console.info(`Server running on port ${PORT}!`));
