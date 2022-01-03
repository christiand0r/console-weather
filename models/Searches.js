import * as fs from "fs";
import axios from "axios";

class Searches {
  constructor() {
    this.readDB();
  }

  history = [];
  dbPath = "./db/database.json";

  get paramsMapbox() {
    return {
      limit: 5,
      language: "es",
      access_token: process.env.MAPBOX_KEY,
    };
  }

  get paramsOpenWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: "metric",
      lang: "es",
    };
  }

  capitalizeHistory() {
    return this.history.map((el) => {
      let words = el.split(" ");
      words = words.map((word) => word[0].toUpperCase() + word.substring(1));

      return words.join(" ");
    });
  }

  async city(name = "") {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${name}.json`,
        params: this.paramsMapbox,
      });

      const res = await instance.get();
      const places = res.data.features;

      return places.map((el) => ({
        id: el.id,
        name: el.place_name,
        lng: el.center[0],
        lat: el.center[1],
      }));
    } catch (err) {
      console.log(err);
    }
  }

  async weather(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: {
          ...this.paramsOpenWeather,
          lat,
          lon,
        },
      });

      const res = await instance.get();
      const { weather, main } = res.data;

      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (err) {
      console.log(err);
    }
  }

  addHistory(search = "") {
    if (this.history.includes(search.toLowerCase())) return;

    //Only show the last 15 searchs
    this.history = this.history.splice(0, 14);

    this.history.unshift(search.toLowerCase());

    this.saveDB();
  }

  saveDB() {
    const payload = {
      history: this.history,
    };

    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  readDB() {
    if (!fs.existsSync(this.dbPath)) return;

    const info = fs.readFileSync(this.dbPath, { encoding: "utf-8" });
    const data = JSON.parse(info);

    this.history = data.history;
  }
}

export { Searches };
