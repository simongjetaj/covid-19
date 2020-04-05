const express = require('express');
const router = express.Router();

const api = require('novelcovid');

router.get('/', async (req, res) => {
  const general = await api.all();
  const data = await api.countries({ sort: 'cases' });

  res.render('index', {
    general,
    data,
  });
});

router.get('/:country', async (req, res) => {
  const country = req.params.country;

  const historical = await api.historical.countries({ country });
  const casesTimeline = historical.timeline ? historical.timeline.cases : null;
  const deathsTimeline = historical.timeline
    ? historical.timeline.deaths
    : null;
  const recoveriesTimeline = historical.timeline
    ? historical.timeline.recovered
    : null;

  if (!casesTimeline || !deathsTimeline) {
    return res.redirect('/');
  }

  const yesterday = await api.yesterday.countries({ country });

  req.io.on('connection', (socket) => {
    req.io.sockets.setMaxListeners(0);
    socket.emit('chart', casesTimeline, recoveriesTimeline, deathsTimeline);
  });

  res.render('country', {
    country: historical.country || country,
    yesterdayCases: yesterday.todayCases,
    yesterdayDeaths: yesterday.todayDeaths,
    flag: yesterday.countryInfo ? yesterday.countryInfo.flag : '',
    page: 'country',
  });
});

module.exports = router;
