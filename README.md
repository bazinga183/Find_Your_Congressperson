# Find_Your_Congressperson

## Purpose
I was encharged with giving clients who had access to this webpage the ability to find their members of Congress based on their physical address. This is so that members could know their members' name, party, office address, office phone number, and other sources of information that they require to know them better.

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
 - Replacing the superfish with jQuery. 
 - Changing ```address``` to be a variable ```myInput.value```, which is tied to an input box on the webpage.
 - Added ```&fields=cd,``` that pulls information on the members of Congress that represent the user's address
 - ```apiKey``` being an API supplied by Geocodio
 - Editing the information extracted from the API JSON response.

```
// This is the API call itself
        function geocodio() {
            
            //If the box is blank, then the user is prompted to add more
            if(myInput.value.length == 0) {
                alert("Please input a valid address")
            }
            //If the box isn't empty, execute the API call
            else {
                jQuery.get('https://api.geocod.io/v1.7/geocode?q='+ encodeURIComponent(myInput.value) +'&api_key=' + encodeURIComponent([API_KEY]) + '&fields=cd,', function(response) {  
                        console.log(response.results)
```

