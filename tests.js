const csvFiles = [
  'mobile-grades.csv',
  'oosd-grades.csv',
  'prog-four-grades.csv',
  'web-one-grades.csv'
]

const fileExists = (myCourseFile, myOtherFile) => {
  return myCourseFile.indexOf(myOtherFile) > -1 ? true : false
}

const myValue = val => {
  return val === ''
    ? 'CSV filename can not be empty. Please enter a CSV filename. For example, <filename>.csv'
    : !fileExists(csvFiles, val)
    ? 'CSV filename does not exist. Please enter a CSV filename. For example, <filename>.csv'
    : true
}

const csvObj = {
  type: 'input',
  name: 'csvFilename',
  message: 'Enter a CSV filename:',
  validate: myValue('prog-four-grades.csv')
}

console.log(csvObj)
