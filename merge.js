/**
 * @version 0.5.0
 * @author [Grayson Orr](https://github.com/grayson-orr)
 */

require('colors')
const PDFMerge = require('pdfmerge')
const jsonFilename = process.argv[2]
const jsonPath = require(`./json/${jsonFilename}`)
/** Lookup table */
const courses = {
  'prog-four-grades.json': 'prog-four-pdf',
  'web-one-grades.json': 'web-one-pdf'
}
const coursePDF = courses[jsonFilename]

let interval = 1500

jsonPath.map((d, idx) => {
  const { githubname, studentname } = d
  /**
   * Merge PDF files every 1.5 seconds
   */
  setTimeout(_ => {
    console.log(`Merging PDF files for ${studentname}.`.green)
    PDFMerge(
      [
        `./pdf/${coursePDF}/results-${githubname}.pdf`,
        `./pdf/${coursePDF}/roguelike/roguelike-${githubname}.pdf`
      ],
      `./pdf/${coursePDF}/final/final-results-${githubname}.pdf`
    )
      .then(_ => console.log(`PDF files merged for ${studentname}.`.blue))
      .catch(err => console.log(err))
  }, idx * interval)
})
