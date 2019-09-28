/**
 * @version 1.0
 * @author [Grayson Orr](https://github.com/grayson-orr)
 */

const path = require('path')
const {
  createDir,
  fileExists,
  createPDF,
  markCheckpoint,
  filterObj
} = require('../helper')

/**
 * Testing data
 */
const dirName = '/Users/graysonorr/Desktop/grade-pdf-generator'
const csvFiles = [
  'mobile-grades.csv',
  'oosd-grades.csv',
  'prog-four-grades.csv',
  'web-one-grades.csv'
]
const studentObj = {
  studentname: 'Orr Grayson',
  studentlogin: 'ORRGl1',
  studentemail: 'ORRGL1@student.op.ac.nz',
  checkpoint1: '1',
  checkpoint2: '0',
  checkpoint3: '1',
  checkpoint4: '0',
  checkpoint5: '1',
  checkpoint6: '1',
  checkpoint7: '1',
  checkpoint8: '0',
  checkpoint9: '1',
  checkpoint10: '1',
  total: '7'
}
const filteredArr = filterObj(studentObj, /^checkpoint([1-9]|10)$/i)

describe('createDir', () => {
  test('should return a csv directory path', async () => {
    const csvPath = await createDir(path.join(dirName, 'pdf'))
    expect(csvPath).toEqual(`${dirName}/pdf`)
  })
})

describe('fileExists', () => {
  test('should return a CSV file that exists', async () => {
    const csvDoesntExist = await fileExists(csvFiles, 'oosd-grades.csv')
    expect(csvDoesntExist).toEqual(true)
  })

  test("should return a CSV file that doesn't exists", async () => {
    const csvDoesntExist = await fileExists(csvFiles, 'mobile.csv')
    expect(csvDoesntExist).toEqual(false)
  })
})

describe('createPDF', () => {
  test('should return a PDF file path', async () => {
    const pdfPath = await createPDF(
      'pdf/prog-four-pdf',
      'results-grayson-orr.pdf'
    )
    expect(pdfPath).toEqual(
      `${dirName}/pdf/prog-four-pdf/results-grayson-orr.pdf`
    )
  })
})

describe('filterObj', () => {
  test('should return an array of checkpoint 1-10 values', () => {
    expect(filteredArr).toEqual([
      '1',
      '0',
      '1',
      '0',
      '1',
      '1',
      '1',
      '0',
      '1',
      '1'
    ])
  })
})

describe('markCheckpoint', () => {
  test('should return an array of complete/incomplete checkpoint 1-10 values', async () => {
    const checkpointArr = []
    const result = await markCheckpoint(filteredArr, checkpointArr)
    expect(result).toEqual(['Y', 'N', 'Y', 'N', 'Y', 'Y', 'Y', 'N', 'Y', 'Y'])
  })
})
