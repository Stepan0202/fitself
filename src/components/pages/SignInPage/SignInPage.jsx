import {signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../../../assets/js/firebase/firebase';
import { useContext } from 'react';
import AuthContext from '../../../assets/js/auth-context';
import {useNavigate } from "react-router-dom";

export default function SignInPage() {
    const [mail, setMail] = useState('');
    const [pas, setPas] = useState('');
    const authCtx = useContext(AuthContext);
    const lc = window.localStorage;
    const navigateTo = useNavigate();
    function processSubmit(e){
        e.preventDefault();
        signInWithEmailAndPassword(auth, mail, pas)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
        navigateTo('/profile')
    }
    onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        authCtx.setIsLoggedIn(true);
        authCtx.setUid(uid);
        const userLC = {
            isLoggedIn: true,
            uid: uid
        }
        lc.setItem('auth', JSON.stringify(userLC));
    } else {

    }
    });
    return (
        <>
                <h1>Sign in</h1>
                <form onSubmit={processSubmit}>
                    <label>
                        E-mail:
                        <input type="text" name="username" autoComplete="username" aria-hidden="true" className="hidden-input" style= {{display: 'none'}}/>
                        <input type="mail" name="mail" autoComplete="username" required onChange={(e) => setMail(e.target.value)}/>
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" autoComplete="current-password" required onChange={(e) => setPas(e.target.value)}/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                
        </>

    )
}