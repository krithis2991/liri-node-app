//Modules required

require("dotenv").config();

var axios = require('axios');
var fs = require('fs');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});

//varibales declaration
let action = process.argv[2];
let userInput = process.argv[3];


//switch case according to user's input
switch (action) {
    case "spotify-this-song":
        spotifySong(userInput);
        break;
    case "movie-this":
        omdbMovie(userInput);
        break;
    case "do-what-it-says":
        spotifyDo(userInput);
        break;
};


function spotifySong(userInput) {

    if (userInput == null ) {
        userInput = "The Sign";
    }

    spotify.search({ type: 'track', query: userInput })
        .then(function (response) {

            // for (let i = 0; i < 5; i++) 
            {

                let results = `Artist: ${response.tracks.items[0].artists[0].name}
                Song:  ${response.tracks.items[0].name}
                Album: ${response.tracks.items[0].album.name}
                Preview:  ${response.tracks.items[0].preview_url}`;

                console.log(results);
            }
        })
}


function omdbMovie(userInput) {
    if (userInput == null) {
        userInput = "mr.nobody"
    }

    axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {
            let movieResults =

                "Movie title : " + response.data.Title +
                "\nYear of Release: " + response.data.Year +
                "\nIMDB Rating : " + response.data.imdbRating +
                "\nCountry Produced: " + response.data.Country +
                "\nLanguage: " + response.data.Plot +
                "\nActor/Actress: " + response.data.Actors;

            console.log(movieResults);
        })
}

function spotifyDo(userInput) {

    fs.readFile("random.txt", "utf8", function (err, data) {

        let arr = data.split(",");
        spotifyDo(arr[0]);
    })
}
