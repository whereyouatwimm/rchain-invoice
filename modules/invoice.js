// New Dependencies: 

// dependency for writing to google sheets
// - Documentation & code: https://github.com/theoephraim/node-google-spreadsheet
var gSheets_write = require('google-spreadsheet');

var crypto = require('crypto');

// dependency for reading from a google sheet to json
// - Documentation & code: https://github.com/bassarisse/google-spreadsheet-to-json/
var gsheetJson = require('google-spreadsheet-to-json');

// Service account credentials used by both dependencies above
var google_creds = require('./google_generated_creds.json')




module.exports= {
  returnWorksheetJson: function(spreadsheet, worksheet, callback) {
    
    gsheetJson({
    spreadsheetId: spreadsheet,
    credentials: google_creds,
    worksheet: [worksheet]
    // other options...
    })
    .then(function(result) {
        // console.log(result[0].length);
        // console.log(result);

        // return the result to our call back function.
        callback(null, result);
    })
    .catch(function(err) {
        console.log(err.message);
        console.log(err.stack);
    });
  },

  writeContribAgree: function(invoice_id, spreadsheet, worksheet, callback) {
    console.log('writeContribAgree called.');
  },

  writeContribDisagree: function(invoice_id, spreadsheet, worksheet, callback) {
    console.log('writeContribDisagree called.');
  }
}

