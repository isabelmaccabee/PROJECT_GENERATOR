#!/usr/bin/env node
const inquirer = require("inquirer");
const fs = require("fs");

const curr_dir = process.cwd();
console.log(curr_dir);

const createDirectoryContents = (templatePath, projectName, done) => {
  fs.readdir(templatePath, function(err, files) {
    files.forEach(file => {
      const originalFilePath = `${templatePath}/${file}`;
      fs.stat(originalFilePath, (err, stat) => {
        if (stat.isFile()) {
          fs.readFile(originalFilePath, "utf8", (err, contents) => {
            const writePath = `${curr_dir}/${projectName}/${file}`;
            if (file === ".npmignore") file = ".gitignore";
            fs.writeFile(writePath, contents, "utf8", err => {
              if (file === "index.spec.js") done(err);
            });
          });
        } else if (stat.isDirectory()) {
          fs.mkdir(`${curr_dir}/${projectName}/${file}`, err => {
            if (err) console.error("Failed oh no: " + err);
            else
              createDirectoryContents(
                `${templatePath}/${file}`,
                `${projectName}/${file}`,
                done
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
  createDirectoryContents(templatePath, projectName, function(err) {
    if (err) console.error("Failed oops: " + err);
    console.log("Project created!");
  });
});
