import { useRouter } from "next/router";
import {
    useState,
    useContext,
    createContext,
    ReactNode,
    useEffect,
} from "react";
import { auth, db } from "../lib/firebase";
import {
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

interface authContextType {
    user: User | undefined;
    login: () => Promise<void>;
    logout: () => void;
}

interface User {
    displayName: string;
    email: string;
    emailVerified: boolean;
    photoURL: string;
    uid: string;
    isAnonymous: boolean;
    creationTime: string;
    lastSignInTime: string;
}

const authContextDefaultValues: authContextType = {
    user: {
        displayName: "",
        email: "",
        emailVerified: false,
        photoURL: "",
        uid: "",
        isAnonymous: false,
        creationTime: "",
        lastSignInTime: "",
    },
    login: () => Promise.resolve(),
    logout: () => {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
    return useContext(AuthContext);
}

interface Props {
    children: ReactNode;
}

export function AuthProvider({ children }: Props) {
    const router = useRouter();

    const [user, setUser] = useState<User>();

    const provider = new GoogleAuthProvider();

    const login = async () => {
        try {
            const result = await signInWithPopup(auth, provider);

            if (result.user) {
                const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                const user = result.user;

                const userDetails: User = {
                    displayName: user.displayName!,
                    email: user.email!,
                    emailVerified: user.emailVerified,
                    photoURL: user.photoURL!,
                    uid: user.uid,
                    isAnonymous: user.isAnonymous,
                    creationTime: user.metadata.creationTime!,
                    lastSignInTime: user.metadata.lastSignInTime!,
                };

                setUser(userDetails);

                try {
                    await setDoc(doc(db, "users", user.email!), userDetails);
                } catch (error) {
                    console.log(error);
                }

                await router.push(`/user/${user.displayName}`);
                console.log({ credential, token, user });
            }
        } catch (error: any) {
            const errorCode = error.code;
            const errorMessage: string = error.message;
            const email: string = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log("Error in login: ", {
                errorCode,
                errorMessage,
                email,
                credential,
            });
        }
    };

    const logout = () => {
        auth.signOut();
        router.push("/");
        console.log("logout");
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    displayName: user.displayName!,
                    email: user.email!,
                    emailVerified: user.emailVerified,
                    photoURL: user.photoURL!,
                    uid: user.uid,
                    isAnonymous: user.isAnonymous,
                    creationTime: user.metadata.creationTime!,
                    lastSignInTime: user.metadata.lastSignInTime!,
                });
            } else {
                setUser(undefined);
                console.log("no user");
            }
        });
    }, []);

    const value = {
        user,
        login,
        logout,
    };

    return (
        <>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </>
    );
}
