# CellarClub

CellarClub is a complete and fully functional wine cellar manager web application where users, specially those interested in wines and spirits, as collectors, connoisseurs, fans, clubs, restaurants or anyone intending to manage a bottle inventory, are able to easily create and mantain a collection from a more than 100.000 items native database, taking advantage of each item's provided metadata, also keeping track of purchase information and more importantly the actual item location in the cellar. Additionally users are  also able to create and keep memories from consumed items as well as write tasting reviews and publish them to the CellarClub community.


## Instalation Requirements and Usage

To run CellarClub in local server server is required that users have Python 3.8 or superior and Django 3.1 or superior installed on their virtual enviroments. For a list of additional required dependencies to be installed please see [requirements.txt](requirements.txt) located at project's root folder. 

A .env file located in the main app root folder containing the application enviroment variables SECRET_KEY and GWS_API_KEY is also required to run the application. A GWS_API_KEY can be obtained for free at globalwinescore.com/api

* **Note regarding CS50 WEB Capstone Project submission**: For simplicity and imediate availability a .env file containing the required enviroment variables is provided within the project.





## Main Features

### Searchbar



### Keep track of bottle location

## Distinctiveness and Complexity

CellarClub was conceived to be a mix of a bottle-collection manager and a cellar manager with the ability to keep track of the physical location of items, helping users to find them easily when they need. Among other features, it also offers users the ability to write tasting reviews for own future reference and publicise them to the CellarClub community where other users can also read, reference and compare to their own reviews. 

The application utilizes Django on the back-end including 7 models and 35 api routes that handle authentication, provided database's search engine, general search engine, external service api calls, users and collections related data management, database imports and data to be rendered requests. Also on the back, it uses a SQLite3 database  order to keep it simple and lighweight.

On the front-end CellarClub utilizes JavaScript libary React in conjunction with some Node.js routing features to improve application page routing and rendering response time among it's 12 different available pages/views/routes and it's 18 complementary components. In addition to that, aiming best UI experience and having design, styling and mobile-responsiveness performances in mind, it also makes extense use of Material-UI framework.


## Tech Stack and Acknowledgement

## Current limitations and future features




