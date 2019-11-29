/**
 * @version 0.5.0
 * @author [Grayson Orr](https://github.com/grayson-orr)
 */

const path = require('path')
const { copyFile, existsSync, mkdirSync } = require('fs')
const csvToJson = require('convert-csv-to-json')

/**
 * @param {string} myPath
 */
const createDir = myPath => {
  try {
    if (!existsSync(myPath)) mkdirSync(myPath)
  } catch (err) {
    return new Error('Error creating directory.')
  }
  return myPath
}

/**
 * @param {object} myCourseFile
 * @param {string} myOtherFile
 */
const fileExists = (myCourseFile, myOtherFile) => {
  return myCourseFile.indexOf(myOtherFile) > -1 ? true : false
}

/**
 * @param {string} myPath
 * @param {string} myFilename
 */
const createPDF = (myPath, myFilename) => {
  return path.join(myPath, myFilename)
}

/**
 * @param {string} myInput
 * @param {string} myOutput
 */
const createJSON = (myInput, myOutput) => {
  csvToJson.generateJsonFileFromCsv(myInput, myOutput)
  csvToJson.fieldDelimiter(',')
  return myOutput
}

/**
 * @param {object} myCPArr
 * @param {object} myCPRowArr
 */
const markCheckpoint = (myCPArr, myCPRowArr) => {
  myCPArr.map(p => (p === '0' ? myCPRowArr.push('No') : myCPRowArr.push('Yes')))
  return myCPRowArr
}

/**
 * @param {object} myObj
 * @param {object} myRegExp
 */
const filterObj = (myObj, myRegExp) => {
  return Object.keys(myObj)
    .filter(value => myRegExp.test(value))
    .map(e => myObj[e])
}

/**
 * @param {string} fileFrom
 * @param {string} fileTo
 */
const copyFiles = (fileFrom, fileTo) => {
  copyFile(fileFrom, fileTo, err => {
    if (err) throw err
    console.log(`${fileFrom} copied to ${fileTo}.`)
  })
}

module.exports = {
  createDir,
  fileExists,
  createPDF,
  createJSON,
  markCheckpoint,
  filterObj,
  copyFiles
}
