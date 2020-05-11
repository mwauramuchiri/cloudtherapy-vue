// Services
import AuthService from '../../services/AuthService';

const handleAuthSuccess = (user) => {
    let userData = {
        email: user.email,
        emailVerified: user.emailVerified,
        name: user.displayName
    };

    AuthService.authUser(user.uid, userData)
        .then(() => {
            console.log("Successfully logged in user");
        })
        .catch((err) => {
            console.error("Failed to login", err);
        });

    return true;
}

export default handleAuthSuccess;