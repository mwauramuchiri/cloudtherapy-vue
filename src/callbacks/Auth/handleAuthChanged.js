// Callbacks
//TODO: Refactor this to import from `callbacks/Auth/` for consitency
import handleAuthSuccess from './handleAuthSuccess';

// Services
import AuthService from '../../services/AuthService';
import store from '../../store';

/** Handle any changes to auth state ~ firebase */
const handleAuthChanged = async user => {
    store.commit('authStore/updateProp', {
        name: 'isLoadingAuth',
        value: true
    });

    // User is logged in
    if (user) {
        await handleAuthSuccess(user);
        const authDataFromApi = await AuthService.getAuthUser(user.uid);

        if (!authDataFromApi) return;

        store.commit('authStore/updateProp', {
            name: 'isLoggedIn',
            value: true
        });

        // Update user details
        let userFromApi = authDataFromApi.data.data;

        store.commit('userStore/updateProp', {
            name: 'user',
            value: userFromApi
        });
    } else {
        // console.log('user logged out')
        // Not logged in
    }

    store.commit('authStore/updateProp', {
        name: 'isLoadingAuth',
        value: false
    });
};

export default handleAuthChanged;