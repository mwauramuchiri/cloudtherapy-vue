// Callbacks
//TODO: Refactor this to import from `callbacks/Auth/` for consitency
import handleAuthSuccess from './handleAuthSuccess';

// Services
import AuthService from '../../services/AuthService';

// Stores
import {
    authStore,
    userStore
} from '../../stores';

/** Handle any changes to auth state ~ firebase */
const handleAuthChanged = async user => {
    authStore.set({
        isLoadingAuth: false
    });

    // User is logged in
    if (user) {
        handleAuthSuccess(user);
        const authDataFromApi = await AuthService.getAuthUser(user.uid);

        if (!authDataFromApi) return;

        // Update auth details
        authStore.update(storeVal => {
            storeVal = {
                ...storeVal,
                isLoggedIn: true
            };

            return storeVal;
        });

        // Update user details
        let userFromApi = authDataFromApi.data.data;

        userStore.update((storeVal) => {
            storeVal = userFromApi;
            return storeVal;
        });

    } else {
        console.log('user logged out')
        // Not logged in
        authStore.update(storeVal => {
            storeVal.isLoggedIn = false;
            return storeVal;
        });
    }
};

export default handleAuthChanged;