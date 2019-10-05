import auth0 from 'auth0-js'

const authentication = {
    namespaced: true,
    state: {
        userIsAuthorized: false,
        auth0: new auth0.WebAuth(
            {
                domain: process.env.VUE_APP_AUTH0_CONFIG_DOMAIN,
                clientID: process.env.VUE_APP_AUTH0_CONFIG_CLIENTID,
                redirectUri: process.env.VUE_APP_DOMAINURL + '/profile',
                responseType: process.env.VUE_APP_AUTH0_CONFIG_RESPONSETYPE,
                scope: process.env.VUE_APP_AUTH0_CONFIG_SCOPE
            }
        ),
        user_data: []
    },
    mutations: {
        setUserIsAuthenticated(state, replacement) {
            state.userIsAuthorized = replacement
            localStorage.setItem('userIsAuthorized', replacement)
        }
    },
    getters: {
        userIsAuthorized(state) {
            return state.userIsAuthorized
        }
    },
    actions: {
        auth0Login(context) {
            context.state.auth0.authorize()
        },
        auth0HandleAuthentication(context) {
            context.state.auth0.parseHash((err, authResult) => {
                if (authResult && authResult.accessToken && authResult.idToken) {

                    let expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime())

                    // save the tokens locally
                    localStorage.setItem('email', authResult.idTokenPayload.email)
                    localStorage.setItem('access_token', authResult.accessToken)
                    localStorage.setItem('id_token', authResult.idToken)
                    localStorage.setItem('expires_at', expiresAt)

                    localStorage.setItem('user_data', JSON.stringify({
                        name: authResult.idTokenPayload.name,
                        email: authResult.idTokenPayload.email,
                        picture: authResult.idTokenPayload.picture
                    }))
                }
            })
        },
        auth0Logout(context) {
            // No need to update the bearer in global axiosConfig to null because we are redirecting out of the application
            // Clear Access Token and ID Token from local storage
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
