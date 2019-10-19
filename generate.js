/**
 * @version 0.5.0
 * @author [Grayson Orr](https://github.com/grayson-orr)
 */

require('colors')
const PDFDocument = require('./pdf-tables')
const { copyFile, createReadStream, createWriteStream } = require('fs')
const path = require('path')
const csv = require('csv-parser')
const data = require('./data.json')
const {
  createDir,
  createPDF,
  createZIP,
  createJSON,
  markCheckpoint,
  filterObj
} = require('./helper')
const pdfs = []
const csvFilename = process.argv[2]
const txtColor = { black: '#000000', earth: '#0000A0' }

let pdf
let courseName
let pdfFile
let assignmentName
let students = []
let table = {}
let inClassCheckpointsTblOne = {}
let inClassCheckpointsTblTwo = {}
let assignmentOneTbl = {}
let assignmentTwoTbl = {}
let {
  courseCSVFile,
  courseJSONFile,
  coursePDFDirectory,
  courseAssessment
} = data

/**
 * @param {string} myAssignmentName
 * @param {string} myPDFDir
 * @param {string} myStudentFilename
 * @param {string} myCSVFilename
 * @param {string} myJSONFilename
 * @param {string} myCourseName
 */
const generate = (myAssignmentName, myPDFDir, myStudentFilename,
  myCSVFilename, myJSONFilename, myCourseName) => {
  assignmentName = myAssignmentName
  createDir(`pdf/${myPDFDir}`)
  pdfFile = createPDF(`pdf/${myPDFDir}`, myStudentFilename)
  createZIP(`pdf/${myPDFDir}`, `zip/${myPDFDir}.zip`)
  createJSON(path.join('csv', myCSVFilename), `json/${myJSONFilename}`)
  courseName = myCourseName
}

/**
 * @param {string} myColor
 * @param {object} myTbl
 * @param {number} myMarginLeft
 * @param {number} myMarginTop
 * @param {number} myWidth
 * @param {number} myFontSize
 */
const createTable = (myColor, myTbl, myMarginLeft,
  myMarginTop, myWidth, myFontSize) => {
  pdf.fillColor(myColor).table(myTbl, myMarginLeft, myMarginTop, {
    width: myWidth,
    prepareHeader: () => pdf.fontSize(myFontSize),
    prepareRow: () => pdf.fontSize(myFontSize)
  })
}

/**
 * @param {number} mySpacing
 * @param {number} myFontSize
 * @param {string} myColor
 * @param {string} myText
 */
const createHeading = (mySpacing, myFontSize, myColor, myText) => {
  pdf.moveDown(mySpacing).fontSize(myFontSize).fillColor(myColor).text(myText)
}

/**
 * @param {number} mySpacing
 * @param {number} myFontSize
 * @param {string} myColor
 * @param {string} myTxt
 * @param {string} myContColor
 * @param {string} myContTxt
 */
const createSubheading = (
  mySpacing, myFontSize, myColor,
  myTxt, myContColor, myContTxt) => {
  pdf.moveDown(mySpacing).fontSize(myFontSize).fillColor(myColor)
    .text(myTxt, { continued: true }).fillColor(myContColor).text(myContTxt)
}

const generateCheckpoint = (myTotal, myTotalCount, myPracticals, myPracticalPercentage) => {
  createSubheading(1, 10, txtColor.earth, 'Total: ', txtColor.black, `You have completed ${myTotal} out of ${myTotalCount} practicals.`)
  createSubheading(1, 10, txtColor.earth, 'Percentage: ', txtColor.black, `You have gained ${myPracticals}% out of a possible ${myPracticalPercentage}%.`)
  pdf.image('./public/img/web-one-cp-completion.png', 57, 375, { width: 300, height: 200 })
}

