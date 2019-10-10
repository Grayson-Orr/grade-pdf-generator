/**
 * @version 0.5.0
 * @author [Grayson Orr](https://github.com/grayson-orr)
 */

require('colors')
const nodeoutlook = require('nodejs-nodemailer-outlook')
const { email, password } = require('./config.json')
const jsonFilename = process.argv[2]
const jsonPath = require(`./json/${jsonFilename}`)
const courses = {
  'prog-four-grades.json': ['IN628: Programming 4', 'prog-four-pdf'],
  'web-one-grades.json': ['IN512: Web 1', 'web-one-pdf']
}
const courseName = courses[jsonFilename][0]
const coursePDF = courses[jsonFilename][1]

let interval = 7500

jsonPath.map((d, idx) => {
  const { githubname, studentname } = d

  /**
   * Send an email every 7 seconds
   */
  setTimeout(_ => {
    console.log(`Emailing PDF file to ${studentname}.`.green)
    nodeoutlook.sendEmail({
      auth: {
        user: email,
        pass: password
      },
      from: email,
      to: `orrgl1@student.op.ac.nz`,
      subject: courseName,
      html: `Hello, your course result for <b>${courseName}</b>, has been released on EBS. Please check your <b>"Results & Awards"</b> tab in your <b>Student Hub</b> portal. Have a good holiday.`,
      attachments: [
        {
          path: `./pdf/${coursePDF}/final/final-results-${githubname}.pdf`
        }
      ],
      onError: err => console.log(err),
      onSuccess: _ => {
        console.log(`PDF file emailed to ${studentname}.`.blue)
      }
    })
  }, idx * interval)
})
