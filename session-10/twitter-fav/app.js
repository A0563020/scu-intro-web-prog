var Twitter = require('twitter');
var config = require('./config.js');
var T = new Twitter(config);

// This will allow us to enter a search term when running the program 
// from the command line. Note: to search a phrase, include " " for spaces
// if nothing entered, program will exit will failure code 25
// also note, annoying, hash and special characters must be entered with " "
// TODO: make mode based workaround for arg2 and arg3 be search terms

const q_search = process.argv.splice(2);
const q_string = q_search.join(' ');
console.log(q_string);

// Set up your search parameters
var params = {
  q: q_string,
  count: 10,
  result_type: 'recent',
  lang: 'en'
}

// Initiate your search using the above paramaters
T.get('search/tweets', params, function(err, data, response) {
  // If there is no error, proceed
  if(!err){
    // Loop through the returned tweets
    for(let i = 0; i < data.statuses.length; i++){
      // Get the tweet Id from the returned data
      let id = { id: data.statuses[i].id_str }
      // Try to Favorite the selected Tweet
      T.post('favorites/create', id, function(err, response){
        // If the favorite fails, log the error message
        if(err){
          console.log(err[0].message);
        }
        // If the favorite is successful, log the url of the tweet
        else{
          let username = response.user.screen_name;
          let tweetId = response.id_str;
          console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`)
        }
      });
    }
  } else {
    console.log(err);
  }
})