var 
	request = require('request'),
	validation = require('./lib/validation')
; 

/**
 * @class
 * @classdesc An asynchronous wrapper for the WealthEngine API 
 *
 * @author Zack Proser <zackproser@gmail.com> 
 */
var WeAPI = function(apiKey, isTesting) {

	this.apiKey = null;

	if (isTesting) {
		this.weApiRoot = 'https://api-sandbox.wealthengine.com/v1/';
	} else {
		this.weApiRoot = 'https://api.wealthengine.com/v1/';
	}

	//Ensure a valid apiKey was passed
	if (typeof apiKey == "undefined"
		|| typeof apiKey != "string"
		|| apiKey.trim() == '') {

		throw new Error('You must pass in a valid WealthEngine API Key when instantiating the WeAPI object');
	}

	this.apiKey = apiKey;

	/**
	 * Attempt to lookup a WealthEngine profile via e-mail address and name
	 * 
	 * @param  {Object}   params   An object containing the e-mail address (required) and option name params
	 * @param  {Function} callback(err, result): function called after API call is complete
	 */
	this.getProfileByEmail = function(params, callback) {

		var
			params = params || {}, 
			email_address = params.email_address || '', 
			first_name = params.first_name || '', 
			last_name = params.last_name || '',
			mode = params.mode || 'basic'
		;

		//Ensure email_address is valid and properly formed
		validation.validateEmailAddress(email_address);

		//Ensure a proper callback was supplied
		if (typeof callback != "function") throw new Error('You must pass a valid callback function to getProfileByEmail');

		//Build the request parameters object
		var parameters_object = {
			email: email_address, 
			first_name: validation.isAValidString(first_name) ? first_name : null, 
			last_name: validation.isAValidString(last_name) ? last_name: null
		};

		//Build the request options object
		var request_options = {
			url: this.weApiRoot + 'profile/find_one/by_email/' + mode,
			headers: {
				"Content-Type": "application/json", 
				"Authorization": "APIKey " + this.apiKey
			}, 
			json: parameters_object
		};

		//The callback to be executed when the request is complete
		function request_callback(err, response, body) {
			if (err) callback(err);  
			//Return response via callback
			callback(null, response.statusCode, body); 
		}

		//Make the request using the options and callback
		request.post(request_options, request_callback); 
	}, 

	/**
	 * Attempt to lookup a WealthEngine profile via Address and name
	 * 
	 * @param  {Object}   params  An object containing the required address parameters
	 * @param  {Function} callback(err, result): function called after API call is complete
	 */
	this.getProfileByAddress = function(params, callback) {

		var
			params = params || {}, 
			last_name = params.last_name || '', 
			first_name = params.first_name || '', 
			address_line1 = params.address_line1 || '', 
			city = params.city || '', 
			state = params.state || '', 
			zip = params.zip || '',
			mode = params.mode || 'basic'
		;

		//Ensure a proper callback was supplied
		if (typeof callback != "function") throw new Error('You must pass a valid callback function to getProfileByAddress');

		//Build the request parameters object
		var parameters_object = { 
			last_name: validation.isAValidString(last_name) ? last_name: null, 
			first_name: validation.isAValidString(first_name) ? first_name : null, 
			address_line1: validation.isAValidString(address_line1) ? address_line1 : null, 
			city: validation.isAValidString(city) ? city : null, 
			state: validation.isAValidString(state) ? state : null, 
			zip: validation.isAValidNumber(zip) ? zip : null
		};

		//Build the request options object
		var request_options = {
			url: this.weApiRoot + 'profile/find_one/by_address/' + mode,
			headers: {
				"Content-Type": "application/json", 
				"Authorization": "APIKey " + this.apiKey
			}, 
			json: parameters_object
		};

		//The callback to be executed when the request is complete
		function request_callback(err, response, body) {
			if (err) callback(err);  
			//Return response via callback
			callback(null, response.statusCode, body); 
		}

		//Make the request using the options and callback
		request.post(request_options, request_callback); 
	}, 

	/**
	 * Attempt to lookup a WealthEngine profile via Address and name
	 * 
	 * @param  {Object}   params  An object containing the required phone param and optional name params
	 * @param  {Function} callback(err, result): function called after API call is complete
	 */
	this.getProfileByPhone = function(params, callback) {

		var
			params = params || {}, 
			phone = params.phone || '',
			last_name = params.last_name || '', 
			first_name = params.first_name || '',
			mode = params.mode || 'basic'
		;

		//Ensure a proper callback was supplied
		if (typeof callback != "function") throw new Error('You must pass a valid callback function to getProfileByPhone');

		//Build the request parameters object
		var parameters_object = { 
			phone: validation.isAValidPhoneNumber(phone) ? phone : null, 
			last_name: validation.isAValidString(last_name) ? last_name: null, 
			first_name: validation.isAValidString(first_name) ? first_name : null 
		};

		//Build the request options object
		var request_options = {
			url: this.weApiRoot + 'profile/find_one/by_phone/' + mode,
			headers: {
				"Content-Type": "application/json", 
				"Authorization": "APIKey " + this.apiKey
			}, 
			json: parameters_object
		};

		//The callback to be executed when the request is complete
		function request_callback(err, response, body) {
			if (err) callback(err);  
			//Return response via callback
			callback(null, response.statusCode, body); 
		}

		//Make the request using the options and callback
		request.post(request_options, request_callback); 
	}, 

	/**
	 * Attempt to create a session for use in subsequent API calls
	 * @param  {Object}   params   an object containing the optional duration param specifying the session lifetime in seconds
	 * @param  {Function} callback(err, result): function called after API call is complete
	 */
	this.createSession = function(params, callback) {

		var 
			params = params || {}, 
			duration = params.duration || 3600
		; 

		//Ensure a proper callback was supplied
		if (typeof callback != "function") throw new Error('You must pass a valid callback function to createSession');

		//Build the request parameters object
		var parameters_object = {
			duration: validation.isAValidNumber(duration) ? duration : null
		}; 

		//Build the request options object
		var request_options = {
			url: this.weApiRoot + 'session/create', 
			headers: {
				"Content-Type": "application/json", 
				"Authorization": "APIKey " + this.apiKey
			}, 
			json: parameters_object 
		};

		//The callback to be executed when the request is complete
		function request_callback(err, response, body) {
			if (err) callback(err);  
			//Return response via callback
			callback(null, response.statusCode, body); 
		}

		//Make the request using the options and callback
		request.post(request_options, request_callback); 
	}
}

module.exports = WeAPI; 