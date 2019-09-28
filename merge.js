/**
 * @version 1.0
 * @author [Grayson Orr](https://github.com/grayson-orr)
 */

const PDFMerge = require('pdfmerge')
const data = require('./data.json')
const colors = require('colors')

let courseDir
let interval = 1500
const jsonFilename = process.argv[2]
const jsonPath = require(`./json/${jsonFilename}`)
const { courseJSONFile, coursePDFDirectory } = data

jsonPath.forEach((d, idx) => {
  const { githubname, studentname } = d

  switch (jsonFilename) {
    case courseJSONFile[0]:
      break
    case courseJSONFile[1]:
      break
    case courseJSONFile[2]:
      courseDir = coursePDFDirectory[2]
      break
    case courseJSONFile[3]:
      break
    default:
      break
  }

  /**
   * Merge PDF files every 1.5 seconds
   */
  setTimeout(_ => {
    console.log(colors.green(`Start PDF merge - ${studentname}.`))
    PDFMerge(
      [`./pdf/${courseDir}/results-${githubname}.pdf`,
      `./pdf/${courseDir}/roguelike/roguelike-${githubname}.pdf`],
      `./pdf/${courseDir}/final/final-results-${githubname}.pdf`
    )
      .then(_ => console.log(colors.red(`Finish PDF merge - ${studentname}.`)))
      .catch(err => console.log(err))
  }, idx * interval)
})
