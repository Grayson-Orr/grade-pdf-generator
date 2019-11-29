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
  const { githubname, studentname, studentlogin } = d

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
      to: `${studentlogin}@student.op.ac.nz`,
      cc: 'adon.moskal@op.ac.nz',
      subject: courseName,
      html: `Hello, Adon and I have attached your final results for <b>${courseName}</b>. Your results have been released on EBS. Adon and I would like to thank you all for the semester. We have thoroughly enjoyed the experience and hope you have learned something during this time. Enjoy yours holidays and take care of yourselfs. See you next year.`,
      attachments: [
        {
          path: `./pdf/${coursePDF}/results-${githubname}.pdf`
        }
      ],
      onError: err => console.log(err),
      onSuccess: _ => {
        console.log(`PDF file emailed to ${studentname}.`.blue)
      }
    })
  }, idx * interval)
})
