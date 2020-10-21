const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employees = [];
let employee = {};

const questionType = [{
    type: "list",
    name: "type",
    message: "Select an employee type to add a new employee, or select RENDER to render the HTML page:",
    choices: ["Manager", "Engineer", "Intern", "RENDER"]
}];

const questionsGeneral = [{
    type: "input",
    name: "name",
    message: "Enter the employee's name:"
},{
    type: "number",
    name: "id",
    message: "Enter the employee's ID number:"
},{
    type: "input",
    name: "email",
    message: "Enter the employee's email:"
}];

const questionManager = [{
    type: "input",
    name: "office",
    message: "Enter the manager's office number:"
}];

const questionEngineer = [{
    type: "input",
    name: "github",
    message: "Enter the engineer's Github:"
}];

const questionIntern = [{
    type: "input",
    name: "school",
    message: "Enter the intern's school:"
}];

askType();

function askType() {
    inquirer.prompt(questionType).then(function(response) {
        employee.type = response.type;
        if (employee.type === "RENDER") {
            renderPage();
        }
        else {
            askGeneral();
        }
    });
}

function askGeneral() {
    inquirer.prompt(questionsGeneral).then(function(response) {
        employee.name = response.name;
        employee.id = response.id;
        employee.email = response.email;
        switch (employee.type) {
            case "Manager":
                askManager();
                break;

            case "Engineer":
                askEngineer();
                break;
            
            case "Intern":
                askIntern();

            default:
                break;
        }
    });
}

function askManager() {
    inquirer.prompt(questionManager).then(function(response) {
        employee.officeNumber = response.office;
        let manager = new Manager(employee.name, employee.id, employee.email, employee.officeNumber);
        employees.push(manager);
        askType();
    });
}

function askEngineer() {
    inquirer.prompt(questionEngineer).then(function(response) {
        employee.github = response.github;
        let engineer = new Engineer(employee.name, employee.id, employee.email, employee.github);
        employees.push(engineer);
        askType();
    });
}

function askIntern() {
    inquirer.prompt(questionIntern).then(function(response) {
        employee.school = response.school;
        let intern = new Intern(employee.name, employee.id, employee.email, employee.school);
        employees.push(intern);
        askType();
    });
}

function renderPage() {
    html = render(employees);
    fs.writeFileSync(outputPath, html);
    console.log('Page saved in output folder as "team.html"')
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```