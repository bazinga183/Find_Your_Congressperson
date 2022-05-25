# Find_Your_Congressperson

## Purpose
I was encharged with giving clients who had access to this webpage the ability to find their members of Congress based on their physical address. This is so that members could know their members' name, party, office address, office phone number, and other sources of information that they require to know them better.

## Coding Process
The code I used was implanted into a WordPress webpage where I utilized Elementor to write blocks of code that could be integrated into the website with ease. The language used was HTML where I also utilized CSS and JavaScript. The main script the page relies upon is [Geocodio API](https://www.geocod.io/) where I pulled information from the JSON response from the following client-side access script template:

```
<script>
var address = '1109 N Highland St, Arlington VA',
    apiKey = 'YOUR_API_KEY';

$.get('https://api.geocod.io/v1.7/geocode?q='+ encodeURIComponent(address) +'&api_key=' + encodeURIComponent(apiKey), function (response) {
  console.log(response.results);
});
</script>
```
This example for JavaScript can be found on their [website](https://www.geocod.io/docs/?javascript#client-side-access) under client-side access.

The changes I made to the above template for my own use include: 
 - Placed the API within a function called by user input.
 - Replacing the superfish with jQuery. 
 - Changing ```address``` to be a variable ```myInput.value```, which is tied to an input box on the webpage.
 - Added ```&fields=cd,``` that pulls information on the members of Congress that represent the user's address
 - ```apiKey``` being an API supplied by Geocodio
 - Editing the information extracted from the API JSON response.

```
// Function that call the API for Geocodio
        function geocodio() {
            
            //If the box is blank, then the user is prompted to add more
            if(myInput.value.length == 0) {
                alert("Please input a valid address")
            }
            //If the box isn't empty, execute the API call
            else {
                jQuery.get('https://api.geocod.io/v1.7/geocode?q='+ encodeURIComponent(myInput.value) +'&api_key=' + encodeURIComponent([API_KEY]) + '&fields=cd,', function(response) {  
                        console.log(response.results)}
        }                
```

The second script used comes from [Google Civic Information](https://developers.google.com/civic-information/).

The template for the Google Civic Information API provided for JavaScript is:

```
<script>
  /**
   * Sample JavaScript code for civicinfo.representatives.representativeInfoByAddress
   * See instructions for running APIs Explorer code samples locally:
   * https://developers.google.com/explorer-help/code-samples#javascript
   */

  function loadClient() {
    gapi.client.setApiKey("YOUR_API_KEY");
    return gapi.client.load("https://civicinfo.googleapis.com/$discovery/rest?version=v2")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  // Make sure the client is loaded before calling this method.
  function execute() {
    return gapi.client.civicinfo.representatives.representativeInfoByAddress({
      "address": "[Input Address Here]"
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }
  gapi.load("client");
</script>
```

Edits I have made to this code include: 
- Having ```function loadClient()``` activate upon the webpage loading and not upon a button click.
- Changing ```"[Input Address Here]"``` variable to be ```myInput.value```.
- Adding ```"levels"``` for ```country``` and ```administrativeArea1``` for pulling the information on personnel the Federal and State level. 
- Adding ```roles``` for ```legislatorUpperBody``` and ```legislatorLowerBody``` to specify that only Senators and House Representatives are pulled at the Federal and State level.
- ```"YOUR_API_KEY"``` was replaced by an API key supplied by Google.
- Placed ```document.getElementById("apiBody").style.display = "block"``` so that the table hosting the API results would not be hidden upon this function being called. 

```
function loadClient() {
        gapi.client.setApiKey("YOUR_API_KEY");
        return gapi.client.load("https://civicinfo.googleapis.com/$discovery/rest?version=v2")
            .then(function() { console.log("GAPI client loaded for API"); },
                  function(err) { console.error("Error loading GAPI client for API", err); });
    }
function execute() {
        document.getElementById("apiBody").style.display = "block"
        return gapi.client.civicinfo.representatives.representativeInfoByAddress({
          "address": myInput.value,
          "includeOffices": true,
          "levels": [
            "country",  
            "administrativeArea1"
          ],
          "roles": [
            "legislatorUpperBody",
            "legislatorLowerBody"
          ]
        })
            .then(function(response) {
            },function(err) { console.error("Execute error", err);
    });
};   
```
After both of the scripts were set up, I looked through the repsonse body to find which pieces of information I needed to extract and assigned them to variables that would be displayed within the table. The information displayed varies from source because one API could grab more accurate information than the other. 

An example is the address components that are both sources grab the client's inputted address, but Google's API is better at pinpointing the client's location even if a city or zipcode are left out of the input. Another example is that Google API offers photos of various representatives and senators, but I thought Geocodio offering the members' ```bioguide_id``` in conjunction with [theunitedstates.io's](https://github.com/unitedstates/images) library yielded much better photos.

In short, both sources offer great information, so I picked and choose whichever I believed gave better results.
