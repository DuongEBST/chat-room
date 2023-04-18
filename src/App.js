import './App.css';
import { useAuth } from './hooks/useAuth';
import AuthenticatedApp from './components/AuthenticatedApp';
import UnauthenticatedApp from './components/UnauthenticatedApp';

function App() {
  const {user} = useAuth() 
  let newUser = JSON.parse(sessionStorage.getItem("user"))

  return (
    <div className="container">
      <h1>💬 Chat Room</h1>
      {newUser ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  )
}

export default App;
