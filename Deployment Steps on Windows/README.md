1)Clone the git repo using command git clone https://github.com/Ashfi17/dispatch-app.git
2)Inside the client folder run command -- npm i to install the packages
3)Similarly inside the server folder run command -- npm i to install the packages
6)Setup environment variables for your to connect to the database
a)store Host name inside mySqlHost b)store user name inside mySqlUser 3)store password inside mySqlPassword 4)store database name inside mySqlDatabase 5)store jwt secret key inside jwtPrivateKey
4)To start the web app go inside the client folder and run command npm start
5)after configuting the environment variables the server should connect to the database,To start the server , run command -- npm start inside the server folder


/////////**********////
1)The database script is inside server folder in db-init folder
2)The test cases for server apis is inside the server folder in routes in api folder inside __test__ folder
3)The test cases for component is inside the client folder in srd in components folder inside __test__ folder
