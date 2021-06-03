# CellarClub

CellarClub is a complete and fully functional wine cellar manager web application where users, specially those interested in wines and spirits, as collectors, connoisseurs, clubs, restaurants or anyone intending to manage a bottle inventory, are able to easily create and mantain a collection from a more than 100.000 items native database, taking advantage of each item's provided metadata, also keeping track of purchase information and more importantly the actual item location in the cellar. Additionally users are  also able to create and keep memories from consumed items as well as write tasting reviews and publish them to the CellarClub community.


## Instalation requirements and Usage

In order to run CellarClub in local server is required that users have Python 3.8 and Django 3.1 or superior installed on their enviroments. For a list of additional required dependencies to install please see [requirements.txt](requirements.txt). 

A file named **.env** located in the [cellarclub](/cellarclub) root folder containing the application enviroment variables SECRET_KEY and GWS_API_KEY is also required to run the application. A GWS_API_KEY can be obtained for free at [globalwinescore.com/api](https://www.globalwinescore.com/api/).

* **Note regarding CS50 WEB Capstone Project submission**: For simplicity and imediate availability, the required **.env** file, containing the enviroment variables, is provided within the project.

Finally, open a terminal window, cd into project's [root folder](/) and enter the following command:

    $ python3 manage.py runserver



## Distinctiveness and Complexity

CellarClub was conceived to combine a bottle collection manager and a cellar/cooler in order to offer the ability to keep track of the physical location of items, helping users to find them easily when they need. Among other features, it also offers users the ability to write tasting reviews for own future reference and to publicise them to the CellarClub community where other users can also acess, reference and compare to their own reviews. 

The project was structured in a way to completely detach rendering responsibitities from back-end. Leaving to the [frontend](/frontend) the roles of handling all views/pages routing and rendering and performing api requests to fetch on-demand data. In this schema, besides serving the application and the database, the [backend](/api) is also responsible to provide all api routes consumed by the front-end, including external api calls.

The application utilizes Django on the [backend](/api) including 7 models and 35 api routes that handle authentication, database search engine, external service api calls, users and collections related data management, database imports and data to be rendered requests. Also on the back-end, a SQLite3 database is used in order to keep things simple and lighweight.

On the [frontend](/frontend) CellarClub utilizes JavaScript's library React.js in conjunction with Node.js routing features to improve application's page routing and rendering response times, among 12 different available pages/views and 18 complementary components that are used to compose them. In addition to that, seeking the best UI experience and having layout, styling and mobile-responsiveness performances in mind, Material-UI framework is also extensively used throughout the application.


## Main Features

- Fully responsive UI including mobile devices
- Robust search engine offering access to information on more than 100.000 items and shared with different contexts by multiple views
- Easy to use and straightfoward interface enables users to manage and mantain their collection having prompt access to all information available.
- Lightmode / Darkmode theme toggler. 


## Tech Stack and Acknowledgements

Application was implemented using the following technologies: 
- Backend
    - Python 3.8.5
    - Django 3.1.5 utilizing SQlite3 database engine
- Frontend
    - React.js
    - Node.js
    - Material-UI utililizing MUI and FontAwesome Icons
- Acknoledgements
    - [Liv-Ex LWIN](http://www.liv-ex.com/wwd/lwin) open-source database for wines and spirits
    - [Globalwinescore](https://globalwinescore.docs.apiary.io/) beverage scores api provider 

#
Created by Luis Felipe Klaus for CS50 Web Programming with Python and JavaScript Final Project
#
