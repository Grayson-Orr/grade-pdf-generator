# Grade PDF Generator

[![Build Status](https://travis-ci.org/Grayson-Orr/grade-pdf-generator.svg?branch=master)](https://travis-ci.org/Grayson-Orr/grade-pdf-generator) [![Coverage Status](https://coveralls.io/repos/github/Grayson-Orr/grade-pdf-generator/badge.svg?branch=master)](https://coveralls.io/github/Grayson-Orr/grade-pdf-generator?branch=master) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Mergify Status](https://img.shields.io/endpoint.svg?url=https://gh.mergify.io/badges/Grayson-Orr/grade-pdf-generator&style=flat)](https://mergify.io)


## Dropbox Access Token

## Config

```json
{
  "email": "",
  "password": "",
  "dropbox-access-token": ""
}
```

## Scripts

### PDF

#### Interactive Mode

```javascript
npm run start
```

![](./public/img/interactive-mode.gif)

#### Generate PDF Files

```javascript
node generate.js <filename>.csv
```

#### Merge PDF Files

```javascript
node merge.js <filename>.json
```

#### Send PDF Files

```javascript
node send.js <filename>.json
```

#### Test

```javascript
npm run test
```

### Dropbox

#### Upload PDF Files

```javascript
node dropbox_upload.js <course name>
```
