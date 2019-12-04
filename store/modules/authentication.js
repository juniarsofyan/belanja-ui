import auth0 from 'auth0-js'
import axios from 'axios'

const authentication = {
    namespaced: true,
    state: {
        affiliation: localStorage.getItem('affiliation') ? JSON.parse(localStorage.getItem('affiliation')) : false,
        userIsAuthorized: localStorage.getItem('userIsAuthorized') ? localStorage.getItem('userIsAuthorized') : false,
        auth0: new auth0.WebAuth(
            {
                domain: process.env.VUE_APP_AUTH0_CONFIG_DOMAIN,
                clientID: process.env.VUE_APP_AUTH0_CONFIG_CLIENTID,
                redirectUri: process.env.VUE_APP_DOMAINURL + '/profile',
                responseType: process.env.VUE_APP_AUTH0_CONFIG_RESPONSETYPE,
                scope: process.env.VUE_APP_AUTH0_CONFIG_SCOPE
            }
        ),
        user_data: localStorage.getItem('user_data') ? JSON.parse(localStorage.getItem('user_data')) : [],
        email: localStorage.getItem('email') ? localStorage.getItem('email') : false,
        access_token: localStorage.getItem('access_token') ? localStorage.getItem('access_token') : false,
        id_token: localStorage.getItem('id_token') ? localStorage.getItem('id_token') : false,
        expires_at: localStorage.getItem('expires_at') ? localStorage.getItem('expires_at') : false
    },
    mutations: {
        setAffiliation(state, replacement) {
            state.affiliation = replacement
            localStorage.setItem('affiliation', JSON.stringify(replacement))
        },
        setUserIsAuthenticated(state, replacement) {
            state.userIsAuthorized = replacement
            localStorage.setItem('userIsAuthorized', replacement)
        },
        setUserData(state, replacement) {
            state.user_data = replacement
            localStorage.setItem('user_data', JSON.stringify(replacement))
        },
        setEmail(state, replacement) {
            state.email = replacement
            localStorage.setItem('email', replacement)
        },
        setAccessToken(state, replacement) {
            state.access_token = replacement
            localStorage.setItem('access_token', replacement)
        },
        setIdToken(state, replacement) {
            state.id_token = replacement
            localStorage.setItem('id_token', replacement)
        },
        setExpiresAt(state, replacement) {
            state.expires_at = replacement
            localStorage.setItem('expires_at', replacement)
        }
    },
    getters: {
        affiliation(state) {
            return state.affiliation
        },
        userIsAuthorized(state) {
            return state.userIsAuthorized
        },
        user_data(state) {
            return state.user_data
        },
        email(state) {
            return state.email
        },
        access_token(state) {
            return state.access_token
        },
        id_token(state) {
            return state.id_token
        },
        expires_at(state) {
            return state.expires_at
        }
    },
    actions: {
        setAffiliation({ commit }, payload) {
            commit('setAffiliation', payload)
        },
        auth0Login(context) {
            context.state.auth0.authorize()
        },
        addItem( {state, commit}, payload) {
            commit('addItem', payload)
        },
        auth0HandleAuthentication({state, commit}) {
            state.auth0.parseHash((err, authResult) => {
                if (authResult && authResult.accessToken && authResult.idToken) {

                    let expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime())

                    // save the tokens locally
                    // set global ui understanding of authentication
                    commit('setEmail', authResult.idTokenPayload.email)
                    commit('setAccessToken', authResult.accessToken)
                    commit('setIdToken', authResult.idToken)
                    commit('setExpiresAt', expiresAt)

                    commit('setUserIsAuthenticated', true)

                    // check local profile, if not available then register
                    axios.post(`${process.env.API_BASE_URL}profile/get`, {
                        email: authResult.idTokenPayload.email,
                        affiliation: state.affiliation
                    })
                    .then((response) => {
                        if (response.data.data == "0") {
                            axios.post(`${process.env.API_BASE_URL}profile/register`, {
                                name: authResult.idTokenPayload.name.toUpperCase(),
                                email: authResult.idTokenPayload.email
                            }).then((response) => {
                                if (response.data.data != 0) {
                                    commit('setUserData', {
                                        user_id : response.data.data.user_id,
                                        name: authResult.idTokenPayload.name,
                                        email: authResult.idTokenPayload.email,
                                        picture: authResult.idTokenPayload.picture
                                    })
                                }
                            })
                            .catch(e => {
                                console.log(e)
                            })
                        } else {
                            commit('setUserData', {
                                user_id : response.data.data.user_id,
                                name: authResult.idTokenPayload.name,
                                email: authResult.idTokenPayload.email,
                                picture: authResult.idTokenPayload.picture
                            })
                        }
                    }).catch(e => {
                        console.log(e)
                    })
                }
            })
        },
        auth0Logout({state, commit}) {
            // set credential data to false in vuex
            commit('setEmail', false)
            commit('setAccessToken', false)
            commit('setIdToken', false)
            commit('setExpiresAt', false)
            commit('setUserData', [])
            commit('setUserIsAuthenticated', false)

            // Clear credential data from local storage
            localStorage.removeItem('user_data');
            localStorage.removeItem('email');
            localStorage.removeItem('userIsAuthorized');
            localStorage.removeItem('access_token');
            localStorage.removeItem('id_token');
            localStorage.removeItem('expires_at');

            // redirect to auth0 logout to completely log the user out
            window.location.href = process.env.VUE_APP_AUTH0_CONFIG_DOMAINURL + "/v2/logout?returnTo=" + process.env.VUE_APP_DOMAINURL + "&client_id=" + process.env.VUE_APP_AUTH0_CONFIG_CLIENTID;
        }
    }
}

export default authentication
