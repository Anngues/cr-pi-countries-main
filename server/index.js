const axios = require("axios");
const server = require("./src/server");
const { conn, Country } = require('./src/db.js');
const PORT = 3001;

conn.sync({ force: true }).then(() => {
server.listen(PORT, async () => {
  const allCountries = Country.findAll();
  if(!allCountries.length) {
    const apiResponse = await axios.get('http://localhost:5000/countries');
    const apiCountries = apiResponse.data.map((e) => {
      return {
        name: e.name.common,
        id: e.cca3,
        image: e.flags.png,
        continent: e.continents[0],
        capital: e.capital ? e.capital[0] : 'no capital',
        subregion: e.subregion,
        area: e.area,
        population: e.population
      }
    });
    await Country.bulkCreate(apiCountries);
    console.log(" Se crearon los países ");
  }
  console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error))
