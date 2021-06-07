# CellarClub

CellarClub is a complete and fully functional wine cellar manager web application where users, specially those interested in wines and spirits, as collectors, connoisseurs, enthusiasts, clubs, restaurants or anyone intending to manage a bottle inventory, are able to easily create and mantain a collection from a more than 100.000 items native database, taking advantage of each item's provided metadata, also keeping track of purchase information and more importantly the actual item location in the cellar. Additionally users are  also able to create and keep memories from consumed items as well as write tasting reviews and publish them to the CellarClub community.


## Installation requirements and Usage

In order to run CellarClub in local server is required that users have Python 3.8 and Django 3.1 or superior installed on their enviroments. For a list of additional required packages to install please see [requirements.txt](requirements.txt). 

A file named **.env** located in the [cellarclub](/cellarclub) root folder containing the application enviroment variables SECRET_KEY and GWS_API_KEY is also required to run the application. A GWS_API_KEY can be obtained for free at [globalwinescore.com/api](https://www.globalwinescore.com/api/).

* **Note regarding CS50 WEB Capstone Project submission**: For simplicity and imediate availability, the required **.env** file, containing the enviroment variables, is provided within the project.

Finally, open a terminal window, cd into project's [root folder](/) and enter the following command line:

    $ python3 manage.py runserver



## Distinctiveness and Complexity

CellarClub was conceived to combine a bottle collection and a cellar/cooler into a manager, offering the possibility to keep track of the physical location of items and helping users to find them easily when they actually need. Among other features, it also offers users the ability to write tasting reviews for own future reference and to publicise them to the CellarClub community where other users can also have access, use as reference and compare to their own reviews. 

The project was structured to completely detach rendering responsibitities from back-end. Leaving to the front-end the roles of handling all views/pages routing and rendering, and when necessary, performing fetch requests for on-demand data. In this schema, all routes consumed by these front-end requests are provided by the back-end [API](/api/views.py).

The application utilizes Django to serve and control the [backend](/api) which includes 7 models and 35 API routes that take care of authentication, database search engine, external service API calls, users and collections related data management, database imports and data to be rendered requests. In order to keep things simple and lighweight the app uses a SQLite3 database.

To handle the [frontend](/frontend) CellarClub utilizes JavaScript's library React.js in conjunction with Node.js routing features to improve application's page routing and rendering response times among it's 12 different available pages/views and 18 complementary components used to compose them. In addition to that, having layout, styling and mobile-responsiveness performances in mind, Material-UI framework is also extensively used throughout the application is seek if the best UI experience and responsiveness.


## Main Features

- Declarative, component-based User Interface
- Fully mobile-responsive
- Robust search engine offering access to information on more than 100.000 items and shared by multiple views in their different contexts.
- Easy to use and straightfoward interface, enables users to manage and mantain their collection effortless having prompt access to all information available.
- Built-in Lightmode/Darkmode color theme toggler. 


## Tech Stack and Acknowledgements

Application was implemented using the following technologies: 
- Backend
    - Python 3.8.5
    - Django 3.1.5 
    - SQlite3
- Frontend
    - React.js
    - Node.js
    - Material-UI + Material-UI Icons
    - FontAwesome Icons
- Acknoledgements
    - [Liv-Ex LWIN](http://www.liv-ex.com/wwd/lwin) open-source database for wines and spirits
    - [Globalwinescore](https://globalwinescore.docs.apiary.io/) beverage scores provider API

#
Created by Luis Felipe Klaus for CS50 Web Programming with Python and JavaScript Final Project
#
