const express = require('express');
const app = express();
const {
  NovelCovid
} = require('novelcovid');
const path = require('path');
app.locals.moment = require('moment');

const PORT = process.env.PORT || 3000;

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/leaflet', express.static(path.join(__dirname, '/node_modules/leaflet/dist/')));

// Set the view engine to ejs
app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
  const track = new NovelCovid();

  const general = await track.all();
  const data = await track.countries(null, 'cases');

  res.render('index', {
    general,
    data,
  });
});

app.listen(PORT, () => console.info(`Server running on port ${PORT}!`));
