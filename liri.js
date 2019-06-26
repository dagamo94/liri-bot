require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var inquirer = require("inquirer");

var axios = require("axios");

var command = process.argv[2];
var input = process.argv.slice(3).join(" ");

function spotSearch(song) {
    if (!song) {
        song = "The Sign Ace of base";
    }

    spotify.search({ type: "track", query: song, limit: 1 }, function (err, data) {
        if (err) return console.log("Error occurred: " + err);

        console.log("Song: " + JSON.stringify(data.tracks.items[0].name, null, 2));
        console.log("Artist: " + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2));
        console.log("Preview link: " + JSON.stringify(data.tracks.items[0].preview_url, null, 2));
        console.log("Album: " + JSON.stringify(data.tracks.items[0].album.name, null, 2));
    });
}

function concertSearch(artist) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(
        function (response) {
            console.log("Venue: " + response.data[0].venue.name);
            console.log("Location: " + response.data[0].venue.city + ", " + response.data[0].venue.country);
            console.log("Date: " + response.data[0].datetime);
        })
        .catch(function (error) {
            if (error.response) {
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

function movieSearch(movie) {
    // var queryUrl = "";
    if (movie) {
        var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    } else {
        var queryUrl = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy";
    }

    axios.get(queryUrl).then(
        function (response) {
            console.log("Movie: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB rating: : " + response.data.imdbRating);
            console.log("Rotten Tomatoes rating: " + response.data.Ratings[1].Value);
            console.log("Produced in: " + response.data.Country);
            console.log("Release language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);

        })
        .catch(function (error) {
            if (error.response) {
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

function simonSays(instruction) {
    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }
        console.log(data);

        var action = data.split(",");

        switch (action[0]) {
            case "concert-this":
                concertSearch(action[1]);
                break;
            case "spotify-this-song":
                spotSearch(action[1]);
                break;
            case "movie-this":
                movieSearch(action[1]);
                break;
            case "do-what-it-says":
                simonSays(action[1]);
                break;
            default: return console.log("Please input a valid command");
        }

    });
}


switch (command) {
    case "concert-this":
        concertSearch(input);
        break;
    case "spotify-this-song":
        spotSearch(input);
        break;
    case "movie-this":
        movieSearch(input);
        break;
    case "do-what-it-says":
        simonSays(input);
        break;
    default: return console.log("Please input a valid command");
}




