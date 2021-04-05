var inquirer = require('inquirer');
const fs = require('fs');
const generatePage = require('./utils/generateMarkdown.js');
const generateMarkdown = require('./utils/generateMarkdown.js');
const questions = () => {
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: "What is your name?"
      },
      {
        type: 'input',
        name: 'email',
        message: 'What is your email address?'
      },
      {
        type: 'input',
        name: 'userName',
        message: 'What is your Github username?'
      },
      {
          type: 'input',
          name: 'title',
          message: 'What is the name of your project?'
      },
      {
          type: 'input',
          name: 'description',
          message: 'Please enter a description of your project.'
      },
      {
          type: 'input',
          name: 'install',
          message: 'Please describe installation of your application.'
      },
      {
          type: 'input',
          name: 'usage',
          message: 'Please describe usage of your application.'
      },
      {
          type: 'confirm',
          name: 'collabCheck',
          message: 'Do you need to credit any contributors?',
          default: true
      },
      {
          type: 'input',
          name: 'collab',
          message:'Enter credit to any authors and/or outside sources.',
          when: ({ collabCheck }) =>{
              if(collabCheck){
                  return true
              } else {
                  return false
              }
          }
      },
      {
        type: 'list',
        name: 'license',
        message: 'What license are you using for your application?',
        choices: ['Unlicensed', 'MIT', 'ISC']
      },
      {
        type: 'confirm',
        name: 'screenshotCheck',
        message: 'Would you like to include a screenshot of your application?'
      },
      {
        type: 'input',
        name: 'screenshot',
        message: 'Input a filepath to link a screenshot of your application.',
        when: ({ screenshotCheck }) =>{
          if(screenshotCheck){
              return true
          } else {
              return false
          }
      }
      }
  ])
}
questions().then( answers =>
  fs.writeFile('./readme.md', generateMarkdown(answers), (err) => {
    if (err) throw err;
  }));