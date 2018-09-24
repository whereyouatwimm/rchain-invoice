const fs = require('fs');
const csv = require('csvtojson');

// Usage: node initiate_agreements_file.js <filename of csv>

const csvFile = process.argv[2];

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

