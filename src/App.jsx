import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
// import OnboardingForm from './OnboardingForm';

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
        // <OnboardingForm />
        <p>Onboarding Form...</p>
      )}
    </div>
  );
};

export default App;
