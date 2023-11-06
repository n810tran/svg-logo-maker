const inquirer = require('inquirer');
const fs = require('fs');
const { Circle, Triangle, Square } = require('./lib/shapes');

inquirer.prompt([
    { 
        message: "What text would you like in your logo? (Enter up to three characters)", name: 'text' 
    },
    { 
        message: "Choose text color (Choose hexadecimal number or enter color keyword)", name: 'textColor' 
    },
    { 
        type: "list", message: "What shape would you like for the logo?", 
        choices: ["circle", new inquirer.Separator(), "triangle", new inquirer.Separator(), "square", new inquirer.Separator()], 
        name: 'shape' 
    },
    { 
        message: "What color would you like your shape? (Choose hexadecimal number or enter color keyword)", 
        name: 'shapeColor' 
    },
])
    .then((answers) => {
        if (answers.text.length > 3 || answers.text.length < 1) {
            console.error("You must enter 1-3 characters");
            inquirer.prompt([
                { 
                    message: "What text would you like in your logo? (Enter up to three characters)", 
                    name: 'text' 
                },
                { 
                    message: "Choose text color (Choose hexadecimal number or enter color keyword)", 
                    name: 'textColor' 
                },
                { 
                    type: "list", 
                    message: "What shape would you like for the logo?", 
                    choices: ["circle", new inquirer.Separator(), "triangle", new inquirer.Separator(), "square", new inquirer.Separator()], 
                    name: 'shape' 
                },
                { 
                    message: "What color would you like your shape? (Choose hexadecimal number or enter color keyword)", 
                    name: 'shapeColor' 
                },
            ]).then((answers) => writeFileFunc("Logo.svg", answers));
        } else {
            writeFileFunc("Logo.svg", answers);
        }
    });

function writeFileFunc(fileName, answers) {
    let svgGen = `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">`;
    svgGen += "<g>";
    svgGen += `${answers.shape}`;
    let shapeAnswer;
    if (answers.shape === "square") {
        shapeAnswer = new Square();
        svgGen += `<rect x="70" y="40" width="160" height="160" fill="${answers.shapeColor}"/>`;
    } else if (answers.shape === 'circle') {
        shapeAnswer = new Circle();
        svgGen += `<circle cx="150" cy="120" r="70" fill="${answers.shapeColor}"/>`;
    } else {
        shapeAnswer = new Triangle();
        svgGen += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeColor}"/>`;
    }
    svgGen += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`;
    svgGen += "</g>";
    svgGen += "</svg>";
    fs.writeFile('Logo.svg', svgGen, (err) => {
        err ? console.error(err) : console.log("Successfully generated Logo.svg file");
    });
}