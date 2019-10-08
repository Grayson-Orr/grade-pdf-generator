/**
 * @version 0.5.0
 * @author [Grayson Orr](https://github.com/grayson-orr)
 */

const dropboxV2Api = require('dropbox-v2-api')
const glob = require('glob')
const { createReadStream } = require('fs')
require('colors')
const { dropboxAccessToken } = require('./config.json')
const dropbox = dropboxV2Api.authenticate({
  token: dropboxAccessToken
})

glob('./pdf/prog-four-pdf/*.pdf', {}, (err, files) => {
  files.map(f => {
    let split = f.split('/')
    let filePath = `${split[split.length - 1]}`
    console.log(`Uploading ${filePath} to Dropbox.`.green)
    dropbox(
      {
        resource: 'files/upload',
        parameters: {
          path: `/${filePath}`
        },
        readStream: createReadStream(`./pdf/prog-four-pdf/${filePath}`)
      },
      _ => {
        console.log(`${filePath} uploaded to Dropbox.`.blue)
      }
    )
  })
})
