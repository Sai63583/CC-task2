document.addEventListener("DOMContentLoaded", function () {
    // Firebase configuration
    var firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        appId: "YOUR_APP_ID",
    };
    firebase.initializeApp(firebaseConfig);

    // Google Sign-in
    function signInWithGoogle() {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(handleAuthResult)
            .catch(handleError);
    }

    // Facebook Sign-in
    function signInWithFacebook() {
        FB.login((response) => {
            if (response.authResponse) {
                var credential = firebase.auth.FacebookAuthProvider.credential(
                    response.authResponse.accessToken
                );
                firebase.auth().signInWithCredential(credential)
                    .then(handleAuthResult)
                    .catch(handleError);
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        });
    }

    // GitHub Sign-in
    function signInWithGitHub() {
        var githubAuth = new GitHubAuth({
            clientId: 'YOUR_CLIENT_ID',
            redirectUri: 'YOUR_REDIRECT_URI',
        });

        githubAuth.login()
            .then((result) => {
                var credential = firebase.auth.GithubAuthProvider.credential(result.access_token);
                firebase.auth().signInWithCredential(credential)
                    .then(handleAuthResult)
                    .catch(handleError);
            })
            .catch(handleError);
    }

    // OTP Sign-in
    function signInWithOTP() {
        var phoneNumber = document.getElementById('phoneNumber').value;
        var appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                var code = prompt('Enter the OTP sent to your phone:');
                return confirmationResult.confirm(code);
            })
            .then(handleAuthResult)
            .catch(handleError);
    }

    // Handle authentication result
    function handleAuthResult(result) {
        console.log(result.user);
        alert('Authentication successful!');
    }

    // Handle authentication errors
    function handleError(error) {
        console.error(error);
        alert('Authentication failed. Please check the console for details.');
    }
});
