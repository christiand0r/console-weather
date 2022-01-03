import dotenv from "dotenv";
import {
  inquirerMenu,
  listPlaces,
  pauseConsole,
  readInput,
} from "./helpers/inquirer/index.js";
import { Searches } from "./models/Searches.js";

const env = dotenv.config();

const main = async () => {
  let opt;

  const searches = new Searches();

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        const location = await readInput(
          "¿De cuál lugar quieres ver la información?"
        );

        const locations = await searches.city(location);

        const idChoose = await listPlaces(locations);
        if (idChoose === 0) continue;

        const placeChoose = locations.find((el) => el.id === idChoose);
        searches.addHistory(placeChoose.name);

        const weatherPlace = await searches.weather(
          placeChoose.lat,
          placeChoose.lng
        );

        console.log("\nInformación del Ubicación\n".green);
        console.log("Ciudad:", placeChoose.name.green);
        console.log("Lat:", placeChoose.lat);
        console.log("Long:", placeChoose.lng);
        console.log("Temperatura:", weatherPlace.temp);
        console.log("Min:", weatherPlace.min);
        console.log("Max:", weatherPlace.max);
        console.log("Detalles del Clima:", weatherPlace.desc.green);

        break;

      case 2:
        searches.capitalizeHistory().forEach((place, i) => {
          const idx = `${i + 1}.`.green;

          console.log(`${idx} ${place}`);
        });
        break;
    }

    if (opt !== 0) await pauseConsole();
  } while (opt !== 0);
};

main();
