/**
 * @version 0.5.0
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

/**
 * @param {string} myMsg
 * @param {object} myFileArr
 * @param {string} myEmptyMsg
 * @param {string} myNotExistMsg
 */
const pdfQuestion = (myMsg, myFileArr, myEmptyMsg, myNotExistMsg) => {
  return {
    type: 'input',
    name: 'filename',
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

/**
 * @param {object} myQuestion
 * @param {string} myScript
 */
const questionPrompt = (myQuestion, myScript) => {
  prompt(myQuestion).then(ans => {
    const { filename } = ans
    exec(`node ${myScript} ${filename}`)
  })
}

exec('clear')

console.log('PDF Command Script\n'.blue.bold)

prompt(initialQuestion).then(ans => {
  const { pdfCommand } = ans

  const csvQuestion = pdfQuestion(
    'Enter a CSV filename:',
    courseCSVFile,
    'CSV filename can not be empty. Please enter a CSV filename. For example, <filename>.csv'
      .red.bold,
    'CSV filename does not exist. Please enter a CSV filename. For example, <filename>.csv'
      .red.bold
  )

  const jsonQuestion = pdfQuestion(
    'Enter a JSON filename:',
    courseJSONFile,
    'JSON filename can not be empty. Please enter a JSON filename. For example, <filename>.json'
      .red.bold,
    'JSON filename does not exist. Please enter a JSON filename. For example, <filename>.json'
      .red.bold
  )

  switch (pdfCommand) {
    case 'generate':
      questionPrompt(csvQuestion, 'generate.js')
      break
    case 'merge':
      questionPrompt(jsonQuestion, 'merge.js')
      break
    case 'send':
      questionPrompt(jsonQuestion, 'send.js')
      break
    default:
      break
  }
})
