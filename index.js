/**
 * @version 1.0
 * @author [Grayson Orr](https://github.com/grayson-orr)
 */

const { exec } = require('shelljs')
const { prompt } = require('inquirer')
require('colors')

const { fileExists } = require('./helper')
const data = require('./data.json')
const { courseCSVFile, courseJSONFile } = data

const initialQuestion = {
  type: 'list',
  name: 'pdfCommand',
  message: 'Choose one of the following PDF commands:',
  choices: ['generate', 'merge', 'send']
}

const pdfQuestion = (
  myInput,
  myName,
  myMsg,
  myFileArr,
  myEmptyMsg,
  myNotExistMsg
) => {
  return {
    type: myInput,
    name: myName,
    message: myMsg,
    validate: val => {
      return val === ''
        ? myEmptyMsg
        : !fileExists(myFileArr, val)
        ? myNotExistMsg
        : true
    }
  }
}

exec('clear')

console.log('PDF Command Script\n'.blue.bold)

prompt(initialQuestion).then(ans => {
  const { pdfCommand } = ans

  const csvQuestion = pdfQuestion(
    'input',
    'csvFilename',
    'Enter a CSV filename:',
    courseCSVFile,
    'CSV filename can not be empty. Please enter a CSV filename. For example, <filename>.csv'
      .red.bold,
    'CSV filename does not exist. Please enter a CSV filename. For example, <filename>.csv'
      .red.bold
  )

  const jsonQuestion = pdfQuestion(
    'input',
    'jsonFilename',
    'Enter a JSON filename:',
    courseJSONFile,
    'JSON filename can not be empty. Please enter a JSON filename. For example, <filename>.json'
      .red.bold,
    'JSON filename does not exist. Please enter a JSON filename. For example, <filename>.json'
      .red.bold
  )

  switch (pdfCommand) {
    case 'generate':
      prompt(csvQuestion).then(generateAns => {
        const { csvFilename } = generateAns
        exec(`node generate.js ${csvFilename}`)
      })
      break
    case 'merge':
      prompt(jsonQuestion).then(mergeAns => {
        const { jsonFilename } = mergeAns
        exec(`node merge.js ${jsonFilename}`)
      })
      break
    case 'send':
      prompt(jsonQuestion).then(sendAns => {
        const { jsonFilename } = sendAns
        exec(`node send.js ${jsonFilename}`)
      })
      break
    default:
      break
  }
})
