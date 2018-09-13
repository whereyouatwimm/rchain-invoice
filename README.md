
# Rchain Invoice Agreement application

This application records agreements to monthly Rchain contributor invoices. One main goal has been to create a simple system, that stores only hashed data on the application server necessary to record contributor agreements locally, with a push to Google sheets when finance is ready to process invoices.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.


### Deployment notes


```
git clone https://github.com/whereyouatwimm/rchain-invoice
cd rchain-invoice
npm install
node server.js
```

Currently, this application relies upon a [Google OAuth2 service account](https://developers.google.com/identity/protocols/OAuth2ServiceAccount) to pull the hashed data neccessary to log contributor agreements from Google Sheets. You will not be able to use this to pull data from those spreadsheets however, as the generated google credentials have been added to gitignore and are not provided. 

We're looking towards and discussing the pros and cons of using Google OAuth associated with a contributors personal account in the future. 


## Built With

* [Nodejs](https://nodejs.org/) - The framework used to build the server side logic
* [Express](https://expressjs.com/) - The web framework used to handle API routing logic
* [Handlebars](https://github.com/ericf/express-handlebars) - HTML templating engine used by express
* [Google Sheets](https://rometools.github.io/rome/) - Data store to push / pull contributor agreements to

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to this project.


## Authors

* **wimm.** - *Initial work* - [wimm.](https://github.com/whereyouatwimm)


## License

The license for this project is open to discussion within the coop. 

