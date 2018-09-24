var express = require('express'); // express is the middleware we use to handle HTTP requests / responses / routing.
var app = express(); 
var exphbs  = require('express-handlebars'); // html templating engine to serve dynamic data
var bodyParser = require('body-parser')
var fs = require('fs'); 

var async = require('async');
var crypto = require('crypto');


// initialize express-handlebars and set the default layout to main.
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// // create application/json parser
var jsonParser = bodyParser.json()
// // create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//app.use(bodyParser);
// http://expressjs.com/en/starter/static-files.html
// serves all of the client files in public/*.*
app.use(express.static('public')); 


// Contributor agreement endpoints:
app.get ('/:notify_url', function (request, response) {
  var notify_url = request.params.notify_url;

  fs.readFile('data/agreementLog.json', function read (err, data){ 
    if (err) {
        throw err;
      }
     
  var jsonArray = JSON.parse(data);

    //compare the provided notify_url here
  for (x=0; x < jsonArray.length; x++) {
    if (jsonArray[x]['notify_url'] == notify_url) {
      console.log(jsonArray[x]);
      var response_variables = jsonArray[x];
      break
    } 

  }
  if (response_variables == undefined) {
    console.log('Invoice ID: ', notify_url, ' was not found.');
    // Invoice ID not found, render error.

    response.render('contributor-followup', { error: 1 } );
    return
  }

  response.render('contributor-signs', response_variables);
  });
});



app.get ('/:notify_url/agree', function (request, response) {
  console.log('user agrees: ', request.params.notify_url);

  var notify_url = request.params.notify_url
  var content;
  var agree_time = Date()

  fs.readFile('data/agreementLog.json', function read(err, data) {
    if (err) {
        throw err;
      }
    content = JSON.parse(data);

    // Invoke the next step here however you like
    //console.log(content);   // Put all of the code here (not the best solution)
    processFile();          // Or put the next step in a function and invoke it
});

  function processFile() {
    for (var i=0; i < content.length; i++) {
      if (content[i]['notify_url'] == notify_url) {
        console.log(content[i]);
        content[i]['contributor_agree'] = 'True'
        content[i]['agree_time'] = agree_time
        console.log(content[i]);
        fs.writeFile("data/agreementLog.json", JSON.stringify(content), function(err) {
        if(err){ 
          console.log('an error occured saving contributor data: ', err)
            }
        //console.log('the file has been written.')
        })
      }
    }
  }

  response.render('contributor-followup', { agreed: 1, agree_time: agree_time });
});


app.get ('/:notify_url/disagree', function (request, response) {
  console.log('user disagrees ', request.params.notify_url);

  var notify_url = request.params.notify_url
  var content;
  var disagree_time = Date()

  fs.readFile('data/agreementLog.json', function read(err, data) {
    if (err) {
        throw err;
      }
    content = JSON.parse(data);

    // Invoke the next step here however you like
    //console.log(content);   // Put all of the code here (not the best solution)
    processFile();          // Or put the next step in a function and invoke it
});

  function processFile() {
    for (var i=0; i < content.length; i++) {
      if (content[i]['notify_url'] == notify_url) {

        console.log(content[i]);
        content[i]['contributor_agree'] = 'False'
        content[i]['agree_time'] = disagree_time;
        console.log(content[i]);
        fs.writeFile("data/agreementLog.json", JSON.stringify(content), function(err) {
        if(err){ 
          console.log('an error occured saving contributor data: ', err)
            }
        //console.log('the file has been written.')
        })
      }
    }
  }
  console.log(disagree_time)
  var disagreed = true;
  response.render('contributor-followup', { disagreed: 1, disagree_time: disagree_time });
});       


app.get ('/', function(request, response) {
  response.render('main-landing')
});
// listen for requests :)
var listener = app.listen(3000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
