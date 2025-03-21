function signin(email, password, onSuccess, onFailure) {
    var authenticationDetails;
    var cognitoUser = createCognitoUser(email);

    if (_config.cognito.userPoolClientSecret) {
        // Calculate SECRET_HASH
        var secretHash = CryptoJS.HmacSHA256(toUsername(email) + _config.cognito.userPoolClientId, _config.cognito.userPoolClientSecret).toString();

        authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
            Username: toUsername(email),
            Password: password,
            // Include SECRET_HASH
            ClientSecret: _config.cognito.userPoolClientSecret,
            SECRET_HASH: secretHash
        });
    } else {
        authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
            Username: toUsername(email),
            Password: password
        });
    }

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: onSuccess,
        onFailure: onFailure
    });
}
