#Rchain Invoice Agreement application management.


##Starting the agreeement collection process:

To start the application, we need to create the file that agreements are stored to. You'll need to provide the hashed invoice data from google sheets in csv format, and pass it when calling the script. 

``node initiate_agreements_file.js <csv file containing the exported purple rows>``


## Pulling agreements off server:

To pull the agreements off the server, run the save_agreements_csv script. This will create a csv file. Download the csv file to your local machine, and import it into the google sheet.

``node save_agreements_csv.js``



## Pausing e-signing:

To pause the system, remove the agreementLog.json file in the data directory.  

While in the scripts directory:
``$ rm ../data/agreementLog.json``