/**
 * @version 0.5.0
 * @author [Grayson Orr](https://github.com/grayson-orr)
 */

const { exec } = require('shelljs')
const cron = require('node-cron')

cron.schedule('* * * * *', () => {
  exec(`node generate.js prog-four-grades.csv`)
})
