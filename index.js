/**
 * @version 1.0
 * @author [Grayson Orr](https://github.com/grayson-orr)
 */

const { exec } = require('shelljs')
const { prompt } = require('inquirer')
require('colors')

const { fileExists } = require('./helper')
const data = require('./data.json')
const { courseCSVFile } = data

const initialQuestion = {
  type: 'list',
  name: 'pdfCommand',
  message: 'Choose one of the following PDF commands:',
  choices: ['generate', 'merge', 'send']
}

const generateQuestion = {
  type: 'input',
  name: 'csvFilename',
  message: 'Enter a CSV filename:',
  validate: val => {
    return val === ''
      ? 'CSV filename can not be empty. Please enter a CSV filename. For example, <filename>.csv'
      : !fileExists(courseCSVFile, val)
      ? 'CSV filename does not exist. Please enter a CSV filename. For example, <filename>.csv'
      : true
  }
}

const mergeQuestion = [
  {
    type: 'input',
    name: 'jsonFilename',
    message: 'Enter a JSON filename:',
    validate: val => {
      return val !== ''
        ? true
        : 'Please enter a JSON filename. For example, <filename>.json'
    }
  }
]

exec('clear')

console.log('PDF Command Script\n'.blue.bold)

prompt(initialQuestion).then(ans => {
  const { pdfCommand } = ans
  if (pdfCommand === 'generate') {
    prompt(generateQuestion).then(generateAns => {
      const { csvFilename } = generateAns
      exec(`node generate.js ${csvFilename}`)
    })
  } else if (pdfCommand === 'merge') {
    prompt(mergeQuestion).then(mergeAns => {
      const { jsonFilename } = mergeAns
      exec(`node merge.js ${jsonFilename}`)
    })
  } else {
    console.log('Send')
  }
})
