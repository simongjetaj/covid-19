const covid = require('novelcovid');

module.exports = {
  generalCovid19Info: async () => await covid.getAll(),
  dataCovid19: async () => await covid.getCountry({
    sort: 'cases'
  }),
}
