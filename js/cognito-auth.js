function signin(email, password, onSuccess, onFailure) {
    var authenticationDetails;
    var cognitoUser = createCognitoUser(email);

    if (window._config.cognito.userPoolClientSecret) {
        // Calculate SECRET_HASH
        var secretHash = CryptoJS.HmacSHA256(toUsername(email) + window._config.cognito.userPoolClientId, window._config.cognito.userPoolClientSecret).toString();

        authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
            Username: toUsername(email),
            Password: password,
            // Include SECRET_HASH
            ClientSecret: window._config.cognito.userPoolClientSecret,
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
