// Services
import AuthService from '../../services/AuthService';
import getAuthUser from '../../services/AuthService/getAuthUser';

const handleAuthSuccess = (user) => {
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
                    // console.log("Successfully logged in user");
                })
                .catch((/* err */) => {
                    // console.error("Failed to login", err);
                });
        
        }
    })

   
    return true;
}

export default handleAuthSuccess;