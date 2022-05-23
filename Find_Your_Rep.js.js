<head>
    <script src="jQuery.js"></script>
    <script src="https://apis.google.com/js/api.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <style>
      .five.columns {
         display: none;
      }
     .fa {
       padding: 20px;
       font-size: 30px;
       width: 60px;
       text-align: center;
       text-decoration: none;
       margin: 5px 2px;
      }
      .fa:hover {
       opacity: 0.7;
      }
      .fa.fa-facebook {  
       background: #3B5998;  
       color: white;  
      }
      .fa.fa-twitter {   
        color: white;   
        background: #00acee;   
      }   
      .fa.fa-youtube {   
        color: white;   
        background: #c4302b;    
      }  
      .article {
        width: 150%
      }
      .apiBody {
        display: none;
      }
      .apiTable {
        overflow-x: auto;
      }
      .apiTable thead th {
        position: sticky;
        top: 0;
      }
      table {
        border-collapse: collapse;
        width: 100%;
      }
      .apiTable th, td {
        padding: 8px 16px;
        border: 1px solid #ccc;
      }
      .apiTable th {
        background: lightblue;
        font-weight: bold;
        text-align: center;
      }
      .photo-names td {
          text-align: center;
      }
      .centerImage {
          display: block;
          margin-left: auto;
          margin-right: auto;
          width: 50%;
      }
      .member-table tr td {
          border-right:none;
          border-left:none;
          border-bottom:none;
          border-top:none
      }
      .member-social-media a {
          margin-left:35px;
      }
    </style>
