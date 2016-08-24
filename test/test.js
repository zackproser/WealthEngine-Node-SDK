/**
 * Simple Full profile request test (get by Email)
 */

// TODO: replace with your API key from https://dev.wealthengine.com/app/#/apikeys
var apiKey = 'YOUR_WealthEngine_API_KEY';

var WealthEngineSdk = require('./../lib/we-api.js');

var WeAPI = new WealthEngineSdk(
    apiKey,
    // 'true' enables Sandbox testing (not for production!)
    // to switch to production, pass 'false' or remove parameter completely
    true
);

//Create the session request object
var session_params = {
    duration: 7200
};

//Create a session that can be used in subsequent requests as an Authorization method
WeAPI.createSession(session_params, function(err, code, result){

    if (err) console.error(err);
    console.dir(result);

   //Create the email request object
    var params = {
        email_address: "hamburt@hamburtslambshirts.com",
        first_name: "HAMBURT",
        last_name: "PORKINGTON",
        mode: "full" // we want to test FULL profile here!
    };

    //Look up a WealthEngine FULL profile by email and [name]
    WeAPI.getProfileByEmail(params, function(err, code, result){
        if (err) console.error(err);
        console.dir(result);
    });

});