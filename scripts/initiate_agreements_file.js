const fs = require('fs');
const csv = require('csvtojson');

// Usage: node initiate_agreements_file.js <filename of csv>


// NOTES:
// This script creates the json file that records agreements by users.
// It pulls from gsheets, and stores hashed user data in ../data/<pay_period>-contributor.json.


// TODO: 
// replace with csv to json


const csvFile = process.argv[2];

// read csv from file to json array


csv()
  .fromFile(csvFile)
  .then(function(jsonArray){ 
     console.log(jsonArray); 
    fs.writeFile("../data/agreementLog.json", JSON.stringify(jsonArray), function(err) {
      if(err){ 
        console.log('an error occured saving contributor data: ', err)
      }
      console.log('the file has been written.')
    })
})