</head>
<body onload="loadClient()">
    <p>To find your members of Congress, type your address below. <br>For best results, include your street address,  city, state, and zip code!</p>
    <input type="text" id="myTxt" style="width: 400px;" placeholder="Type Your Address Here!">
    <input type="submit" id="myBtn" value="Search Now!">
    <script>
        // This sets up what is needed for the API
        var submit = document.getElementById("myBtn")
        var myInput = document.getElementById("myTxt")
        window.latGlobal;
        submit.addEventListener("click", () => {
           geocodio();
           execute();
        });
        
        // This is the API call itself
        function geocodio() {
            
            //If the box is blank, then the user is prompted to add more
            if(myInput.value.length == 0) {
                alert("Please input a valid address")
            }
            //If the box isn't empty, execute the API call
            else {
                jQuery.get('https://api.geocod.io/v1.7/geocode?q='+ encodeURIComponent(myInput.value) +'&api_key=' + encodeURIComponent([YOUR_API_KEY]) + '&fields=cd,', function(response) {  
                        console.log(response.results)
                        // This reveals the table holding the API data.    
                        document.getElementById("apiBody").style.display = "block";
                        
                        var lat = response.results[0].location.lat;
        
                        // Base paths to the representative and senators     
                        var apiCongPath0 = response.results[0].fields.congressional_districts[0].current_legislators[0];
                        var apiCongPath1 = response.results[0].fields.congressional_districts[0].current_legislators[1];
                        var apiCongPath2 = response.results[0].fields.congressional_districts[0].current_legislators[2];
                        
                        // Information for the House Representative
                        var repFirstName = apiCongPath0.bio.first_name;
                        var repLastName = apiCongPath0.bio.last_name;
                        var repParty = apiCongPath0.bio.party;
                        var repAddress = apiCongPath0.contact.address;
                        var repPhone = apiCongPath0.contact.phone;
                        var repUrl = apiCongPath0.contact.url;
                        var repBioGuide = apiCongPath0.references.bioguide_id
                        var repPhoto = "https://theunitedstates.io/images/congress/original/" + repBioGuide + ".jpg"
                        
                        // Information for the first Senator
                        var sen1FirstName = apiCongPath1.bio.first_name;
                        var sen1LastName = apiCongPath1.bio.last_name;
                        var sen1Party = apiCongPath1.bio.party;
                        var sen1Address = apiCongPath1.contact.address;
                        var sen1Phone = apiCongPath1.contact.phone;
                        var sen1Url = apiCongPath1.contact.url;
                        var sen1BioGuide = apiCongPath1.references.bioguide_id;
                        var sen1Photo = "https://theunitedstates.io/images/congress/450x550/" + sen1BioGuide + ".jpg"
                        
                        //Information for the second Senator
                        var sen2FirstName = apiCongPath2.bio.first_name;
                        var sen2LastName = apiCongPath2.bio.last_name;
                        var sen2Party = apiCongPath2.bio.party;
                        var sen2Address = apiCongPath2.contact.address;
                        var sen2Phone = apiCongPath2.contact.phone;
                        var sen2Url = apiCongPath2.contact.url;
                        var sen2BioGuide = apiCongPath2.references.bioguide_id;
                        var sen2Photo = "https://theunitedstates.io/images/congress/225x275/" + sen2BioGuide + ".jpg"
                        
                        // Congressional district information
                        var userAddress = response.results[0].formatted_address;
                        var state = response.results[0].address_components.state;
                        var cong_number = response.results[0].fields.congressional_districts[0].congress_number;
                        var district = response.results[0].fields.congressional_districts[0].district_number;
                        
                        // Congrssional district information.
                        document.getElementById("congressional-number").innerHTML = cong_number;
                        document.getElementById("congressional-district").innerHTML = state + district;
                        
                        try{
                            var repFacebook = apiCongPath0.social.facebook
                            var repTwitter = apiCongPath0.social.twitter
                            var repYouTube = apiCongPath0.social.youtube
                            document.getElementById("repHeadshot").src = repPhoto;
                            document.getElementById("repPhotoName").innerHTML = "Rep. " + repFirstName + " " + repLastName;
                            document.getElementById("repFB").href= "https://www.facebook.com/" + repFacebook;
                            document.getElementById("repTW").href= "https://www.twitter.com/" + repTwitter;
                            document.getElementById("repYT").href= "https://www.youtube.com/" + repYouTube;
                        }
                        catch(error) {
                            console.log("Rep Social Error")
                        }
                        try{
                            var sen1Facebook = apiCongPath1.social.facebook
                            var sen1Twitter = apiCongPath1.social.twitter
                            var sen1YouTube = apiCongPath1.social.youtube
                            document.getElementById("sen1Headshot").src = sen1Photo;
                            document.getElementById("sen1PhotoName").innerHTML = "Sen. " + sen1FirstName + " " + sen1LastName;
                            document.getElementById("senator1Facebook").href= "https://www.facebook.com/" + sen1Facebook;
                            document.getElementById("senator1Twitter").href= "https://www.twitter.com/" + sen1Twitter;
                            document.getElementById("senator1YouTube").href = "https://www.youtube.com/" + sen1YouTube;    
                        }
                        catch(error){
                            console.log("Sen1 Social Error")
                        }
                        try{
                            var sen2Facebook = apiCongPath2.social.facebook
                            var sen2Twitter = apiCongPath2.social.twitter
                            var sen2YouTube = apiCongPath2.social.youtube
                            document.getElementById("sen2Headshot").src = sen2Photo;
                            document.getElementById("sen2PhotoName").innerHTML = "Sen. " + sen2FirstName + " " + sen2LastName;
                            document.getElementById("senator2Facebook").href= "https://www.facebook.com/" + sen2Facebook;
                            document.getElementById("senator2Twitter").href= "https://www.twitter.com/" + sen2Twitter;
                            document.getElementById("senator2YouTube").href= "https://www.youtube.com/" + sen2YouTube;
                            }
                        catch(error){
                            console.log("Sen2 Social Error")
                        }
                    }    
                );
            };
        };
    </script>  
    <script>
      /**
       Code to run Google API
       */
        function loadClient() {
        gapi.client.setApiKey([YOUR_API_KEY]);
        return gapi.client.load("https://civicinfo.googleapis.com/$discovery/rest?version=v2")
            .then(function() { console.log("GAPI client loaded for API"); },
                  function(err) { console.error("Error loading GAPI client for API", err); });
      }
      // Make sure the client is loaded before calling this method.
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
                console.log(response.result)
                var addressPath = response.result.normalizedInput
                var userAddress = addressPath.line1 + ", " + addressPath.city + ", " + addressPath.state + " " + addressPath.zip
                document.getElementById("full-address").innerHTML = userAddress;
                // Senator 1's information
                try {
                    var sen1Path = response.result.officials[0] ||"No Info Available";
                    var sen1Name = "Sen. " + sen1Path.name;
                    var sen1Party = sen1Path.party.split(" ")[0];
                    var sen1PhoneNumber = sen1Path.phones[0];
                    var sen1AddressPath = response.result.officials[0].address[0];
                    var sen1line1 = sen1AddressPath.line1 || ""
                    var sen1line2 = sen1AddressPath.line2 || ""
                    var sen1FullAddress = sen1line1 + " " + sen1line2 + ", " + sen1AddressPath.city + " " + sen1AddressPath.state + ", " + sen1AddressPath.zip;
                    var sen1GovWebsite = sen1Path.urls[0];
                    //Table for the first Senator
                    document.getElementById("senFullName1").innerHTML = sen1Name;
                    document.getElementById("senParty1").innerHTML = sen1Party;
                    document.getElementById("senAddress1").innerHTML = sen1FullAddress;
                    document.getElementById("senPhoneNumber1").innerHTML = sen1PhoneNumber;
                    document.getElementById("senWebsite1").innerHTML = sen1GovWebsite;
                    document.getElementById("senatorWebsite1").href = sen1GovWebsite;
                }
                catch(error){
                    console.log("Sen1 Info Error")
                }
                finally {
                    if (sen1Path == "No Info Available") {
                        var sen1Path = response.result.officials[2] || "No Info Available";
                        var sen1Name = "";
                        var sen1Party = "";
                        var sen1PhoneNumber = "";
                        var sen1AddressPath = "";
                        var sen1line1 = "";
                        var sen1line2 = "";
                        var sen1FullAddress = "No Info Currently Available";
                        var sen1GovWebsite = "";
                        
                        //Table for the second Senator
                        document.getElementById("senFullName1").innerHTML = sen1Name
                        document.getElementById("senParty1").innerHTML = sen2Party;
                        document.getElementById("senAddress1").innerHTML = sen1FullAddress;
                        document.getElementById("senPhoneNumber1").innerHTML = sen2PhoneNumber;
                        
                        document.getElementById("senWebsite1").innerHTML = sen1GovWebsite;
                        document.getElementById("senatorWebsite1").href = sen1GovWebsite;
                    };
                }
                
                // Senator 2's address path
                try{
                    var sen2Path = response.result.officials[1] || "No Info Available";
                    var sen2Name = "Sen. " + sen2Path.name
                    var sen2Party = sen2Path.party.split(" ")[0]
                    var sen2PhoneNumber = sen2Path.phones[0]
                    var sen2AddressPath = response.result.officials[1].address[0]
                    var sen2line1 = sen2AddressPath.line1 || ""
                    var sen2line2 = sen2AddressPath.line2 || ""
                    var sen2FullAddress = sen2line1 + " " + sen2line2 + ", " + sen2AddressPath.city + " " + sen2AddressPath.state + ", " + sen2AddressPath.zip
                    var sen2GovWebsite = sen2Path.urls[0]
                    
                    //Table for the second Senator
                    document.getElementById("senFullName2").innerHTML = sen2Name
                    document.getElementById("senParty2").innerHTML = sen2Party;
                    document.getElementById("senAddress2").innerHTML = sen2FullAddress;
                    document.getElementById("senPhoneNumber2").innerHTML = sen2PhoneNumber;
                    
                    document.getElementById("senWebsite2").innerHTML = sen2GovWebsite;
                    document.getElementById("senatorWebsite2").href = sen2GovWebsite;
                }
                catch(error) {
                    console.log("Sen2 Info Error")
                }
                finally {
                    if (sen2Path == "No Info Available") {
                        var sen2Path = response.result.officials[2] || "No Info Available";
                        var sen2Name = "";
                        var sen2Party = "";
                        var sen2PhoneNumber = "";
                        var sen2AddressPath = "No Info Currently Available";
                        var sen2line1 = "";
                        var sen2line2 = "";
                        var sen2FullAddress = "No Info Currently Available";
                        var sen2GovWebsite = "";
                        
                        //Table for the second Senator
                        document.getElementById("senFullName2").innerHTML = sen2Name
                        document.getElementById("senParty2").innerHTML = sen2Party;
                        document.getElementById("senAddress2").innerHTML = sen2FullAddress;
                        document.getElementById("senPhoneNumber2").innerHTML = sen2PhoneNumber;
                        
                        document.getElementById("senWebsite2").innerHTML = sen2GovWebsite;
                        document.getElementById("senatorWebsite2").href = sen2GovWebsite;
                    };
                };
                
                // Representative's address path
                try {
                    var repPath = response.result.officials[2] || "No Info Available";
                    var repName = ("Rep. " + repPath.name);
                    var repParty = repPath.party.split(" ")[0];
                    var repPhoneNumber = repPath.phones[0];
                    var repAddressPath = response.result.officials[2].address[0];
                    var repline1 = repAddressPath.line1 || ""
                    var repline2 = repAddressPath.line2 || ""
                    var repFullAddress = repline1 + " " + repline2 + ", " + repAddressPath.city + " " + repAddressPath.state + ", " + repAddressPath.zip;
                    var repGovWebsite = repPath.urls[0];
                    console.log(repName)
                    
                     // Table row for the House Representative
                    document.getElementById("houseFullName").innerHTML = repName;
                    document.getElementById("houseParty").innerHTML = repParty;
                    document.getElementById("houseAddress").innerHTML = repFullAddress;
                    document.getElementById("housePhoneNumber").innerHTML = repPhoneNumber;
                    document.getElementById("repWebsite").innerHTML = repGovWebsite;
                    document.getElementById("houseWebsite").href = repGovWebsite;
                }
                catch(error) {
                    console.log("Rep Info Error")
                }
                finally {
                    if (repPath == "No Info Available") {
                        var repName = "";
                        var repParty = "";
                        var repPhoneNumber = "";
                        var repAddressPath = "";
                        var repFullAddress = "No Info Currently Available";
                        var repGovWebsite = "";
                        
                        document.getElementById("houseFullName").innerHTML = repName;
                        document.getElementById("houseParty").innerHTML = repParty;
                        document.getElementById("houseAddress").innerHTML = repFullAddress;
                        document.getElementById("housePhoneNumber").innerHTML = repPhoneNumber;
                        document.getElementById("repWebsite").innerHTML = repGovWebsite;
                        document.getElementById("houseWebsite").href = repGovWebsite;
                    }
                }
            },function(err) { console.error("Execute error", err);
        });
      }
      gapi.load("client");
    </script>
    <div class="apiBody" id="apiBody">
        <div id="apiIntro">
            <h3>Your Congressional Information:</h3>
            <p style="font-weight: bold">Your Address: <span span style="font-weight: normal" id="full-address"></span></p>
            <p style="font-weight: bold">Congressional Class Number: <span style="font-weight: normal" id="congressional-number"></span></p>
            <p style="font-weight: bold">Congressional District: <span style="font-weight: normal" id="congressional-district"></span></p>
        </div> 
        <div class="apiTable" id="apiResults">
            <table class="table table-striped">
                <thead>
                    <tr class="head">
                        <th>Member</th>
                        <th>Party</th>
                        <th>Office Address</th>
                        <th>Phone Number</th>
                        <th>Website</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="member-row">
                        <td ><span id="houseFullName"></span></td>
                        <td><span id="houseParty"></span></td>
                        <td><span id="houseAddress"></span></td>
                        <td><span id="housePhoneNumber"></span></td>
                        <td><a id="houseWebsite"><span id="repWebsite"></span></a></td>
                    </tr>
                    <tr class="member-row">
                        <td ><span id="senFullName1"></span></td>
                        <td><span id="senParty1"></span></td>
                        <td><span id="senAddress1"></span></td>
                        <td><span id="senPhoneNumber1"></span></td>
                        <td><a id="senatorWebsite1"><span id="senWebsite1"></span></a></td>
                    </tr>
                    <tr class="member-row" style="height:auto">
                        <td ><span id="senFullName2"></span></td>
                        <td><span id="senParty2"></span></td>
                        <td><span id="senAddress2"></span></td>
                        <td><span id="senPhoneNumber2"></span></td>
                        <td><a id="senatorWebsite2"><span id="senWebsite2"></span></a></td>
                    </tr>
                </tbody>
            </table>
            <table id="memberPhotos" class="member-table">
                <tr class="photo-names">
                    <td><span id="sen1PhotoName"></span></td>
                    <td><span id="sen2PhotoName"></span></td>
                    <td><span id="repPhotoName"></span></td>
                </tr>
                <tr class="member-photos">
                    <td><img class="centerImage" id="sen1Headshot" style="width:240px;height:270px;" alt="Photo Unavailable"></td>
                    <td><img class="centerImage" id="sen2Headshot" style="width:240px;height:270px;" alt="Photo Unavailable"></td>
                    <td><img class="centerImage" id="repHeadshot" style="width:240px;height:270px;" alt="Photo Unavailable"></td>
                </tr>
                <tr class="member-social-media" id="popup">
                    <td>
                        <a class="fa fa-facebook" id="senator1Facebook" style="text-decoration:none;color:white;"></a>
                        <a class="fa fa-twitter" id="senator1Twitter" style="text-decoration:none;color:white;"></a>
                        <a class="fa fa-youtube" id="senator1YouTube" style="text-decoration:none;color:white;"></a>
                    </td>
                    <td>
                        <a class="fa fa-facebook" id="senator2Facebook" style="text-decoration:none;color:white;"></a>
                        <a class="fa fa-twitter" id="senator2Twitter" style="text-decoration:none;color:white;"></a>
                        <a class="fa fa-youtube" id="senator2YouTube" style="text-decoration:none;color:white;"></a>
                    </td>
                    <td>
                        <a class="fa fa-facebook" id="repFB" style="text-decoration:none;color:white;"></a>
                        <a class="fa fa-twitter" id="repTW" style="text-decoration:none;color:white;"></a>
                        <a class="fa fa-youtube" id="repYT" style="text-decoration:none;color:white;"></a>
                    </td>
                </tr>
            </table>
        </div>
    </div>    
</body>