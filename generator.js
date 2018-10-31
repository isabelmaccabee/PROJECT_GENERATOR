// #!/usr/bin/env node
const inquirer = require("inquirer");
const fs = require("fs");

const curr_dir = process.cwd(); // WHERE THE USER IS ATM AND WHERE NEW FOLDER WILL BE
console.log(curr_dir);

const createDirectoryContents = (templatePath, projectName) => {
  fs.readdir(templatePath, function(err, files) {
    files.forEach(file => {
      const originalFilePath = `${templatePath}/${file}`;
      fs.stat(originalFilePath, (err, stat) => {
        if (stat.isFile()) {
          fs.readFile(originalFilePath, "utf8", (err, contents) => {
            const writePath = `${curr_dir}/${projectName}/${file}`;
            fs.writeFile(writePath, contents, "utf8", err => {
              if (err) console.error("Failed oops: " + err);
              else console.log("You made a file!!!");
            });
          });
        } else if (stat.isDirectory()) {
          //file here refers to directory <-- spec basically
          fs.mkdir(`${curr_dir}/${projectName}/${file}`, err => {
            if (err) console.error("Failed oh no: " + err);
            else
              createDirectoryContents(
                `${templatePath}/${file}`,
                `${projectName}/${file}`
              );
          });
        }
      });
    });
  });
};

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
  const templatePath = `${__dirname}/template_folder`;
  fs.mkdir(`${curr_dir}/${projectName}`, function() {});
  createDirectoryContents(templatePath, projectName);
});
