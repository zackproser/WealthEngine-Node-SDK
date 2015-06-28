module.exports.validateEmailAddress = function(email_address){
	//Ensure email_address is an actual string
	if (typeof email_address == "undefined" 
		|| typeof email_address != "string"
		|| email_address.trim() == '') {

		throw new Error('getRecordByEmailrequires a valid e-mail address string'); 

	} 
	//Ensure the string is a properly formatted e-mail address
	var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
	if (!pattern.test(email_address)) {

		throw new Error('getRecordByEmail: it appears your email address is improperly formatted');
	}

	return true;
}

module.exports.isAValidString = function(string){
	if (typeof string == "undefined") return false; 
	if (!typeof string == "string") return false; 
	if (string.trim() == '') return false; 
	return true; 
}

module.exports.isAValidNumber = function(number) {
	if (typeof number == "undefined") return false; 
	return !isNaN(number); 
}

module.exports.isAValidPhoneNumber = function(number) {
	if (typeof number == "undefined") return false; 
	var pattern = new RegExp('/^\d+$/'); 
	if (!(number.match(/^[0-9]+$/) != null)){

		throw new Error('getRecordByPhone: phone numbers must be passed as a string that contains only digits');
	}

	return true; 
}
