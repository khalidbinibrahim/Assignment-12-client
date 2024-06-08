import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const gitHubProvider = new GithubAuthProvider();
    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const updateUserProfile = (fullName, photoUrl) => {
        return updateProfile(auth.currentUser, {
            displayName: fullName,
            photoURL: photoUrl,
        });
    };

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const gitHubLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, gitHubProvider);
    };

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('user in the auth state changed', currentUser);
            if (currentUser) {
                currentUser.getIdToken().then((token) => {
                    setUser({
                        ...currentUser,
                        token,
                    });
                });
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => {
            unSubscribe();
        };
    }, []);

    const info = {
        user,
        loading,
        createUser,
        updateUserProfile,
        gitHubLogin,
        googleLogin,
        signInUser,
        logOut,
    };

    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;