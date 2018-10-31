const inquirer = require("inquirer");
const fs = require("fs");

const curr_dir = process.cwd(); // WHERE THE USER IS ATM AND WHERE NEW FOLDER WILL BE

const questions = [
  {
    name: "project_name",
    type: "input",
    message: "Project name: ",
    validate: function(input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else
        return "Name of project may only include letters, numbers, hashes and underscores.";
    }
  }
];

inquirer.prompt(questions).then(answers => {
  const projectName = answers.project_name;
  const templatePath = `${__dirname}/template_folder`; // HOW TO GET TO OUR TEMPLATES FROM WHERE THE USER IS ATM
  fs.mkdir(`${curr_dir}/${projectName}`, function(err) {
    if (err) console.log(err);
  });
});
