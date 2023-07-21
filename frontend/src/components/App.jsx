import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';
import Chat from './Chat.jsx';
import Login from './Login.jsx';
import NotFound from './NotFound.jsx';
import { AuthContext, ChannelContext } from '../context/index.js';

const AuthProvider = ({ children }) => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  const [loggedIn, setLoggedIn] = useState(!!userId);
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };
  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useContext(AuthContext);
  const location = useLocation();
  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const AuthButton = () => {
  const auth = useContext(AuthContext);
  const location = useLocation();
  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Log out</Button>
      : <Button as={Link} to="/login" state={{ from: location }}>Log in</Button>
  );
};

const StoreProvider = () => {
  const [selected, setSelectedChannel] = useState(1);
  const changeChannel = (id) => setSelectedChannel(id);
  return (
    <ChannelContext.Provider value={{ selected, changeChannel }} >
      <Chat />
    </ChannelContext.Provider>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar>
          <Container>
            <Navbar.Brand as={Link} to='/'>Hexlet Chat</Navbar.Brand>
            <AuthButton />
          </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={(
            <PrivateRoute>
              <StoreProvider />
            </PrivateRoute>
          )} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
