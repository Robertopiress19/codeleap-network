import { useState } from 'react';
import { SignupModal } from './components/Modals/SignupModal';
import { Main } from './Main';

function App() {
  const [username, setUsername] = useState<string | null>(null);

  const handleSignup = (newUsername: string) => {
    setUsername(newUsername);
  };

  const handleSignout = () => {
    setUsername(null);
  };

  return (
    <div className="App">
      {username ? (
        <Main username={username} onSignout={handleSignout} />
      ) : (
        <SignupModal open={true} onClose={() => {}} onSignup={handleSignup} />
      )}
    </div>
  );
}

export default App;