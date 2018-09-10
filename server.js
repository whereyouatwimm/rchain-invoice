// server.js
// Application starts HERE on the servers side
// ...

// initialize dependencies
// Here are the Node.js dependencies 
var express = require('express'); // express is the middleware we use to handle HTTP requests / responses / routing.
var app = express(); // from here on use app.get etc to refer to stuff app does
var exphbs  = require('express-handlebars'); // html templating engine to serve dynamic data
var bodyParser = require('body-parser')

var async = require('async');
var crypto = require('crypto');

// import the modules we've created.
var invoices = require('./modules/invoice.js');

// initialize express-handlebars and set the default layout to main.
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// http://expressjs.com/en/starter/static-files.html
// serves all of the client files in public/*.*
app.use(express.static('public')); 


// Contributor agreement endpoints:
app.get ('/invoices/:invoice_id', function (request, response) {
  var invoice_id = request.params.invoice_id;

  // TODO: look up invoice_id in invoice_summary, return data in a json object as response_variables
    invoices.returnWorksheetJson('1DOwdYxhKIvJuYgQe4xv6-7gZ35bjyNZoQ5uHviFYoaA', 'invoices_summary', function (err, jsonArray){
    if (err) { 
      console.error('an error occured while pulling the contributor data');
      return;
    }
    // response.setHeader('Content-Type', 'application/json');
    for (x=0; x < jsonArray[0].length; x++) {
      if (jsonArray[0][x]['invoice_id'] == invoice_id) {
        console.log(jsonArray[0][x]);
        //console.log(jsonArray[0])
        
        var response_variables = jsonArray[0][x];
        break
      } 

    }
    if ( response_variables == undefined) {

      console.log('Invoice ID: ', invoice_id, ' was not found.');
      // Decide what to render here. probably a 404 page.

    }

    response.render('contributor-signs', response_variables);
  });
});


// this renders the agreement page.
app.get ('/invoices/:invoice_id/agree', function (request, response) {
  console.log('user agrees ', request.params.invoice_id);
  // record agreement and send out confirmation email here.

  response.render('contributor-agrees');
});

// this receives data from the agree button.
app.post ('/invoices/:invoice_id/agree', function (request, response) {
  console.log('user agrees: ', request.params.invoice_id);
  console.log(request.body);
  
  // TODO: 
  // - fix the body parsing issue in this endpoint.
  // - double check submitted eth address / invoice amount. 
  //       var submitted_invoice_eth_addr = request.body.eth_addr;
  //       var submitted_invoice_amount = request.body.invoice_amount;
  // record agreement and send out confirmation email here.

  
  response.render('contributor-agrees');
});


app.get ('/invoices/:invoice_id/disagree', jsonParser, function (request, response) {
  console.log('user disagrees ', request.params.invoice_id);
  console.log(request.body);
  // record disagreement here if necessary.
    
  response.render('contributor-disagrees');
});       



// listen for requests :)
var listener = app.listen(3000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});