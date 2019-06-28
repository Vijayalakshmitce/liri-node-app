//declare dotenv,spotify,moment,axios,inquirer
require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./key.js");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
const axios = require("axios");
const moment = require("moment");
var inquirer = require("inquirer");

//acces for mapquest
var options = {
  provider: "mapquest",
  apiKey: "aRZpjA7bW9es85HovqCas3lah5YoIVnK"
};

//prompt question to user from inquirer
inquirer.prompt([

  {
    type: "list",
    name: "userInput",
    message: "Which option you need to looking for?",
    choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"]
  }

]).then(function (result) {
  //concert if starts
  if (result.userInput === "concert-this") {

    //prompt to ask band name
    inquirer.prompt([{
      type: "input",
      name: "userbandName",
      message: "write your favorite band name?"

    }]).then(function (nextQuestion) {
      console.log(nextQuestion.userbandName);
      var bandName = nextQuestion.userbandName;

      //getting data from bandintown api through axios
      axios.get("https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp").then(
        function (response) {
          //declare the data from response
          for (var i = 0; i < response.data.length; i++) {
            console.log("*******************************************");
            console.log("Band Name: " + bandName);
            console.log("Band Venu Name: " + JSON.stringify(response.data[i].venue.name));
            console.log("Band Venu Date Time: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
            console.log("Band Venu Location: " + JSON.stringify(response.data[i].venue.city) + "," + JSON.stringify(response.data[i].venue.region) + "," + JSON.stringify(response.data[i].venue.country));
            console.log("*******************************************");
            console.log("*******************************************");
            console.log("*******************************************");
          }
        })
    })
  }
  //concert if end

  //if user choose spotify if starts
  else if (result.userInput === "spotify-this-song") {
    inquirer.prompt([{
      type: "input",
      name: "usersongName",
      message: "write your favorite song name?"

    }]).then(function (nextQuestion) {
      console.log(nextQuestion.usersongName);

      var songName = nextQuestion.usersongName;
      //if user choose spotify and not given any input
      if (nextQuestion.usersongName === "") {
        songName = "The Sign by Ace of Base"
      }
      //spotify search the song 
      spotify.search({
        type: 'track',
        query: songName
      }, function (err, response) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        //declare the data from response
        for (var i = 0; i < response.tracks.items.length; i++) {
          var artistsName = response.tracks.items[i].artists[0].name;
          var albumName = response.tracks.items[i].name;
          var albumSong = response.tracks.items[i].album.album_type;
          var previewLink = response.tracks.items[i].preview_url;

          console.log("*************************************************");
          console.log("Artists Name:" + artistsName);
          console.log("Album Name:" + albumName);
          console.log("The Album song is from : " + albumSong);
          console.log("Preview link: " + previewLink);
          console.log("******************************************************");
        }
      })
    })
  }
  ///spotify if ends here..
  /// if user choose Movie this start here...
  else if (result.userInput === "movie-this") {
    inquirer.prompt([{
      type: "input",
      name: "userMovieName",
      message: "write your favorite movie name?"

    }]).then(function (nextQuestion) {



      var MovieName = nextQuestion.userMovieName;
      // defaulat search movie if user didnt give movie name
      if (nextQuestion.userMovieName === "") {
        MovieName = "Mr. Nobody";
      }

      axios.get("http://www.omdbapi.com/?t=" + MovieName + "&y=&r=&plot=short&apikey=7cb1822e").then(
        function (responseMovie) {

          //         ```
          //    * Title of the movie.
          //    * Year the movie came out.
          //    * IMDB Rating of the movie.
          //    * Rotten Tomatoes Rating of the movie.
          //    * Country where the movie was produced.
          //    * Language of the movie.
          //    * Plot of the movie.
          //    * Actors in the movie.
          var movieTitle = responseMovie.data.Title;
          var movieReleaseYear = responseMovie.data.Released;
          var movieRating = responseMovie.data.imdbRating;
          var rottenRating = responseMovie.data.Ratings[1].Value;
          var countryMovieProduced = responseMovie.data.Country;
          var movieLanguage = responseMovie.data.Language;
          var moviePlot = responseMovie.data.Plot;
          var movieActors = responseMovie.data.Actors;
          console.log("*************************************************");
          console.log("Movie Title: " + movieTitle);
          console.log("Movie Released Year (DD M YYYY): " + movieReleaseYear);
          console.log("Movie IMDB Rating: " + movieRating);
          console.log("Movie RottenTomato Rating (%): " + rottenRating);
          console.log("Country where movie produced: " + countryMovieProduced);
          console.log("Movie Language: " + movieLanguage);
          console.log("Movie Summary: " + moviePlot);
          console.log("Cast crew: " + movieActors);
          console.log("*************************************************")

          if (movieTitle === "Mr. Nobody") {
            console.log("If you haven't watched 'Mr. Nobody,' then you should: <http://www.imdb.com/title/tt0485947/>");
            console.log("It's on Netflix!");
          }
        })


    }).catch(function (err) {
      console.log("No records found");
    })
  }
  //movie this end here
  //do-what-it-says if starts
  else if (result.userInput === "do-what-it-says") {
    console.log("this read file and execute");
    //read the random.txt file through fs package
    fs.readFile("random.txt", "utf8", function (error, data) {

      // If the code experiences any errors it will log the error to the console.
      if (error) {
        return console.log(error);
      }

      // Then split it by commas (to make it more readable)
      var dataArr = data.split(",");

      // spotify if statement start here
      if (dataArr[0] === "spotify-this-song") {

        spotify.search({
          type: 'track',
          query: dataArr[1]
        }, function (err, response) {
          if (err) {
            return console.log('Error occurred: ' + err);
          }
          for (var i = 0; i < response.tracks.items.length; i++) {
            var artistsName = response.tracks.items[i].artists[0].name;
            var albumName = response.tracks.items[i].name;
            var albumSong = response.tracks.items[i].album.album_type;
            var previewLink = response.tracks.items[i].preview_url;
            console.log("*************************************************");
            console.log("Artists Name:" + artistsName);
            console.log("Album Name:" + albumName);
            console.log("The Album song is from : " + albumSong);
            console.log("Preview link: " + previewLink);
            console.log("******************************************************");
          }
        })
      }
      //spotify if statement ends here
      //movie-this else if statement start here
      else if (dataArr[0] === "movie-this") {
        axios.get("http://www.omdbapi.com/?t=" + dataArr[1] + "&y=&r=&plot=short&apikey=7cb1822e").then(
          function (responseMovie) {
            var movieTitle = responseMovie.data.Title;
            var movieReleaseYear = responseMovie.data.Released;
            var movieRating = responseMovie.data.imdbRating;
            var rottenRating = responseMovie.data.Ratings[1].Value;
            var countryMovieProduced = responseMovie.data.Country;
            var movieLanguage = responseMovie.data.Language;
            var moviePlot = responseMovie.data.Plot;
            var movieActors = responseMovie.data.Actors;
            console.log("*************************************************");
            console.log("Movie Title: " + movieTitle);
            console.log("Movie Released Year (DD M YYYY): " + movieReleaseYear);
            console.log("Movie IMDB Rating: " + movieRating);
            console.log("Movie RottenTomato Rating (%): " + rottenRating);
            console.log("Country where movie produced: " + countryMovieProduced);
            console.log("Movie Language: " + movieLanguage);
            console.log("Movie Summary: " + moviePlot);
            console.log("Cast crew: " + movieActors);
            console.log("*************************************************")

            if (movieTitle === "Mr. Nobody") {
              console.log("If you haven't watched 'Mr. Nobody,' then you should: <http://www.imdb.com/title/tt0485947/>");
              console.log("It's on Netflix!");
            }
          })
      }
      ///else if movie-this statement ends here
      //concert-this else if statement start here
      else if (dataArr[0] === "concert-this") {

        bandName = dataArr[1].replace(/"/g, '');
        axios.get("https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp").then(
          function (response) {
            for (var i = 0; i < response.data.length; i++) {
              console.log("*******************************************");
              console.log("Band Name: " + bandName);
              var name = response.data[i].venue.name;
              var dateTime = moment(response.data[i].datetime).format("MM/DD/YYYY");
              console.log("Band Venu Name: " + name);
              console.log("Band Venu Date Time: " + dateTime);
              console.log("Band Venu Location: " + JSON.stringify(response.data[i].venue.city) + "," + JSON.stringify(response.data[i].venue.region) + "," + JSON.stringify(response.data[i].venue.country));
              console.log("*******************************************");
              console.log("*******************************************");
              console.log("*******************************************");
            }
          })
      }
      ////concert-this else if statement end here



    });



  }
  ///do-what-it-says if end
})