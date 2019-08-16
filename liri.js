//Modules required

require("dotenv").config();

var axios = require('axios');

var fs = require('fs');

var Spotify = require('node-spotify-api'); 

var keys = require("./keys.js");

let name = "";

var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});

//varibales declaration
var action = process.argv[2];

var userInput = process.argv[3];


//switch case according to user's input
switch(action) {
    case "spotify-this-song":
        spotifySong(userInput);
        break;
    case "movie-this":
        omdbMovie(userInput);
        break;
    case  "do-what-it-says":
        spotifyDo(userInput);

};

//
// function spotifySong(userInput) {

//     spotify.search ({ type: 'track', query: userInput},
//     function (err,data) {
//         if(err) {
//          return console.log('Error occurred: ' + err);
//   }
//  else 
// {
//     let songs = data.tracks.items;

//     console.log(songs);

//     for(let i = 0; i< songs.length; i++) {

//     console.log("Artist: " +data.tracks.items[0].artists[0].name);
//     console.log("\nSong: " +data.tracks.items[0].name );
//     console.log("\nAlbum: "+ data.tracks.items[0].album.name);
//     console.log("\nPreview: "+data.tracks.items[0].preview_url);

//     // console.log(spotifyResults);
//  }  
// } 
// }
// );
// } 


function omdbMovie(userInput){
    if(userInput == null){
        userInput = "mr nobody"
    }

    axios.get("http://www.omdbapi.com/?t="+userInput+ "&y=&plot=short&apikey=triology")
    .then (function (response){
        let movieResults = 

        console.log("Movie title : "+response.data.Title + 
        "\nYear of Release: "+response.data.Year+
        "\nIMDB Rating : "+response.data.imdbRating+
        "\nCountry Produced: "+response.data.Country+
        "\nLanguage: "+response.data.Plot+
        "\nActor/Actress: "+response.data.Actors);
    })
    .catch(function (err){
        console.log(err);
    });
}


