// FirebaseUI config.
var uiConfig = {
    signInSuccessUrl: 'main.html'
    , signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GithubAuthProvider.PROVIDER_ID
          , firebase.auth.EmailAuthProvider.PROVIDER_ID
        ], // Terms of service url.
    tosUrl: '<your-tos-url>'
};
// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);
//Trace Auth over entire app
initApp = function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var uid = user.uid;
            var providerData = user.providerData;
            user.getToken().then(function (accessToken) {
                document.getElementById('sign-in-status').textContent = 'Signed in';
                document.getElementById('sign-in').textContent = 'Sign out';
                document.getElementById('account-details').textContent = JSON.stringify({
                    displayName: displayName
                    , email: email
                    , emailVerified: emailVerified
                    , photoURL: photoURL
                    , uid: uid
                    , accessToken: accessToken
                    , providerData: providerData
                }, null, '  ');
            });
        }
        else {
            // User is signed out.
            document.getElementById('sign-in-status').textContent = 'Signed out';
            document.getElementById('sign-in').textContent = 'Sign in';
            document.getElementById('account-details').textContent = 'null';
        }
    }, function (error) {
        console.log(error);
    });
};