# Node WealthEngine SDK

An asynchronous wrapper for the [WealthEngine API](http://dev.wealthengine.com/). Supports the four currently [available public endpoints](http://dev.wealthengine.com/api): 

- Find profile by email address
- Find profile by address
- Find profile by phone
- Create session

## What is WealthEngine? 

The WealthEngine API lets you look up the net worth of almost anyone in the U.S. in real time. Visit [dev.wealthengine.com](http://dev.wealthengine.com) to learn more. 

## Install via npm
    npm i wealthengine-node-sdk --save 

## Or - Install as a library from GitHub

	//From <your-project-root>/lib/
	git clone <weapi repo url> we-api 

	//In your node app - instantiate the sdk
	var 
		WealthEngineSdk = require('./lib/we-api'), 
		//Use your apiKey from dev.wealthengine.com
		WeAPI = new WealthEngineSdk('ddb26e11-9348-4ead-9e2a-5a3b80a01b52')
	; 

## find_one/by_email/basic

	//Create the email request object
	var email_params = {
		email_address: "hamburt@hamburtslambshirts.com", 
		first_name: "HAMBURT", 
		last_name: "PORKINGTON"
	}; 

	//Look up a WealthEngine profile by email and [name]
	WeAPI.getProfileByEmail(email_params, function(err, code, result){
		if (err) console.error(err); 
		console.dir(result); 
	}); 

## find_one/by_address/basic

	//Create the address request object
	var address_params = {
		last_name: "HAMBURT", 
		first_name: "PORKINGTON", 
		address_line1: "333 E 36TH ST", 
		city: "LOS ANGELES", 
		state: "CA", 
		zip: 90011
	}; 

	//Look up a WealthEngine profile by address and [name]
	WeAPI.getProfileByAddress(address_params, function(err, code, result){
		if (err) console.error(err); 
		console.dir(result); 
	}); 

## find_one/by_phone/basic

	//Create the phone number request object
	var phone_params = {
		phone: "1212456781", 
		last_name: "HAMBURT", 
		first_name: "PORKINGTON"
	};

	//Look up a WealthEngine profile by phone number and [name]
	WeAPI.getProfileByPhone(phone_params, function(err, code, result){
		if (err) console.error(err); 
		console.dir(result); 
	});

## session/create

	//Create the session request object
	var session_params = {
		duration: 7200
	}

	//Create a session that can be used in subsequent requests as an Authorization method
	WeAPI.createSession(session_params, function(err, code, result){
		if (err) console.error(err); 
		console.dir(result);
	}); 

