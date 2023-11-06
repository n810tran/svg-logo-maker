const inquirer = require('inquirer');
const fs = require('fs/promises');
const { Circle, Triangle, Square } = require('./lib/shapes');

const promptQuestions = async () => {
  const { text, textColor, shape, shapeColor } = await inquirer.prompt([
    {
      message: 'What text would you like in your logo? (Enter up to three characters)',
      name: 'text',
    },
    {
      message: 'Choose text color (Choose hexadecimal number or enter color keyword)',
      name: 'textColor',
    },
    {
      type: 'list',
      message: 'What shape would you like for the logo?',
      choices: ['circle', new inquirer.Separator(), 'triangle', new inquirer.Separator(), 'square', new inquirer.Separator()],
      name: 'shape',
    },
    {
      message: 'What color would you like your shape? (Choose hexadecimal number or enter color keyword)',
      name: 'shapeColor',
    },
  ]);

  if (text.length > 3 || text.length < 1) {
    console.error('You must enter 1-3 characters');
    await promptQuestions();
  } else {
    await writeFileFunc('Logo.svg', { text, textColor, shape, shapeColor });
  }
};

const writeFileFunc = async (fileName, { text, textColor, shape, shapeColor }) => {
  let svgGen = '';
  svgGen += `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">`;
  svgGen += '<g>';

  let shapeAnswer;
  switch (shape) {
    case 'square':
      shapeAnswer = new Square();
      svgGen += `<rect x="70" y="40" width="160" height="160" fill="${shapeColor}"/>`;
      break;
    case 'circle':
      shapeAnswer = new Circle();
      svgGen += `<circle cx="150" cy="120" r="70" fill="${shapeColor}"/>`;
      break;
    default:
      shapeAnswer = new Triangle();
      svgGen += `<polygon points="150, 18 244, 182 56, 182" fill="${shapeColor}"/>`;
      break;
  }

  svgGen += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${textColor}">${text}</text>`;
  svgGen += '</g>';
  svgGen += '</svg>';

  try {
    await fs.writeFile(fileName, svgGen);
    console.log('Successfully generated Logo.svg file');
  } catch (err) {
    console.error(err);
  }
};

promptQuestions();