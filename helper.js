/**
 * @version 0.5.0
 * @author [Grayson Orr](https://github.com/grayson-orr)
 */

const path = require('path')
const { existsSync, mkdirSync } = require('fs')
const zipper = require('zip-local')
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
 * @param {string} myPath
 * @param {string} myZIPName
 */
const createZIP = (myPath, myZIPName) => {
  zipper.zip(myPath, (err, zipped) => {
    if (!err) {
      zipped.compress()
      zipped.memory()
      zipped.save(myZIPName)
    }
  })
  return myZIPName
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
  myCPArr.forEach(p =>
    p === '0' ? myCPRowArr.push('N') : myCPRowArr.push('Y')
  )
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

module.exports = {
  createDir,
  fileExists,
  createPDF,
  createZIP,
  createJSON,
  markCheckpoint,
  filterObj
}
