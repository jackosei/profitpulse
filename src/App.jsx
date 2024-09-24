import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import SignUp from './SignUp';
import SignIn from './SignIn';
import OnboardingForm from './OnboardingForm';

import './App.css'

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user ? user : null);
    });
  }, []);

  return (
    <div>
      {!user ? (
        <>
          <SignUp setUser={setUser} />
          <SignIn setUser={setUser} />
        </>
      ) : (
        <OnboardingForm />
      )}
    </div>
  );
};

export default App;