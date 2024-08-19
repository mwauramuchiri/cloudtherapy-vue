// Services
import AuthService from '../../services/AuthService';
import getAuthUser from '../../services/AuthService/getAuthUser';

const handleAuthSuccess = (user) => {
    return new Promise((resolve, reject) => {
        getAuthUser(user.uid).then((response)=>{ 
            const loggedInUser = response.data.data || {};
            const isLoggedInUser = Object.values(loggedInUser).length === 0;
            
            if (isLoggedInUser) {
                let userData = {
                    email: user.email,
                    emailVerified: user.emailVerified,
                    name: user.displayName
                };
            
            
                //TODO: Ideally handle this on the backend
                AuthService.authUser(user.uid, userData)
                    .then(() => {
                        resolve(true)
                        // console.log("Successfully logged in user");
                    })
                    .catch((/* err */) => {
                        reject(false)
                        // console.error("Failed to login", err);
                    });
            
                return;
            }

            resolve(true)
        })
    })
}

export default handleAuthSuccess;