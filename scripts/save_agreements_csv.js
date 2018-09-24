const fs = require('fs');
const jsonexport = require('jsonexport');


const filename = 'agreementLog.json'

fs.readFile("../data/" + filename, function read (err, data){ 
  if (err) {
      throw err;
    }

  var jsonArray = JSON.parse(data);
  var agreementArray = [];
  var disagreeArray = [];
  var noResSubmittedArray = [];

 	for (x=0; x < jsonArray.length; x++) {
	  if (jsonArray[x]['contributor_agree'] == 'True') {	
	    	agreementArray.push(jsonArray[x]);
	  } else if (jsonArray[x]['contributor_agree'] == 'False') {
	  disagreeArray.push(jsonArray[x]);
	  } else if (jsonArray[x]['contributor_agree'] == ''){
	  	noResSubmittedArray.push(jsonArray[x]);
	  }
	}

	var output_file = filename.split('.');
  var output_file = output_file[0];

  jsonexport(jsonArray,function(err, csv){
    if(err) return console.log(err);
     
    fs.writeFile(output_file + '.csv', csv, function(err) { 
      if (err) {
        console.log(err);
      }
      console.log('file saved.');
    })
  }); 
	console.log("Number of agreements: " + agreementArray.length);
	console.log("Number of disagreements: " + disagreeArray.length);
	console.log("Number of responses lacking agreement / disagreement: " + noResSubmittedArray.length);
});


