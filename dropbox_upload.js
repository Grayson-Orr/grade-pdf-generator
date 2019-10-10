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
const courseName = process.argv[2]

let pdfDir

switch (courseName) {
  case 'mobile':
    pdfDir = ''
    break
  case 'oosd':
    pdfDir = ''
    break
  case 'prog-four':
    pdfDir = 'prog-four-pdf'
    break
  case 'web-one':
    pdfDir = 'web-one-pdf'
    break
  default:
    break
}

glob(`./pdf/${pdfDir}/*.pdf`, {}, (err, files) => {
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
        readStream: createReadStream(`./pdf/${pdfDir}/${filePath}`)
      },
      _ => {
        console.log(`${filePath} uploaded to Dropbox.`.blue)
      }
    )
  })
})
