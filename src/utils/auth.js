import { auth } from "./firebase";

import {
    FacebookAuthProvider,
    GoogleAuthProvider,
    TwitterAuthProvider,
    signInWithRedirect,
    signInWithPopup,
    signOut,
} from "firebase/auth";

//* Facebook config
let facebookProvider = new FacebookAuthProvider();

//* Google config
let googleProvider = new GoogleAuthProvider();

//* Twitter config
let twitterProvider = new TwitterAuthProvider();

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
const _signInWithRedirect = (providerName) => {
    let authProvider = _getProvider(providerName);
    signInWithRedirect(auth, authProvider).then(() => {
        alert("What")
    });
}

/** Sign the user in using a popup */
const _signInWithPopup = (providerName) => {
    let authProvider = _getProvider(providerName);
    signInWithPopup(auth, authProvider).then(() => {
        alert("What")
    });
}

const logout = async (redirectUrl = "") => {
    try {
        await signOut();
        console.info("Successfully logged out");
        window.location.replace(redirectUrl);
    } catch (err) {
        console.error("Failed to sign you out");
        console.error(err);
    }
}

export {
    _signInWithRedirect,
    _signInWithPopup,
    logout
}