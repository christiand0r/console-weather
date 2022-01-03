import colors from "colors";

const listOptions = [
  {
    value: 1,
    name: `${"1.".green} Buscar lugar`,
  },
  {
    value: 2,
    name: `${"2.".green} Historial`,
  },
  {
    value: 0,
    name: `${"0.".green} Salir`,
  },
];

const wheaterMenu = [
  {
    type: "list",
    name: "opt",
    message: "¿Qué desea hacer?",
    choices: listOptions,
  },
];

export { wheaterMenu };