const generateAssignment = (myTbl, myAssignmentName, myTotal, myGrade, myPercentage, myAssignmentPercentage) => {
  createHeading(0, 13, txtColor.earth, `${myAssignmentName} Marking Schedule:`)
  createTable(txtColor.black, myTbl, 72, 95, 350, 10)
  createSubheading(1, 10, txtColor.earth, 'Comments: ', txtColor.black, 'Please refer to the feedback at the end of this document.')
  createSubheading(1, 10, txtColor.earth, 'Grade: ', txtColor.black, `${myTotal} (${myGrade})`)
  createSubheading(1, 10, txtColor.earth, 'Percentage: ', txtColor.black, `You have gained ${myPercentage}% out of a possible ${myAssignmentPercentage}%.`)
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

/**
 * Create a csv, json, pdf and zip directory
 */
createDir('csv')
createDir('json')
createDir('pdf')
createDir('zip')

createReadStream(path.join(__dirname, 'csv', csvFilename))
  .pipe(csv())
  .on('data', data => {
    
    students = []
    students.push(data)
    students.map(s => {
      const studentName = s.studentname
      console.log(`Generating PDF file for ${studentName}.`.green)

      const inClassCPRowsOne = []
      const inClassCPRowsTwo = []

      /**
       * Tables rows
       */
      const progFourRow = [
        `${s.practicals}%`,
        `${s.softwareprojects}%`,
        `${s.exam}%`,
        `${s.overall} (${s.grade})`
      ]

      const webOneRow = [
        `${s.practicals}%`,
        `${s.assignment1}%`,
        `${s.sba}%`,
        `${s.assignment2}%`,
        `${s.overall} (${s.grade})`
      ]

      /**
       * Marking schedules
       */
      const roguelikeAssignment = [
        ['Code commenting', '10%', `${s.a1mark1}%`],
        ['Planning document', '10%', `${s.a1mark2}%`],
        ['OO architecture', '20%', `${s.a1mark3}%`],
        ['Code elegance', '25%', `${s.a1mark4}%`],
        ['Functionality and robustness', '25%', `${s.a1mark5}%`],
        ['Player experience', '10%', `${s.a1mark6}%`]
      ]

      const langExplorationAssignment = [
        ['Code commenting', '40%', `${s.a2mark1}%`],
        ['Program structure', '20%', `${s.a2mark2}%`],
        ['Code quality', '20%', `${s.a2mark3}%`],
        ['Functionality and robustness', '20%', `${s.a2mark4}%`]
      ]

      const staticSiteAssignment = [
        ['Requirements', '33%'],
        ['Code Quality', '33%'],
        ['Best Practices', '33%']
      ]

      const myStudentFilename = `results-${s.githubname}.pdf`

      switch (csvFilename) {
        /**
         * IN: Mobile Application Development
         */
        case courseCSVFile[0]:
          break
        /**
         * IN710: Object-Oriented Systems Development
         */
        case courseCSVFile[1]:
          break
        /**
         * IN628: Programming 4
         */
        case courseCSVFile[2]:
          const progFourCPOne = filterObj(s, /^checkpoint([1-9]|1[0-3])$/i)
          const progFourCPTwo = filterObj(s, /^checkpoint(1[4-9]|2[0-4])\d*/i)
          markCheckpoint(progFourCPOne, inClassCPRowsOne)
          markCheckpoint(progFourCPTwo, inClassCPRowsTwo)
          table = { headers: courseAssessment.prog_four, rows: [progFourRow] }
          inClassCheckpointsTblOne = {
            headers: courseAssessment.prog_four_checkpoints_1,
            rows: [inClassCPRowsOne]
          }
          inClassCheckpointsTblTwo = {
            headers: courseAssessment.prog_four_checkpoints_2,
            rows: [inClassCPRowsTwo]
          }
          assignmentOneTbl = {
            headers: courseAssessment.markingSchedule,
            rows: roguelikeAssignment
          }
          assignmentTwoTbl = {
            headers: courseAssessment.markingSchedule,
            rows: langExplorationAssignment
          }
          generate('Roguelike Assignment', coursePDFDirectory[2], myStudentFilename,
            courseCSVFile[2], courseJSONFile[2], 'IN628: Programming 4')
          break
        /**
         * IN512: Web 1
         */
        case courseCSVFile[3]:
          const webOneCPOne = filterObj(s, /^checkpoint([1-9]|10)$/i)
          markCheckpoint(webOneCPOne, inClassCPRowsOne)
          table = { headers: courseAssessment.web_one, rows: [webOneRow] }
          inClassCheckpointsTblOne = {
            headers: courseAssessment.web_one_checkpoints,
            rows: [inClassCPRowsOne]
          }
          assignmentOneTbl = {
            headers: courseAssessment.markingSchedule,
            rows: staticSiteAssignment
          }
          generate('Item Review Static Site', coursePDFDirectory[3], myStudentFilename,
            courseCSVFile[3], courseJSONFile[3], 'IN510: Web 1 - Technology and Development')
          break
        default:
          break
      }

      const studentLastName = studentName.substr(0, studentName.indexOf(' '))
      const studentFirstName = studentName.substr(studentName.indexOf(' ') + 1)

      pdf = new PDFDocument()
      pdf.pipe(createWriteStream(pdfFile))
      pdf.font('./public/font/calibril.ttf')
      pdf.image('./public/img/op-logo.png', 50, 25, { width: 85, height: 45 })
      pdf.fontSize(16).text(courseName, { align: 'center' })
      pdf.moveDown(1).fontSize(16)
        .text(`Name: ${studentFirstName} ${studentLastName} - ${s.studentid}`, {
          align: 'center'
        })

      createHeading(1, 13, txtColor.earth, 'Overall Marks:')
      createTable(txtColor.black, table, 72, 170, 400, 10)
      createHeading(1, 13, txtColor.earth, 'In-Class Checkpoints:')
      createTable(txtColor.black, inClassCheckpointsTblOne, 72, 250, 425, 10)

      switch (csvFilename) {
        case courseCSVFile[0]:
          break
        case courseCSVFile[1]:
          break
        case courseCSVFile[2]:
          createTable(txtColor.black, inClassCheckpointsTblTwo, 72, 325, 425, 10)
          generateCheckpoint(s.total, '24', s.practicals, '15')
          pdf.addPage()
          generateAssignment(assignmentOneTbl, assignmentName, s.a1total, s.a1grade, s.assignment1, '45.00')
          pdf.addPage()
          generateAssignment(assignmentTwoTbl, 'Langauge Exploration', s.a2total, s.a2grade, s.assignment2, '25.00')
          break
        case courseCSVFile[3]:
          generateCheckpoint(s.total, '10', s.practicals, '20')
          pdf.addPage()
          generateAssignment(assignmentOneTbl, assignmentName, s.a1total, s.a1grade, s.assignment1, '20.00')
          pdf.addPage()
          break
        default:
          break
      }

      pdf.end()
      console.log(`PDF file generated for ${studentName}.`.blue)
      pdfs.push(pdf)
    })
  })
  .on('end', () => {
    console.log('Complete.'.green)
  })
