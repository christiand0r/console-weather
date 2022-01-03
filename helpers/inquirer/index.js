import inquirer from "inquirer";
import colors from "colors";
import { wheaterMenu } from "./wheaterMenu.js";

const inquirerMenu = async () => {
  console.clear();
  const { opt } = await inquirer.prompt(wheaterMenu);

  return opt;
};

const pauseConsole = async () => {
  console.log("\n");

  await inquirer.prompt([
    {
      type: "input",
      name: "continue",
      message: `Presione ${"ENTER".green} para continuar`,
    },
  ]);
};

const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "value",
      message,
      validate(input) {
        if (input.length === 0) {
          return "Por favor ingrese un valor";
        }

        return true;
      },
    },
  ];

  const { value } = await inquirer.prompt(question);
  return value;
};

const listPlaces = async (places = []) => {
  const choices = places.map((place, i) => {
    const idx = colors.green(i + 1);

    return {
      value: place.id,
      name: `${idx}. ${place.name}`,
    };
  });

  //Option for Cancel
  choices.unshift({
    value: 0,
    name: `${"0".green}. Cancelar`,
  });

  const listResult = [
    {
      type: "list",
      name: "id",
      message: "Seleccione un lugar",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(listResult);

  return id;
};

export { inquirerMenu, pauseConsole, readInput, listPlaces };
