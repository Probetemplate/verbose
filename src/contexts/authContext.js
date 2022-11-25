import React from 'react'
import axios from 'axios';

import { GlobalContext } from './globalContext';
import { useGoogleLogin, useGoogleLogout } from 'react-google-login';
import Loader from '../components/loader';

export const AuthContext = React.createContext({
    isLoading: true,
    isAuthenticated: false,
    user: {},
    setUser: () => { },
    refresh: () => { },
    login: () => { },
    isLoginLoaded: false,
    logout: () => { },
    isLogoutLoaded: false,
});

const clientId = "449979043087-ucr7kttd5qfabke8doch04rpurpmatpr.apps.googleusercontent.com";

export default function AuthContextProvider(props) {

    const globalContext = React.useContext(GlobalContext);

    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [time, setTime] = React.useState(new Date().getTime());
    const [isLoading, setIsLoading] = React.useState(true);
    const [willSignIn, setWillSignIn] = React.useState(true);
    const [user, setUser] = React.useState({
        name: '',
        email: '',
        avatar: '',
        token: '',
    });

    async function gAuthResponse(res) {
        try {
            console.log(res);
            setIsLoading(true);
            const serverResponse = await axios.post("/api/auth/login", { token: res.tokenId });
            const { data } = serverResponse;

            if (data.status === 200 || data.status === 201) {
                const user = data?.data;
                setUser({
                    name: user?.name,
                    email: user?.email,
                    avatar: user?.avatar,
                    token: res.tokenId,
                });
                setIsAuthenticated(true);
                setIsLoading(false);

                globalContext.showSnackBar(data.message, {
                    variant: 'success',
                    transition: 'slideRight',
                });
            } else {
                setUser({});
                setIsLoading(false);
                setIsAuthenticated(false);
                globalContext.showSnackBar(data.message, {
                    variant: 'error',
                    transition: 'slideRight',
                });
            }

        } catch (error) {
            console.error(error);
            setUser({});
            setIsLoading(false);
            setIsAuthenticated(false);
            globalContext.showSnackBar(error.message, {
                variant: 'error',
                transition: 'slideRight',
            });
        }
    }

    const { signIn, loaded: isLoginLoaded } = useGoogleLogin({
        clientId,
        onSuccess: gAuthResponse,
        onFailure: (err) => {
            console.log(err);
            setUser({});
            setIsLoading(false);
            setIsAuthenticated(false);

            const details = {
                idpiframe_initialization_failed: "Initialization of the Google Auth API failed. (You might haven't enabled  third party cookies in your browser.)",
                popup_closed_by_user: "The user closed the popup before finishing the sign in flow.",
                access_denied: "The user denied the permission to the scopes required.",
                immediate_failed: "No user could be automatically selected without prompting the consent flow."
            };

            globalContext.showSnackBar(`${String(err.error).toUpperCase()}: ${details[err.error]}`, {
                variant: 'error',
                transition: 'slideRight',
            });
        },
        cookiePolicy: 'single_host_origin',
        fetchBasicProfile: true,
    });

    function signOut(e) {
        try {
            if (e) e.preventDefault();
            axios.post("/api/auth/logout").then(res => {
                if (res.data.status === 200) {
                    setUser({});
                    setIsAuthenticated(false);
                    setIsLoading(false);
                    globalContext.showSnackBar(res.data.message, {
                        variant: 'success',
                        transition: 'slideRight',
                    });
                } else {
                    globalContext.showSnackBar(res.data.message, {
                        variant: 'error',
                        transition: 'slideRight',
                    });
                }
            }).catch(error => {
                console.error(error);
                setWillSignIn(false);
                globalContext.showSnackBar(error.message, {
                    variant: 'error',
                    transition: 'slideRight',
                });
            });

        } catch (error) {
            console.error(error);
            setWillSignIn(false);
            globalContext.showSnackBar(error.message, {
                variant: 'error',
                transition: 'slideRight',
            });
        }
    }

    const autoLogin = () => {
        try {

            axios.post("/api/auth/login_with_cookie").then(res => {
                const { data } = res;
                if (data.status === 200) {
                    const user = data?.data;
                    setUser({
                        name: user?.name,
                        email: user?.email,
                        avatar: user?.avatar,
                        token: user?.token,
                    });
                    const currentTime = new Date().getTime();
                    if ((time + 5000) < currentTime) {
                        setIsLoading(false);
                    } else {
                        setTimeout(() => setIsLoading(false), (time + 5000) - currentTime);
                    }
                    setIsAuthenticated(true);
                    setWillSignIn(true);
                } else {
                    setUser({});
                    const currentTime = new Date().getTime();
                    if ((time + 5000) < currentTime) {
                        setIsLoading(false);
                    } else {
                        setTimeout(() => setIsLoading(false), (time + 5000) - currentTime);
                    }
                    setIsAuthenticated(false);
                    setWillSignIn(false);
                }
            }).catch(error => {
                setIsLoading(false);
                setIsAuthenticated(false);
                setWillSignIn(false);
            });

        } catch (error) {
            console.error(error);
            setIsLoading(false);
            setIsAuthenticated(false);
            setWillSignIn(false);
            globalContext.showSnackBar(error.message, {
                variant: 'error',
                transition: 'slideRight',
            });
        }
    }

    React.useEffect(() => {
        autoLogin();
    }, []);

    React.useEffect(() => {
        if (isLoginLoaded && !willSignIn) {
            setIsLoading(false);
        }
    }, [isLoginLoaded, willSignIn]);

    return (
        <AuthContext.Provider value={{
            isLoading,
            isAuthenticated,
            user,
            setUser,
            login: () => { signIn(); },
            refresh: () => { autoLogin(); },
            isLoginDisabled: !isLoginLoaded,
            logout: () => { signOut() },
            isLogoutDisabled: !isLoginLoaded,
        }}>
            {isLoading ? <Loader /> : props.children}
        </AuthContext.Provider>
    )
}
