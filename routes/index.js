const express = require("express");
const router = express.Router();
const {
  NovelCovid
} = require('novelcovid');

router.get('/', async (req, res) => {
  const track = new NovelCovid();

  const general = await track.all();
  const data = await track.countries(null, 'cases');

  res.render('index', {
    general,
    data,
  });
});

router.get('/:country', async (req, res) => {
  const country = req.params.country;

  const track = new NovelCovid();
  const historical = await track.historical(null, country);
  const casesTimeline = historical.timeline ? historical.timeline.cases : null;
  const deathsTimeline = historical.timeline ? historical.timeline.deaths : null;
  const recoveredTimeline = historical.timeline ? historical.timeline.recovered : null;

  if (!casesTimeline || !deathsTimeline) {
    return res.redirect('/');
  }

  const yesterday = await track.yesterday(country);
  req.io.on("connection", socket => {
    req.io.sockets.setMaxListeners(0);
    socket.emit('chart', casesTimeline, deathsTimeline, recoveredTimeline);
  });

  res.render('country', {
    country: historical.country || country,
    yesterdayCases: yesterday.todayCases,
    yesterdayDeaths: yesterday.todayDeaths,
    flag: yesterday.countryInfo ? yesterday.countryInfo.flag : '',
    page: 'country'
  });
});

module.exports = router;
