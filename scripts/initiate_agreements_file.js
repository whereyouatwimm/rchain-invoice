const fs = require('fs');
const csv = require('csvtojson');
const { exec } = require('child_process');

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
        // modify permissions here.
	console.log('the file has been written.')
	exec('chown invoice:invoice ../data/agreementLog.json', (err, stdout, stderr) => {
	if (err) {
		console.log('Error changing permissions ', err);
		return;
	}
	console.log('Successfully changed permissions on the agreementFile.');
});
    })
})


