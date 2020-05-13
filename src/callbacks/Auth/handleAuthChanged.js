/* eslint-disable prettier/prettier */
// Callbacks
//TODO: Refactor this to import from `callbacks/Auth/` for consitency
import handleAuthSuccess from './handleAuthSuccess';

// Services
import AuthService from '../../services/AuthService';
import store from '../../store';

/** Handle any changes to auth state ~ firebase */
const handleAuthChanged = async user => {
    store.commit('auth/updateProp', {
        name: 'isLoadingAuth',
        value: false
    });

    // User is logged in
    if (user) {
        handleAuthSuccess(user);
        const authDataFromApi = await AuthService.getAuthUser(user.uid);

        if (!authDataFromApi) return;


        store.commit('auth/updateProp', {
            name: 'isLoggedIn',
            value: true
        });

        // Update user details
        let userFromApi = authDataFromApi.data.data;

        store.commit('user/updateProp', {
            name: 'user',
            value: userFromApi
        });
    } else {
        console.log('user logged out')
        // Not logged in
        store.commit('auth/updateProp', {
            name: 'isLoadingAuth',
            value: false
        });
    }
};

export default handleAuthChanged;