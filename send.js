/**
 * @version 1.0
 * @author [Grayson Orr](https://github.com/grayson-orr)
 */

const nodeoutlook = require('nodejs-nodemailer-outlook')
require('colors')
const { email, password } = require('./config.json')
const data = require('./data.json')

let subject
let attachment
let interval = 7500

const jsonFilename = process.argv[2]
const jsonPath = require(`./json/${jsonFilename}`)
const { courseName, courseJSONFile, coursePDFDirectory } = data

jsonPath.forEach((d, idx) => {
  const { githubname, studentname } = d

  switch (jsonFilename) {
    case courseJSONFile[0]:
      subject = `${courseName[0]} Course Results`
      break
    case courseJSONFile[1]:
      subject = `${courseName[1]} Course Results`
      break
    case courseJSONFile[2]:
      subject = `${courseName[2]} Course Results`
      attachment = `./pdf/${
        coursePDFDirectory[2]
      }/final/final-results-${githubname}.pdf`
      break
    case courseJSONFile[3]:
      subject = `${courseName[3]} Course Results`
      break
    default:
      break
  }

  /**
   * Send an email every 7 seconds
   */
  setTimeout(_ => {
    console.log(`Start PDF sent - ${studentname}.`.green)
    nodeoutlook.sendEmail({
      auth: {
        user: email,
        pass: password
      },
      from: email,
      to: `orrgl1@student.op.ac.nz`,
      subject: subject,
      html: `Hello, your course result for <b>${subject}</b>, has been released on EBS. Please check your <b>"Results & Awards"</b> tab in your <b>Student Hub</b> portal. Have a good holiday.`,
      attachments: [
        {
          path: attachment
        }
      ],
      onError: err => console.log(err),
      onSuccess: _ => {
        console.log(`Finish PDF sent - ${studentname}.`.blue)
      }
    })
  }, idx * interval)
})
