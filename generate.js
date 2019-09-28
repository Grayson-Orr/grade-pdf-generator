/**
 * @version 1.0
 * @author [Grayson Orr](https://github.com/grayson-orr)
 */

const PDFDocument = require('./pdf-tables')
const fs = require('fs')
const path = require('path')
const csv = require('csv-parser')
require('colors')
const data = require('./data.json')
const { createDir, createPDF, createZIP, createJSON, markCheckpoint, filterObj } = require('./helper')

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
let { courseCSVFile, courseJSONFile, coursePDFDirectory, courseAssessment } = data

const pdfs = []
const csvFilename = process.argv[2]
const csvDirName = path.join(__dirname, 'csv')
const pdfDirName = path.join(__dirname, 'pdf')
const zipDirName = path.join(__dirname, 'zip')
const jsonDirName = path.join(__dirname, 'json')
const txtColor = { black: '#000000', earth: '#0000A0' }

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
  createDir(path.join(__dirname, 'pdf', myPDFDir))
  pdfFile = createPDF(`pdf/${myPDFDir}`, myStudentFilename)
  createZIP(`pdf/${myPDFDir}`, `zip/${myPDFDir}.zip`)
  createJSON(path.join(__dirname, 'csv', myCSVFilename), `${jsonDirName}/${myJSONFilename}`)
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
  pdf
    .moveDown(mySpacing)
    .fontSize(myFontSize)
    .fillColor(myColor)
    .text(myText)
}

/**
 * @param {number} mySpacing 
 * @param {number} myFontSize 
 * @param {string} myColor 
 * @param {string} myTxt 
 * @param {string} myContColor 
 * @param {string} myContTxt 
 */
const createSubheading = (mySpacing, myFontSize, myColor, myTxt,
  myContColor, myContTxt) => {
  pdf
    .moveDown(mySpacing)
    .fontSize(myFontSize)
    .fillColor(myColor)
    .text(myTxt, { continued: true })
    .fillColor(myContColor)
    .text(myContTxt)
}

/**
 * @param {object} myArr 
 * @param {string} myColor 
 * @param {string} myContColor 
 */
const createFeedback = (myArr, myColor, myContColor) => {
  for (let [i, val] of myArr.entries())
    createSubheading(1, 10, myColor, `Checkpoint ${i + 1} - : `, myContColor, val)
}

/**
 * Create a csv, json, pdf and zip directory
 */
createDir(csvDirName)
createDir(jsonDirName)
createDir(pdfDirName)
createDir(zipDirName)

fs.createReadStream(path.join(__dirname, 'csv', csvFilename))
  .pipe(csv())
  .on('data', data => {
    const { black, earth } = txtColor
    students = []
    students.push(data)
    students.forEach(s => {
      const studentName = s.studentname
      console.log(`Start PDF generate - ${studentName}.`.green)

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

      const webOneRow = [`${s.practicals}%`]

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
          inClassCheckpointsTblOne = { headers: courseAssessment.prog_four_checkpoints_1, rows: [inClassCPRowsOne] }
          inClassCheckpointsTblTwo = { headers: courseAssessment.prog_four_checkpoints_2, rows: [inClassCPRowsTwo] }
          assignmentOneTbl = { headers: courseAssessment.markingSchedule, rows: roguelikeAssignment }
          assignmentTwoTbl = { headers: courseAssessment.markingSchedule, rows: langExplorationAssignment }
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
          inClassCheckpointsTblOne = { headers: courseAssessment.web_one_checkpoints, rows: [inClassCPRowsOne] }
          generate('Item Review Static Site', coursePDFDirectory[3], myStudentFilename,
            courseCSVFile[3], courseJSONFile[3], 'IN510: Web 1 - Technology and Development')
          break
        default:
          break
      }

      const studentLastName = studentName.substr(0, studentName.indexOf(' '))
      const studentFirstName = studentName.substr(studentName.indexOf(' ') + 1)
      const progFourCPFeedback = filterObj(s, /^feedback([1-9]|1[0-9]|2[0-4])$/i)

      pdf = new PDFDocument()
      pdf.pipe(fs.createWriteStream(pdfFile))
      pdf.font('./public/font/calibril.ttf')
      pdf.image('./public/img/op-logo.png', 50, 25, { width: 100, height: 50 })
      pdf.fontSize(16).text(courseName, { align: 'center' })
      pdf
        .moveDown(1)
        .fontSize(16)
        .text(`Name: ${studentFirstName} ${studentLastName} - ${s.studentid}`, { align: 'center' })

      createHeading(1, 13, earth, 'Overall Marks:')
      createTable(black, table, 72, 170, 400, 10)
      createHeading(1, 13, earth, 'In-Class Checkpoints:')
      createTable(black, inClassCheckpointsTblOne, 72, 250, 425, 10)

      switch (csvFilename) {
        case courseCSVFile[0]:
          break
        case courseCSVFile[1]:
          break
        case courseCSVFile[2]:
          createTable(black, inClassCheckpointsTblTwo, 72, 325, 425, 10)
          createSubheading(1, 10, earth, 'Total: ', black, `You have completed ${s.total} out of 24 in-class checkpoints.`)
          createSubheading(1, 10, earth, 'Percentage: ', black, `You have gained ${s.practicals}% out of a possible 15.00%.`)
          pdf.addPage()

          createHeading(0, 13, earth, 'Checkpoint Feedback:')
          createFeedback(progFourCPFeedback, earth, black)
          pdf.addPage()

          createHeading(0, 13, earth, `${assignmentName} Marking Schedule:`)
          createTable(black, assignmentOneTbl, 72, 95, 350, 10)
          createSubheading(1, 10, earth, 'Percentage: ', black, 'Please refer to the feedback at the end of this document.')
          createSubheading(1, 10, earth, 'Percentage: ', black, `${s.a1total} (${s.a1grade})`)
          createSubheading(1, 10, earth, 'Percentage: ', black, `You have gained ${s.assignment1}% out of a possible 45.00%.`)
          pdf.addPage()

          createHeading(0, 13, earth, 'Langauge Exploration Marking Schedule:')
          createTable(black, assignmentTwoTbl, 72, 95, 350, 10)
          createSubheading(2, 10, earth, 'Comments: ', black, 'Please refer to the feedback at the end of this document.')
          createSubheading(1, 10, earth, 'Grade: ', black, `${s.a2total} (${s.a2grade})`)
          createSubheading(1, 10, earth, 'Percentage: ', black, `You have gained ${s.assignment2}% out of a possible 25.00%.`)
          break
        case courseCSVFile[3]:
          createSubheading(1, 10, earth, 'Total: ', black, `You have completed ${s.total} out of 10 practicals.`)
          createSubheading(1, 10, earth, 'Percentage: ', black, `You have gained ${s.practicals}% out of a possible 20.00%.`)
          pdf.addPage()

          createHeading(0, 13, earth, `${assignmentName} Marking Schedule:`)
          pdf.addPage()

          createHeading(0, 13, earth, 'Skills-Based Marking Schedule:')
          pdf.addPage()

          createHeading(0, 13, earth, 'Project Marking Schedule:')
          pdf.addPage()
          break
        default:
          break
      }

      pdf.end()
      console.log(`Finish PDF generate - ${studentName}.`.red)
      pdfs.push(pdf)
    })
  })
  .on('end', () => {
    console.log('PDF generate complete.'.blue)
  })
  

