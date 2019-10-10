/**
 * @version 0.5.0
 * @author [Grayson Orr](https://github.com/grayson-orr)
 */

require('colors')
const dropboxV2Api = require('dropbox-v2-api')
const glob = require('glob')
const { createReadStream } = require('fs')
const { dropboxAccessToken } = require('./config.json')
const dropbox = dropboxV2Api.authenticate({
  token: dropboxAccessToken
})
/** Lookup table */
const courses = {
  mobile: 'mobile-pdf',
  oosd: 'oosd-pdf',
  progfour: 'prog-four-pdf',
  webone: 'web-one-pdf'
}
const courseName = process.argv[2]
const coursePDF = courses[courseName]

glob(`./pdf/${coursePDF}/*.pdf`, {}, (err, files) => {
  files.map(f => {
    let split = f.split('/')
    let filePath = split[split.length - 1]
    console.log(`Uploading ${filePath} to Dropbox.`.green)
    dropbox(
      {
        resource: 'files/upload',
        parameters: {
          path: `/${filePath}`
        },
        readStream: createReadStream(`./pdf/${coursePDF}/${filePath}`)
      },
      _ => {
        console.log(`${filePath} uploaded to Dropbox.`.blue)
      }
    )
  })
})
