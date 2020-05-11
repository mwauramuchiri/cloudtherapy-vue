/* eslint-disable prettier/prettier */
import {
    firebase,
    auth as firebaseAuth
} from './firebase';

//* Facebook config
let facebookProvider = new firebase.auth.FacebookAuthProvider();

//* Google config
let googleProvider = new firebase.auth.GoogleAuthProvider();

//* Twitter config
let twitterProvider = new firebase.auth.TwitterAuthProvider();

/** Get the provider to use */
const _getProvider = (providerName) => {
    providerName = providerName.toLowerCase();
    let authProvider = false;

    switch (providerName) {
        case 'google':
            authProvider = googleProvider;
            break;
        case 'facebook':
            authProvider = facebookProvider;
            break;
        case 'twitter':
            authProvider = twitterProvider;
            break;
        default:
            console.error(`invalid provider "${providerName}" provided. Current options are "facebook", "google and "twitter`);
    }

    return authProvider;
}

/** Sign the user in using a redirect */
const signInWithRedirect = (providerName) => {
    let authProvider = _getProvider(providerName);
    firebaseAuth.signInWithRedirect(authProvider).then(() => {
        alert("What")
    });
}

/** Sign the user in using a popup */
const signInWithPopup = (providerName) => {
    let authProvider = _getProvider(providerName);
    return firebaseAuth.signInWithPopup(authProvider);
}

const logout = (redirectUrl = "") => {
    return firebaseAuth.signOut()
        .then(() => {
            console.info("Successfully logged out");
            window.location.replace(redirectUrl);
        }).catch((err) => {
            console.error("Failed to sign you out");
            console.error(err);
        });
}

console.log(firebase.auth());

export {
    signInWithRedirect,
    signInWithPopup,
    logout
}