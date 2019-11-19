# Grade PDF Generator

[![Build Status](https://travis-ci.org/Grayson-Orr/grade-pdf-generator.svg?branch=master)](https://travis-ci.org/Grayson-Orr/grade-pdf-generator) [![Coverage Status](https://coveralls.io/repos/github/Grayson-Orr/grade-pdf-generator/badge.svg?branch=master)](https://coveralls.io/github/Grayson-Orr/grade-pdf-generator?branch=master) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Mergify Status](https://img.shields.io/endpoint.svg?url=https://gh.mergify.io/badges/Grayson-Orr/grade-pdf-generator&style=flat)](https://mergify.io)


## Dropbox Access Token
### Step 1. Create an app in your Dropbox account
1. Go to https://www.dropbox.com/developers/apps/create
2. Sign in with Google or email and password. If you don't have an account, create a new one.
3. Choose the **Dropbox API**.
4. Choose the **Full Dropbox**. It allows access to all files and folder sin a user's Dropbox.
5. Give your app a name. That name will become a folder in your Dropbox account.
6. Click the **Create app** button.

### Step 2. Generate an access token
1. Scroll down to **OAuth 2** and click the **Generate** button near the **Generated access token** text.
2. After the token is generated, you will see a setring of letters and numbers. This is your access token.

## Config
### Step 1. Create a config.json
1. Create a **config.json** in the root directory of the project.
2. In **config.json**, create an object that holds the key/value for **email**, **password** and **dropbox-access-token**. Refer to the example below.

```json
{
  "email": "grayson.orr@op.ac.nz",
  "password": "P@ssw0rd123",
  "dropbox-access-token": "fkeqazcnlytdghf2hgfjh41hfghjhg"
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
