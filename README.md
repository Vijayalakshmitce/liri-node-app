# liri-node-app

overview:
In this project, you will make LIRI. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

1. LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

2. To retrieve the data that will power this app, you'll need to send requests using the `axios` package to the Bands in Town, Spotify and OMDB APIs. You'll find these Node packages crucial for your assignment.

   * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

   * [Axios](https://www.npmjs.com/package/axios)

     * You'll use Axios to grab data from the [OMDB API](http://www.omdbapi.com) and the [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

   * [Moment](https://www.npmjs.com/package/moment)

   * [DotEnv](https://www.npmjs.com/package/dotenv)
   
   
   For details here is the video:
   
   * [liri app video](https://drive.google.com/file/d/1Mb0cBhlMLNYkiy_j4vozcBYTup86llwC/view?usp=sharing)



Screenshot1:Show the list of choice user to chooose..list is accuquired by in inquirer API.

![first](https://user-images.githubusercontent.com/49068436/60191985-34393900-9803-11e9-8d11-c1e6397e24dc.JPG)

Screenshot 2: User select Concert-this ,here we take the concert details of band from bandtown api and axios to get data from bandin Town API
![consert1](https://user-images.githubusercontent.com/49068436/60191764-dc9acd80-9802-11e9-9e59-03f859675609.JPG)
Screenshot 3: user choose move-this,Here we used axios to get data from omdb api
![moviethis](https://user-images.githubusercontent.com/49068436/60192099-59c64280-9803-11e9-9688-6d3f1945e3fa.JPG)
Screenshot 4: user choose move-this when user didnt give any movie and press enter,Axios api get data from omdb api with default movie .

![moviedefault](https://user-images.githubusercontent.com/49068436/60192206-7f534c00-9803-11e9-8b02-f22eec6a728a.JPG)

Screenshot 5:user choose do-what-it-Say,we read the files ,if spotify-this,concert,movie-this with required movie name /song name /band name inside radom.txt ,it perform as per asked given above user choice.
![do1](https://user-images.githubusercontent.com/49068436/60192344-b164ae00-9803-11e9-9de1-4a4ef0a145f9.JPG)










