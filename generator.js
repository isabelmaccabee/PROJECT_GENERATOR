const inquirer = require("inquirer");
const fs = require("fs");

const questions = [
  {
    name: "project-name",
    type: "input",
    message: "Project name: ",
    validate: function(input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else
        return "Name of project may only include letters, numbers, hashes and underscores.";
    }
  }
];

inquirer.prompt(question).then(answer => console.log(answers));
