require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var command = process.argv[2];
var input = process.argv.slice(3).join(" ");

function spotSearch(song) {
    spotify.search({ type: "track", query: song, limit: 1 }, function (err, data) {
        if (err) return console.log("Error occurred: " + err);

        console.log("Song: " + JSON.stringify(data.tracks.items[0].name, null, 2));
        console.log("Artist: " + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2));
        console.log("Preview link: " + JSON.stringify(data.tracks.items[0].preview_url, null, 2));
        console.log("Album: " + JSON.stringify(data.tracks.items[0].album.name, null, 2));
    });
}

function concertSearch(concert) {
    return console.log("concert");
}

function movieSearch(movie) {
    // var queryUrl = "";
    if (movie) {
        var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    }else{
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
    return console.log("Simon does not command me");
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



// Song info: {
//     "tracks": {
//         "href": "https://api.spotify.com/v1/search?query=toxicity&type=track&offset=0&limit=1",
//             "items": [
//                 {
//                     "album": {
//                         "album_type": "album",
//                         "artists": [
//                             {
//                                 "external_urls": {
//                                     "spotify": "https://open.spotify.com/artist/5eAWCfyUhZtHHtBdNk56l1"
//                                 },
//                                 "href": "https://api.spotify.com/v1/artists/5eAWCfyUhZtHHtBdNk56l1",
//                                 "id": "5eAWCfyUhZtHHtBdNk56l1",
//                                 "name": "System Of A Down",
//                                 "type": "artist",
//                                 "uri": "spotify:artist:5eAWCfyUhZtHHtBdNk56l1"
//                             }
//                         ],
//                         "available_markets": [
//                             "AD",
//                             "AE",
//                             "AR",
//                             "AT",
//                         ],
//                         "external_urls": {
//                             "spotify": "https://open.spotify.com/album/6jWde94ln40epKIQCd8XUh"
//                         },
//                         "href": "https://api.spotify.com/v1/albums/6jWde94ln40epKIQCd8XUh",
//                         "id": "6jWde94ln40epKIQCd8XUh",
//                         "images": [
//                             {
//                                 "height": 640,
//                                 "url": "https://i.scdn.co/image/3b74b1b2557ec74868bea0dd5c99ed081d32b6f4",
//                                 "width": 640
//                             },
//                             {
//                                 "height": 300,
//                                 "url": "https://i.scdn.co/image/2be5b43048eefe03995804863f02f40654469039",
//                                 "width": 300
//                             },
//                             {
//                                 "height": 64,
//                                 "url": "https://i.scdn.co/image/de83304fcae7f914c114713fb1297bc6f5b1e902",
//                                 "width": 64
//                             }
//                         ],
//                         "name": "Toxicity",
//                         "release_date": "2001",
//                         "release_date_precision": "year",
//                         "total_tracks": 15,
//                         "type": "album",
//                         "uri": "spotify:album:6jWde94ln40epKIQCd8XUh"
//                     },
//                     "artists": [
//                         {
//                             "external_urls": {
//                                 "spotify": "https://open.spotify.com/artist/5eAWCfyUhZtHHtBdNk56l1"
//                             },
//                             "href": "https://api.spotify.com/v1/artists/5eAWCfyUhZtHHtBdNk56l1",
//                             "id": "5eAWCfyUhZtHHtBdNk56l1",
//                             "name": "System Of A Down",
//                             "type": "artist",
//                             "uri": "spotify:artist:5eAWCfyUhZtHHtBdNk56l1"
//                         }
//                     ],
//                     "available_markets": [
//                         "AD",
//                         "AE",
//                         "ZA"
//                     ],
//                     "disc_number": 1,
//                     "duration_ms": 218933,
//                     "explicit": false,
//                     "external_ids": {
//                         "isrc": "USSM10107262"
//                     },
//                     "external_urls": {
//                         "spotify": "https://open.spotify.com/track/0snQkGI5qnAmohLE7jTsTn"
//                     },
//                     "href": "https://api.spotify.com/v1/tracks/0snQkGI5qnAmohLE7jTsTn",
//                     "id": "0snQkGI5qnAmohLE7jTsTn",
//                     "is_local": false,
//                     "name": "Toxicity",
//                     "popularity": 77,
//                     "preview_url": "https://p.scdn.co/mp3-preview/89e93c71655e81579d011e4521f7b6e9db173834?cid=a7b678d19c15495daf5a6ba5564cad7f",
//                     "track_number": 12,
//                     "type": "track",
//                     "uri": "spotify:track:0snQkGI5qnAmohLE7jTsTn"
//                 }
//             ],
//                 "limit": 1,
//                     "next": "https://api.spotify.com/v1/search?query=toxicity&type=track&offset=1&limit=1",
//                         "offset": 0,
//                             "previous": null,
//                                 "total": 312
//     }
// }